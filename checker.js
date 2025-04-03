const axios = require("axios");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const SESSION_NAME = "jsai";
const GOOGLE_APPS_SCRIPT_URL = "blabla";
const PROCESSED_FILE = path.join(__dirname, "processedMessages.json");
const WPP_SERVER_URL = "http://localhost:21465/api";
const AUTH_TOKEN = "ddddddd";

const HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${AUTH_TOKEN}`,
};

const GROUPS = {
    "DEBUGS": "120363150249406586@g.us",
    "JS Maintenance Bandung": "120363046396840061@g.us",
};

const TARGET_NUMBERS = ["628986811367@c.us", "6281324276676@c.us"];

let processedMessages = loadProcessedMessages();
let currentDay = getTodayDate();
let lastMessageReceivedTime = Date.now(); // ⏳ Waktu terakhir pesan diterima

function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}

function timestampToDate(timestamp) {
    return new Date(timestamp * 1000).toISOString().split("T")[0];
}

function loadProcessedMessages() {
    try {
        if (fs.existsSync(PROCESSED_FILE)) {
            return JSON.parse(fs.readFileSync(PROCESSED_FILE, "utf8"));
        }
    } catch (error) {
        console.error("❌ Gagal memuat processed messages:", error.message);
    }
    return {};
}

function saveProcessedMessages() {
    fs.writeFileSync(PROCESSED_FILE, JSON.stringify(processedMessages, null, 2));
}

// 🔍 **Cek dan Restart wa-bot jika tidak ada pesan masuk dalam 30 detik**
function checkWaBotStatus() {
    const now = Date.now();
    const timeDiff = (now - lastMessageReceivedTime) / 1000; // dalam detik

    if (timeDiff > 30) {
        console.error("⚠️ Tidak ada pesan masuk selama 30 detik. Restarting wa-bot...");
        restartPm2Service("wa-bot");
        lastMessageReceivedTime = Date.now(); // Reset waktu setelah restart
    }
}

// 🚀 **Restart PM2 Service**
function restartPm2Service(serviceName) {
    exec(`pm2 restart ${serviceName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Gagal restart ${serviceName}: ${error.message}`);
            return;
        }
        console.log(`🔄 ${serviceName} berhasil di-restart: ${stdout}`);
    });
}

// 📩 **Cek Pesan Grup**
async function checkGroupMessages(groupName, groupId) {
    try {
        const response = await axios.get(`${WPP_SERVER_URL}/${SESSION_NAME}/all-messages-in-chat/${groupId}`, {
            params: {
                isGroup: "true",
                includeMe: "false",
                includeNotifications: "false",
            },
            headers: HEADERS,
        });

        const messages = response.data?.response || [];

        if (messages.length > 0) {
            lastMessageReceivedTime = Date.now(); // ✅ Perbarui waktu terakhir menerima pesan
            console.log(`📨 Pesan baru diterima di grup ${groupName}`);
        }
    } catch (error) {
        console.error(`❌ Gagal mengambil pesan dari ${groupName}: ${error.message}`);
    }
}

// 🔄 **Loop utama**
setInterval(async () => {
    const today = getTodayDate();
    
    if (today !== currentDay) {
        processedMessages = {};
        currentDay = today;
        saveProcessedMessages();
        console.log("🔄 Data harian direset");
    }

    Object.entries(GROUPS).forEach(([name, id]) => {
        checkGroupMessages(name, id);
    });

    checkWaBotStatus(); // 🚨 Cek status wa-bot setiap 10 detik
}, 10000);

console.log("🚀 Bot aktif");