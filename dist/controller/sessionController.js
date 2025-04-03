"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkConnectionSession = checkConnectionSession;
exports.closeSession = closeSession;
exports.download = download;
exports.downloadMediaByMessage = downloadMediaByMessage;
exports.editBusinessProfile = editBusinessProfile;
exports.getMediaByMessage = getMediaByMessage;
exports.getQrCode = getQrCode;
exports.getSessionState = getSessionState;
exports.killServiceWorker = killServiceWorker;
exports.logOutSession = logOutSession;
exports.restartService = restartService;
exports.showAllSessions = showAllSessions;
exports.startAllSessions = startAllSessions;
exports.startSession = startSession;
exports.subscribePresence = subscribePresence;
var _fs = _interopRequireDefault(require("fs"));
var _mimeTypes = _interopRequireDefault(require("mime-types"));
var _qrcode = _interopRequireDefault(require("qrcode"));
var _package = require("../../package.json");
var _config = _interopRequireDefault(require("../config"));
var _createSessionUtil = _interopRequireDefault(require("../util/createSessionUtil"));
var _functions = require("../util/functions");
var _getAllTokens = _interopRequireDefault(require("../util/getAllTokens"));
var _sessionUtil = require("../util/sessionUtil");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
 * See the License for the specific language governing permclearSessionissions and
 * limitations under the License.
 */

const SessionUtil = new _createSessionUtil.default();
async function downloadFileFunction(message, client, logger) {
  try {
    const buffer = await client.decryptFile(message);
    const filename = `./WhatsAppImages/file${message.t}`;
    if (!_fs.default.existsSync(filename)) {
      let result = '';
      if (message.type === 'ptt') {
        result = `${filename}.oga`;
      } else {
        result = `${filename}.${_mimeTypes.default.extension(message.mimetype)}`;
      }
      await _fs.default.writeFile(result, buffer, err => {
        if (err) {
          logger.error(err);
        }
      });
      return result;
    } else {
      return `${filename}.${_mimeTypes.default.extension(message.mimetype)}`;
    }
  } catch (e) {
    logger.error(e);
    logger.warn('Erro ao descriptografar a midia, tentando fazer o download direto...');
    try {
      const buffer = await client.downloadMedia(message);
      const filename = `./WhatsAppImages/file${message.t}`;
      if (!_fs.default.existsSync(filename)) {
        let result = '';
        if (message.type === 'ptt') {
          result = `${filename}.oga`;
        } else {
          result = `${filename}.${_mimeTypes.default.extension(message.mimetype)}`;
        }
        await _fs.default.writeFile(result, buffer, err => {
          if (err) {
            logger.error(err);
          }
        });
        return result;
      } else {
        return `${filename}.${_mimeTypes.default.extension(message.mimetype)}`;
      }
    } catch (e) {
      logger.error(e);
      logger.warn('Não foi possível baixar a mídia...');
    }
  }
}
async function download(message, client, logger) {
  try {
    const path = await downloadFileFunction(message, client, logger);
    return path?.replace('./', '');
  } catch (e) {
    logger.error(e);
  }
}
async function startAllSessions(req, res) {
  /**
   * #swagger.tags = ["Auth"]
     #swagger.autoBody=false
     #swagger.operationId = 'startAllSessions'
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["secretkey"] = {
      schema: 'THISISMYSECURECODE'
     }
   */
  const {
    secretkey
  } = req.params;
  const {
    authorization: token
  } = req.headers;
  let tokenDecrypt = '';
  if (secretkey === undefined) {
    tokenDecrypt = token.split(' ')[0];
  } else {
    tokenDecrypt = secretkey;
  }
  const allSessions = await (0, _getAllTokens.default)(req);
  if (tokenDecrypt !== req.serverOptions.secretKey) {
    res.status(400).json({
      response: 'error',
      message: 'The token is incorrect'
    });
  }
  allSessions.map(async session => {
    const util = new _createSessionUtil.default();
    await util.opendata(req, session);
  });
  return await res.status(201).json({
    status: 'success',
    message: 'Starting all sessions'
  });
}
async function showAllSessions(req, res) {
  /**
   * #swagger.tags = ["Auth"]
     #swagger.autoBody=false
     #swagger.operationId = 'showAllSessions'
     #swagger.autoQuery=false
     #swagger.autoHeaders=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["secretkey"] = {
      schema: 'THISISMYSECURETOKEN'
     }
   */
  const {
    secretkey
  } = req.params;
  const {
    authorization: token
  } = req.headers;
  let tokenDecrypt = '';
  if (secretkey === undefined) {
    tokenDecrypt = token?.split(' ')[0];
  } else {
    tokenDecrypt = secretkey;
  }
  const arr = [];
  if (tokenDecrypt !== req.serverOptions.secretKey) {
    res.status(400).json({
      response: false,
      message: 'The token is incorrect'
    });
  }
  Object.keys(_sessionUtil.clientsArray).forEach(item => {
    arr.push({
      session: item
    });
  });
  res.status(200).json({
    response: await (0, _getAllTokens.default)(req)
  });
}
async function startSession(req, res) {
  /**
   * #swagger.tags = ["Auth"]
     #swagger.autoBody=false
     #swagger.operationId = 'startSession'
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
              webhook: { type: "string" },
              waitQrCode: { type: "boolean" },
            }
          },
          example: {
            webhook: "",
            waitQrCode: false,
          }
        }
      }
     }
   */
  const session = req.session;
  const {
    waitQrCode = false
  } = req.body;
  await getSessionState(req, res);
  await SessionUtil.opendata(req, session, waitQrCode ? res : null);
}
async function closeSession(req, res) {
  /**
   * #swagger.tags = ["Auth"]
     #swagger.operationId = 'closeSession'
     #swagger.autoBody=true
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  const session = req.session;
  try {
    if (_sessionUtil.clientsArray[session].status === null) {
      return await res.status(200).json({
        status: true,
        message: 'Session successfully closed'
      });
    } else {
      _sessionUtil.clientsArray[session] = {
        status: null
      };
      await req.client.close();
      req.io.emit('whatsapp-status', false);
      (0, _functions.callWebHook)(req.client, req, 'closesession', {
        message: `Session: ${session} disconnected`,
        connected: false
      });
      return await res.status(200).json({
        status: true,
        message: 'Session successfully closed'
      });
    }
  } catch (error) {
    req.logger.error(error);
    return await res.status(500).json({
      status: false,
      message: 'Error closing session',
      error
    });
  }
}
async function logOutSession(req, res) {
  /**
   * #swagger.tags = ["Auth"]
     #swagger.operationId = 'logoutSession'
   * #swagger.description = 'This route logout and delete session data'
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const session = req.session;
    await req.client.logout();
    (0, _sessionUtil.deleteSessionOnArray)(req.session);
    setTimeout(async () => {
      const pathUserData = _config.default.customUserDataDir + req.session;
      const pathTokens = __dirname + `../../../tokens/${req.session}.data.json`;
      if (_fs.default.existsSync(pathUserData)) {
        await _fs.default.promises.rm(pathUserData, {
          recursive: true,
          maxRetries: 5,
          force: true,
          retryDelay: 1000
        });
      }
      if (_fs.default.existsSync(pathTokens)) {
        await _fs.default.promises.rm(pathTokens, {
          recursive: true,
          maxRetries: 5,
          force: true,
          retryDelay: 1000
        });
      }
      req.io.emit('whatsapp-status', false);
      (0, _functions.callWebHook)(req.client, req, 'logoutsession', {
        message: `Session: ${session} logged out`,
        connected: false
      });
      return await res.status(200).json({
        status: true,
        message: 'Session successfully closed'
      });
    }, 500);
    /*try {
      await req.client.close();
    } catch (error) {}*/
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: false,
      message: 'Error closing session',
      error
    });
  }
}
async function checkConnectionSession(req, res) {
  /**
   * #swagger.tags = ["Auth"]
     #swagger.operationId = 'CheckConnectionState'
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    await req.client.isConnected();
    res.status(200).json({
      status: true,
      message: 'Connected'
    });
  } catch (error) {
    res.status(200).json({
      status: false,
      message: 'Disconnected'
    });
  }
}
async function downloadMediaByMessage(req, res) {
  /**
   * #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.operationId = 'downloadMediabyMessage'
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
            }
          },
          example: {
            messageId: '<messageId>'
          }
        }
      }
     }
   */
  const client = req.client;
  const {
    messageId
  } = req.body;
  let message;
  try {
    if (!messageId.isMedia || !messageId.type) {
      message = await client.getMessageById(messageId);
    } else {
      message = messageId;
    }
    if (!message) res.status(400).json({
      status: 'error',
      message: 'Message not found'
    });
    if (!(message['mimetype'] || message.isMedia || message.isMMS)) res.status(400).json({
      status: 'error',
      message: 'Message does not contain media'
    });
    const buffer = await client.decryptFile(message);
    res.status(200).json({
      base64: buffer.toString('base64'),
      mimetype: message.mimetype
    });
  } catch (e) {
    req.logger.error(e);
    res.status(400).json({
      status: 'error',
      message: 'Decrypt file error',
      error: e
    });
  }
}
async function getMediaByMessage(req, res) {
  /**
   * #swagger.tags = ["Messages"]
     #swagger.autoBody=false
     #swagger.operationId = 'getMediaByMessage'
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["session"] = {
      schema: 'messageId'
     }
   */
  const client = req.client;
  const {
    messageId
  } = req.params;
  try {
    const message = await client.getMessageById(messageId);
    if (!message) res.status(400).json({
      status: 'error',
      message: 'Message not found'
    });
    if (!(message['mimetype'] || message.isMedia || message.isMMS)) res.status(400).json({
      status: 'error',
      message: 'Message does not contain media'
    });
    const buffer = await client.decryptFile(message);
    res.status(200).json({
      base64: buffer.toString('base64'),
      mimetype: message.mimetype
    });
  } catch (ex) {
    req.logger.error(ex);
    res.status(500).json({
      status: 'error',
      message: 'The session is not active',
      error: ex
    });
  }
}
async function getSessionState(req, res) {
  /**
     #swagger.tags = ["Auth"]
     #swagger.operationId = 'getSessionState'
     #swagger.summary = 'Retrieve status of a session'
     #swagger.autoBody = false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const {
      waitQrCode = false
    } = req.body;
    const client = req.client;
    const qr = client?.urlcode != null && client?.urlcode != '' ? await _qrcode.default.toDataURL(client.urlcode) : null;
    if ((client == null || client.status == null) && !waitQrCode) res.status(200).json({
      status: 'CLOSED',
      qrcode: null
    });else if (client != null) res.status(200).json({
      status: client.status,
      qrcode: qr,
      urlcode: client.urlcode,
      version: _package.version
    });
  } catch (ex) {
    req.logger.error(ex);
    res.status(500).json({
      status: 'error',
      message: 'The session is not active',
      error: ex
    });
  }
}
async function getQrCode(req, res) {
  /**
   * #swagger.tags = ["Auth"]
     #swagger.autoBody=false
     #swagger.operationId = 'getQrCode'
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    if (req?.client?.urlcode) {
      // We add options to generate the QR code in higher resolution
      // The /qrcode-session request will now return a readable qrcode.
      const qrOptions = {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        scale: 5,
        width: 500
      };
      const qr = req.client.urlcode ? await _qrcode.default.toDataURL(req.client.urlcode, qrOptions) : null;
      const img = Buffer.from(qr.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), 'base64');
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img);
    } else if (typeof req.client === 'undefined') {
      res.status(200).json({
        status: null,
        message: 'Session not started. Please, use the /start-session route, for initialization your session'
      });
    } else {
      res.status(200).json({
        status: req.client.status,
        message: 'QRCode is not available...'
      });
    }
  } catch (ex) {
    req.logger.error(ex);
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving QRCode',
      error: ex
    });
  }
}
async function killServiceWorker(req, res) {
  /**
   * #swagger.ignore=true
   * #swagger.tags = ["Messages"]
     #swagger.operationId = 'killServiceWorkier'
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    res.status(200).json({
      status: 'error',
      response: 'Not implemented yet'
    });
  } catch (ex) {
    req.logger.error(ex);
    res.status(500).json({
      status: 'error',
      message: 'The session is not active',
      error: ex
    });
  }
}
async function restartService(req, res) {
  /**
   * #swagger.ignore=true
   * #swagger.tags = ["Messages"]
     #swagger.operationId = 'restartService'
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    res.status(200).json({
      status: 'error',
      response: 'Not implemented yet'
    });
  } catch (ex) {
    req.logger.error(ex);
    res.status(500).json({
      status: 'error',
      response: {
        message: 'The session is not active',
        error: ex
      }
    });
  }
}
async function subscribePresence(req, res) {
  /**
   * #swagger.tags = ["Misc"]
     #swagger.operationId = 'subscribePresence'
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
              all: { type: "boolean" },
            }
          },
          example: {
            phone: '5521999999999',
            isGroup: false,
            all: false,
          }
        }
      }
     }
   */
  try {
    const {
      phone,
      isGroup = false,
      all = false
    } = req.body;
    if (all) {
      let contacts;
      if (isGroup) {
        const groups = await req.client.getAllGroups(false);
        contacts = groups.map(p => p.id._serialized);
      } else {
        const chats = await req.client.getAllContacts();
        contacts = chats.map(c => c.id._serialized);
      }
      await req.client.subscribePresence(contacts);
    } else for (const contato of (0, _functions.contactToArray)(phone, isGroup)) {
      await req.client.subscribePresence(contato);
    }
    res.status(200).json({
      status: 'success',
      response: {
        message: 'Subscribe presence executed'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error on subscribe presence',
      error: error
    });
  }
}
async function editBusinessProfile(req, res) {
  /**
   * #swagger.tags = ["Profile"]
     #swagger.operationId = 'editBusinessProfile'
   * #swagger.description = 'Edit your bussiness profile'
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
        $adress: 'Av. Nossa Senhora de Copacabana, 315',
        $email: 'test@test.com.br',
        $categories: {
          $id: "133436743388217",
          $localized_display_name: "Artes e entretenimento",
          $not_a_biz: false,
        },
        $website: [
          "https://www.wppconnect.io",
          "https://www.teste2.com.br",
        ],
      }
     }
     
     #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              adress: { type: "string" },
              email: { type: "string" },
              categories: { type: "object" },
              websites: { type: "array" },
            }
          },
          example: {
            adress: 'Av. Nossa Senhora de Copacabana, 315',
            email: 'test@test.com.br',
            categories: {
              $id: "133436743388217",
              $localized_display_name: "Artes e entretenimento",
              $not_a_biz: false,
            },
            website: [
              "https://www.wppconnect.io",
              "https://www.teste2.com.br",
            ],
          }
        }
      }
     }
   */
  try {
    res.status(200).json(await req.client.editBusinessProfile(req.body));
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error on edit business profile',
      error: error
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZnMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9taW1lVHlwZXMiLCJfcXJjb2RlIiwiX3BhY2thZ2UiLCJfY29uZmlnIiwiX2NyZWF0ZVNlc3Npb25VdGlsIiwiX2Z1bmN0aW9ucyIsIl9nZXRBbGxUb2tlbnMiLCJfc2Vzc2lvblV0aWwiLCJlIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJTZXNzaW9uVXRpbCIsIkNyZWF0ZVNlc3Npb25VdGlsIiwiZG93bmxvYWRGaWxlRnVuY3Rpb24iLCJtZXNzYWdlIiwiY2xpZW50IiwibG9nZ2VyIiwiYnVmZmVyIiwiZGVjcnlwdEZpbGUiLCJmaWxlbmFtZSIsInQiLCJmcyIsImV4aXN0c1N5bmMiLCJyZXN1bHQiLCJ0eXBlIiwibWltZSIsImV4dGVuc2lvbiIsIm1pbWV0eXBlIiwid3JpdGVGaWxlIiwiZXJyIiwiZXJyb3IiLCJ3YXJuIiwiZG93bmxvYWRNZWRpYSIsImRvd25sb2FkIiwicGF0aCIsInJlcGxhY2UiLCJzdGFydEFsbFNlc3Npb25zIiwicmVxIiwicmVzIiwic2VjcmV0a2V5IiwicGFyYW1zIiwiYXV0aG9yaXphdGlvbiIsInRva2VuIiwiaGVhZGVycyIsInRva2VuRGVjcnlwdCIsInVuZGVmaW5lZCIsInNwbGl0IiwiYWxsU2Vzc2lvbnMiLCJnZXRBbGxUb2tlbnMiLCJzZXJ2ZXJPcHRpb25zIiwic2VjcmV0S2V5Iiwic3RhdHVzIiwianNvbiIsInJlc3BvbnNlIiwibWFwIiwic2Vzc2lvbiIsInV0aWwiLCJvcGVuZGF0YSIsInNob3dBbGxTZXNzaW9ucyIsImFyciIsIk9iamVjdCIsImtleXMiLCJjbGllbnRzQXJyYXkiLCJmb3JFYWNoIiwiaXRlbSIsInB1c2giLCJzdGFydFNlc3Npb24iLCJ3YWl0UXJDb2RlIiwiYm9keSIsImdldFNlc3Npb25TdGF0ZSIsImNsb3NlU2Vzc2lvbiIsImNsb3NlIiwiaW8iLCJlbWl0IiwiY2FsbFdlYkhvb2siLCJjb25uZWN0ZWQiLCJsb2dPdXRTZXNzaW9uIiwibG9nb3V0IiwiZGVsZXRlU2Vzc2lvbk9uQXJyYXkiLCJzZXRUaW1lb3V0IiwicGF0aFVzZXJEYXRhIiwiY29uZmlnIiwiY3VzdG9tVXNlckRhdGFEaXIiLCJwYXRoVG9rZW5zIiwiX19kaXJuYW1lIiwicHJvbWlzZXMiLCJybSIsInJlY3Vyc2l2ZSIsIm1heFJldHJpZXMiLCJmb3JjZSIsInJldHJ5RGVsYXkiLCJjaGVja0Nvbm5lY3Rpb25TZXNzaW9uIiwiaXNDb25uZWN0ZWQiLCJkb3dubG9hZE1lZGlhQnlNZXNzYWdlIiwibWVzc2FnZUlkIiwiaXNNZWRpYSIsImdldE1lc3NhZ2VCeUlkIiwiaXNNTVMiLCJiYXNlNjQiLCJ0b1N0cmluZyIsImdldE1lZGlhQnlNZXNzYWdlIiwiZXgiLCJxciIsInVybGNvZGUiLCJRUkNvZGUiLCJ0b0RhdGFVUkwiLCJxcmNvZGUiLCJ2ZXJzaW9uIiwiZ2V0UXJDb2RlIiwicXJPcHRpb25zIiwiZXJyb3JDb3JyZWN0aW9uTGV2ZWwiLCJzY2FsZSIsIndpZHRoIiwiaW1nIiwiQnVmZmVyIiwiZnJvbSIsIndyaXRlSGVhZCIsImxlbmd0aCIsImVuZCIsImtpbGxTZXJ2aWNlV29ya2VyIiwicmVzdGFydFNlcnZpY2UiLCJzdWJzY3JpYmVQcmVzZW5jZSIsInBob25lIiwiaXNHcm91cCIsImFsbCIsImNvbnRhY3RzIiwiZ3JvdXBzIiwiZ2V0QWxsR3JvdXBzIiwicCIsImlkIiwiX3NlcmlhbGl6ZWQiLCJjaGF0cyIsImdldEFsbENvbnRhY3RzIiwiYyIsImNvbnRhdG8iLCJjb250YWN0VG9BcnJheSIsImVkaXRCdXNpbmVzc1Byb2ZpbGUiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlci9zZXNzaW9uQ29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgV1BQQ29ubmVjdCBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtY2xlYXJTZXNzaW9uaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgeyBNZXNzYWdlLCBXaGF0c2FwcCB9IGZyb20gJ0B3cHBjb25uZWN0LXRlYW0vd3BwY29ubmVjdCc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBtaW1lIGZyb20gJ21pbWUtdHlwZXMnO1xuaW1wb3J0IFFSQ29kZSBmcm9tICdxcmNvZGUnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5cbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IENyZWF0ZVNlc3Npb25VdGlsIGZyb20gJy4uL3V0aWwvY3JlYXRlU2Vzc2lvblV0aWwnO1xuaW1wb3J0IHsgY2FsbFdlYkhvb2ssIGNvbnRhY3RUb0FycmF5IH0gZnJvbSAnLi4vdXRpbC9mdW5jdGlvbnMnO1xuaW1wb3J0IGdldEFsbFRva2VucyBmcm9tICcuLi91dGlsL2dldEFsbFRva2Vucyc7XG5pbXBvcnQgeyBjbGllbnRzQXJyYXksIGRlbGV0ZVNlc3Npb25PbkFycmF5IH0gZnJvbSAnLi4vdXRpbC9zZXNzaW9uVXRpbCc7XG5cbmNvbnN0IFNlc3Npb25VdGlsID0gbmV3IENyZWF0ZVNlc3Npb25VdGlsKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkRmlsZUZ1bmN0aW9uKFxuICBtZXNzYWdlOiBNZXNzYWdlLFxuICBjbGllbnQ6IFdoYXRzYXBwLFxuICBsb2dnZXI6IExvZ2dlclxuKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYnVmZmVyID0gYXdhaXQgY2xpZW50LmRlY3J5cHRGaWxlKG1lc3NhZ2UpO1xuXG4gICAgY29uc3QgZmlsZW5hbWUgPSBgLi9XaGF0c0FwcEltYWdlcy9maWxlJHttZXNzYWdlLnR9YDtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZmlsZW5hbWUpKSB7XG4gICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICBpZiAobWVzc2FnZS50eXBlID09PSAncHR0Jykge1xuICAgICAgICByZXN1bHQgPSBgJHtmaWxlbmFtZX0ub2dhYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IGAke2ZpbGVuYW1lfS4ke21pbWUuZXh0ZW5zaW9uKG1lc3NhZ2UubWltZXR5cGUpfWA7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IGZzLndyaXRlRmlsZShyZXN1bHQsIGJ1ZmZlciwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7ZmlsZW5hbWV9LiR7bWltZS5leHRlbnNpb24obWVzc2FnZS5taW1ldHlwZSl9YDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIuZXJyb3IoZSk7XG4gICAgbG9nZ2VyLndhcm4oXG4gICAgICAnRXJybyBhbyBkZXNjcmlwdG9ncmFmYXIgYSBtaWRpYSwgdGVudGFuZG8gZmF6ZXIgbyBkb3dubG9hZCBkaXJldG8uLi4nXG4gICAgKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgY2xpZW50LmRvd25sb2FkTWVkaWEobWVzc2FnZSk7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGAuL1doYXRzQXBwSW1hZ2VzL2ZpbGUke21lc3NhZ2UudH1gO1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVuYW1lKSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdwdHQnKSB7XG4gICAgICAgICAgcmVzdWx0ID0gYCR7ZmlsZW5hbWV9Lm9nYWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0ID0gYCR7ZmlsZW5hbWV9LiR7bWltZS5leHRlbnNpb24obWVzc2FnZS5taW1ldHlwZSl9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGZzLndyaXRlRmlsZShyZXN1bHQsIGJ1ZmZlciwgKGVycikgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBgJHtmaWxlbmFtZX0uJHttaW1lLmV4dGVuc2lvbihtZXNzYWdlLm1pbWV0eXBlKX1gO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICAgIGxvZ2dlci53YXJuKCdOw6NvIGZvaSBwb3Nzw612ZWwgYmFpeGFyIGEgbcOtZGlhLi4uJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZChtZXNzYWdlOiBhbnksIGNsaWVudDogYW55LCBsb2dnZXI6IGFueSkge1xuICB0cnkge1xuICAgIGNvbnN0IHBhdGggPSBhd2FpdCBkb3dubG9hZEZpbGVGdW5jdGlvbihtZXNzYWdlLCBjbGllbnQsIGxvZ2dlcik7XG4gICAgcmV0dXJuIHBhdGg/LnJlcGxhY2UoJy4vJywgJycpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmVycm9yKGUpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydEFsbFNlc3Npb25zKFxuICByZXE6IFJlcXVlc3QsXG4gIHJlczogUmVzcG9uc2Vcbik6IFByb21pc2U8YW55PiB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQXV0aFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5vcGVyYXRpb25JZCA9ICdzdGFydEFsbFNlc3Npb25zJ1xuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2VjcmV0a2V5XCJdID0ge1xuICAgICAgc2NoZW1hOiAnVEhJU0lTTVlTRUNVUkVDT0RFJ1xuICAgICB9XG4gICAqL1xuICBjb25zdCB7IHNlY3JldGtleSB9ID0gcmVxLnBhcmFtcztcbiAgY29uc3QgeyBhdXRob3JpemF0aW9uOiB0b2tlbiB9ID0gcmVxLmhlYWRlcnM7XG5cbiAgbGV0IHRva2VuRGVjcnlwdCA9ICcnO1xuXG4gIGlmIChzZWNyZXRrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgIHRva2VuRGVjcnlwdCA9ICh0b2tlbiBhcyBhbnkpLnNwbGl0KCcgJylbMF07XG4gIH0gZWxzZSB7XG4gICAgdG9rZW5EZWNyeXB0ID0gc2VjcmV0a2V5O1xuICB9XG5cbiAgY29uc3QgYWxsU2Vzc2lvbnMgPSBhd2FpdCBnZXRBbGxUb2tlbnMocmVxKTtcblxuICBpZiAodG9rZW5EZWNyeXB0ICE9PSByZXEuc2VydmVyT3B0aW9ucy5zZWNyZXRLZXkpIHtcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICByZXNwb25zZTogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdG9rZW4gaXMgaW5jb3JyZWN0JyxcbiAgICB9KTtcbiAgfVxuXG4gIGFsbFNlc3Npb25zLm1hcChhc3luYyAoc2Vzc2lvbjogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgdXRpbCA9IG5ldyBDcmVhdGVTZXNzaW9uVXRpbCgpO1xuICAgIGF3YWl0IHV0aWwub3BlbmRhdGEocmVxLCBzZXNzaW9uKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGF3YWl0IHJlc1xuICAgIC5zdGF0dXMoMjAxKVxuICAgIC5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIG1lc3NhZ2U6ICdTdGFydGluZyBhbGwgc2Vzc2lvbnMnIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2hvd0FsbFNlc3Npb25zKFxuICByZXE6IFJlcXVlc3QsXG4gIHJlczogUmVzcG9uc2Vcbik6IFByb21pc2U8YW55PiB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQXV0aFwiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5vcGVyYXRpb25JZCA9ICdzaG93QWxsU2Vzc2lvbnMnXG4gICAgICNzd2FnZ2VyLmF1dG9RdWVyeT1mYWxzZVxuICAgICAjc3dhZ2dlci5hdXRvSGVhZGVycz1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlY3JldGtleVwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ1RISVNJU01ZU0VDVVJFVE9LRU4nXG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHsgc2VjcmV0a2V5IH0gPSByZXEucGFyYW1zO1xuICBjb25zdCB7IGF1dGhvcml6YXRpb246IHRva2VuIH0gPSByZXEuaGVhZGVycztcblxuICBsZXQgdG9rZW5EZWNyeXB0OiBhbnkgPSAnJztcblxuICBpZiAoc2VjcmV0a2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICB0b2tlbkRlY3J5cHQgPSB0b2tlbj8uc3BsaXQoJyAnKVswXTtcbiAgfSBlbHNlIHtcbiAgICB0b2tlbkRlY3J5cHQgPSBzZWNyZXRrZXk7XG4gIH1cblxuICBjb25zdCBhcnI6IGFueSA9IFtdO1xuXG4gIGlmICh0b2tlbkRlY3J5cHQgIT09IHJlcS5zZXJ2ZXJPcHRpb25zLnNlY3JldEtleSkge1xuICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgIHJlc3BvbnNlOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2U6ICdUaGUgdG9rZW4gaXMgaW5jb3JyZWN0JyxcbiAgICB9KTtcbiAgfVxuXG4gIE9iamVjdC5rZXlzKGNsaWVudHNBcnJheSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGFyci5wdXNoKHsgc2Vzc2lvbjogaXRlbSB9KTtcbiAgfSk7XG5cbiAgcmVzLnN0YXR1cygyMDApLmpzb24oeyByZXNwb25zZTogYXdhaXQgZ2V0QWxsVG9rZW5zKHJlcSkgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydFNlc3Npb24ocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKTogUHJvbWlzZTxhbnk+IHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJBdXRoXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLm9wZXJhdGlvbklkID0gJ3N0YXJ0U2Vzc2lvbidcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgd2ViaG9vazogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIHdhaXRRckNvZGU6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGU6IHtcbiAgICAgICAgICAgIHdlYmhvb2s6IFwiXCIsXG4gICAgICAgICAgICB3YWl0UXJDb2RlOiBmYWxzZSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgY29uc3Qgc2Vzc2lvbiA9IHJlcS5zZXNzaW9uO1xuICBjb25zdCB7IHdhaXRRckNvZGUgPSBmYWxzZSB9ID0gcmVxLmJvZHk7XG5cbiAgYXdhaXQgZ2V0U2Vzc2lvblN0YXRlKHJlcSwgcmVzKTtcbiAgYXdhaXQgU2Vzc2lvblV0aWwub3BlbmRhdGEocmVxLCBzZXNzaW9uLCB3YWl0UXJDb2RlID8gcmVzIDogbnVsbCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjbG9zZVNlc3Npb24ocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKTogUHJvbWlzZTxhbnk+IHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJBdXRoXCJdXG4gICAgICNzd2FnZ2VyLm9wZXJhdGlvbklkID0gJ2Nsb3NlU2Vzc2lvbidcbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9dHJ1ZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgKi9cbiAgY29uc3Qgc2Vzc2lvbiA9IHJlcS5zZXNzaW9uO1xuICB0cnkge1xuICAgIGlmICgoY2xpZW50c0FycmF5IGFzIGFueSlbc2Vzc2lvbl0uc3RhdHVzID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gYXdhaXQgcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN0YXR1czogdHJ1ZSwgbWVzc2FnZTogJ1Nlc3Npb24gc3VjY2Vzc2Z1bGx5IGNsb3NlZCcgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIChjbGllbnRzQXJyYXkgYXMgYW55KVtzZXNzaW9uXSA9IHsgc3RhdHVzOiBudWxsIH07XG5cbiAgICAgIGF3YWl0IHJlcS5jbGllbnQuY2xvc2UoKTtcbiAgICAgIHJlcS5pby5lbWl0KCd3aGF0c2FwcC1zdGF0dXMnLCBmYWxzZSk7XG4gICAgICBjYWxsV2ViSG9vayhyZXEuY2xpZW50LCByZXEsICdjbG9zZXNlc3Npb24nLCB7XG4gICAgICAgIG1lc3NhZ2U6IGBTZXNzaW9uOiAke3Nlc3Npb259IGRpc2Nvbm5lY3RlZGAsXG4gICAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGF3YWl0IHJlc1xuICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgLmpzb24oeyBzdGF0dXM6IHRydWUsIG1lc3NhZ2U6ICdTZXNzaW9uIHN1Y2Nlc3NmdWxseSBjbG9zZWQnIH0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICByZXR1cm4gYXdhaXQgcmVzXG4gICAgICAuc3RhdHVzKDUwMClcbiAgICAgIC5qc29uKHsgc3RhdHVzOiBmYWxzZSwgbWVzc2FnZTogJ0Vycm9yIGNsb3Npbmcgc2Vzc2lvbicsIGVycm9yIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dPdXRTZXNzaW9uKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSk6IFByb21pc2U8YW55PiB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiQXV0aFwiXVxuICAgICAjc3dhZ2dlci5vcGVyYXRpb25JZCA9ICdsb2dvdXRTZXNzaW9uJ1xuICAgKiAjc3dhZ2dlci5kZXNjcmlwdGlvbiA9ICdUaGlzIHJvdXRlIGxvZ291dCBhbmQgZGVsZXRlIHNlc3Npb24gZGF0YSdcbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICovXG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IHJlcS5zZXNzaW9uO1xuICAgIGF3YWl0IHJlcS5jbGllbnQubG9nb3V0KCk7XG4gICAgZGVsZXRlU2Vzc2lvbk9uQXJyYXkocmVxLnNlc3Npb24pO1xuXG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXRoVXNlckRhdGEgPSBjb25maWcuY3VzdG9tVXNlckRhdGFEaXIgKyByZXEuc2Vzc2lvbjtcbiAgICAgIGNvbnN0IHBhdGhUb2tlbnMgPSBfX2Rpcm5hbWUgKyBgLi4vLi4vLi4vdG9rZW5zLyR7cmVxLnNlc3Npb259LmRhdGEuanNvbmA7XG5cbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGhVc2VyRGF0YSkpIHtcbiAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMucm0ocGF0aFVzZXJEYXRhLCB7XG4gICAgICAgICAgcmVjdXJzaXZlOiB0cnVlLFxuICAgICAgICAgIG1heFJldHJpZXM6IDUsXG4gICAgICAgICAgZm9yY2U6IHRydWUsXG4gICAgICAgICAgcmV0cnlEZWxheTogMTAwMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoVG9rZW5zKSkge1xuICAgICAgICBhd2FpdCBmcy5wcm9taXNlcy5ybShwYXRoVG9rZW5zLCB7XG4gICAgICAgICAgcmVjdXJzaXZlOiB0cnVlLFxuICAgICAgICAgIG1heFJldHJpZXM6IDUsXG4gICAgICAgICAgZm9yY2U6IHRydWUsXG4gICAgICAgICAgcmV0cnlEZWxheTogMTAwMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJlcS5pby5lbWl0KCd3aGF0c2FwcC1zdGF0dXMnLCBmYWxzZSk7XG4gICAgICBjYWxsV2ViSG9vayhyZXEuY2xpZW50LCByZXEsICdsb2dvdXRzZXNzaW9uJywge1xuICAgICAgICBtZXNzYWdlOiBgU2Vzc2lvbjogJHtzZXNzaW9ufSBsb2dnZWQgb3V0YCxcbiAgICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gYXdhaXQgcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN0YXR1czogdHJ1ZSwgbWVzc2FnZTogJ1Nlc3Npb24gc3VjY2Vzc2Z1bGx5IGNsb3NlZCcgfSk7XG4gICAgfSwgNTAwKTtcbiAgICAvKnRyeSB7XG4gICAgICBhd2FpdCByZXEuY2xpZW50LmNsb3NlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9Ki9cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICByZXNcbiAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgLmpzb24oeyBzdGF0dXM6IGZhbHNlLCBtZXNzYWdlOiAnRXJyb3IgY2xvc2luZyBzZXNzaW9uJywgZXJyb3IgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrQ29ubmVjdGlvblNlc3Npb24oXG4gIHJlcTogUmVxdWVzdCxcbiAgcmVzOiBSZXNwb25zZVxuKTogUHJvbWlzZTxhbnk+IHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJBdXRoXCJdXG4gICAgICNzd2FnZ2VyLm9wZXJhdGlvbklkID0gJ0NoZWNrQ29ubmVjdGlvblN0YXRlJ1xuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgKi9cbiAgdHJ5IHtcbiAgICBhd2FpdCByZXEuY2xpZW50LmlzQ29ubmVjdGVkKCk7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogdHJ1ZSwgbWVzc2FnZTogJ0Nvbm5lY3RlZCcgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IGZhbHNlLCBtZXNzYWdlOiAnRGlzY29ubmVjdGVkJyB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRNZWRpYUJ5TWVzc2FnZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5vcGVyYXRpb25JZCA9ICdkb3dubG9hZE1lZGlhYnlNZXNzYWdlJ1xuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBtZXNzYWdlSWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhhbXBsZToge1xuICAgICAgICAgICAgbWVzc2FnZUlkOiAnPG1lc3NhZ2VJZD4nXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgIH1cbiAgICovXG4gIGNvbnN0IGNsaWVudCA9IHJlcS5jbGllbnQ7XG4gIGNvbnN0IHsgbWVzc2FnZUlkIH0gPSByZXEuYm9keTtcblxuICBsZXQgbWVzc2FnZTtcblxuICB0cnkge1xuICAgIGlmICghbWVzc2FnZUlkLmlzTWVkaWEgfHwgIW1lc3NhZ2VJZC50eXBlKSB7XG4gICAgICBtZXNzYWdlID0gYXdhaXQgY2xpZW50LmdldE1lc3NhZ2VCeUlkKG1lc3NhZ2VJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlSWQ7XG4gICAgfVxuXG4gICAgaWYgKCFtZXNzYWdlKVxuICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdNZXNzYWdlIG5vdCBmb3VuZCcsXG4gICAgICB9KTtcblxuICAgIGlmICghKG1lc3NhZ2VbJ21pbWV0eXBlJ10gfHwgbWVzc2FnZS5pc01lZGlhIHx8IG1lc3NhZ2UuaXNNTVMpKVxuICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdNZXNzYWdlIGRvZXMgbm90IGNvbnRhaW4gbWVkaWEnLFxuICAgICAgfSk7XG5cbiAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBjbGllbnQuZGVjcnlwdEZpbGUobWVzc2FnZSk7XG5cbiAgICByZXNcbiAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgLmpzb24oeyBiYXNlNjQ6IGJ1ZmZlci50b1N0cmluZygnYmFzZTY0JyksIG1pbWV0eXBlOiBtZXNzYWdlLm1pbWV0eXBlIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlKTtcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRGVjcnlwdCBmaWxlIGVycm9yJyxcbiAgICAgIGVycm9yOiBlLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRNZWRpYUJ5TWVzc2FnZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5vcGVyYXRpb25JZCA9ICdnZXRNZWRpYUJ5TWVzc2FnZSdcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdtZXNzYWdlSWQnXG4gICAgIH1cbiAgICovXG4gIGNvbnN0IGNsaWVudCA9IHJlcS5jbGllbnQ7XG4gIGNvbnN0IHsgbWVzc2FnZUlkIH0gPSByZXEucGFyYW1zO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IGNsaWVudC5nZXRNZXNzYWdlQnlJZChtZXNzYWdlSWQpO1xuXG4gICAgaWYgKCFtZXNzYWdlKVxuICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdNZXNzYWdlIG5vdCBmb3VuZCcsXG4gICAgICB9KTtcblxuICAgIGlmICghKG1lc3NhZ2VbJ21pbWV0eXBlJ10gfHwgbWVzc2FnZS5pc01lZGlhIHx8IG1lc3NhZ2UuaXNNTVMpKVxuICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdNZXNzYWdlIGRvZXMgbm90IGNvbnRhaW4gbWVkaWEnLFxuICAgICAgfSk7XG5cbiAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBjbGllbnQuZGVjcnlwdEZpbGUobWVzc2FnZSk7XG5cbiAgICByZXNcbiAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgLmpzb24oeyBiYXNlNjQ6IGJ1ZmZlci50b1N0cmluZygnYmFzZTY0JyksIG1pbWV0eXBlOiBtZXNzYWdlLm1pbWV0eXBlIH0pO1xuICB9IGNhdGNoIChleCkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXgpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdUaGUgc2Vzc2lvbiBpcyBub3QgYWN0aXZlJyxcbiAgICAgIGVycm9yOiBleCxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2Vzc2lvblN0YXRlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIkF1dGhcIl1cbiAgICAgI3N3YWdnZXIub3BlcmF0aW9uSWQgPSAnZ2V0U2Vzc2lvblN0YXRlJ1xuICAgICAjc3dhZ2dlci5zdW1tYXJ5ID0gJ1JldHJpZXZlIHN0YXR1cyBvZiBhIHNlc3Npb24nXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5ID0gZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICovXG4gIHRyeSB7XG4gICAgY29uc3QgeyB3YWl0UXJDb2RlID0gZmFsc2UgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IGNsaWVudCA9IHJlcS5jbGllbnQ7XG4gICAgY29uc3QgcXIgPVxuICAgICAgY2xpZW50Py51cmxjb2RlICE9IG51bGwgJiYgY2xpZW50Py51cmxjb2RlICE9ICcnXG4gICAgICAgID8gYXdhaXQgUVJDb2RlLnRvRGF0YVVSTChjbGllbnQudXJsY29kZSlcbiAgICAgICAgOiBudWxsO1xuXG4gICAgaWYgKChjbGllbnQgPT0gbnVsbCB8fCBjbGllbnQuc3RhdHVzID09IG51bGwpICYmICF3YWl0UXJDb2RlKVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6ICdDTE9TRUQnLCBxcmNvZGU6IG51bGwgfSk7XG4gICAgZWxzZSBpZiAoY2xpZW50ICE9IG51bGwpXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN0YXR1czogY2xpZW50LnN0YXR1cyxcbiAgICAgICAgcXJjb2RlOiBxcixcbiAgICAgICAgdXJsY29kZTogY2xpZW50LnVybGNvZGUsXG4gICAgICAgIHZlcnNpb246IHZlcnNpb24sXG4gICAgICB9KTtcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXEubG9nZ2VyLmVycm9yKGV4KTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnVGhlIHNlc3Npb24gaXMgbm90IGFjdGl2ZScsXG4gICAgICBlcnJvcjogZXgsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFFyQ29kZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJBdXRoXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLm9wZXJhdGlvbklkID0gJ2dldFFyQ29kZSdcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICovXG4gIHRyeSB7XG4gICAgaWYgKHJlcT8uY2xpZW50Py51cmxjb2RlKSB7XG4gICAgICAvLyBXZSBhZGQgb3B0aW9ucyB0byBnZW5lcmF0ZSB0aGUgUVIgY29kZSBpbiBoaWdoZXIgcmVzb2x1dGlvblxuICAgICAgLy8gVGhlIC9xcmNvZGUtc2Vzc2lvbiByZXF1ZXN0IHdpbGwgbm93IHJldHVybiBhIHJlYWRhYmxlIHFyY29kZS5cbiAgICAgIGNvbnN0IHFyT3B0aW9ucyA9IHtcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6ICdNJyBhcyBjb25zdCxcbiAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycgYXMgY29uc3QsXG4gICAgICAgIHNjYWxlOiA1LFxuICAgICAgICB3aWR0aDogNTAwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHFyID0gcmVxLmNsaWVudC51cmxjb2RlXG4gICAgICAgID8gYXdhaXQgUVJDb2RlLnRvRGF0YVVSTChyZXEuY2xpZW50LnVybGNvZGUsIHFyT3B0aW9ucylcbiAgICAgICAgOiBudWxsO1xuICAgICAgY29uc3QgaW1nID0gQnVmZmVyLmZyb20oXG4gICAgICAgIChxciBhcyBhbnkpLnJlcGxhY2UoL15kYXRhOmltYWdlXFwvKHBuZ3xqcGVnfGpwZyk7YmFzZTY0LC8sICcnKSxcbiAgICAgICAgJ2Jhc2U2NCdcbiAgICAgICk7XG4gICAgICByZXMud3JpdGVIZWFkKDIwMCwge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2ltYWdlL3BuZycsXG4gICAgICAgICdDb250ZW50LUxlbmd0aCc6IGltZy5sZW5ndGgsXG4gICAgICB9KTtcbiAgICAgIHJlcy5lbmQoaW1nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXEuY2xpZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdGF0dXM6IG51bGwsXG4gICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgJ1Nlc3Npb24gbm90IHN0YXJ0ZWQuIFBsZWFzZSwgdXNlIHRoZSAvc3RhcnQtc2Vzc2lvbiByb3V0ZSwgZm9yIGluaXRpYWxpemF0aW9uIHlvdXIgc2Vzc2lvbicsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdGF0dXM6IHJlcS5jbGllbnQuc3RhdHVzLFxuICAgICAgICBtZXNzYWdlOiAnUVJDb2RlIGlzIG5vdCBhdmFpbGFibGUuLi4nLFxuICAgICAgfSk7XG4gICAgfVxuICB9IGNhdGNoIChleCkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXgpO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cyg1MDApXG4gICAgICAuanNvbih7IHN0YXR1czogJ2Vycm9yJywgbWVzc2FnZTogJ0Vycm9yIHJldHJpZXZpbmcgUVJDb2RlJywgZXJyb3I6IGV4IH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBraWxsU2VydmljZVdvcmtlcihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAqICNzd2FnZ2VyLmlnbm9yZT10cnVlXG4gICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJNZXNzYWdlc1wiXVxuICAgICAjc3dhZ2dlci5vcGVyYXRpb25JZCA9ICdraWxsU2VydmljZVdvcmtpZXInXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAqL1xuICB0cnkge1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCByZXNwb25zZTogJ05vdCBpbXBsZW1lbnRlZCB5ZXQnIH0pO1xuICB9IGNhdGNoIChleCkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXgpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdUaGUgc2Vzc2lvbiBpcyBub3QgYWN0aXZlJyxcbiAgICAgIGVycm9yOiBleCxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzdGFydFNlcnZpY2UocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci5pZ25vcmU9dHJ1ZVxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiTWVzc2FnZXNcIl1cbiAgICAgI3N3YWdnZXIub3BlcmF0aW9uSWQgPSAncmVzdGFydFNlcnZpY2UnXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAqL1xuICB0cnkge1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiAnZXJyb3InLCByZXNwb25zZTogJ05vdCBpbXBsZW1lbnRlZCB5ZXQnIH0pO1xuICB9IGNhdGNoIChleCkge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXgpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIHJlc3BvbnNlOiB7IG1lc3NhZ2U6ICdUaGUgc2Vzc2lvbiBpcyBub3QgYWN0aXZlJywgZXJyb3I6IGV4IH0sXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN1YnNjcmliZVByZXNlbmNlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIk1pc2NcIl1cbiAgICAgI3N3YWdnZXIub3BlcmF0aW9uSWQgPSAnc3Vic2NyaWJlUHJlc2VuY2UnXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHBob25lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgaXNHcm91cDogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgICBhbGw6IHsgdHlwZTogXCJib29sZWFuXCIgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4YW1wbGU6IHtcbiAgICAgICAgICAgIHBob25lOiAnNTUyMTk5OTk5OTk5OScsXG4gICAgICAgICAgICBpc0dyb3VwOiBmYWxzZSxcbiAgICAgICAgICAgIGFsbDogZmFsc2UsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgIH1cbiAgICovXG4gIHRyeSB7XG4gICAgY29uc3QgeyBwaG9uZSwgaXNHcm91cCA9IGZhbHNlLCBhbGwgPSBmYWxzZSB9ID0gcmVxLmJvZHk7XG5cbiAgICBpZiAoYWxsKSB7XG4gICAgICBsZXQgY29udGFjdHM7XG4gICAgICBpZiAoaXNHcm91cCkge1xuICAgICAgICBjb25zdCBncm91cHMgPSBhd2FpdCByZXEuY2xpZW50LmdldEFsbEdyb3VwcyhmYWxzZSk7XG4gICAgICAgIGNvbnRhY3RzID0gZ3JvdXBzLm1hcCgocDogYW55KSA9PiBwLmlkLl9zZXJpYWxpemVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNoYXRzID0gYXdhaXQgcmVxLmNsaWVudC5nZXRBbGxDb250YWN0cygpO1xuICAgICAgICBjb250YWN0cyA9IGNoYXRzLm1hcCgoYzogYW55KSA9PiBjLmlkLl9zZXJpYWxpemVkKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHJlcS5jbGllbnQuc3Vic2NyaWJlUHJlc2VuY2UoY29udGFjdHMpO1xuICAgIH0gZWxzZVxuICAgICAgZm9yIChjb25zdCBjb250YXRvIG9mIGNvbnRhY3RUb0FycmF5KHBob25lLCBpc0dyb3VwKSkge1xuICAgICAgICBhd2FpdCByZXEuY2xpZW50LnN1YnNjcmliZVByZXNlbmNlKGNvbnRhdG8pO1xuICAgICAgfVxuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnc3VjY2VzcycsXG4gICAgICByZXNwb25zZTogeyBtZXNzYWdlOiAnU3Vic2NyaWJlIHByZXNlbmNlIGV4ZWN1dGVkJyB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBzdWJzY3JpYmUgcHJlc2VuY2UnLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlZGl0QnVzaW5lc3NQcm9maWxlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIlByb2ZpbGVcIl1cbiAgICAgI3N3YWdnZXIub3BlcmF0aW9uSWQgPSAnZWRpdEJ1c2luZXNzUHJvZmlsZSdcbiAgICogI3N3YWdnZXIuZGVzY3JpcHRpb24gPSAnRWRpdCB5b3VyIGJ1c3NpbmVzcyBwcm9maWxlJ1xuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wib2JqXCJdID0ge1xuICAgICAgaW46ICdib2R5JyxcbiAgICAgIHNjaGVtYToge1xuICAgICAgICAkYWRyZXNzOiAnQXYuIE5vc3NhIFNlbmhvcmEgZGUgQ29wYWNhYmFuYSwgMzE1JyxcbiAgICAgICAgJGVtYWlsOiAndGVzdEB0ZXN0LmNvbS5icicsXG4gICAgICAgICRjYXRlZ29yaWVzOiB7XG4gICAgICAgICAgJGlkOiBcIjEzMzQzNjc0MzM4ODIxN1wiLFxuICAgICAgICAgICRsb2NhbGl6ZWRfZGlzcGxheV9uYW1lOiBcIkFydGVzIGUgZW50cmV0ZW5pbWVudG9cIixcbiAgICAgICAgICAkbm90X2FfYml6OiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgJHdlYnNpdGU6IFtcbiAgICAgICAgICBcImh0dHBzOi8vd3d3LndwcGNvbm5lY3QuaW9cIixcbiAgICAgICAgICBcImh0dHBzOi8vd3d3LnRlc3RlMi5jb20uYnJcIixcbiAgICAgICAgXSxcbiAgICAgIH1cbiAgICAgfVxuICAgICBcbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgYWRyZXNzOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgZW1haWw6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICBjYXRlZ29yaWVzOiB7IHR5cGU6IFwib2JqZWN0XCIgfSxcbiAgICAgICAgICAgICAgd2Vic2l0ZXM6IHsgdHlwZTogXCJhcnJheVwiIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlOiB7XG4gICAgICAgICAgICBhZHJlc3M6ICdBdi4gTm9zc2EgU2VuaG9yYSBkZSBDb3BhY2FiYW5hLCAzMTUnLFxuICAgICAgICAgICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tLmJyJyxcbiAgICAgICAgICAgIGNhdGVnb3JpZXM6IHtcbiAgICAgICAgICAgICAgJGlkOiBcIjEzMzQzNjc0MzM4ODIxN1wiLFxuICAgICAgICAgICAgICAkbG9jYWxpemVkX2Rpc3BsYXlfbmFtZTogXCJBcnRlcyBlIGVudHJldGVuaW1lbnRvXCIsXG4gICAgICAgICAgICAgICRub3RfYV9iaXo6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlYnNpdGU6IFtcbiAgICAgICAgICAgICAgXCJodHRwczovL3d3dy53cHBjb25uZWN0LmlvXCIsXG4gICAgICAgICAgICAgIFwiaHR0cHM6Ly93d3cudGVzdGUyLmNvbS5iclwiLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgfVxuICAgKi9cbiAgdHJ5IHtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihhd2FpdCByZXEuY2xpZW50LmVkaXRCdXNpbmVzc1Byb2ZpbGUocmVxLmJvZHkpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3Igb24gZWRpdCBidXNpbmVzcyBwcm9maWxlJyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxJQUFBQSxHQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxVQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxPQUFBLEdBQUFILHNCQUFBLENBQUFDLE9BQUE7QUFHQSxJQUFBRyxRQUFBLEdBQUFILE9BQUE7QUFDQSxJQUFBSSxPQUFBLEdBQUFMLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSyxrQkFBQSxHQUFBTixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQU0sVUFBQSxHQUFBTixPQUFBO0FBQ0EsSUFBQU8s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