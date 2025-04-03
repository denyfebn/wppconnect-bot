"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editMessage = editMessage;
exports.replyMentionedMessage = replyMentionedMessage;
exports.replyMessage = replyMessage;
exports.sendButtons = sendButtons;
exports.sendFile = sendFile;
exports.sendImageAsSticker = sendImageAsSticker;
exports.sendImageAsStickerGif = sendImageAsStickerGif;
exports.sendLinkPreview = sendLinkPreview;
exports.sendListMessage = sendListMessage;
exports.sendLocation = sendLocation;
exports.sendMentioned = sendMentioned;
exports.sendMessage = sendMessage;
exports.sendOrderMessage = sendOrderMessage;
exports.sendPollMessage = sendPollMessage;
exports.sendStatusText = sendStatusText;
exports.sendVoice = sendVoice;
exports.sendVoice64 = sendVoice64;
var _functions = require("../util/functions");
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

function returnError(req, res, error) {
  req.logger.error(error);
  res.status(500).json({
    status: 'Error',
    message: 'Erro ao enviar a mensagem.',
    error: error
  });
}
async function returnSucess(res, data) {
  res.status(201).json({
    status: 'success',
    response: data,
    mapper: 'return'
  });
}
async function sendMessage(req, res) {
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
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              isNewsletter: { type: "boolean" },
              isLid: { type: "boolean" },
              message: { type: "string" },
              options: { type: "object" },
            }
          },
          examples: {
            "Send message to contact": {
              value: { 
                phone: '5521999999999',
                isGroup: false,
                isNewsletter: false,
                isLid: false,
                message: 'Hi from WPPConnect',
              }
            },
            "Send message with reply": {
              value: { 
                phone: '5521999999999',
                isGroup: false,
                isNewsletter: false,
                isLid: false,
                message: 'Hi from WPPConnect with reply',
                options: {
                  quotedMsg: 'true_...@c.us_3EB01DE65ACC6_out',
                }
              }
            },
            "Send message to group": {
              value: {
                phone: '8865623215244578',
                isGroup: true,
                message: 'Hi from WPPConnect',
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    message
  } = req.body;
  const options = req.body.options || {};
  try {
    const results = [];
    for (const contato of phone) {
      results.push(await req.client.sendText(contato, message, options));
    }
    if (results.length === 0) res.status(400).json('Error sending message');
    req.io.emit('mensagem-enviada', results);
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function editMessage(req, res) {
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
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string" },
              newText: { type: "string" },
              options: { type: "object" },
            }
          },
          examples: {
            "Edit a message": {
              value: { 
                id: 'true_5521999999999@c.us_3EB04FCAA1527EB6D9DEC8',
                newText: 'New text for message'
              }
            },
          }
        }
      }
     }
   */
  const {
    id,
    newText
  } = req.body;
  const options = req.body.options || {};
  try {
    const edited = await req.client.editMessage(id, newText, options);
    req.io.emit('edited-message', edited);
    returnSucess(res, edited);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendFile(req, res) {
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
      required: true,
      "@content": {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    "phone": { type: "string" },
                    "isGroup": { type: "boolean" },
                    "isNewsletter": { type: "boolean" },
                    "isLid": { type: "boolean" },
                    "filename": { type: "string" },
                    "caption": { type: "string" },
                    "base64": { type: "string" }
                }
            },
            examples: {
                "Default": {
                    value: {
                        "phone": "5521999999999",
                        "isGroup": false,
                        "isNewsletter": false,
                        "isLid": false,
                        "filename": "file name lol",
                        "caption": "caption for my file",
                        "base64": "<base64> string"
                    }
                }
            }
        }
      }
    }
   */
  const {
    phone,
    path,
    base64,
    filename = 'file',
    message,
    caption,
    quotedMessageId
  } = req.body;
  const options = req.body.options || {};
  if (!path && !req.file && !base64) res.status(401).send({
    message: 'Sending the file is mandatory'
  });
  const pathFile = path || base64 || req.file?.path;
  const msg = message || caption;
  try {
    const results = [];
    for (const contact of phone) {
      results.push(await req.client.sendFile(contact, pathFile, {
        filename: filename,
        caption: msg,
        quotedMsg: quotedMessageId,
        ...options
      }));
    }
    if (results.length === 0) res.status(400).json('Error sending message');
    if (req.file) await (0, _functions.unlinkAsync)(pathFile);
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendVoice(req, res) {
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
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        "phone": { type: "string" },
                        "isGroup": { type: "boolean" },
                        "path": { type: "string" },
                        "quotedMessageId": { type: "string" }
                    }
                },
                examples: {
                    "Default": {
                        value: {
                            "phone": "5521999999999",
                            "isGroup": false,
                            "path": "<path_file>",
                            "quotedMessageId": "message Id"
                        }
                    }
                }
            }
        }
    }
   */
  const {
    phone,
    path,
    filename = 'Voice Audio',
    message,
    quotedMessageId
  } = req.body;
  try {
    const results = [];
    for (const contato of phone) {
      results.push(await req.client.sendPtt(contato, path, filename, message, quotedMessageId));
    }
    if (results.length === 0) res.status(400).json('Error sending message');
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendVoice64(req, res) {
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
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        "phone": { type: "string" },
                        "isGroup": { type: "boolean" },
                        "base64Ptt": { type: "string" }
                    }
                },
                examples: {
                    "Default": {
                        value: {
                            "phone": "5521999999999",
                            "isGroup": false,
                            "base64Ptt": "<base64_string>"
                        }
                    }
                }
            }
        }
    }
   */
  const {
    phone,
    base64Ptt,
    quotedMessageId
  } = req.body;
  try {
    const results = [];
    for (const contato of phone) {
      results.push(await req.client.sendPttFromBase64(contato, base64Ptt, 'Voice Audio', '', quotedMessageId));
    }
    if (results.length === 0) res.status(400).json('Error sending message');
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendLinkPreview(req, res) {
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
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        "phone": { type: "string" },
                        "isGroup": { type: "boolean" },
                        "url": { type: "string" },
                        "caption": { type: "string" }
                    }
                },
                examples: {
                    "Default": {
                        value: {
                            "phone": "5521999999999",
                            "isGroup": false,
                            "url": "http://www.link.com",
                            "caption": "Text for describe link"
                        }
                    }
                }
            }
        }
    }
   */
  const {
    phone,
    url,
    caption
  } = req.body;
  try {
    const results = [];
    for (const contato of phone) {
      results.push(await req.client.sendLinkPreview(`${contato}`, url, caption));
    }
    if (results.length === 0) res.status(400).json('Error sending message');
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendLocation(req, res) {
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
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        "phone": { type: "string" },
                        "isGroup": { type: "boolean" },
                        "lat": { type: "string" },
                        "lng": { type: "string" },
                        "title": { type: "string" },
                        "address": { type: "string" }
                    }
                },
                examples: {
                    "Default": {
                        value: {
                            "phone": "5521999999999",
                            "isGroup": false,
                            "lat": "-89898322",
                            "lng": "-545454",
                            "title": "Rio de Janeiro",
                            "address": "Av. N. S. de Copacabana, 25, Copacabana"
                        }
                    }
                }
            }
        }
    }
   */
  const {
    phone,
    lat,
    lng,
    title,
    address
  } = req.body;
  try {
    const results = [];
    for (const contato of phone) {
      results.push(await req.client.sendLocation(contato, {
        lat: lat,
        lng: lng,
        address: address,
        name: title
      }));
    }
    if (results.length === 0) res.status(400).json('Error sending message');
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendButtons(req, res) {
  /**
   * #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA',
     }
     #swagger.deprecated=true
   */
  const {
    phone,
    message,
    options
  } = req.body;
  try {
    const results = [];
    for (const contact of phone) {
      results.push(await req.client.sendText(contact, message, options));
    }
    if (results.length === 0) return returnError(req, res, 'Error sending message with buttons');
    returnSucess(res, phone);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendListMessage(req, res) {
  /**
   * #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA',
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
              description: { type: "string" },
              sections: { type: "array" },
              buttonText: { type: "string" },
            }
          },
          examples: {
            "Send list message": {
              value: { 
                phone: '5521999999999',
                isGroup: false,
                description: 'Desc for list',
                buttonText: 'Select a option',
                sections: [
                  {
                    title: 'Section 1',
                    rows: [
                      {
                        rowId: 'my_custom_id',
                        title: 'Test 1',
                        description: 'Description 1',
                      },
                      {
                        rowId: '2',
                        title: 'Test 2',
                        description: 'Description 2',
                      },
                    ],
                  },
                ],
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    description = '',
    sections,
    buttonText = 'SELECIONE UMA OPÇÃO'
  } = req.body;
  try {
    const results = [];
    for (const contact of phone) {
      results.push(await req.client.sendListMessage(contact, {
        buttonText: buttonText,
        description: description,
        sections: sections
      }));
    }
    if (results.length === 0) return returnError(req, res, 'Error sending list buttons');
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendOrderMessage(req, res) {
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
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              phone: { type: "string" },
              isGroup: { type: "boolean" },
              items: { type: "object" },
              options: { type: "object" },
            }
          },
          examples: {
            "Send with custom items": {
              value: { 
                phone: '5521999999999',
                isGroup: false,
                items: [
                  {
                    type: 'custom',
                    name: 'Item test',
                    price: 120000,
                    qnt: 2,
                  },
                  {
                    type: 'custom',
                    name: 'Item test 2',
                    price: 145000,
                    qnt: 2,
                  },
                ],
              }
            },
            "Send with product items": {
              value: { 
                phone: '5521999999999',
                isGroup: false,
                items: [
                  {
                    type: 'product',
                    id: '37878774457',
                    price: 148000,
                    qnt: 2,
                  },
                ],
              }
            },
            "Send with custom items and options": {
              value: { 
                phone: '5521999999999',
                isGroup: false,
                items: [
                  {
                    type: 'custom',
                    name: 'Item test',
                    price: 120000,
                    qnt: 2,
                  },
                ],
                options: {
                  tax: 10000,
                  shipping: 4000,
                  discount: 10000,
                }
              }
            },
          }
        }
      }
     }
   */
  const {
    phone,
    items
  } = req.body;
  const options = req.body.options || {};
  try {
    const results = [];
    for (const contato of phone) {
      results.push(await req.client.sendOrderMessage(contato, items, options));
    }
    if (results.length === 0) res.status(400).json('Error sending order message');
    req.io.emit('mensagem-enviada', results);
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendPollMessage(req, res) {
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
        required: true,
        "@content": {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        phone: { type: "string" },
                        isGroup: { type: "boolean" },
                        name: { type: "string" },
                        choices: { type: "array" },
                        options: { type: "object" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                          phone: '5521999999999',
                          isGroup: false,
                          name: 'Poll name',
                          choices: ['Option 1', 'Option 2', 'Option 3'],
                          options: {
                            selectableCount: 1,
                          }
                        }
                    },
                }
            }
        }
    }
   */
  const {
    phone,
    name,
    choices,
    options
  } = req.body;
  try {
    const results = [];
    for (const contact of phone) {
      results.push(await req.client.sendPollMessage(contact, name, choices, options));
    }
    if (results.length === 0) return returnError(req, res, 'Error sending poll message');
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendStatusText(req, res) {
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
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              phone: { type: 'string' },
              isGroup: { type: 'boolean' },
              message: { type: 'string' },
              messageId: { type: 'string' }
            },
            required: ['phone', 'isGroup', 'message']
          },
          examples: {
            Default: {
              value: {
                phone: '5521999999999',
                isGroup: false,
                message: 'Reply to message',
                messageId: '<id_message>'
              }
            }
          }
        }
      }
    }
   */
  const {
    message
  } = req.body;
  try {
    const results = [];
    results.push(await req.client.sendText('status@broadcast', message));
    if (results.length === 0) res.status(400).json('Error sending message');
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function replyMentionedMessage(req, res) {
  const {
    phone,
    message,
    messageId
  } = req.body;
  try {
    const results = [];
    for (const contato of [].concat(phone)) {
      const reply = await req.client.reply(contato, message, messageId);
      results.push(reply);
    }
    if (results.length === 0) {
      return res.status(400).json('Error sending reply with mention');
    }
    req.io.emit('mensagem-enviada', {
      message,
      to: phone
    });
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function replyMessage(req, res) {
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
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              "phone": { type: "string" },
              "isGroup": { type: "boolean" },
              "message": { type: "string" },
              "messageId": { type: "string" }
            }
          },
          examples: {
            "Default": {
              value: {
                "phone": "5521999999999",
                "isGroup": false,
                "message": "Reply to message",
                "messageId": "<id_message>"
              }
            }
          }
        }
      }
    }
   */
  const {
    phone,
    message,
    messageId
  } = req.body;
  try {
    const results = [];
    for (const contato of phone) {
      results.push(await req.client.reply(contato, message, messageId));
    }
    if (results.length === 0) res.status(400).json('Error sending message');
    req.io.emit('mensagem-enviada', {
      message: message,
      to: phone
    });
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendMentioned(req, res) {
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
  required: true,
  "@content": {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          "phone": { type: "string" },
          "isGroup": { type: "boolean" },
          "message": { type: "string" },
          "mentioned": { type: "array", items: { type: "string" } }
        },
        required: ["phone", "message", "mentioned"]
      },
      examples: {
        "Default": {
          value: {
            "phone": "groupId@g.us",
            "isGroup": true,
            "message": "Your text message",
            "mentioned": ["556593077171@c.us"]
          }
        }
      }
    }
  }
  }
   */
  const {
    phone,
    message,
    mentioned
  } = req.body;
  try {
    let response;
    for (const contato of phone) {
      response = await req.client.sendMentioned(`${contato}`, message, mentioned);
    }
    res.status(201).json({
      status: 'success',
      response: response
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on send message mentioned',
      error: error
    });
  }
}
async function sendImageAsSticker(req, res) {
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
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              "phone": { type: "string" },
              "isGroup": { type: "boolean" },
              "path": { type: "string" }
            },
            required: ["phone", "path"]
          },
          examples: {
            "Default": {
              value: {
                "phone": "5521999999999",
                "isGroup": true,
                "path": "<path_file>"
              }
            }
          }
        }
      }
    }
   */
  const {
    phone,
    path
  } = req.body;
  if (!path && !req.file) res.status(401).send({
    message: 'Sending the file is mandatory'
  });
  const pathFile = path || req.file?.path;
  try {
    const results = [];
    for (const contato of phone) {
      results.push(await req.client.sendImageAsSticker(contato, pathFile));
    }
    if (results.length === 0) res.status(400).json('Error sending message');
    if (req.file) await (0, _functions.unlinkAsync)(pathFile);
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendImageAsStickerGif(req, res) {
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
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              phone: { type: 'string' },
              isGroup: { type: 'boolean' },
              path: { type: 'string' },
            },
            required: ['phone', 'path'],
          },
          examples: {
            'Default': {
              value: {
                phone: '5521999999999',
                isGroup: true,
                path: '<path_file>',
              },
            },
          },
        },
      },
    }
   */
  const {
    phone,
    path
  } = req.body;
  if (!path && !req.file) res.status(401).send({
    message: 'Sending the file is mandatory'
  });
  const pathFile = path || req.file?.path;
  try {
    const results = [];
    for (const contato of phone) {
      results.push(await req.client.sendImageAsStickerGif(contato, pathFile));
    }
    if (results.length === 0) res.status(400).json('Error sending message');
    if (req.file) await (0, _functions.unlinkAsync)(pathFile);
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZnVuY3Rpb25zIiwicmVxdWlyZSIsInJldHVybkVycm9yIiwicmVxIiwicmVzIiwiZXJyb3IiLCJsb2dnZXIiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsInJldHVyblN1Y2VzcyIsImRhdGEiLCJyZXNwb25zZSIsIm1hcHBlciIsInNlbmRNZXNzYWdlIiwicGhvbmUiLCJib2R5Iiwib3B0aW9ucyIsInJlc3VsdHMiLCJjb250YXRvIiwicHVzaCIsImNsaWVudCIsInNlbmRUZXh0IiwibGVuZ3RoIiwiaW8iLCJlbWl0IiwiZWRpdE1lc3NhZ2UiLCJpZCIsIm5ld1RleHQiLCJlZGl0ZWQiLCJzZW5kRmlsZSIsInBhdGgiLCJiYXNlNjQiLCJmaWxlbmFtZSIsImNhcHRpb24iLCJxdW90ZWRNZXNzYWdlSWQiLCJmaWxlIiwic2VuZCIsInBhdGhGaWxlIiwibXNnIiwiY29udGFjdCIsInF1b3RlZE1zZyIsInVubGlua0FzeW5jIiwic2VuZFZvaWNlIiwic2VuZFB0dCIsInNlbmRWb2ljZTY0IiwiYmFzZTY0UHR0Iiwic2VuZFB0dEZyb21CYXNlNjQiLCJzZW5kTGlua1ByZXZpZXciLCJ1cmwiLCJzZW5kTG9jYXRpb24iLCJsYXQiLCJsbmciLCJ0aXRsZSIsImFkZHJlc3MiLCJuYW1lIiwic2VuZEJ1dHRvbnMiLCJzZW5kTGlzdE1lc3NhZ2UiLCJkZXNjcmlwdGlvbiIsInNlY3Rpb25zIiwiYnV0dG9uVGV4dCIsInNlbmRPcmRlck1lc3NhZ2UiLCJpdGVtcyIsInNlbmRQb2xsTWVzc2FnZSIsImNob2ljZXMiLCJzZW5kU3RhdHVzVGV4dCIsInJlcGx5TWVudGlvbmVkTWVzc2FnZSIsIm1lc3NhZ2VJZCIsImNvbmNhdCIsInJlcGx5IiwidG8iLCJyZXBseU1lc3NhZ2UiLCJzZW5kTWVudGlvbmVkIiwibWVudGlvbmVkIiwic2VuZEltYWdlQXNTdGlja2VyIiwic2VuZEltYWdlQXNTdGlja2VyR2lmIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvbWVzc2FnZUNvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIxIFdQUENvbm5lY3QgVGVhbVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgeyB1bmxpbmtBc3luYyB9IGZyb20gJy4uL3V0aWwvZnVuY3Rpb25zJztcblxuZnVuY3Rpb24gcmV0dXJuRXJyb3IocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBlcnJvcjogYW55KSB7XG4gIHJlcS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgc3RhdHVzOiAnRXJyb3InLFxuICAgIG1lc3NhZ2U6ICdFcnJvIGFvIGVudmlhciBhIG1lbnNhZ2VtLicsXG4gICAgZXJyb3I6IGVycm9yLFxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmV0dXJuU3VjZXNzKHJlczogYW55LCBkYXRhOiBhbnkpIHtcbiAgcmVzLnN0YXR1cygyMDEpLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IGRhdGEsIG1hcHBlcjogJ3JldHVybicgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kTWVzc2FnZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHBob25lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgaXNHcm91cDogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgICBpc05ld3NsZXR0ZXI6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgICAgaXNMaWQ6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHsgdHlwZTogXCJvYmplY3RcIiB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgIFwiU2VuZCBtZXNzYWdlIHRvIGNvbnRhY3RcIjoge1xuICAgICAgICAgICAgICB2YWx1ZTogeyBcbiAgICAgICAgICAgICAgICBwaG9uZTogJzU1MjE5OTk5OTk5OTknLFxuICAgICAgICAgICAgICAgIGlzR3JvdXA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGlzTmV3c2xldHRlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgaXNMaWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdIaSBmcm9tIFdQUENvbm5lY3QnLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJTZW5kIG1lc3NhZ2Ugd2l0aCByZXBseVwiOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB7IFxuICAgICAgICAgICAgICAgIHBob25lOiAnNTUyMTk5OTk5OTk5OScsXG4gICAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaXNOZXdzbGV0dGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpc0xpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ0hpIGZyb20gV1BQQ29ubmVjdCB3aXRoIHJlcGx5JyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICBxdW90ZWRNc2c6ICd0cnVlXy4uLkBjLnVzXzNFQjAxREU2NUFDQzZfb3V0JyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIlNlbmQgbWVzc2FnZSB0byBncm91cFwiOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgcGhvbmU6ICc4ODY1NjIzMjE1MjQ0NTc4JyxcbiAgICAgICAgICAgICAgICBpc0dyb3VwOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdIaSBmcm9tIFdQUENvbm5lY3QnLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lLCBtZXNzYWdlIH0gPSByZXEuYm9keTtcblxuICBjb25zdCBvcHRpb25zID0gcmVxLmJvZHkub3B0aW9ucyB8fCB7fTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IFtdO1xuICAgIGZvciAoY29uc3QgY29udGF0byBvZiBwaG9uZSkge1xuICAgICAgcmVzdWx0cy5wdXNoKGF3YWl0IHJlcS5jbGllbnQuc2VuZFRleHQoY29udGF0bywgbWVzc2FnZSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkgcmVzLnN0YXR1cyg0MDApLmpzb24oJ0Vycm9yIHNlbmRpbmcgbWVzc2FnZScpO1xuICAgIHJlcS5pby5lbWl0KCdtZW5zYWdlbS1lbnZpYWRhJywgcmVzdWx0cyk7XG4gICAgcmV0dXJuU3VjZXNzKHJlcywgcmVzdWx0cyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZWRpdE1lc3NhZ2UocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiTWVzc2FnZXNcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBpZDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIG5ld1RleHQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBvcHRpb25zOiB7IHR5cGU6IFwib2JqZWN0XCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBcIkVkaXQgYSBtZXNzYWdlXCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHsgXG4gICAgICAgICAgICAgICAgaWQ6ICd0cnVlXzU1MjE5OTk5OTk5OTlAYy51c18zRUIwNEZDQUExNTI3RUI2RDlERUM4JyxcbiAgICAgICAgICAgICAgICBuZXdUZXh0OiAnTmV3IHRleHQgZm9yIG1lc3NhZ2UnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgaWQsIG5ld1RleHQgfSA9IHJlcS5ib2R5O1xuXG4gIGNvbnN0IG9wdGlvbnMgPSByZXEuYm9keS5vcHRpb25zIHx8IHt9O1xuICB0cnkge1xuICAgIGNvbnN0IGVkaXRlZCA9IGF3YWl0IChyZXEuY2xpZW50IGFzIGFueSkuZWRpdE1lc3NhZ2UoaWQsIG5ld1RleHQsIG9wdGlvbnMpO1xuXG4gICAgcmVxLmlvLmVtaXQoJ2VkaXRlZC1tZXNzYWdlJywgZWRpdGVkKTtcbiAgICByZXR1cm5TdWNlc3MocmVzLCBlZGl0ZWQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRGaWxlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIk1lc3NhZ2VzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICBcInBob25lXCI6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICBcImlzR3JvdXBcIjogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICBcImlzTmV3c2xldHRlclwiOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiaXNMaWRcIjogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICBcImZpbGVuYW1lXCI6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICBcImNhcHRpb25cIjogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiYmFzZTY0XCI6IHsgdHlwZTogXCJzdHJpbmdcIiB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGhvbmVcIjogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlzR3JvdXBcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlzTmV3c2xldHRlclwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaXNMaWRcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZpbGVuYW1lXCI6IFwiZmlsZSBuYW1lIGxvbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXB0aW9uXCI6IFwiY2FwdGlvbiBmb3IgbXkgZmlsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiYXNlNjRcIjogXCI8YmFzZTY0PiBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgKi9cbiAgY29uc3Qge1xuICAgIHBob25lLFxuICAgIHBhdGgsXG4gICAgYmFzZTY0LFxuICAgIGZpbGVuYW1lID0gJ2ZpbGUnLFxuICAgIG1lc3NhZ2UsXG4gICAgY2FwdGlvbixcbiAgICBxdW90ZWRNZXNzYWdlSWQsXG4gIH0gPSByZXEuYm9keTtcblxuICBjb25zdCBvcHRpb25zID0gcmVxLmJvZHkub3B0aW9ucyB8fCB7fTtcblxuICBpZiAoIXBhdGggJiYgIXJlcS5maWxlICYmICFiYXNlNjQpXG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoe1xuICAgICAgbWVzc2FnZTogJ1NlbmRpbmcgdGhlIGZpbGUgaXMgbWFuZGF0b3J5JyxcbiAgICB9KTtcblxuICBjb25zdCBwYXRoRmlsZSA9IHBhdGggfHwgYmFzZTY0IHx8IHJlcS5maWxlPy5wYXRoO1xuICBjb25zdCBtc2cgPSBtZXNzYWdlIHx8IGNhcHRpb247XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHRzOiBhbnkgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhY3Qgb2YgcGhvbmUpIHtcbiAgICAgIHJlc3VsdHMucHVzaChcbiAgICAgICAgYXdhaXQgcmVxLmNsaWVudC5zZW5kRmlsZShjb250YWN0LCBwYXRoRmlsZSwge1xuICAgICAgICAgIGZpbGVuYW1lOiBmaWxlbmFtZSxcbiAgICAgICAgICBjYXB0aW9uOiBtc2csXG4gICAgICAgICAgcXVvdGVkTXNnOiBxdW90ZWRNZXNzYWdlSWQsXG4gICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKSByZXMuc3RhdHVzKDQwMCkuanNvbignRXJyb3Igc2VuZGluZyBtZXNzYWdlJyk7XG4gICAgaWYgKHJlcS5maWxlKSBhd2FpdCB1bmxpbmtBc3luYyhwYXRoRmlsZSk7XG4gICAgcmV0dXJuU3VjZXNzKHJlcywgcmVzdWx0cyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFZvaWNlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIk1lc3NhZ2VzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInBob25lXCI6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpc0dyb3VwXCI6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGF0aFwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicXVvdGVkTWVzc2FnZUlkXCI6IHsgdHlwZTogXCJzdHJpbmdcIiB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiRGVmYXVsdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGhvbmVcIjogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpc0dyb3VwXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcIjxwYXRoX2ZpbGU+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJxdW90ZWRNZXNzYWdlSWRcIjogXCJtZXNzYWdlIElkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICovXG4gIGNvbnN0IHtcbiAgICBwaG9uZSxcbiAgICBwYXRoLFxuICAgIGZpbGVuYW1lID0gJ1ZvaWNlIEF1ZGlvJyxcbiAgICBtZXNzYWdlLFxuICAgIHF1b3RlZE1lc3NhZ2VJZCxcbiAgfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0czogYW55ID0gW107XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIHBob25lKSB7XG4gICAgICByZXN1bHRzLnB1c2goXG4gICAgICAgIGF3YWl0IHJlcS5jbGllbnQuc2VuZFB0dChcbiAgICAgICAgICBjb250YXRvLFxuICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgZmlsZW5hbWUsXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBxdW90ZWRNZXNzYWdlSWRcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPT09IDApIHJlcy5zdGF0dXMoNDAwKS5qc29uKCdFcnJvciBzZW5kaW5nIG1lc3NhZ2UnKTtcbiAgICByZXR1cm5TdWNlc3MocmVzLCByZXN1bHRzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm5FcnJvcihyZXEsIHJlcywgZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kVm9pY2U2NChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG9uZVwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaXNHcm91cFwiOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJhc2U2NFB0dFwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBob25lXCI6IFwiNTUyMTk5OTk5OTk5OVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXNHcm91cFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJhc2U2NFB0dFwiOiBcIjxiYXNlNjRfc3RyaW5nPlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lLCBiYXNlNjRQdHQsIHF1b3RlZE1lc3NhZ2VJZCB9ID0gcmVxLmJvZHk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHRzOiBhbnkgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhdG8gb2YgcGhvbmUpIHtcbiAgICAgIHJlc3VsdHMucHVzaChcbiAgICAgICAgYXdhaXQgcmVxLmNsaWVudC5zZW5kUHR0RnJvbUJhc2U2NChcbiAgICAgICAgICBjb250YXRvLFxuICAgICAgICAgIGJhc2U2NFB0dCxcbiAgICAgICAgICAnVm9pY2UgQXVkaW8nLFxuICAgICAgICAgICcnLFxuICAgICAgICAgIHF1b3RlZE1lc3NhZ2VJZFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkgcmVzLnN0YXR1cyg0MDApLmpzb24oJ0Vycm9yIHNlbmRpbmcgbWVzc2FnZScpO1xuICAgIHJldHVyblN1Y2VzcyhyZXMsIHJlc3VsdHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRMaW5rUHJldmlldyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG9uZVwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaXNHcm91cFwiOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVybFwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FwdGlvblwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBob25lXCI6IFwiNTUyMTk5OTk5OTk5OVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXNHcm91cFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVybFwiOiBcImh0dHA6Ly93d3cubGluay5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNhcHRpb25cIjogXCJUZXh0IGZvciBkZXNjcmliZSBsaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGhvbmUsIHVybCwgY2FwdGlvbiB9ID0gcmVxLmJvZHk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHRzOiBhbnkgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhdG8gb2YgcGhvbmUpIHtcbiAgICAgIHJlc3VsdHMucHVzaChcbiAgICAgICAgYXdhaXQgcmVxLmNsaWVudC5zZW5kTGlua1ByZXZpZXcoYCR7Y29udGF0b31gLCB1cmwsIGNhcHRpb24pXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkgcmVzLnN0YXR1cyg0MDApLmpzb24oJ0Vycm9yIHNlbmRpbmcgbWVzc2FnZScpO1xuICAgIHJldHVyblN1Y2VzcyhyZXMsIHJlc3VsdHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRMb2NhdGlvbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwaG9uZVwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaXNHcm91cFwiOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhdFwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibG5nXCI6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiB7IHR5cGU6IFwic3RyaW5nXCIgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBob25lXCI6IFwiNTUyMTk5OTk5OTk5OVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXNHcm91cFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhdFwiOiBcIi04OTg5ODMyMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG5nXCI6IFwiLTU0NTQ1NFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJSaW8gZGUgSmFuZWlyb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBcIkF2LiBOLiBTLiBkZSBDb3BhY2FiYW5hLCAyNSwgQ29wYWNhYmFuYVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lLCBsYXQsIGxuZywgdGl0bGUsIGFkZHJlc3MgfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0czogYW55ID0gW107XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIHBob25lKSB7XG4gICAgICByZXN1bHRzLnB1c2goXG4gICAgICAgIGF3YWl0IHJlcS5jbGllbnQuc2VuZExvY2F0aW9uKGNvbnRhdG8sIHtcbiAgICAgICAgICBsYXQ6IGxhdCxcbiAgICAgICAgICBsbmc6IGxuZyxcbiAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxuICAgICAgICAgIG5hbWU6IHRpdGxlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPT09IDApIHJlcy5zdGF0dXMoNDAwKS5qc29uKCdFcnJvciBzZW5kaW5nIG1lc3NhZ2UnKTtcbiAgICByZXR1cm5TdWNlc3MocmVzLCByZXN1bHRzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm5FcnJvcihyZXEsIHJlcywgZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kQnV0dG9ucyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQScsXG4gICAgIH1cbiAgICAgI3N3YWdnZXIuZGVwcmVjYXRlZD10cnVlXG4gICAqL1xuICBjb25zdCB7IHBob25lLCBtZXNzYWdlLCBvcHRpb25zIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBjb250YWN0IG9mIHBob25lKSB7XG4gICAgICByZXN1bHRzLnB1c2goYXdhaXQgcmVxLmNsaWVudC5zZW5kVGV4dChjb250YWN0LCBtZXNzYWdlLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHJldHVybkVycm9yKHJlcSwgcmVzLCAnRXJyb3Igc2VuZGluZyBtZXNzYWdlIHdpdGggYnV0dG9ucycpO1xuXG4gICAgcmV0dXJuU3VjZXNzKHJlcywgcGhvbmUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRMaXN0TWVzc2FnZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQScsXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgcGhvbmU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgc2VjdGlvbnM6IHsgdHlwZTogXCJhcnJheVwiIH0sXG4gICAgICAgICAgICAgIGJ1dHRvblRleHQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgIFwiU2VuZCBsaXN0IG1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgICB2YWx1ZTogeyBcbiAgICAgICAgICAgICAgICBwaG9uZTogJzU1MjE5OTk5OTk5OTknLFxuICAgICAgICAgICAgICAgIGlzR3JvdXA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRGVzYyBmb3IgbGlzdCcsXG4gICAgICAgICAgICAgICAgYnV0dG9uVGV4dDogJ1NlbGVjdCBhIG9wdGlvbicsXG4gICAgICAgICAgICAgICAgc2VjdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTZWN0aW9uIDEnLFxuICAgICAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93SWQ6ICdteV9jdXN0b21faWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdUZXN0IDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEZXNjcmlwdGlvbiAxJyxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd0lkOiAnMicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1Rlc3QgMicsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0Rlc2NyaXB0aW9uIDInLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHtcbiAgICBwaG9uZSxcbiAgICBkZXNjcmlwdGlvbiA9ICcnLFxuICAgIHNlY3Rpb25zLFxuICAgIGJ1dHRvblRleHQgPSAnU0VMRUNJT05FIFVNQSBPUMOHw4NPJyxcbiAgfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0czogYW55ID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGNvbnRhY3Qgb2YgcGhvbmUpIHtcbiAgICAgIHJlc3VsdHMucHVzaChcbiAgICAgICAgYXdhaXQgcmVxLmNsaWVudC5zZW5kTGlzdE1lc3NhZ2UoY29udGFjdCwge1xuICAgICAgICAgIGJ1dHRvblRleHQ6IGJ1dHRvblRleHQsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgICAgIHNlY3Rpb25zOiBzZWN0aW9ucyxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHJldHVybkVycm9yKHJlcSwgcmVzLCAnRXJyb3Igc2VuZGluZyBsaXN0IGJ1dHRvbnMnKTtcblxuICAgIHJldHVyblN1Y2VzcyhyZXMsIHJlc3VsdHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRPcmRlck1lc3NhZ2UocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiTWVzc2FnZXNcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBwaG9uZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIGlzR3JvdXA6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgICAgaXRlbXM6IHsgdHlwZTogXCJvYmplY3RcIiB9LFxuICAgICAgICAgICAgICBvcHRpb25zOiB7IHR5cGU6IFwib2JqZWN0XCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBcIlNlbmQgd2l0aCBjdXN0b20gaXRlbXNcIjoge1xuICAgICAgICAgICAgICB2YWx1ZTogeyBcbiAgICAgICAgICAgICAgICBwaG9uZTogJzU1MjE5OTk5OTk5OTknLFxuICAgICAgICAgICAgICAgIGlzR3JvdXA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjdXN0b20nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnSXRlbSB0ZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDEyMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgcW50OiAyLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2N1c3RvbScsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdJdGVtIHRlc3QgMicsXG4gICAgICAgICAgICAgICAgICAgIHByaWNlOiAxNDUwMDAsXG4gICAgICAgICAgICAgICAgICAgIHFudDogMixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiU2VuZCB3aXRoIHByb2R1Y3QgaXRlbXNcIjoge1xuICAgICAgICAgICAgICB2YWx1ZTogeyBcbiAgICAgICAgICAgICAgICBwaG9uZTogJzU1MjE5OTk5OTk5OTknLFxuICAgICAgICAgICAgICAgIGlzR3JvdXA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwcm9kdWN0JyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICczNzg3ODc3NDQ1NycsXG4gICAgICAgICAgICAgICAgICAgIHByaWNlOiAxNDgwMDAsXG4gICAgICAgICAgICAgICAgICAgIHFudDogMixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiU2VuZCB3aXRoIGN1c3RvbSBpdGVtcyBhbmQgb3B0aW9uc1wiOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB7IFxuICAgICAgICAgICAgICAgIHBob25lOiAnNTUyMTk5OTk5OTk5OScsXG4gICAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2N1c3RvbScsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdJdGVtIHRlc3QnLFxuICAgICAgICAgICAgICAgICAgICBwcmljZTogMTIwMDAwLFxuICAgICAgICAgICAgICAgICAgICBxbnQ6IDIsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgdGF4OiAxMDAwMCxcbiAgICAgICAgICAgICAgICAgIHNoaXBwaW5nOiA0MDAwLFxuICAgICAgICAgICAgICAgICAgZGlzY291bnQ6IDEwMDAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSwgaXRlbXMgfSA9IHJlcS5ib2R5O1xuXG4gIGNvbnN0IG9wdGlvbnMgPSByZXEuYm9keS5vcHRpb25zIHx8IHt9O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0czogYW55ID0gW107XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIHBob25lKSB7XG4gICAgICByZXN1bHRzLnB1c2goYXdhaXQgcmVxLmNsaWVudC5zZW5kT3JkZXJNZXNzYWdlKGNvbnRhdG8sIGl0ZW1zLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKVxuICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oJ0Vycm9yIHNlbmRpbmcgb3JkZXIgbWVzc2FnZScpO1xuICAgIHJlcS5pby5lbWl0KCdtZW5zYWdlbS1lbnZpYWRhJywgcmVzdWx0cyk7XG4gICAgcmV0dXJuU3VjZXNzKHJlcywgcmVzdWx0cyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFBvbGxNZXNzYWdlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIk1lc3NhZ2VzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzR3JvdXA6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hvaWNlczogeyB0eXBlOiBcImFycmF5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHsgdHlwZTogXCJvYmplY3RcIiB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmU6ICc1NTIxOTk5OTk5OTk5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdQb2xsIG5hbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaG9pY2VzOiBbJ09wdGlvbiAxJywgJ09wdGlvbiAyJywgJ09wdGlvbiAzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlQ291bnQ6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lLCBuYW1lLCBjaG9pY2VzLCBvcHRpb25zIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBjb250YWN0IG9mIHBob25lKSB7XG4gICAgICByZXN1bHRzLnB1c2goXG4gICAgICAgIGF3YWl0IHJlcS5jbGllbnQuc2VuZFBvbGxNZXNzYWdlKGNvbnRhY3QsIG5hbWUsIGNob2ljZXMsIG9wdGlvbnMpXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiByZXR1cm5FcnJvcihyZXEsIHJlcywgJ0Vycm9yIHNlbmRpbmcgcG9sbCBtZXNzYWdlJyk7XG5cbiAgICByZXR1cm5TdWNlc3MocmVzLCByZXN1bHRzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm5FcnJvcihyZXEsIHJlcywgZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kU3RhdHVzVGV4dChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgY29udGVudDoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBwaG9uZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgIG1lc3NhZ2VJZDogeyB0eXBlOiAnc3RyaW5nJyB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFsncGhvbmUnLCAnaXNHcm91cCcsICdtZXNzYWdlJ11cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBEZWZhdWx0OiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgcGhvbmU6ICc1NTIxOTk5OTk5OTk5JyxcbiAgICAgICAgICAgICAgICBpc0dyb3VwOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnUmVwbHkgdG8gbWVzc2FnZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZUlkOiAnPGlkX21lc3NhZ2U+J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgKi9cbiAgY29uc3QgeyBtZXNzYWdlIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IFtdO1xuICAgIHJlc3VsdHMucHVzaChhd2FpdCByZXEuY2xpZW50LnNlbmRUZXh0KCdzdGF0dXNAYnJvYWRjYXN0JywgbWVzc2FnZSkpO1xuXG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKSByZXMuc3RhdHVzKDQwMCkuanNvbignRXJyb3Igc2VuZGluZyBtZXNzYWdlJyk7XG4gICAgcmV0dXJuU3VjZXNzKHJlcywgcmVzdWx0cyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIGVycm9yKTtcbiAgfVxufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcGx5TWVudGlvbmVkTWVzc2FnZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgY29uc3QgeyBwaG9uZSwgbWVzc2FnZSwgbWVzc2FnZUlkIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIFtdLmNvbmNhdChwaG9uZSkpIHtcbiAgICAgIGNvbnN0IHJlcGx5ID0gYXdhaXQgcmVxLmNsaWVudC5yZXBseShjb250YXRvLCBtZXNzYWdlLCBtZXNzYWdlSWQpO1xuICAgICAgcmVzdWx0cy5wdXNoKHJlcGx5KTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbignRXJyb3Igc2VuZGluZyByZXBseSB3aXRoIG1lbnRpb24nKTtcbiAgICB9XG5cbiAgICByZXEuaW8uZW1pdCgnbWVuc2FnZW0tZW52aWFkYScsIHsgbWVzc2FnZSwgdG86IHBob25lIH0pO1xuICAgIHJldHVyblN1Y2VzcyhyZXMsIHJlc3VsdHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBlcnJvcik7XG4gIH1cbn1cblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXBseU1lc3NhZ2UocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiTWVzc2FnZXNcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgXCJwaG9uZVwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgXCJpc0dyb3VwXCI6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBcIm1lc3NhZ2VJZFwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgIFwiRGVmYXVsdFwiOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgXCJwaG9uZVwiOiBcIjU1MjE5OTk5OTk5OTlcIixcbiAgICAgICAgICAgICAgICBcImlzR3JvdXBcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiUmVwbHkgdG8gbWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgIFwibWVzc2FnZUlkXCI6IFwiPGlkX21lc3NhZ2U+XCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGhvbmUsIG1lc3NhZ2UsIG1lc3NhZ2VJZCB9ID0gcmVxLmJvZHk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHRzOiBhbnkgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhdG8gb2YgcGhvbmUpIHtcbiAgICAgIHJlc3VsdHMucHVzaChhd2FpdCByZXEuY2xpZW50LnJlcGx5KGNvbnRhdG8sIG1lc3NhZ2UsIG1lc3NhZ2VJZCkpO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkgcmVzLnN0YXR1cyg0MDApLmpzb24oJ0Vycm9yIHNlbmRpbmcgbWVzc2FnZScpO1xuICAgIHJlcS5pby5lbWl0KCdtZW5zYWdlbS1lbnZpYWRhJywgeyBtZXNzYWdlOiBtZXNzYWdlLCB0bzogcGhvbmUgfSk7XG4gICAgcmV0dXJuU3VjZXNzKHJlcywgcmVzdWx0cyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZE1lbnRpb25lZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgcmVxdWlyZWQ6IHRydWUsXG4gIFwiQGNvbnRlbnRcIjoge1xuICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICBzY2hlbWE6IHtcbiAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIFwicGhvbmVcIjogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgXCJpc0dyb3VwXCI6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICBcIm1lc3NhZ2VcIjogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgXCJtZW50aW9uZWRcIjogeyB0eXBlOiBcImFycmF5XCIsIGl0ZW1zOiB7IHR5cGU6IFwic3RyaW5nXCIgfSB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVpcmVkOiBbXCJwaG9uZVwiLCBcIm1lc3NhZ2VcIiwgXCJtZW50aW9uZWRcIl1cbiAgICAgIH0sXG4gICAgICBleGFtcGxlczoge1xuICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBcInBob25lXCI6IFwiZ3JvdXBJZEBnLnVzXCIsXG4gICAgICAgICAgICBcImlzR3JvdXBcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIllvdXIgdGV4dCBtZXNzYWdlXCIsXG4gICAgICAgICAgICBcIm1lbnRpb25lZFwiOiBbXCI1NTY1OTMwNzcxNzFAYy51c1wiXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSwgbWVzc2FnZSwgbWVudGlvbmVkIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIGxldCByZXNwb25zZTtcbiAgICBmb3IgKGNvbnN0IGNvbnRhdG8gb2YgcGhvbmUpIHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5zZW5kTWVudGlvbmVkKFxuICAgICAgICBgJHtjb250YXRvfWAsXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIG1lbnRpb25lZFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogcmVzcG9uc2UgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIHNlbmQgbWVzc2FnZSBtZW50aW9uZWQnLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZEltYWdlQXNTdGlja2VyKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIk1lc3NhZ2VzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIFwicGhvbmVcIjogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIFwiaXNHcm91cFwiOiB7IHR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgICAgICAgICAgIFwicGF0aFwiOiB7IHR5cGU6IFwic3RyaW5nXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBbXCJwaG9uZVwiLCBcInBhdGhcIl1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIFwicGhvbmVcIjogXCI1NTIxOTk5OTk5OTk5XCIsXG4gICAgICAgICAgICAgICAgXCJpc0dyb3VwXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwiPHBhdGhfZmlsZT5cIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgKi9cbiAgY29uc3QgeyBwaG9uZSwgcGF0aCB9ID0gcmVxLmJvZHk7XG5cbiAgaWYgKCFwYXRoICYmICFyZXEuZmlsZSlcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7XG4gICAgICBtZXNzYWdlOiAnU2VuZGluZyB0aGUgZmlsZSBpcyBtYW5kYXRvcnknLFxuICAgIH0pO1xuXG4gIGNvbnN0IHBhdGhGaWxlID0gcGF0aCB8fCByZXEuZmlsZT8ucGF0aDtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IFtdO1xuICAgIGZvciAoY29uc3QgY29udGF0byBvZiBwaG9uZSkge1xuICAgICAgcmVzdWx0cy5wdXNoKGF3YWl0IHJlcS5jbGllbnQuc2VuZEltYWdlQXNTdGlja2VyKGNvbnRhdG8sIHBhdGhGaWxlKSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKSByZXMuc3RhdHVzKDQwMCkuanNvbignRXJyb3Igc2VuZGluZyBtZXNzYWdlJyk7XG4gICAgaWYgKHJlcS5maWxlKSBhd2FpdCB1bmxpbmtBc3luYyhwYXRoRmlsZSk7XG4gICAgcmV0dXJuU3VjZXNzKHJlcywgcmVzdWx0cyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIGVycm9yKTtcbiAgfVxufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRJbWFnZUFzU3RpY2tlckdpZihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgY29udGVudDoge1xuICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBwaG9uZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICBpc0dyb3VwOiB7IHR5cGU6ICdib29sZWFuJyB9LFxuICAgICAgICAgICAgICBwYXRoOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFsncGhvbmUnLCAncGF0aCddLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgICdEZWZhdWx0Jzoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIHBob25lOiAnNTUyMTk5OTk5OTk5OScsXG4gICAgICAgICAgICAgICAgaXNHcm91cDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXRoOiAnPHBhdGhfZmlsZT4nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9XG4gICAqL1xuICBjb25zdCB7IHBob25lLCBwYXRoIH0gPSByZXEuYm9keTtcblxuICBpZiAoIXBhdGggJiYgIXJlcS5maWxlKVxuICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcbiAgICAgIG1lc3NhZ2U6ICdTZW5kaW5nIHRoZSBmaWxlIGlzIG1hbmRhdG9yeScsXG4gICAgfSk7XG5cbiAgY29uc3QgcGF0aEZpbGUgPSBwYXRoIHx8IHJlcS5maWxlPy5wYXRoO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0czogYW55ID0gW107XG4gICAgZm9yIChjb25zdCBjb250YXRvIG9mIHBob25lKSB7XG4gICAgICByZXN1bHRzLnB1c2goYXdhaXQgcmVxLmNsaWVudC5zZW5kSW1hZ2VBc1N0aWNrZXJHaWYoY29udGF0bywgcGF0aEZpbGUpKTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPT09IDApIHJlcy5zdGF0dXMoNDAwKS5qc29uKCdFcnJvciBzZW5kaW5nIG1lc3NhZ2UnKTtcbiAgICBpZiAocmVxLmZpbGUpIGF3YWl0IHVubGlua0FzeW5jKHBhdGhGaWxlKTtcbiAgICByZXR1cm5TdWNlc3MocmVzLCByZXN1bHRzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm5FcnJvcihyZXEsIHJlcywgZXJyb3IpO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsSUFBQUEsVUFBQSxHQUFBQyxPQUFBO0FBbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFNQSxTQUFTQyxXQUFXQSxDQUFDQyxHQUFZLEVBQUVDLEdBQWEsRUFBRUMsS0FBVSxFQUFFO0VBQzVERixHQUFHLENBQUNHLE1BQU0sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7RUFDdkJELEdBQUcsQ0FBQ0csTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7SUFDbkJELE1BQU0sRUFBRSxPQUFPO0lBQ2ZFLE9BQU8sRUFBRSw0QkFBNEI7SUFDckNKLEtBQUssRUFBRUE7RUFDVCxDQUFDLENBQUM7QUFDSjtBQUVBLGVBQWVLLFlBQVlBLENBQUNOLEdBQVEsRUFBRU8sSUFBUyxFQUFFO0VBQy9DUCxHQUFHLENBQUNHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO0lBQUVELE1BQU0sRUFBRSxTQUFTO0lBQUVLLFFBQVEsRUFBRUQsSUFBSTtJQUFFRSxNQUFNLEVBQUU7RUFBUyxDQUFDLENBQUM7QUFDL0U7QUFFTyxlQUFlQyxXQUFXQSxDQUFDWCxHQUFZLEVBQUVDLEdBQWEsRUFBRTtFQUM3RDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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