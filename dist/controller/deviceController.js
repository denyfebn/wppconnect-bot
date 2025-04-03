"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.archiveAllChats = archiveAllChats;
exports.archiveChat = archiveChat;
exports.blockContact = blockContact;
exports.chatWoot = chatWoot;
exports.checkNumberStatus = checkNumberStatus;
exports.clearAllChats = clearAllChats;
exports.clearChat = clearChat;
exports.deleteAllChats = deleteAllChats;
exports.deleteChat = deleteChat;
exports.deleteMessage = deleteMessage;
exports.forwardMessages = forwardMessages;
exports.getAllChats = getAllChats;
exports.getAllChatsArchiveds = getAllChatsArchiveds;
exports.getAllChatsWithMessages = getAllChatsWithMessages;
exports.getAllContacts = getAllContacts;
exports.getAllMessagesInChat = getAllMessagesInChat;
exports.getAllNewMessages = getAllNewMessages;
exports.getAllUnreadMessages = getAllUnreadMessages;
exports.getBatteryLevel = getBatteryLevel;
exports.getBlockList = getBlockList;
exports.getChatById = getChatById;
exports.getChatIsOnline = getChatIsOnline;
exports.getContact = getContact;
exports.getHostDevice = getHostDevice;
exports.getLastSeen = getLastSeen;
exports.getListMutes = getListMutes;
exports.getMessageById = getMessageById;
exports.getMessages = getMessages;
exports.getNumberProfile = getNumberProfile;
exports.getPhoneNumber = getPhoneNumber;
exports.getPlatformFromMessage = getPlatformFromMessage;
exports.getProfilePicFromServer = getProfilePicFromServer;
exports.getReactions = getReactions;
exports.getStatus = getStatus;
exports.getUnreadMessages = getUnreadMessages;
exports.getVotes = getVotes;
exports.listChats = listChats;
exports.loadAndGetAllMessagesInChat = loadAndGetAllMessagesInChat;
exports.markUnseenMessage = markUnseenMessage;
exports.pinChat = pinChat;
exports.reactMessage = reactMessage;
exports.rejectCall = rejectCall;
exports.reply = reply;
exports.sendContactVcard = sendContactVcard;
exports.sendMute = sendMute;
exports.sendSeen = sendSeen;
exports.setChatState = setChatState;
exports.setProfileName = setProfileName;
exports.setProfilePic = setProfilePic;
exports.setProfileStatus = setProfileStatus;
exports.setRecording = setRecording;
exports.setTemporaryMessages = setTemporaryMessages;
exports.setTyping = setTyping;
exports.showAllContacts = showAllContacts;
exports.starMessage = starMessage;
exports.unblockContact = unblockContact;
var _functions = require("../util/functions");
var _sessionUtil = require("../util/sessionUtil");
/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function returnSucess(res, session, phone, data) {
  res.status(201).json({
    status: 'Success',
    response: {
      message: 'Information retrieved successfully.',
      contact: phone,
      session: session,
      data: data
    }
  });
}
function returnError(req, res, session, error) {
  req.logger.error(error);
  res.status(400).json({
    status: 'Error',
    response: {
      message: 'Error retrieving information',
      session: session,
      log: error
    }
  });
}
async function setProfileName(req, res) {
  /**
   * #swagger.tags = ["Profile"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: false,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
            }
          },
          examples: {
            "Default": {
              value: {
                name: "My new name",
              }
            },
          }
        }
      }
     }
   */
  const {
    name
  } = req.body;
  if (!name) res.status(400).json({
    status: 'error',
    message: 'Parameter name is required!'
  });
  try {
    const result = await req.client.setProfileName(name);
    res.status(200).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on set profile name.',
      error: error
    });
  }
}
async function showAllContacts(req, res) {
  /**
   * #swagger.tags = ["Contacts"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const contacts = await req.client.getAllContacts();
    res.status(200).json({
      status: 'success',
      response: contacts
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching contacts',
      error: error
    });
  }
}
async function getAllChats(req, res) {
  /**
   * #swagger.tags = ["Chat"]
   * #swagger.summary = 'Deprecated in favor of 'list-chats'
   * #swagger.deprecated = true
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const response = await req.client.getAllChats();
    res.status(200).json({
      status: 'success',
      response: response,
      mapper: 'chat'
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on get all chats'
    });
  }
}
async function listChats(req, res) {
  /**
   * #swagger.tags = ["Chat"]
   * #swagger.summary = 'Retrieve a list of chats'
   * #swagger.description = 'This body is not required. Not sent body to get all chats or filter.'
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: false,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string" },
              count: { type: "number" },
              direction: { type: "string" },
              onlyGroups: { type: "boolean" },
              onlyUsers: { type: "boolean" },
              onlyWithUnreadMessage: { type: "boolean" },
              withLabels: { type: "array" },
            }
          },
          examples: {
            "All options - Edit this": {
              value: {
                id: "<chatId>",
                count: 20,
                direction: "after",
                onlyGroups: false,
                onlyUsers: false,
                onlyWithUnreadMessage: false,
                withLabels: []
              }
            },
            "All chats": {
              value: {
              }
            },
            "Chats group": {
              value: {
                onlyGroups: true,
              }
            },
            "Only with unread messages": {
              value: {
                onlyWithUnreadMessage: false,
              }
            },
            "Paginated results": {
              value: {
                id: "<chatId>",
                count: 20,
                direction: "after",
              }
            },
          }
        }
      }
     }
   */
  try {
    const {
      id,
      count,
      direction,
      onlyGroups,
      onlyUsers,
      onlyWithUnreadMessage,
      withLabels
    } = req.body;
    const response = await req.client.listChats({
      id: id,
      count: count,
      direction: direction,
      onlyGroups: onlyGroups,
      onlyUsers: onlyUsers,
      onlyWithUnreadMessage: onlyWithUnreadMessage,
      withLabels: withLabels
    });
    res.status(200).json(response);
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on get all chats'
    });
  }
}
async function getAllChatsWithMessages(req, res) {
  /**
   * #swagger.tags = ["Chat"]
   * #swagger.summary = 'Deprecated in favor of list-chats'
   * #swagger.deprecated = true
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const response = await req.client.listChats();
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on get all chats whit messages',
      error: e
    });
  }
}
/**
 * Depreciado em favor de getMessages
 */
async function getAllMessagesInChat(req, res) {
  /**
   * #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999'
     }
     #swagger.parameters["isGroup"] = {
      schema: 'false'
     }
     #swagger.parameters["includeMe"] = {
      schema: 'true'
     }
     #swagger.parameters["includeNotifications"] = {
      schema: 'true'
     }
   */
  try {
    const {
      phone
    } = req.params;
    const {
      isGroup = false,
      includeMe = true,
      includeNotifications = true
    } = req.query;
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, isGroup)) {
      response = await req.client.getAllMessagesInChat(contato, includeMe, includeNotifications);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on get all messages in chat',
      error: e
    });
  }
}
async function getAllNewMessages(req, res) {
  /**
   * #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const response = await req.client.getAllNewMessages();
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on get all messages in chat',
      error: e
    });
  }
}
async function getAllUnreadMessages(req, res) {
  /**
   * #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const response = await req.client.getAllUnreadMessages();
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on get all messages in chat',
      error: e
    });
  }
}
async function getChatById(req, res) {
  /**
   * #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999'
     }
     #swagger.parameters["isGroup"] = {
      schema: 'false'
     }
   */
  const {
    phone
  } = req.params;
  const {
    isGroup
  } = req.query;
  try {
    let result = {};
    if (isGroup) {
      result = await req.client.getChatById(`${phone}@g.us`);
    } else {
      result = await req.client.getChatById(`${phone}@c.us`);
    }
    res.status(200).json(result);
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error changing chat by Id',
      error: e
    });
  }
}
async function getMessageById(req, res) {
  /**
   * #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["messageId"] = {
      required: true,
      schema: '<message_id>'
     }
   */
  const session = req.session;
  const {
    messageId
  } = req.params;
  try {
    const result = await req.client.getMessageById(messageId);
    returnSucess(res, session, result.chatId.user, result);
  } catch (error) {
    returnError(req, res, session, error);
  }
}
async function getBatteryLevel(req, res) {
  /**
   * #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const response = await req.client.getBatteryLevel();
    res.status(200).json({
      status: 'Success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving battery status',
      error: e
    });
  }
}
async function getHostDevice(req, res) {
  /**
   * #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const response = await req.client.getHostDevice();
    const phoneNumber = await req.client.getWid();
    res.status(200).json({
      status: 'success',
      response: {
        ...response,
        phoneNumber
      },
      mapper: 'device'
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao recuperar dados do telefone',
      error: e
    });
  }
}
async function getPhoneNumber(req, res) {
  /**
   * #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const phoneNumber = await req.client.getWid();
    res.status(200).json({
      status: 'success',
      response: phoneNumber,
      mapper: 'device'
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving phone number',
      error: e
    });
  }
}
async function getBlockList(req, res) {
  /**
   * #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  const response = await req.client.getBlockList();
  try {
    const blocked = response.map(contato => {
      return {
        phone: contato ? contato.split('@')[0] : ''
      };
    });
    res.status(200).json({
      status: 'success',
      response: blocked
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving blocked contact list',
      error: e
    });
  }
}
async function deleteChat(req, res) {
  /**
   * #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: false,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
              }
            },
          }
        }
      }
     }
   */
  const {
    phone
  } = req.body;
  const session = req.session;
  try {
    const results = {};
    for (const contato of phone) {
      results[contato] = await req.client.deleteChat(contato);
    }
    returnSucess(res, session, phone, results);
  } catch (error) {
    returnError(req, res, session, error);
  }
}
async function deleteAllChats(req, res) {
  /**
   * #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const chats = await req.client.getAllChats();
    for (const chat of chats) {
      await req.client.deleteChat(chat.chatId);
    }
    res.status(200).json({
      status: 'success'
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on delete all chats',
      error: error
    });
  }
}
async function clearChat(req, res) {
  /**
   * #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     
     #swagger.requestBody = {
      required: false,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
              }
            },
          }
        }
      }
     }
   */
  const {
    phone
  } = req.body;
  const session = req.session;
  try {
    const results = {};
    for (const contato of phone) {
      results[contato] = await req.client.clearChat(contato);
    }
    returnSucess(res, session, phone, results);
  } catch (error) {
    returnError(req, res, session, error);
  }
}
async function clearAllChats(req, res) {
  /**
   * #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const chats = await req.client.getAllChats();
    for (const chat of chats) {
      await req.client.clearChat(`${chat.chatId}`);
    }
    res.status(201).json({
      status: 'success'
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on clear all chats',
      error: e
    });
  }
}
async function archiveChat(req, res) {
  /**
   * #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     
     #swagger.requestBody = {
      required: false,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              value: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
                value: true,
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    value = true
  } = req.body;
  try {
    const response = await req.client.archiveChat(`${phone}`, value);
    res.status(201).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on archive chat',
      error: e
    });
  }
}
async function archiveAllChats(req, res) {
  /**
   * #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const chats = await req.client.getAllChats();
    for (const chat of chats) {
      await req.client.archiveChat(`${chat.chatId}`, true);
    }
    res.status(201).json({
      status: 'success'
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on archive all chats',
      error: e
    });
  }
}
async function getAllChatsArchiveds(req, res) {
  /**
   * #swagger.tags = ["Chat"]
   * #swagger.description = 'Retrieves all archived chats.'
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const chats = await req.client.getAllChats();
    const archived = [];
    for (const chat of chats) {
      if (chat.archive === true) {
        archived.push(chat);
      }
    }
    res.status(201).json(archived);
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on archive all chats',
      error: e
    });
  }
}
async function deleteMessage(req, res) {
  /**
   * #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     
     #swagger.requestBody = {
      required: false,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              messageId: { type: "string" },
              onlyLocal: { type: "boolean" },
              deleteMediaInDevice: { type: "boolean" },
            }
          },
          examples: {
            "Delete message to all": {
              value: {
                phone: "5521999999999",
                isGroup: false,
                messageId: "<messageId>",
                deleteMediaInDevice: true,
              }
            },
            "Delete message only me": {
              value: {
                phone: "5521999999999",
                isGroup: false,
                messageId: "<messageId>",
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    messageId,
    deleteMediaInDevice,
    onlyLocal
  } = req.body;
  try {
    const result = await req.client.deleteMessage(`${phone}`, messageId, onlyLocal, deleteMediaInDevice);
    if (result) {
      res.status(200).json({
        status: 'success',
        response: {
          message: 'Message deleted'
        }
      });
    }
    res.status(401).json({
      status: 'error',
      response: {
        message: 'Error unknown on delete message'
      }
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on delete message',
      error: e
    });
  }
}
async function reactMessage(req, res) {
  /**
   * #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: false,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msgId: { type: "string" },
              reaction: { type: "string" },
            }
          },
          examples: {
            "Default": {
              value: {
                msgId: "<messageId>",
                reaction: "😜",
              }
            },
          }
        }
      }
     }
   */
  const {
    msgId,
    reaction
  } = req.body;
  try {
    await req.client.sendReactionToMessage(msgId, reaction);
    res.status(200).json({
      status: 'success',
      response: {
        message: 'Reaction sended'
      }
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on send reaction to message',
      error: e
    });
  }
}
async function reply(req, res) {
  /**
   * #swagger.deprecated=true
     #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              messageid: { type: "string" },
              text: { type: "string" },
            }
          },
          examples: {
            "Default": {
              value: {
              phone: "5521999999999",
              isGroup: false,
              messageid: "<messageId>",
              text: "Text to reply",
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    text,
    messageid
  } = req.body;
  try {
    const response = await req.client.reply(`${phone}@c.us`, text, messageid);
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error replying message',
      error: e
    });
  }
}
async function forwardMessages(req, res) {
  /**
     #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              messageId: { type: "string" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
                messageId: "<messageId>",
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    messageId,
    isGroup = false
  } = req.body;
  try {
    let response;
    if (!isGroup) {
      response = await req.client.forwardMessage(`${phone[0]}`, messageId);
    } else {
      response = await req.client.forwardMessage(`${phone[0]}`, messageId);
    }
    res.status(201).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error forwarding message',
      error: e
    });
  }
}
async function markUnseenMessage(req, res) {
  /**
     #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
              }
            },
          }
        }
      }
     }
   */
  const {
    phone
  } = req.body;
  try {
    await req.client.markUnseenMessage(`${phone}`);
    res.status(200).json({
      status: 'success',
      response: {
        message: 'unseen checked'
      }
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on mark unseen',
      error: e
    });
  }
}
async function blockContact(req, res) {
  /**
     #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
              phone: "5521999999999",
              isGroup: false,
              }
            },
          }
        }
      }
     }
   */
  const {
    phone
  } = req.body;
  try {
    await req.client.blockContact(`${phone}`);
    res.status(200).json({
      status: 'success',
      response: {
        message: 'Contact blocked'
      }
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on block contact',
      error: e
    });
  }
}
async function unblockContact(req, res) {
  /**
     #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
              phone: "5521999999999",
              isGroup: false,
              }
            },
          }
        }
      }
     }
   */
  const {
    phone
  } = req.body;
  try {
    await req.client.unblockContact(`${phone}`);
    res.status(200).json({
      status: 'success',
      response: {
        message: 'Contact UnBlocked'
      }
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on unlock contact',
      error: e
    });
  }
}
async function pinChat(req, res) {
  /**
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["obj"] = {
      in: 'body',
      schema: {
        $phone: '5521999999999',
        $isGroup: false,
        $state: true,
      }
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              state: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
              phone: "5521999999999",
              state: true,
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    state
  } = req.body;
  try {
    for (const contato of phone) {
      await req.client.pinChat(contato, state === 'true', false);
    }
    res.status(200).json({
      status: 'success',
      response: {
        message: 'Chat fixed'
      }
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: e.text || 'Error on pin chat',
      error: e
    });
  }
}
async function setProfilePic(req, res) {
  /**
     #swagger.tags = ["Profile"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.consumes = ['multipart/form-data']  
      #swagger.parameters['file'] = {
          in: 'formData',
          type: 'file',
          required: 'true',
      }
   */
  if (!req.file) res.status(400).json({
    status: 'Error',
    message: 'File parameter is required!'
  });
  try {
    const {
      path: pathFile
    } = req.file;
    await req.client.setProfilePic(pathFile);
    await (0, _functions.unlinkAsync)(pathFile);
    res.status(200).json({
      status: 'success',
      response: {
        message: 'Profile photo successfully changed'
      }
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error changing profile photo',
      error: e
    });
  }
}
async function getUnreadMessages(req, res) {
  /**
     #swagger.deprecated=true
     #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const response = await req.client.getUnreadMessages(false, false, true);
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      response: 'Error on open list',
      error: e
    });
  }
}
async function getChatIsOnline(req, res) {
  /**
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999',
     }
   */
  const {
    phone
  } = req.params;
  try {
    const response = await req.client.getChatIsOnline(`${phone}@c.us`);
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      response: 'Error on get chat is online',
      error: e
    });
  }
}
async function getLastSeen(req, res) {
  /**
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999',
     }
   */
  const {
    phone
  } = req.params;
  try {
    const response = await req.client.getLastSeen(`${phone}@c.us`);
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      response: 'Error on get chat last seen',
      error: error
    });
  }
}
async function getListMutes(req, res) {
  /**
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["type"] = {
      schema: 'all',
     }
   */
  const {
    type = 'all'
  } = req.params;
  try {
    const response = await req.client.getListMutes(type);
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      response: 'Error on get list mutes',
      error: error
    });
  }
}
async function loadAndGetAllMessagesInChat(req, res) {
  /**
     #swagger.deprecated=true
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999'
     }
     #swagger.parameters["includeMe"] = {
      schema: 'true'
     }
     #swagger.parameters["includeNotifications"] = {
      schema: 'false'
     }
   */
  const {
    phone,
    includeMe = true,
    includeNotifications = false
  } = req.params;
  try {
    const response = await req.client.loadAndGetAllMessagesInChat(`${phone}@c.us`, includeMe, includeNotifications);
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      response: 'Error on open list',
      error: error
    });
  }
}
async function getMessages(req, res) {
  /**
     #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999@c.us'
     }
     #swagger.parameters["count"] = {
      schema: '20'
     }
     #swagger.parameters["direction"] = {
      schema: 'before'
     }
     #swagger.parameters["id"] = {
      schema: '<message_id_to_use_direction>'
     }
   */
  const {
    phone
  } = req.params;
  const {
    count = 20,
    direction = 'before',
    id = null
  } = req.query;
  try {
    const response = await req.client.getMessages(`${phone}`, {
      count: parseInt(count),
      direction: direction.toString(),
      id: id
    });
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(401).json({
      status: 'error',
      response: 'Error on open list',
      error: e
    });
  }
}
async function sendContactVcard(req, res) {
  /**
     #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              name: { type: "string" },
              contactsId: { type: "array" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
                name: 'Name of contact',
                contactsId: ['5521999999999'],
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    contactsId,
    name = null,
    isGroup = false
  } = req.body;
  try {
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, isGroup)) {
      response = await req.client.sendContactVcard(`${contato}`, contactsId, name);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on send contact vcard',
      error: error
    });
  }
}
async function sendMute(req, res) {
  /**
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
    #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              time: { type: "number" },
              type: { type: "string" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
                time: 1,
                type: 'hours',
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    time,
    type = 'hours',
    isGroup = false
  } = req.body;
  try {
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, isGroup)) {
      response = await req.client.sendMute(`${contato}`, time, type);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on send mute',
      error: error
    });
  }
}
async function sendSeen(req, res) {
  /**
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
              }
            },
          }
        }
      }
     }
   */
  const {
    phone
  } = req.body;
  const session = req.session;
  try {
    const results = [];
    for (const contato of phone) {
      results.push(await req.client.sendSeen(contato));
    }
    returnSucess(res, session, phone, results);
  } catch (error) {
    returnError(req, res, session, error);
  }
}
async function setChatState(req, res) {
  /**
     #swagger.deprecated=true
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              chatstate: { type: "string" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
                chatstate: "1",
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    chatstate,
    isGroup = false
  } = req.body;
  try {
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, isGroup)) {
      response = await req.client.setChatState(`${contato}`, chatstate);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on send chat state',
      error: error
    });
  }
}
async function setTemporaryMessages(req, res) {
  /**
     #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              value: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
                value: true,
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    value = true,
    isGroup = false
  } = req.body;
  try {
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, isGroup)) {
      response = await req.client.setTemporaryMessages(`${contato}`, value);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on set temporary messages',
      error: error
    });
  }
}
async function setTyping(req, res) {
  /**
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              value: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
                value: true,
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    value = true,
    isGroup = false
  } = req.body;
  try {
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, isGroup)) {
      if (value) response = await req.client.startTyping(contato);else response = await req.client.stopTyping(contato);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on set typing',
      error: error
    });
  }
}
async function setRecording(req, res) {
  /**
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              duration: { type: "number" },
              value: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
                phone: "5521999999999",
                isGroup: false,
                duration: 5,
                value: true,
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    value = true,
    duration,
    isGroup = false
  } = req.body;
  try {
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, isGroup)) {
      if (value) response = await req.client.startRecording(contato, duration);else response = await req.client.stopRecoring(contato);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on set recording',
      error: error
    });
  }
}
async function checkNumberStatus(req, res) {
  /**
     #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999'
     }
   */
  const {
    phone
  } = req.params;
  try {
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, false)) {
      response = await req.client.checkNumberStatus(`${contato}`);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on check number status',
      error: error
    });
  }
}
async function getContact(req, res) {
  /**
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999'
     }
   */
  const {
    phone = true
  } = req.params;
  try {
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, false)) {
      response = await req.client.getContact(contato);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on get contact',
      error: error
    });
  }
}
async function getAllContacts(req, res) {
  /**
   * #swagger.tags = ["Contact"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const response = await req.client.getAllContacts();
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on get all constacts',
      error: error
    });
  }
}
async function getNumberProfile(req, res) {
  /**
     #swagger.deprecated=true
     #swagger.tags = ["Chat"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999'
     }
   */
  const {
    phone = true
  } = req.params;
  try {
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, false)) {
      response = await req.client.getNumberProfile(contato);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on get number profile',
      error: error
    });
  }
}
async function getProfilePicFromServer(req, res) {
  /**
     #swagger.tags = ["Contact"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999'
     }
   */
  const {
    phone = true
  } = req.params;
  const {
    isGroup = false
  } = req.query;
  try {
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, isGroup)) {
      response = await req.client.getProfilePicFromServer(contato);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on  get profile pic',
      error: error
    });
  }
}
async function getStatus(req, res) {
  /**
     #swagger.tags = ["Contact"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      schema: '5521999999999'
     }
   */
  const {
    phone = true
  } = req.params;
  try {
    let response;
    for (const contato of (0, _functions.contactToArray)(phone, false)) {
      response = await req.client.getStatus(contato);
    }
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on  get status',
      error: error
    });
  }
}
async function setProfileStatus(req, res) {
  /**
     #swagger.tags = ["Profile"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["obj"] = {
      in: 'body',
      schema: {
        $status: 'My new status',
      }
     }
     
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "string" },
            }
          },
          examples: {
            "Default": {
              value: {
                status: "My new status",
              }
            },
          }
        }
      }
     }
   */
  const {
    status
  } = req.body;
  try {
    const response = await req.client.setProfileStatus(status);
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on set profile status'
    });
  }
}
async function rejectCall(req, res) {
  /**
     #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              callId: { type: "string" },
            }
          },
          examples: {
            "Default": {
              value: {
                callId: "<callid>",
              }
            },
          }
        }
      }
     }
   */
  const {
    callId
  } = req.body;
  try {
    const response = await req.client.rejectCall(callId);
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on rejectCall',
      error: e
    });
  }
}
async function starMessage(req, res) {
  /**
     #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              messageId: { type: "string" },
              star: { type: "boolean" },
            }
          },
          examples: {
            "Default": {
              value: {
                messageId: "5521999999999",
                star: true,
              }
            },
          }
        }
      }
     }
   */
  const {
    messageId,
    star = true
  } = req.body;
  try {
    const response = await req.client.starMessage(messageId, star);
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on  start message',
      error: error
    });
  }
}
async function getReactions(req, res) {
  /**
     #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["messageId"] = {
      schema: '<messageId>'
     }
   */
  const messageId = req.params.id;
  try {
    const response = await req.client.getReactions(messageId);
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on get reactions',
      error: error
    });
  }
}
async function getVotes(req, res) {
  /**
     #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["messageId"] = {
      schema: '<messageId>'
     }
   */
  const messageId = req.params.id;
  try {
    const response = await req.client.getVotes(messageId);
    res.status(200).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on get votes',
      error: error
    });
  }
}
async function chatWoot(req, res) {
  /**
     #swagger.tags = ["Misc"]
     #swagger.description = 'You can point your Chatwoot to this route so that it can perform functions.'
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              event: { type: "string" },
              private: { type: "string" },
            }
          },
          examples: {
            "Default": {
              value: {
                messageId: "conversation_status_changed",
                private: "false",
              }
            },
          }
        }
      }
     }
   */
  const {
    session
  } = req.params;
  const client = _sessionUtil.clientsArray[session];
  if (client == null || client.status !== 'CONNECTED') return;
  try {
    if (await client.isConnected()) {
      const event = req.body.event;
      if (event == 'conversation_status_changed' || event == 'conversation_resolved' || req.body.private) {
        res.status(200).json({
          status: 'success',
          message: 'Success on receive chatwoot'
        });
      }
      const {
        message_type,
        phone = req.body.conversation.meta.sender.phone_number.replace('+', ''),
        message = req.body.conversation.messages[0]
      } = req.body;
      if (event != 'message_created' && message_type != 'outgoing') res.status(200);
      for (const contato of (0, _functions.contactToArray)(phone, false)) {
        if (message_type == 'outgoing') {
          if (message.attachments) {
            const base_url = `${client.config.chatWoot.baseURL}/${message.attachments[0].data_url.substring(message.attachments[0].data_url.indexOf('/rails/') + 1)}`;
            await client.sendFile(`${contato}`, base_url, 'file', message.content);
          } else {
            await client.sendText(contato, message.content);
          }
        }
      }
      res.status(200).json({
        status: 'success',
        message: 'Success on  receive chatwoot'
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 'error',
      message: 'Error on  receive chatwoot',
      error: e
    });
  }
}
async function getPlatformFromMessage(req, res) {
  /**
   * #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["messageId"] = {
      schema: '<messageId>'
     }
   */
  try {
    const result = await req.client.getPlatformFromMessage(req.params.messageId);
    res.status(200).json(result);
  } catch (e) {
    req.logger.error(e);
    res.status(500).json({
      status: 'error',
      message: 'Error on get get platform from message',
      error: e
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZnVuY3Rpb25zIiwicmVxdWlyZSIsIl9zZXNzaW9uVXRpbCIsInJldHVyblN1Y2VzcyIsInJlcyIsInNlc3Npb24iLCJwaG9uZSIsImRhdGEiLCJzdGF0dXMiLCJqc29uIiwicmVzcG9uc2UiLCJtZXNzYWdlIiwiY29udGFjdCIsInJldHVybkVycm9yIiwicmVxIiwiZXJyb3IiLCJsb2dnZXIiLCJsb2ciLCJzZXRQcm9maWxlTmFtZSIsIm5hbWUiLCJib2R5IiwicmVzdWx0IiwiY2xpZW50Iiwic2hvd0FsbENvbnRhY3RzIiwiY29udGFjdHMiLCJnZXRBbGxDb250YWN0cyIsImdldEFsbENoYXRzIiwibWFwcGVyIiwiZSIsImxpc3RDaGF0cyIsImlkIiwiY291bnQiLCJkaXJlY3Rpb24iLCJvbmx5R3JvdXBzIiwib25seVVzZXJzIiwib25seVdpdGhVbnJlYWRNZXNzYWdlIiwid2l0aExhYmVscyIsImdldEFsbENoYXRzV2l0aE1lc3NhZ2VzIiwiZ2V0QWxsTWVzc2FnZXNJbkNoYXQiLCJwYXJhbXMiLCJpc0dyb3VwIiwiaW5jbHVkZU1lIiwiaW5jbHVkZU5vdGlmaWNhdGlvbnMiLCJxdWVyeSIsImNvbnRhdG8iLCJjb250YWN0VG9BcnJheSIsImdldEFsbE5ld01lc3NhZ2VzIiwiZ2V0QWxsVW5yZWFkTWVzc2FnZXMiLCJnZXRDaGF0QnlJZCIsImdldE1lc3NhZ2VCeUlkIiwibWVzc2FnZUlkIiwiY2hhdElkIiwidXNlciIsImdldEJhdHRlcnlMZXZlbCIsImdldEhvc3REZXZpY2UiLCJwaG9uZU51bWJlciIsImdldFdpZCIsImdldFBob25lTnVtYmVyIiwiZ2V0QmxvY2tMaXN0IiwiYmxvY2tlZCIsIm1hcCIsInNwbGl0IiwiZGVsZXRlQ2hhdCIsInJlc3VsdHMiLCJkZWxldGVBbGxDaGF0cyIsImNoYXRzIiwiY2hhdCIsImNsZWFyQ2hhdCIsImNsZWFyQWxsQ2hhdHMiLCJhcmNoaXZlQ2hhdCIsInZhbHVlIiwiYXJjaGl2ZUFsbENoYXRzIiwiZ2V0QWxsQ2hhdHNBcmNoaXZlZHMiLCJhcmNoaXZlZCIsImFyY2hpdmUiLCJwdXNoIiwiZGVsZXRlTWVzc2FnZSIsImRlbGV0ZU1lZGlhSW5EZXZpY2UiLCJvbmx5TG9jYWwiLCJyZWFjdE1lc3NhZ2UiLCJtc2dJZCIsInJlYWN0aW9uIiwic2VuZFJlYWN0aW9uVG9NZXNzYWdlIiwicmVwbHkiLCJ0ZXh0IiwibWVzc2FnZWlkIiwiZm9yd2FyZE1lc3NhZ2VzIiwiZm9yd2FyZE1lc3NhZ2UiLCJtYXJrVW5zZWVuTWVzc2FnZSIsImJsb2NrQ29udGFjdCIsInVuYmxvY2tDb250YWN0IiwicGluQ2hhdCIsInN0YXRlIiwic2V0UHJvZmlsZVBpYyIsImZpbGUiLCJwYXRoIiwicGF0aEZpbGUiLCJ1bmxpbmtBc3luYyIsImdldFVucmVhZE1lc3NhZ2VzIiwiZ2V0Q2hhdElzT25saW5lIiwiZ2V0TGFzdFNlZW4iLCJnZXRMaXN0TXV0ZXMiLCJ0eXBlIiwibG9hZEFuZEdldEFsbE1lc3NhZ2VzSW5DaGF0IiwiZ2V0TWVzc2FnZXMiLCJwYXJzZUludCIsInRvU3RyaW5nIiwic2VuZENvbnRhY3RWY2FyZCIsImNvbnRhY3RzSWQiLCJzZW5kTXV0ZSIsInRpbWUiLCJzZW5kU2VlbiIsInNldENoYXRTdGF0ZSIsImNoYXRzdGF0ZSIsInNldFRlbXBvcmFyeU1lc3NhZ2VzIiwic2V0VHlwaW5nIiwic3RhcnRUeXBpbmciLCJzdG9wVHlwaW5nIiwic2V0UmVjb3JkaW5nIiwiZHVyYXRpb24iLCJzdGFydFJlY29yZGluZyIsInN0b3BSZWNvcmluZyIsImNoZWNrTnVtYmVyU3RhdHVzIiwiZ2V0Q29udGFjdCIsImdldE51bWJlclByb2ZpbGUiLCJnZXRQcm9maWxlUGljRnJvbVNlcnZlciIsImdldFN0YXR1cyIsInNldFByb2ZpbGVTdGF0dXMiLCJyZWplY3RDYWxsIiwiY2FsbElkIiwic3Rhck1lc3NhZ2UiLCJzdGFyIiwiZ2V0UmVhY3Rpb25zIiwiZ2V0Vm90ZXMiLCJjaGF0V29vdCIsImNsaWVudHNBcnJheSIsImlzQ29ubmVjdGVkIiwiZXZlbnQiLCJwcml2YXRlIiwibWVzc2FnZV90eXBlIiwiY29udmVyc2F0aW9uIiwibWV0YSIsInNlbmRlciIsInBob25lX251bWJlciIsInJlcGxhY2UiLCJtZXNzYWdlcyIsImF0dGFjaG1lbnRzIiwiYmFzZV91cmwiLCJjb25maWciLCJiYXNlVVJMIiwiZGF0YV91cmwiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwic2VuZEZpbGUiLCJjb250ZW50Iiwic2VuZFRleHQiLCJjb25zb2xlIiwiZ2V0UGxhdGZvcm1Gcm9tTWVzc2FnZSJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVyL2RldmljZUNvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIFdQUENvbm5lY3QgVGVhbVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IHsgQ2hhdCB9IGZyb20gJ0B3cHBjb25uZWN0LXRlYW0vd3BwY29ubmVjdCc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgeyBjb250YWN0VG9BcnJheSwgdW5saW5rQXN5bmMgfSBmcm9tICcuLi91dGlsL2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBjbGllbnRzQXJyYXkgfSBmcm9tICcuLi91dGlsL3Nlc3Npb25VdGlsJztcblxuZnVuY3Rpb24gcmV0dXJuU3VjZXNzKHJlczogYW55LCBzZXNzaW9uOiBhbnksIHBob25lOiBhbnksIGRhdGE6IGFueSkge1xuICByZXMuc3RhdHVzKDIwMSkuanNvbih7XG4gICAgc3RhdHVzOiAnU3VjY2VzcycsXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgIG1lc3NhZ2U6ICdJbmZvcm1hdGlvbiByZXRyaWV2ZWQgc3VjY2Vzc2Z1bGx5LicsXG4gICAgICBjb250YWN0OiBwaG9uZSxcbiAgICAgIHNlc3Npb246IHNlc3Npb24sXG4gICAgICBkYXRhOiBkYXRhLFxuICAgIH0sXG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXR1cm5FcnJvcihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIHNlc3Npb246IGFueSwgZXJyb3I6IGFueSkge1xuICByZXEubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgIHN0YXR1czogJ0Vycm9yJyxcbiAgICByZXNwb25zZToge1xuICAgICAgbWVzc2FnZTogJ0Vycm9yIHJldHJpZXZpbmcgaW5mb3JtYXRpb24nLFxuICAgICAgc2Vzc2lvbjogc2Vzc2lvbixcbiAgICAgIGxvZzogZXJyb3IsXG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRQcm9maWxlTmFtZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJQcm9maWxlXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBuYW1lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiTXkgbmV3IG5hbWVcIixcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBuYW1lIH0gPSByZXEuYm9keTtcblxuICBpZiAoIW5hbWUpXG4gICAgcmVzXG4gICAgICAuc3RhdHVzKDQwMClcbiAgICAgIC5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCBtZXNzYWdlOiAnUGFyYW1ldGVyIG5hbWUgaXMgcmVxdWlyZWQhJyB9KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQuc2V0UHJvZmlsZU5hbWUobmFtZSk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3VsdCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gc2V0IHByb2ZpbGUgbmFtZS4nLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaG93QWxsQ29udGFjdHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQ29udGFjdHNcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICovXG4gIHRyeSB7XG4gICAgY29uc3QgY29udGFjdHMgPSBhd2FpdCByZXEuY2xpZW50LmdldEFsbENvbnRhY3RzKCk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IGNvbnRhY3RzIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBmZXRjaGluZyBjb250YWN0cycsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbENoYXRzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNoYXRcIl1cbiAgICogI3N3YWdnZXIuc3VtbWFyeSA9ICdEZXByZWNhdGVkIGluIGZhdm9yIG9mICdsaXN0LWNoYXRzJ1xuICAgKiAjc3dhZ2dlci5kZXByZWNhdGVkID0gdHJ1ZVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgKi9cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0QWxsQ2hhdHMoKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3BvbnNlLCBtYXBwZXI6ICdjaGF0JyB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZSk7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKDUwMClcbiAgICAgIC5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCBtZXNzYWdlOiAnRXJyb3Igb24gZ2V0IGFsbCBjaGF0cycgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxpc3RDaGF0cyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJDaGF0XCJdXG4gICAqICNzd2FnZ2VyLnN1bW1hcnkgPSAnUmV0cmlldmUgYSBsaXN0IG9mIGNoYXRzJ1xuICAgKiAjc3dhZ2dlci5kZXNjcmlwdGlvbiA9ICdUaGlzIGJvZHkgaXMgbm90IHJlcXVpcmVkLiBOb3Qgc2VudCBib2R5IHRvIGdldCBhbGwgY2hhdHMgb3IgZmlsdGVyLidcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIGlkOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgY291bnQ6IHsgdHlwZTogXCJudW1iZXJcIiB9LFxuICAgICAgICAgICAgICBkaXJlY3Rpb246IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBvbmx5R3JvdXBzOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgIG9ubHlVc2VyczogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgICBvbmx5V2l0aFVucmVhZE1lc3NhZ2U6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgICAgd2l0aExhYmVsczogeyB0eXBlOiBcImFycmF5XCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBcIkFsbCBvcHRpb25zIC0gRWRpdCB0aGlzXCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBpZDogXCI8Y2hhdElkPlwiLFxuICAgICAgICAgICAgICAgIGNvdW50OiAyMCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IFwiYWZ0ZXJcIixcbiAgICAgICAgICAgICAgICBvbmx5R3JvdXBzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvbmx5VXNlcnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9ubHlXaXRoVW5yZWFkTWVzc2FnZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgd2l0aExhYmVsczogW11cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiQWxsIGNoYXRzXCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiQ2hhdHMgZ3JvdXBcIjoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIG9ubHlHcm91cHM6IHRydWUsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIk9ubHkgd2l0aCB1bnJlYWQgbWVzc2FnZXNcIjoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIG9ubHlXaXRoVW5yZWFkTWVzc2FnZTogZmFsc2UsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIlBhZ2luYXRlZCByZXN1bHRzXCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBpZDogXCI8Y2hhdElkPlwiLFxuICAgICAgICAgICAgICAgIGNvdW50OiAyMCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IFwiYWZ0ZXJcIixcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgdHJ5IHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGNvdW50LFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgb25seUdyb3VwcyxcbiAgICAgIG9ubHlVc2VycyxcbiAgICAgIG9ubHlXaXRoVW5yZWFkTWVzc2FnZSxcbiAgICAgIHdpdGhMYWJlbHMsXG4gICAgfSA9IHJlcS5ib2R5O1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50Lmxpc3RDaGF0cyh7XG4gICAgICBpZDogaWQsXG4gICAgICBjb3VudDogY291bnQsXG4gICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgIG9ubHlHcm91cHM6IG9ubHlHcm91cHMsXG4gICAgICBvbmx5VXNlcnM6IG9ubHlVc2VycyxcbiAgICAgIG9ubHlXaXRoVW5yZWFkTWVzc2FnZTogb25seVdpdGhVbnJlYWRNZXNzYWdlLFxuICAgICAgd2l0aExhYmVsczogd2l0aExhYmVscyxcbiAgICB9KTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3BvbnNlKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZSk7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKDUwMClcbiAgICAgIC5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCBtZXNzYWdlOiAnRXJyb3Igb24gZ2V0IGFsbCBjaGF0cycgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbENoYXRzV2l0aE1lc3NhZ2VzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNoYXRcIl1cbiAgICogI3N3YWdnZXIuc3VtbWFyeSA9ICdEZXByZWNhdGVkIGluIGZhdm9yIG9mIGxpc3QtY2hhdHMnXG4gICAqICNzd2FnZ2VyLmRlcHJlY2F0ZWQgPSB0cnVlXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAqL1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5saXN0Q2hhdHMoKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGUpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBnZXQgYWxsIGNoYXRzIHdoaXQgbWVzc2FnZXMnLFxuICAgICAgZXJyb3I6IGUsXG4gICAgfSk7XG4gIH1cbn1cbi8qKlxuICogRGVwcmVjaWFkbyBlbSBmYXZvciBkZSBnZXRNZXNzYWdlc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxsTWVzc2FnZXNJbkNoYXQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wicGhvbmVcIl0gPSB7XG4gICAgICBzY2hlbWE6ICc1NTIxOTk5OTk5OTk5J1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJpc0dyb3VwXCJdID0ge1xuICAgICAgc2NoZW1hOiAnZmFsc2UnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcImluY2x1ZGVNZVwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ3RydWUnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcImluY2x1ZGVOb3RpZmljYXRpb25zXCJdID0ge1xuICAgICAgc2NoZW1hOiAndHJ1ZSdcbiAgICAgfVxuICAgKi9cbiAgdHJ5IHtcbiAgICBjb25zdCB7IHBob25lIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHtcbiAgICAgIGlzR3JvdXAgPSBmYWxzZSxcbiAgICAgIGluY2x1ZGVNZSA9IHRydWUsXG4gICAgICBpbmNsdWRlTm90aWZpY2F0aW9ucyA9IHRydWUsXG4gICAgfSA9IHJlcS5xdWVyeTtcblxuICAgIGxldCByZXNwb25zZTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhdG8gb2YgY29udGFjdFRvQXJyYXkocGhvbmUsIGlzR3JvdXAgYXMgYm9vbGVhbikpIHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5nZXRBbGxNZXNzYWdlc0luQ2hhdChcbiAgICAgICAgY29udGF0byxcbiAgICAgICAgaW5jbHVkZU1lIGFzIGJvb2xlYW4sXG4gICAgICAgIGluY2x1ZGVOb3RpZmljYXRpb25zIGFzIGJvb2xlYW5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3BvbnNlIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gZ2V0IGFsbCBtZXNzYWdlcyBpbiBjaGF0JyxcbiAgICAgIGVycm9yOiBlLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxOZXdNZXNzYWdlcyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJDaGF0XCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAqL1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5nZXRBbGxOZXdNZXNzYWdlcygpO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXNwb25zZSB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZSk7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGdldCBhbGwgbWVzc2FnZXMgaW4gY2hhdCcsXG4gICAgICBlcnJvcjogZSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxsVW5yZWFkTWVzc2FnZXMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgKi9cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0QWxsVW5yZWFkTWVzc2FnZXMoKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGUpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBnZXQgYWxsIG1lc3NhZ2VzIGluIGNoYXQnLFxuICAgICAgZXJyb3I6IGUsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENoYXRCeUlkKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNoYXRcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInBob25lXCJdID0ge1xuICAgICAgc2NoZW1hOiAnNTUyMTk5OTk5OTk5OSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wiaXNHcm91cFwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ2ZhbHNlJ1xuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lIH0gPSByZXEucGFyYW1zO1xuICBjb25zdCB7IGlzR3JvdXAgfSA9IHJlcS5xdWVyeTtcblxuICB0cnkge1xuICAgIGxldCByZXN1bHQgPSB7fSBhcyBDaGF0O1xuICAgIGlmIChpc0dyb3VwKSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCByZXEuY2xpZW50LmdldENoYXRCeUlkKGAke3Bob25lfUBnLnVzYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0Q2hhdEJ5SWQoYCR7cGhvbmV9QGMudXNgKTtcbiAgICB9XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3IgY2hhbmdpbmcgY2hhdCBieSBJZCcsXG4gICAgICBlcnJvcjogZSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWVzc2FnZUJ5SWQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wibWVzc2FnZUlkXCJdID0ge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBzY2hlbWE6ICc8bWVzc2FnZV9pZD4nXG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHNlc3Npb24gPSByZXEuc2Vzc2lvbjtcbiAgY29uc3QgeyBtZXNzYWdlSWQgfSA9IHJlcS5wYXJhbXM7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXEuY2xpZW50LmdldE1lc3NhZ2VCeUlkKG1lc3NhZ2VJZCk7XG5cbiAgICByZXR1cm5TdWNlc3MocmVzLCBzZXNzaW9uLCAocmVzdWx0IGFzIGFueSkuY2hhdElkLnVzZXIsIHJlc3VsdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIHNlc3Npb24sIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QmF0dGVyeUxldmVsKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIk1pc2NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICovXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LmdldEJhdHRlcnlMZXZlbCgpO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnU3VjY2VzcycsIHJlc3BvbnNlOiByZXNwb25zZSB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZSk7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIHJldHJpZXZpbmcgYmF0dGVyeSBzdGF0dXMnLFxuICAgICAgZXJyb3I6IGUsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEhvc3REZXZpY2UocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiTWlzY1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgKi9cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0SG9zdERldmljZSgpO1xuICAgIGNvbnN0IHBob25lTnVtYmVyID0gYXdhaXQgcmVxLmNsaWVudC5nZXRXaWQoKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgIHJlc3BvbnNlOiB7IC4uLnJlc3BvbnNlLCBwaG9uZU51bWJlciB9LFxuICAgICAgbWFwcGVyOiAnZGV2aWNlJyxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZSk7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm8gYW8gcmVjdXBlcmFyIGRhZG9zIGRvIHRlbGVmb25lJyxcbiAgICAgIGVycm9yOiBlLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQaG9uZU51bWJlcihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNaXNjXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAqL1xuICB0cnkge1xuICAgIGNvbnN0IHBob25lTnVtYmVyID0gYXdhaXQgcmVxLmNsaWVudC5nZXRXaWQoKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHBob25lTnVtYmVyLCBtYXBwZXI6ICdkZXZpY2UnIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3IgcmV0cmlldmluZyBwaG9uZSBudW1iZXInLFxuICAgICAgZXJyb3I6IGUsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEJsb2NrTGlzdChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNaXNjXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAqL1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0QmxvY2tMaXN0KCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBibG9ja2VkID0gcmVzcG9uc2UubWFwKChjb250YXRvOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiB7IHBob25lOiBjb250YXRvID8gY29udGF0by5zcGxpdCgnQCcpWzBdIDogJycgfTtcbiAgICB9KTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiBibG9ja2VkIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3IgcmV0cmlldmluZyBibG9ja2VkIGNvbnRhY3QgbGlzdCcsXG4gICAgICBlcnJvcjogZSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ2hhdChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJDaGF0XCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBwaG9uZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIGlzR3JvdXA6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIHBob25lOiBcIjU1MjE5OTk5OTk5OTlcIixcbiAgICAgICAgICAgICAgICBpc0dyb3VwOiBmYWxzZSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSB9ID0gcmVxLmJvZHk7XG4gIGNvbnN0IHNlc3Npb24gPSByZXEuc2Vzc2lvbjtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IHt9O1xuICAgIGZvciAoY29uc3QgY29udGF0byBvZiBwaG9uZSkge1xuICAgICAgcmVzdWx0c1tjb250YXRvXSA9IGF3YWl0IHJlcS5jbGllbnQuZGVsZXRlQ2hhdChjb250YXRvKTtcbiAgICB9XG4gICAgcmV0dXJuU3VjZXNzKHJlcywgc2Vzc2lvbiwgcGhvbmUsIHJlc3VsdHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBzZXNzaW9uLCBlcnJvcik7XG4gIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVBbGxDaGF0cyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJDaGF0XCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAqL1xuICB0cnkge1xuICAgIGNvbnN0IGNoYXRzID0gYXdhaXQgcmVxLmNsaWVudC5nZXRBbGxDaGF0cygpO1xuICAgIGZvciAoY29uc3QgY2hhdCBvZiBjaGF0cykge1xuICAgICAgYXdhaXQgcmVxLmNsaWVudC5kZWxldGVDaGF0KChjaGF0IGFzIGFueSkuY2hhdElkKTtcbiAgICB9XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gZGVsZXRlIGFsbCBjaGF0cycsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsZWFyQ2hhdChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJDaGF0XCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgIFxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBwaG9uZTogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGhvbmUgfSA9IHJlcS5ib2R5O1xuICBjb25zdCBzZXNzaW9uID0gcmVxLnNlc3Npb247XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHRzOiBhbnkgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhdG8gb2YgcGhvbmUpIHtcbiAgICAgIHJlc3VsdHNbY29udGF0b10gPSBhd2FpdCByZXEuY2xpZW50LmNsZWFyQ2hhdChjb250YXRvKTtcbiAgICB9XG4gICAgcmV0dXJuU3VjZXNzKHJlcywgc2Vzc2lvbiwgcGhvbmUsIHJlc3VsdHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBzZXNzaW9uLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsZWFyQWxsQ2hhdHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgKi9cbiAgdHJ5IHtcbiAgICBjb25zdCBjaGF0cyA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0QWxsQ2hhdHMoKTtcbiAgICBmb3IgKGNvbnN0IGNoYXQgb2YgY2hhdHMpIHtcbiAgICAgIGF3YWl0IHJlcS5jbGllbnQuY2xlYXJDaGF0KGAkeyhjaGF0IGFzIGFueSkuY2hhdElkfWApO1xuICAgIH1cbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6ICdlcnJvcicsIG1lc3NhZ2U6ICdFcnJvciBvbiBjbGVhciBhbGwgY2hhdHMnLCBlcnJvcjogZSB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXJjaGl2ZUNoYXQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICBcbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHBob25lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgaXNHcm91cDogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgICB2YWx1ZTogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgIFwiRGVmYXVsdFwiOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgcGhvbmU6IFwiNTUyMTk5OTk5OTk5OVwiLFxuICAgICAgICAgICAgICAgIGlzR3JvdXA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lLCB2YWx1ZSA9IHRydWUgfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LmFyY2hpdmVDaGF0KGAke3Bob25lfWAsIHZhbHVlKTtcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGUpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyg1MDApXG4gICAgICAuanNvbih7IHN0YXR1czogJ2Vycm9yJywgbWVzc2FnZTogJ0Vycm9yIG9uIGFyY2hpdmUgY2hhdCcsIGVycm9yOiBlIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhcmNoaXZlQWxsQ2hhdHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgKi9cbiAgdHJ5IHtcbiAgICBjb25zdCBjaGF0cyA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0QWxsQ2hhdHMoKTtcbiAgICBmb3IgKGNvbnN0IGNoYXQgb2YgY2hhdHMpIHtcbiAgICAgIGF3YWl0IHJlcS5jbGllbnQuYXJjaGl2ZUNoYXQoYCR7KGNoYXQgYXMgYW55KS5jaGF0SWR9YCwgdHJ1ZSk7XG4gICAgfVxuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGUpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBhcmNoaXZlIGFsbCBjaGF0cycsXG4gICAgICBlcnJvcjogZSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxsQ2hhdHNBcmNoaXZlZHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgKiAjc3dhZ2dlci5kZXNjcmlwdGlvbiA9ICdSZXRyaWV2ZXMgYWxsIGFyY2hpdmVkIGNoYXRzLidcbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICovXG4gIHRyeSB7XG4gICAgY29uc3QgY2hhdHMgPSBhd2FpdCByZXEuY2xpZW50LmdldEFsbENoYXRzKCk7XG4gICAgY29uc3QgYXJjaGl2ZWQgPSBbXSBhcyBhbnk7XG4gICAgZm9yIChjb25zdCBjaGF0IG9mIGNoYXRzKSB7XG4gICAgICBpZiAoY2hhdC5hcmNoaXZlID09PSB0cnVlKSB7XG4gICAgICAgIGFyY2hpdmVkLnB1c2goY2hhdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKGFyY2hpdmVkKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZSk7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGFyY2hpdmUgYWxsIGNoYXRzJyxcbiAgICAgIGVycm9yOiBlLFxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTWVzc2FnZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICBcbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHBob25lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgaXNHcm91cDogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgICBtZXNzYWdlSWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBvbmx5TG9jYWw6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgICAgZGVsZXRlTWVkaWFJbkRldmljZTogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgIFwiRGVsZXRlIG1lc3NhZ2UgdG8gYWxsXCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBwaG9uZTogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZUlkOiBcIjxtZXNzYWdlSWQ+XCIsXG4gICAgICAgICAgICAgICAgZGVsZXRlTWVkaWFJbkRldmljZTogdHJ1ZSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiRGVsZXRlIG1lc3NhZ2Ugb25seSBtZVwiOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgcGhvbmU6IFwiNTUyMTk5OTk5OTk5OVwiLFxuICAgICAgICAgICAgICAgIGlzR3JvdXA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VJZDogXCI8bWVzc2FnZUlkPlwiLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lLCBtZXNzYWdlSWQsIGRlbGV0ZU1lZGlhSW5EZXZpY2UsIG9ubHlMb2NhbCB9ID0gcmVxLmJvZHk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXEuY2xpZW50LmRlbGV0ZU1lc3NhZ2UoXG4gICAgICBgJHtwaG9uZX1gLFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgb25seUxvY2FsLFxuICAgICAgZGVsZXRlTWVkaWFJbkRldmljZVxuICAgICk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogeyBtZXNzYWdlOiAnTWVzc2FnZSBkZWxldGVkJyB9IH0pO1xuICAgIH1cbiAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICByZXNwb25zZTogeyBtZXNzYWdlOiAnRXJyb3IgdW5rbm93biBvbiBkZWxldGUgbWVzc2FnZScgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZSk7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKDUwMClcbiAgICAgIC5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCBtZXNzYWdlOiAnRXJyb3Igb24gZGVsZXRlIG1lc3NhZ2UnLCBlcnJvcjogZSB9KTtcbiAgfVxufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWN0TWVzc2FnZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgbXNnSWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICByZWFjdGlvbjogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBtc2dJZDogXCI8bWVzc2FnZUlkPlwiLFxuICAgICAgICAgICAgICAgIHJlYWN0aW9uOiBcIvCfmJxcIixcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBtc2dJZCwgcmVhY3Rpb24gfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgcmVxLmNsaWVudC5zZW5kUmVhY3Rpb25Ub01lc3NhZ2UobXNnSWQsIHJlYWN0aW9uKTtcblxuICAgIHJlc1xuICAgICAgLnN0YXR1cygyMDApXG4gICAgICAuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogeyBtZXNzYWdlOiAnUmVhY3Rpb24gc2VuZGVkJyB9IH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gc2VuZCByZWFjdGlvbiB0byBtZXNzYWdlJyxcbiAgICAgIGVycm9yOiBlLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXBseShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLmRlcHJlY2F0ZWQ9dHJ1ZVxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiTWVzc2FnZXNcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgIG1lc3NhZ2VpZDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIHRleHQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgIFwiRGVmYXVsdFwiOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgIHBob25lOiBcIjU1MjE5OTk5OTk5OTlcIixcbiAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2VpZDogXCI8bWVzc2FnZUlkPlwiLFxuICAgICAgICAgICAgICB0ZXh0OiBcIlRleHQgdG8gcmVwbHlcIixcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSwgdGV4dCwgbWVzc2FnZWlkIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5yZXBseShgJHtwaG9uZX1AYy51c2AsIHRleHQsIG1lc3NhZ2VpZCk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3BvbnNlIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6ICdlcnJvcicsIG1lc3NhZ2U6ICdFcnJvciByZXBseWluZyBtZXNzYWdlJywgZXJyb3I6IGUgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZvcndhcmRNZXNzYWdlcyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBwaG9uZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIGlzR3JvdXA6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgICAgbWVzc2FnZUlkOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIHBob25lOiBcIjU1MjE5OTk5OTk5OTlcIixcbiAgICAgICAgICAgICAgICBpc0dyb3VwOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlSWQ6IFwiPG1lc3NhZ2VJZD5cIixcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSwgbWVzc2FnZUlkLCBpc0dyb3VwID0gZmFsc2UgfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuXG4gICAgaWYgKCFpc0dyb3VwKSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuZm9yd2FyZE1lc3NhZ2UoYCR7cGhvbmVbMF19YCwgbWVzc2FnZUlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LmZvcndhcmRNZXNzYWdlKGAke3Bob25lWzBdfWAsIG1lc3NhZ2VJZCk7XG4gICAgfVxuXG4gICAgcmVzLnN0YXR1cygyMDEpLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3BvbnNlIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6ICdlcnJvcicsIG1lc3NhZ2U6ICdFcnJvciBmb3J3YXJkaW5nIG1lc3NhZ2UnLCBlcnJvcjogZSB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFya1Vuc2Vlbk1lc3NhZ2UocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiTWVzc2FnZXNcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBwaG9uZTogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGhvbmUgfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgcmVxLmNsaWVudC5tYXJrVW5zZWVuTWVzc2FnZShgJHtwaG9uZX1gKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHsgbWVzc2FnZTogJ3Vuc2VlbiBjaGVja2VkJyB9IH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6ICdlcnJvcicsIG1lc3NhZ2U6ICdFcnJvciBvbiBtYXJrIHVuc2VlbicsIGVycm9yOiBlIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBibG9ja0NvbnRhY3QocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiTWlzY1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBwaG9uZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIGlzR3JvdXA6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICBwaG9uZTogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgIGlzR3JvdXA6IGZhbHNlLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIGF3YWl0IHJlcS5jbGllbnQuYmxvY2tDb250YWN0KGAke3Bob25lfWApO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cygyMDApXG4gICAgICAuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogeyBtZXNzYWdlOiAnQ29udGFjdCBibG9ja2VkJyB9IH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6ICdlcnJvcicsIG1lc3NhZ2U6ICdFcnJvciBvbiBibG9jayBjb250YWN0JywgZXJyb3I6IGUgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVuYmxvY2tDb250YWN0KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIk1pc2NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IFwiNTUyMTk5OTk5OTk5OVwiLFxuICAgICAgICAgICAgICBpc0dyb3VwOiBmYWxzZSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSB9ID0gcmVxLmJvZHk7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCByZXEuY2xpZW50LnVuYmxvY2tDb250YWN0KGAke3Bob25lfWApO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cygyMDApXG4gICAgICAuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogeyBtZXNzYWdlOiAnQ29udGFjdCBVbkJsb2NrZWQnIH0gfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGUpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyg1MDApXG4gICAgICAuanNvbih7IHN0YXR1czogJ2Vycm9yJywgbWVzc2FnZTogJ0Vycm9yIG9uIHVubG9jayBjb250YWN0JywgZXJyb3I6IGUgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBpbkNoYXQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wib2JqXCJdID0ge1xuICAgICAgaW46ICdib2R5JyxcbiAgICAgIHNjaGVtYToge1xuICAgICAgICAkcGhvbmU6ICc1NTIxOTk5OTk5OTk5JyxcbiAgICAgICAgJGlzR3JvdXA6IGZhbHNlLFxuICAgICAgICAkc3RhdGU6IHRydWUsXG4gICAgICB9XG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgIHN0YXRlOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IFwiNTUyMTk5OTk5OTk5OVwiLFxuICAgICAgICAgICAgICBzdGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSwgc3RhdGUgfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIHBob25lKSB7XG4gICAgICBhd2FpdCByZXEuY2xpZW50LnBpbkNoYXQoY29udGF0bywgc3RhdGUgPT09ICd0cnVlJywgZmFsc2UpO1xuICAgIH1cblxuICAgIHJlc1xuICAgICAgLnN0YXR1cygyMDApXG4gICAgICAuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogeyBtZXNzYWdlOiAnQ2hhdCBmaXhlZCcgfSB9KTtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiBlLnRleHQgfHwgJ0Vycm9yIG9uIHBpbiBjaGF0JyxcbiAgICAgIGVycm9yOiBlLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRQcm9maWxlUGljKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIlByb2ZpbGVcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIuY29uc3VtZXMgPSBbJ211bHRpcGFydC9mb3JtLWRhdGEnXSAgXG4gICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzWydmaWxlJ10gPSB7XG4gICAgICAgICAgaW46ICdmb3JtRGF0YScsXG4gICAgICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgICAgICAgIHJlcXVpcmVkOiAndHJ1ZScsXG4gICAgICB9XG4gICAqL1xuICBpZiAoIXJlcS5maWxlKVxuICAgIHJlc1xuICAgICAgLnN0YXR1cyg0MDApXG4gICAgICAuanNvbih7IHN0YXR1czogJ0Vycm9yJywgbWVzc2FnZTogJ0ZpbGUgcGFyYW1ldGVyIGlzIHJlcXVpcmVkIScgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IHBhdGg6IHBhdGhGaWxlIH0gPSByZXEuZmlsZSBhcyBhbnk7XG5cbiAgICBhd2FpdCByZXEuY2xpZW50LnNldFByb2ZpbGVQaWMocGF0aEZpbGUpO1xuICAgIGF3YWl0IHVubGlua0FzeW5jKHBhdGhGaWxlKTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgcmVzcG9uc2U6IHsgbWVzc2FnZTogJ1Byb2ZpbGUgcGhvdG8gc3VjY2Vzc2Z1bGx5IGNoYW5nZWQnIH0sXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGUpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBjaGFuZ2luZyBwcm9maWxlIHBob3RvJyxcbiAgICAgIGVycm9yOiBlLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVbnJlYWRNZXNzYWdlcyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLmRlcHJlY2F0ZWQ9dHJ1ZVxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiTWVzc2FnZXNcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICovXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LmdldFVucmVhZE1lc3NhZ2VzKGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3BvbnNlIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6ICdlcnJvcicsIHJlc3BvbnNlOiAnRXJyb3Igb24gb3BlbiBsaXN0JywgZXJyb3I6IGUgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENoYXRJc09ubGluZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJDaGF0XCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJwaG9uZVwiXSA9IHtcbiAgICAgIHNjaGVtYTogJzU1MjE5OTk5OTk5OTknLFxuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lIH0gPSByZXEucGFyYW1zO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5nZXRDaGF0SXNPbmxpbmUoYCR7cGhvbmV9QGMudXNgKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGUpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIHJlc3BvbnNlOiAnRXJyb3Igb24gZ2V0IGNoYXQgaXMgb25saW5lJyxcbiAgICAgIGVycm9yOiBlLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMYXN0U2VlbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJDaGF0XCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJwaG9uZVwiXSA9IHtcbiAgICAgIHNjaGVtYTogJzU1MjE5OTk5OTk5OTknLFxuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lIH0gPSByZXEucGFyYW1zO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5nZXRMYXN0U2VlbihgJHtwaG9uZX1AYy51c2ApO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3BvbnNlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIHJlc3BvbnNlOiAnRXJyb3Igb24gZ2V0IGNoYXQgbGFzdCBzZWVuJyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlzdE11dGVzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIkNoYXRcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInR5cGVcIl0gPSB7XG4gICAgICBzY2hlbWE6ICdhbGwnLFxuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHR5cGUgPSAnYWxsJyB9ID0gcmVxLnBhcmFtcztcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0TGlzdE11dGVzKHR5cGUpO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3BvbnNlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIHJlc3BvbnNlOiAnRXJyb3Igb24gZ2V0IGxpc3QgbXV0ZXMnLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkQW5kR2V0QWxsTWVzc2FnZXNJbkNoYXQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci5kZXByZWNhdGVkPXRydWVcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIkNoYXRcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInBob25lXCJdID0ge1xuICAgICAgc2NoZW1hOiAnNTUyMTk5OTk5OTk5OSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wiaW5jbHVkZU1lXCJdID0ge1xuICAgICAgc2NoZW1hOiAndHJ1ZSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wiaW5jbHVkZU5vdGlmaWNhdGlvbnNcIl0gPSB7XG4gICAgICBzY2hlbWE6ICdmYWxzZSdcbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSwgaW5jbHVkZU1lID0gdHJ1ZSwgaW5jbHVkZU5vdGlmaWNhdGlvbnMgPSBmYWxzZSB9ID0gcmVxLnBhcmFtcztcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQubG9hZEFuZEdldEFsbE1lc3NhZ2VzSW5DaGF0KFxuICAgICAgYCR7cGhvbmV9QGMudXNgLFxuICAgICAgaW5jbHVkZU1lIGFzIGJvb2xlYW4sXG4gICAgICBpbmNsdWRlTm90aWZpY2F0aW9ucyBhcyBib29sZWFuXG4gICAgKTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXNwb25zZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6ICdlcnJvcicsIHJlc3BvbnNlOiAnRXJyb3Igb24gb3BlbiBsaXN0JywgZXJyb3I6IGVycm9yIH0pO1xuICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWVzc2FnZXMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiTWVzc2FnZXNcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInBob25lXCJdID0ge1xuICAgICAgc2NoZW1hOiAnNTUyMTk5OTk5OTk5OUBjLnVzJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJjb3VudFwiXSA9IHtcbiAgICAgIHNjaGVtYTogJzIwJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJkaXJlY3Rpb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdiZWZvcmUnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcImlkXCJdID0ge1xuICAgICAgc2NoZW1hOiAnPG1lc3NhZ2VfaWRfdG9fdXNlX2RpcmVjdGlvbj4nXG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGhvbmUgfSA9IHJlcS5wYXJhbXM7XG4gIGNvbnN0IHsgY291bnQgPSAyMCwgZGlyZWN0aW9uID0gJ2JlZm9yZScsIGlkID0gbnVsbCB9ID0gcmVxLnF1ZXJ5O1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5nZXRNZXNzYWdlcyhgJHtwaG9uZX1gLCB7XG4gICAgICBjb3VudDogcGFyc2VJbnQoY291bnQgYXMgc3RyaW5nKSxcbiAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLnRvU3RyaW5nKCkgYXMgYW55LFxuICAgICAgaWQ6IGlkIGFzIHN0cmluZyxcbiAgICB9KTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGUpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyg0MDEpXG4gICAgICAuanNvbih7IHN0YXR1czogJ2Vycm9yJywgcmVzcG9uc2U6ICdFcnJvciBvbiBvcGVuIGxpc3QnLCBlcnJvcjogZSB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZENvbnRhY3RWY2FyZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBwaG9uZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIGlzR3JvdXA6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgICAgbmFtZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIGNvbnRhY3RzSWQ6IHsgdHlwZTogXCJhcnJheVwiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBwaG9uZTogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZTogJ05hbWUgb2YgY29udGFjdCcsXG4gICAgICAgICAgICAgICAgY29udGFjdHNJZDogWyc1NTIxOTk5OTk5OTk5J10sXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGhvbmUsIGNvbnRhY3RzSWQsIG5hbWUgPSBudWxsLCBpc0dyb3VwID0gZmFsc2UgfSA9IHJlcS5ib2R5O1xuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhdG8gb2YgY29udGFjdFRvQXJyYXkocGhvbmUsIGlzR3JvdXApKSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuc2VuZENvbnRhY3RWY2FyZChcbiAgICAgICAgYCR7Y29udGF0b31gLFxuICAgICAgICBjb250YWN0c0lkLFxuICAgICAgICBuYW1lXG4gICAgICApO1xuICAgIH1cblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXNwb25zZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gc2VuZCBjb250YWN0IHZjYXJkJyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZE11dGUocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHBob25lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgaXNHcm91cDogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgICB0aW1lOiB7IHR5cGU6IFwibnVtYmVyXCIgfSxcbiAgICAgICAgICAgICAgdHlwZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBwaG9uZTogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZTogMSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnaG91cnMnLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lLCB0aW1lLCB0eXBlID0gJ2hvdXJzJywgaXNHcm91cCA9IGZhbHNlIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhdG8gb2YgY29udGFjdFRvQXJyYXkocGhvbmUsIGlzR3JvdXApKSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuc2VuZE11dGUoYCR7Y29udGF0b31gLCB0aW1lLCB0eXBlKTtcbiAgICB9XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKDUwMClcbiAgICAgIC5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCBtZXNzYWdlOiAnRXJyb3Igb24gc2VuZCBtdXRlJywgZXJyb3I6IGVycm9yIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kU2VlbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJDaGF0XCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHBob25lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgaXNHcm91cDogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgIFwiRGVmYXVsdFwiOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgcGhvbmU6IFwiNTUyMTk5OTk5OTk5OVwiLFxuICAgICAgICAgICAgICAgIGlzR3JvdXA6IGZhbHNlLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lIH0gPSByZXEuYm9keTtcbiAgY29uc3Qgc2Vzc2lvbiA9IHJlcS5zZXNzaW9uO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0czogYW55ID0gW107XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIHBob25lKSB7XG4gICAgICByZXN1bHRzLnB1c2goYXdhaXQgcmVxLmNsaWVudC5zZW5kU2Vlbihjb250YXRvKSk7XG4gICAgfVxuICAgIHJldHVyblN1Y2VzcyhyZXMsIHNlc3Npb24sIHBob25lLCByZXN1bHRzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm5FcnJvcihyZXEsIHJlcywgc2Vzc2lvbiwgZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRDaGF0U3RhdGUocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci5kZXByZWNhdGVkPXRydWVcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIkNoYXRcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgIGNoYXRzdGF0ZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBwaG9uZTogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2hhdHN0YXRlOiBcIjFcIixcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSwgY2hhdHN0YXRlLCBpc0dyb3VwID0gZmFsc2UgfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuICAgIGZvciAoY29uc3QgY29udGF0byBvZiBjb250YWN0VG9BcnJheShwaG9uZSwgaXNHcm91cCkpIHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5zZXRDaGF0U3RhdGUoYCR7Y29udGF0b31gLCBjaGF0c3RhdGUpO1xuICAgIH1cblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXNwb25zZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gc2VuZCBjaGF0IHN0YXRlJyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0VGVtcG9yYXJ5TWVzc2FnZXMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiTWVzc2FnZXNcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgIHZhbHVlOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBwaG9uZTogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRydWUsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGhvbmUsIHZhbHVlID0gdHJ1ZSwgaXNHcm91cCA9IGZhbHNlIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhdG8gb2YgY29udGFjdFRvQXJyYXkocGhvbmUsIGlzR3JvdXApKSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuc2V0VGVtcG9yYXJ5TWVzc2FnZXMoYCR7Y29udGF0b31gLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3BvbnNlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBzZXQgdGVtcG9yYXJ5IG1lc3NhZ2VzJyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0VHlwaW5nKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIkNoYXRcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgIHZhbHVlOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBwaG9uZTogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRydWUsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGhvbmUsIHZhbHVlID0gdHJ1ZSwgaXNHcm91cCA9IGZhbHNlIH0gPSByZXEuYm9keTtcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIGNvbnRhY3RUb0FycmF5KHBob25lLCBpc0dyb3VwKSkge1xuICAgICAgaWYgKHZhbHVlKSByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuc3RhcnRUeXBpbmcoY29udGF0byk7XG4gICAgICBlbHNlIHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5zdG9wVHlwaW5nKGNvbnRhdG8pO1xuICAgIH1cblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXNwb25zZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6ICdlcnJvcicsIG1lc3NhZ2U6ICdFcnJvciBvbiBzZXQgdHlwaW5nJywgZXJyb3I6IGVycm9yIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRSZWNvcmRpbmcocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICBcbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiB7IHR5cGU6IFwibnVtYmVyXCIgfSxcbiAgICAgICAgICAgICAgdmFsdWU6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIHBob25lOiBcIjU1MjE5OTk5OTk5OTlcIixcbiAgICAgICAgICAgICAgICBpc0dyb3VwOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSwgdmFsdWUgPSB0cnVlLCBkdXJhdGlvbiwgaXNHcm91cCA9IGZhbHNlIH0gPSByZXEuYm9keTtcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIGNvbnRhY3RUb0FycmF5KHBob25lLCBpc0dyb3VwKSkge1xuICAgICAgaWYgKHZhbHVlKSByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuc3RhcnRSZWNvcmRpbmcoY29udGF0bywgZHVyYXRpb24pO1xuICAgICAgZWxzZSByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuc3RvcFJlY29yaW5nKGNvbnRhdG8pO1xuICAgIH1cblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXNwb25zZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gc2V0IHJlY29yZGluZycsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrTnVtYmVyU3RhdHVzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIk1pc2NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInBob25lXCJdID0ge1xuICAgICAgc2NoZW1hOiAnNTUyMTk5OTk5OTk5OSdcbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSB9ID0gcmVxLnBhcmFtcztcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIGNvbnRhY3RUb0FycmF5KHBob25lLCBmYWxzZSkpIHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5jaGVja051bWJlclN0YXR1cyhgJHtjb250YXRvfWApO1xuICAgIH1cblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXNwb25zZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gY2hlY2sgbnVtYmVyIHN0YXR1cycsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvbnRhY3QocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wicGhvbmVcIl0gPSB7XG4gICAgICBzY2hlbWE6ICc1NTIxOTk5OTk5OTk5J1xuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lID0gdHJ1ZSB9ID0gcmVxLnBhcmFtcztcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIGNvbnRhY3RUb0FycmF5KHBob25lIGFzIHN0cmluZywgZmFsc2UpKSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0Q29udGFjdChjb250YXRvKTtcbiAgICB9XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKDUwMClcbiAgICAgIC5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCBtZXNzYWdlOiAnRXJyb3Igb24gZ2V0IGNvbnRhY3QnLCBlcnJvcjogZXJyb3IgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbENvbnRhY3RzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNvbnRhY3RcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICovXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LmdldEFsbENvbnRhY3RzKCk7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGdldCBhbGwgY29uc3RhY3RzJyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TnVtYmVyUHJvZmlsZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLmRlcHJlY2F0ZWQ9dHJ1ZVxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiQ2hhdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wicGhvbmVcIl0gPSB7XG4gICAgICBzY2hlbWE6ICc1NTIxOTk5OTk5OTk5J1xuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lID0gdHJ1ZSB9ID0gcmVxLnBhcmFtcztcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIGNvbnRhY3RUb0FycmF5KHBob25lIGFzIHN0cmluZywgZmFsc2UpKSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0TnVtYmVyUHJvZmlsZShjb250YXRvKTtcbiAgICB9XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGdldCBudW1iZXIgcHJvZmlsZScsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2ZpbGVQaWNGcm9tU2VydmVyKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIkNvbnRhY3RcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInBob25lXCJdID0ge1xuICAgICAgc2NoZW1hOiAnNTUyMTk5OTk5OTk5OSdcbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSA9IHRydWUgfSA9IHJlcS5wYXJhbXM7XG4gIGNvbnN0IHsgaXNHcm91cCA9IGZhbHNlIH0gPSByZXEucXVlcnk7XG4gIHRyeSB7XG4gICAgbGV0IHJlc3BvbnNlO1xuICAgIGZvciAoY29uc3QgY29udGF0byBvZiBjb250YWN0VG9BcnJheShwaG9uZSBhcyBzdHJpbmcsIGlzR3JvdXAgYXMgYm9vbGVhbikpIHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5nZXRQcm9maWxlUGljRnJvbVNlcnZlcihjb250YXRvKTtcbiAgICB9XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uICBnZXQgcHJvZmlsZSBwaWMnLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0dXMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiQ29udGFjdFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wicGhvbmVcIl0gPSB7XG4gICAgICBzY2hlbWE6ICc1NTIxOTk5OTk5OTk5J1xuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lID0gdHJ1ZSB9ID0gcmVxLnBhcmFtcztcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIGNvbnRhY3RUb0FycmF5KHBob25lIGFzIHN0cmluZywgZmFsc2UpKSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0U3RhdHVzKGNvbnRhdG8pO1xuICAgIH1cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKDUwMClcbiAgICAgIC5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCBtZXNzYWdlOiAnRXJyb3Igb24gIGdldCBzdGF0dXMnLCBlcnJvcjogZXJyb3IgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldFByb2ZpbGVTdGF0dXMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiUHJvZmlsZVwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wib2JqXCJdID0ge1xuICAgICAgaW46ICdib2R5JyxcbiAgICAgIHNjaGVtYToge1xuICAgICAgICAkc3RhdHVzOiAnTXkgbmV3IHN0YXR1cycsXG4gICAgICB9XG4gICAgIH1cbiAgICAgXG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHN0YXR1czogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwiTXkgbmV3IHN0YXR1c1wiLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHN0YXR1cyB9ID0gcmVxLmJvZHk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LnNldFByb2ZpbGVTdGF0dXMoc3RhdHVzKTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXNwb25zZSB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZSk7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKDUwMClcbiAgICAgIC5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCBtZXNzYWdlOiAnRXJyb3Igb24gc2V0IHByb2ZpbGUgc3RhdHVzJyB9KTtcbiAgfVxufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlamVjdENhbGwocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiTWlzY1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICBcbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgY2FsbElkOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIGNhbGxJZDogXCI8Y2FsbGlkPlwiLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICB9XG4gICAqL1xuICBjb25zdCB7IGNhbGxJZCB9ID0gcmVxLmJvZHk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LnJlamVjdENhbGwoY2FsbElkKTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXNwb25zZSB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZSk7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKDUwMClcbiAgICAgIC5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCBtZXNzYWdlOiAnRXJyb3Igb24gcmVqZWN0Q2FsbCcsIGVycm9yOiBlIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFyTWVzc2FnZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBtZXNzYWdlSWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBzdGFyOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlSWQ6IFwiNTUyMTk5OTk5OTk5OVwiLFxuICAgICAgICAgICAgICAgIHN0YXI6IHRydWUsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgbWVzc2FnZUlkLCBzdGFyID0gdHJ1ZSB9ID0gcmVxLmJvZHk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LnN0YXJNZXNzYWdlKG1lc3NhZ2VJZCwgc3Rhcik7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uICBzdGFydCBtZXNzYWdlJyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmVhY3Rpb25zKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIk1lc3NhZ2VzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJtZXNzYWdlSWRcIl0gPSB7XG4gICAgICBzY2hlbWE6ICc8bWVzc2FnZUlkPidcbiAgICAgfVxuICAgKi9cbiAgY29uc3QgbWVzc2FnZUlkID0gcmVxLnBhcmFtcy5pZDtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0UmVhY3Rpb25zKG1lc3NhZ2VJZCk7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGdldCByZWFjdGlvbnMnLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRWb3RlcyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wibWVzc2FnZUlkXCJdID0ge1xuICAgICAgc2NoZW1hOiAnPG1lc3NhZ2VJZD4nXG4gICAgIH1cbiAgICovXG4gIGNvbnN0IG1lc3NhZ2VJZCA9IHJlcS5wYXJhbXMuaWQ7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LmdldFZvdGVzKG1lc3NhZ2VJZCk7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKDUwMClcbiAgICAgIC5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCBtZXNzYWdlOiAnRXJyb3Igb24gZ2V0IHZvdGVzJywgZXJyb3I6IGVycm9yIH0pO1xuICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hhdFdvb3QocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKTogUHJvbWlzZTxhbnk+IHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJNaXNjXCJdXG4gICAgICNzd2FnZ2VyLmRlc2NyaXB0aW9uID0gJ1lvdSBjYW4gcG9pbnQgeW91ciBDaGF0d29vdCB0byB0aGlzIHJvdXRlIHNvIHRoYXQgaXQgY2FuIHBlcmZvcm0gZnVuY3Rpb25zLidcbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgZXZlbnQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBwcml2YXRlOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VJZDogXCJjb252ZXJzYXRpb25fc3RhdHVzX2NoYW5nZWRcIixcbiAgICAgICAgICAgICAgICBwcml2YXRlOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgc2Vzc2lvbiB9ID0gcmVxLnBhcmFtcztcbiAgY29uc3QgY2xpZW50OiBhbnkgPSBjbGllbnRzQXJyYXlbc2Vzc2lvbl07XG4gIGlmIChjbGllbnQgPT0gbnVsbCB8fCBjbGllbnQuc3RhdHVzICE9PSAnQ09OTkVDVEVEJykgcmV0dXJuO1xuICB0cnkge1xuICAgIGlmIChhd2FpdCBjbGllbnQuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgY29uc3QgZXZlbnQgPSByZXEuYm9keS5ldmVudDtcblxuICAgICAgaWYgKFxuICAgICAgICBldmVudCA9PSAnY29udmVyc2F0aW9uX3N0YXR1c19jaGFuZ2VkJyB8fFxuICAgICAgICBldmVudCA9PSAnY29udmVyc2F0aW9uX3Jlc29sdmVkJyB8fFxuICAgICAgICByZXEuYm9keS5wcml2YXRlXG4gICAgICApIHtcbiAgICAgICAgcmVzXG4gICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgbWVzc2FnZTogJ1N1Y2Nlc3Mgb24gcmVjZWl2ZSBjaGF0d29vdCcgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWVzc2FnZV90eXBlLFxuICAgICAgICBwaG9uZSA9IHJlcS5ib2R5LmNvbnZlcnNhdGlvbi5tZXRhLnNlbmRlci5waG9uZV9udW1iZXIucmVwbGFjZSgnKycsICcnKSxcbiAgICAgICAgbWVzc2FnZSA9IHJlcS5ib2R5LmNvbnZlcnNhdGlvbi5tZXNzYWdlc1swXSxcbiAgICAgIH0gPSByZXEuYm9keTtcblxuICAgICAgaWYgKGV2ZW50ICE9ICdtZXNzYWdlX2NyZWF0ZWQnICYmIG1lc3NhZ2VfdHlwZSAhPSAnb3V0Z29pbmcnKVxuICAgICAgICByZXMuc3RhdHVzKDIwMCk7XG4gICAgICBmb3IgKGNvbnN0IGNvbnRhdG8gb2YgY29udGFjdFRvQXJyYXkocGhvbmUsIGZhbHNlKSkge1xuICAgICAgICBpZiAobWVzc2FnZV90eXBlID09ICdvdXRnb2luZycpIHtcbiAgICAgICAgICBpZiAobWVzc2FnZS5hdHRhY2htZW50cykge1xuICAgICAgICAgICAgY29uc3QgYmFzZV91cmwgPSBgJHtcbiAgICAgICAgICAgICAgY2xpZW50LmNvbmZpZy5jaGF0V29vdC5iYXNlVVJMXG4gICAgICAgICAgICB9LyR7bWVzc2FnZS5hdHRhY2htZW50c1swXS5kYXRhX3VybC5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgIG1lc3NhZ2UuYXR0YWNobWVudHNbMF0uZGF0YV91cmwuaW5kZXhPZignL3JhaWxzLycpICsgMVxuICAgICAgICAgICAgKX1gO1xuICAgICAgICAgICAgYXdhaXQgY2xpZW50LnNlbmRGaWxlKFxuICAgICAgICAgICAgICBgJHtjb250YXRvfWAsXG4gICAgICAgICAgICAgIGJhc2VfdXJsLFxuICAgICAgICAgICAgICAnZmlsZScsXG4gICAgICAgICAgICAgIG1lc3NhZ2UuY29udGVudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgY2xpZW50LnNlbmRUZXh0KGNvbnRhdG8sIG1lc3NhZ2UuY29udGVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIG1lc3NhZ2U6ICdTdWNjZXNzIG9uICByZWNlaXZlIGNoYXR3b290JyB9KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gIHJlY2VpdmUgY2hhdHdvb3QnLFxuICAgICAgZXJyb3I6IGUsXG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQbGF0Zm9ybUZyb21NZXNzYWdlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIk1pc2NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcIm1lc3NhZ2VJZFwiXSA9IHtcbiAgICAgIHNjaGVtYTogJzxtZXNzYWdlSWQ+J1xuICAgICB9XG4gICAqL1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQuZ2V0UGxhdGZvcm1Gcm9tTWVzc2FnZShcbiAgICAgIHJlcS5wYXJhbXMubWVzc2FnZUlkXG4gICAgKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gZ2V0IGdldCBwbGF0Zm9ybSBmcm9tIG1lc3NhZ2UnLFxuICAgICAgZXJyb3I6IGUsXG4gICAgfSk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxJQUFBQSxVQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxZQUFBLEdBQUFELE9BQUE7QUFuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQU9BLFNBQVNFLFlB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