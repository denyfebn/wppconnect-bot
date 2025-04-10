const axios = require("axios");
const fs = require("fs");
const path = require("path");

const SESSION_NAME = "local";
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby7fytOj6wCEh5uH6mQs8mi-tlur-EetSDRPZAJn0YJjJkNlT9G3YTM5Dp0WF3xZPWh9g/exec";
const PROCESSED_FILE = path.join(__dirname, "processedMessages.json");
const WPP_SERVER_URL = "http://localhost:21465/api";
const AUTH_TOKEN = "$2b$10$nOy3N8HZiAfUhjSyDlV0Ee_Eih6J1KJ4RcbP8F7De1iAyLIN8T2Hy";

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${AUTH_TOKEN}`,
};

const GROUPS = {
  "DEBUGS": "120363150249406586@g.us",
  "JS Maintenance Bandung": "120363046396840061@g.us",
};

const TARGET_NUMBERS = ["628986811367@c.us", "6281324276676@c.us"];
const FORCE_MENTION_NUMBERS = ["6281312389100","6281321271990","62811224653","6281324276676"];

const CONFIG_FILE = path.join(__dirname, "configWorker.json");

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
    }
  } catch (error) {
    console.error("❌ Gagal memuat config:", error.message);
  }
  // Default config: mode open
  return { denyFebnOpen: true };
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

// Inisialisasi config
let config = loadConfig();
let denyFebnOpen = config.denyFebnOpen;

let processedMessages = loadProcessedMessages();
let currentDay = getTodayDate();

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function timestampToDate(timestamp) {
  return new Date(timestamp * 1000).toISOString().split("T")[0];
}

function loadProcessedMessages() {
  try {
    if (fs.existsSync(PROCESSED_FILE)) {
      const data = JSON.parse(fs.readFileSync(PROCESSED_FILE, "utf8"));
      const today = getTodayDate();
      return {
        [today]: new Set(data[today] || []),
      };
    }
  } catch (error) {
    console.error("❌ Gagal memuat processed messages:", error.message);
  }
  return {};
}

function saveProcessedMessages() {
  const today = getTodayDate();
  const dataToSave = {
    [today]: Array.from(processedMessages[today] || []),
  };
  fs.writeFileSync(PROCESSED_FILE, JSON.stringify(dataToSave, null, 2));
}

async function deleteOldChats() {
  try {
    await Promise.all(
      Object.values(GROUPS).map(async (groupId) => {
        await axios.delete(`${WPP_SERVER_URL}/${SESSION_NAME}/delete-chat`, {
          data: { phone: groupId, isGroup: true },
          headers: HEADERS,
        });
        console.log(`♻️ Chat history dihapus untuk grup: ${groupId}`);
      })
    );
  } catch (error) {
    console.error("❌ Gagal menghapus chat:", error.message);
  }
}

async function reactToMessage(msgId, reaction = "⏳", maxRetries = 3) {
  const validReactions = ["⏳", "🫡", "✍🏻", "✅", "❌", "❓", "👀", "🙏🏻", "☕️"];

  try {
    if (!validReactions.includes(reaction)) {
      throw new Error(`Reaction '${reaction}' tidak valid`);
    }

    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        const response = await axios.post(
          `${WPP_SERVER_URL}/${SESSION_NAME}/react-message`,
          { msgId, reaction },
          { headers: HEADERS, timeout: 5000 }
        );
        console.log(`Reaction ${reaction} terkirim ke ${msgId}`);
        return response.data;
      } catch (error) {
        if (++attempts === maxRetries) throw error;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  } catch (error) {
    console.error(`Gagal mengirim reaction setelah ${maxRetries}x: ${error.message}`);
  }
}

function getReactionBasedOnResponse(message) {
  if (!message) return "🙏🏻";

  const patterns = {
    "❓": [/\* Tidak Ditemukan\*/i, /\*Info Tidak Diproses\*/i, /\*Tidak Ada Keterangan\*/i],
    "✅": [/\*Noted\*/i, /\*Schedule visit ulang\*/i, /\*Waiting List\*/i],
    "👀": [/\*BOT Error\*/i, /Sekretaris sedang memproses/i],
  };

  for (const [reaction, regexes] of Object.entries(patterns)) {
    if (regexes.some((regex) => regex.test(message))) {
      return reaction;
    }
  }

  return "🙏🏻";
}

async function sendTyping(chatId, isGroup = false, value = true) {
  try {
    await axios.post(
      `${WPP_SERVER_URL}/${SESSION_NAME}/typing`,
      {
        phone: chatId,
        isGroup: isGroup,
        value: value,
      },
      { headers: HEADERS }
    );
    console.log(`Typing ${value ? "started" : "stopped"}`);
  } catch (error) {
    console.error(
      `❌ Gagal mengirim typing: ${error.response?.data?.message || error.message}`
    );
  }
}

async function checkGroupMessages(groupName, groupId) {
  try {
    const response = await axios.get(
      `${WPP_SERVER_URL}/${SESSION_NAME}/all-messages-in-chat/${groupId}`,
      {
        params: {
          isGroup: "true",
          includeMe: "false",
          includeNotifications: "false",
        },
        headers: HEADERS,
      }
    );

    if (!response.data?.response) return;

    const messages = response.data.response;
    const today = getTodayDate();

    if (!processedMessages[today]) {
      processedMessages[today] = new Set();
      saveProcessedMessages();
    }

    for (const message of messages) {
      // Mulai hitung waktu processing untuk tiap pesan
      const messageStartTime = Date.now();

      const messageDate = timestampToDate(message.timestamp);
      if (messageDate !== today) continue;
      if (processedMessages[today].has(message.id)) continue;

      let messageContent = "";
      if (message.type === "image") {
        messageContent = message.caption || "Laporan gambar tanpa deskripsi";
      } else if (message.type === "chat") {
        messageContent = message.body;
      }

      const senderName = message.sender?.pushname || "Unknown";
      const senderNumber = message.sender?.id?.user || "";

      // Bila pesan yang isinya hanya command "/open" atau "/closed",
      // dan yang kirim bukan "denyFebn", maka abaikan pesan ini.
      const trimmedCmd = messageContent.trim().toLowerCase();
      if ((trimmedCmd === "/open" || trimmedCmd === "/closed") && senderName !== "denyFebn") {
        processedMessages[today].add(message.id);
        saveProcessedMessages();
        continue;
      }

      const isMentioned = TARGET_NUMBERS.some(
        (num) =>
          message.body?.includes(`@${num.split("@")[0]}`) ||
          message.mentionedJidList?.some((m) => TARGET_NUMBERS.includes(m._serialized))
      );

      // Command handling khusus dari "denyFebn"
      if (senderName === "denyFebn") {
        if (trimmedCmd === "#closed") {
          config.denyFebnOpen = false;
          denyFebnOpen = false;
          saveConfig(config);
          let formattedGroupId = groupId;
          if (!formattedGroupId.endsWith("@g.us")) {
            formattedGroupId = `${formattedGroupId}@g.us`;
          }
          // Hitung waktu command
          const commandProcessingTime = ((Date.now() - messageStartTime) / 1000).toFixed(1);
          await axios.post(
            `${WPP_SERVER_URL}/${SESSION_NAME}/send-mentioned-reply`,
            {
              phone: formattedGroupId,
              isGroup: true,
              message:
                "Mode closed diaktifkan. Laporan tidak akan diproses.\n> " +
                commandProcessingTime +
                " s waktu bot dibutuhkan",
            },
            { headers: HEADERS }
          );
          await sendTyping(formattedGroupId, true, false);
          processedMessages[today].add(message.id);
          saveProcessedMessages();
          continue; // skip pemrosesan lebih lanjut
        } else if (trimmedCmd === "#open") {
          config.denyFebnOpen = true;
          denyFebnOpen = true;
          saveConfig(config);
          let formattedGroupId = groupId;
          if (!formattedGroupId.endsWith("@g.us")) {
            formattedGroupId = `${formattedGroupId}@g.us`;
          }
          const commandProcessingTime = ((Date.now() - messageStartTime) / 1000).toFixed(1);
          await axios.post(
            `${WPP_SERVER_URL}/${SESSION_NAME}/send-mentioned-reply`,
            {
              phone: formattedGroupId,
              isGroup: true,
              message:
                "Mode open diaktifkan. Laporan akan diproses seperti biasa.\n> " +
                commandProcessingTime +
                " s waktu bot dibutuhkan",
            },
            { headers: HEADERS }
          );
          await sendTyping(formattedGroupId, true, false);
          processedMessages[today].add(message.id);
          saveProcessedMessages();
          continue; // skip pemrosesan lebih lanjut
        }
      }

      // Untuk pesan non-command, tentukan apakah perlu diproses
      const shouldProcess =
        senderName !== "denyFebn"
          ? isMentioned
          : messageContent?.includes("cek hari ini") ||
            messageContent?.startsWith("done") ||
            /^\d{5}/.test(messageContent);
      if (!shouldProcess) continue;

      processedMessages[today].add(message.id);
      saveProcessedMessages();

      let formattedGroupId = groupId;
      if (!formattedGroupId.endsWith("@g.us")) {
        formattedGroupId = `${formattedGroupId}@g.us`;
      }
      let chatId = formattedGroupId;
      try {
        const initialReaction = senderName === "denyFebn" ? "🫡" : "⏳";
        await reactToMessage(message.id, initialReaction);

        // Mulai typing; pastikan stop typing ter-eksekusi via try-finally
        await sendTyping(chatId, true, true);
        let gasMessage;
        try {
          if (!denyFebnOpen) {
            // Mode closed aktif
            if (senderName !== "denyFebn") {
              // Semua pesan dari non-denyFebn di-bypass
              if (/\b\d{5}\b/.test(messageContent)) {
                gasMessage = "*CLOSED* \n> Laporan tidak diproses karena Gform oriented. \n> Input by BOT sementara dimatikan sampai waktu yang belum ditentukan.";
              } else {
                await reactToMessage(message.id, "👀");
                continue;
              }
            } else {
              // Jika sender adalah denyFebn, cek apakah pesan mengandung "cek hari ini" atau diawali "done"
              const lowerMsg = messageContent.toLowerCase();
              if (lowerMsg.includes("cek hari ini") || lowerMsg.startsWith("done")) {
                const gasResponse = await axios.post(
                  GOOGLE_APPS_SCRIPT_URL,
                  {
                    sender: senderName,
                    message: messageContent,
                    group: groupName,
                    type: message.type,
                  },
                  { headers: { "Content-Type": "application/json" } }
                );
                gasMessage = gasResponse.data?.data?.[0]?.message || "❌ Server Overtime";
              } else {
                continue;
              }
            }
          } else {
            // Mode open aktif → proses GAS normal untuk semua sender
            const gasResponse = await axios.post(
              GOOGLE_APPS_SCRIPT_URL,
              {
                sender: senderName,
                message: messageContent,
                group: groupName,
                type: message.type,
              },
              { headers: { "Content-Type": "application/json" } }
            );
            gasMessage = gasResponse.data?.data?.[0]?.message || "❌ Server Overtime";
          }
        } finally {
          await sendTyping(chatId, true, false);
        }

        let groupMembers = [];
        try {
          const groupMembersResp = await axios.get(
            `${WPP_SERVER_URL}/${SESSION_NAME}/group-members/${formattedGroupId}`,
            { headers: HEADERS }
          );
          groupMembers = groupMembersResp.data?.response || [];
          console.log("✅ Members in group:", groupMembers.map((m) => m.id?._serialized));
        } catch (err) {
          console.warn("⚠️ Gagal ambil member grup:", err.message);
        }

        const shouldAppendFYI = /\*Noted\*/i.test(gasMessage);
        const mentionedJids = shouldAppendFYI
          ? FORCE_MENTION_NUMBERS.filter((nomor) => {
              const jid = `${nomor}@c.us`;
              return (
                nomor !== senderNumber &&
                !messageContent.includes(`@${nomor}`) &&
                groupMembers.some((m) => m.id?._serialized === jid)
              );
            }).map((nomor) => `${nomor}@c.us`)
          : [];
        const mentionText =
          mentionedJids.length > 0
            ? `FYI ${mentionedJids.map((j) => `@${j.replace("@c.us", "")}`).join(" ")}`
            : "";
        let finalMessage = [gasMessage, mentionText].filter(Boolean).join("\n");

        // Hitung waktu processing pesan (dalam detik)
        const processingTime = ((Date.now() - messageStartTime) / 1000).toFixed(1);
        finalMessage = finalMessage + "\n> " + processingTime + " s waktu bot dibutuhkan";

        await axios.post(
          `${WPP_SERVER_URL}/${SESSION_NAME}/send-mentioned-reply`,
          {
            phone: formattedGroupId,
            isGroup: true,
            message: finalMessage,
            messageId: message.id,
          },
          { headers: HEADERS }
        );

        if (!denyFebnOpen && senderName !== "denyFebn" && /\b\d{5}\b/.test(messageContent)) {
          await reactToMessage(message.id, "❌");
        } else {
          const finalReaction = senderName === "denyFebn" ? "☕️" : getReactionBasedOnResponse(gasMessage);
          await reactToMessage(message.id, finalReaction);
        }
      } catch (error) {
        await sendTyping(formattedGroupId, true, false);
        await reactToMessage(message.id, "❌");
        // Hitung waktu processing error
        const errorProcessingTime = ((Date.now() - messageStartTime) / 1000).toFixed(1);
        console.error(`❌ Gagal memproses pesan: ${error.message} (${errorProcessingTime} s)`);
        // Kalau perlu, lo juga bisa mengirim pesan error ke grup:
        await axios.post(
          `${WPP_SERVER_URL}/${SESSION_NAME}/send-mentioned-reply`,
          {
            phone: formattedGroupId,
            isGroup: true,
            message: `❌ Gagal memproses pesan: ${error.message}\n> ${errorProcessingTime} s waktu bot dibutuhkan`,
            messageId: message.id,
          },
          { headers: HEADERS }
        );
        processedMessages[today].delete(message.id);
        saveProcessedMessages();
      }
    }
  } catch (error) {
    console.error(`❌ Gagal ambil pesan: ${error.message}`);
  }
}



setInterval(async () => {
  const today = getTodayDate();

  if (today !== currentDay) {
    processedMessages = {};
    currentDay = today;
    saveProcessedMessages();
    await deleteOldChats();
    console.log("🔄 Data harian direset");
  }

  Object.entries(GROUPS).forEach(([name, id]) => {
    checkGroupMessages(name, id);
  });
}, 10000);

process.on("SIGINT", () => {
  saveProcessedMessages();
  process.exit();
});

console.log("🚀 Bot aktif");
