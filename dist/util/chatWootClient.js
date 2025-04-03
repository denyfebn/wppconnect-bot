"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _formData = _interopRequireDefault(require("form-data"));
var _mimeTypes = _interopRequireDefault(require("mime-types"));
var _bufferutils = _interopRequireDefault(require("./bufferutils"));
var _sessionUtil = require("./sessionUtil");
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
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import bufferUtils from './bufferutils';

class chatWootClient {
  constructor(config, session) {
    this.config = config;
    this.mobile_name = this.config.mobile_name ? this.config.mobile_name : `WPPConnect`;
    this.mobile_number = this.config.mobile_number ? this.config.mobile_number : '5511999999999';
    this.sender = {
      pushname: this.mobile_name,
      id: this.mobile_number
    };
    this.account_id = this.config.account_id;
    this.inbox_id = this.config.inbox_id;
    this.api = _axios.default.create({
      baseURL: this.config.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        api_access_token: this.config.token
      }
    });

    //assina o evento do qrcode
    _sessionUtil.eventEmitter.on(`qrcode-${session}`, (qrCode, urlCode, client) => {
      setTimeout(async () => {
        if (config?.chatwoot?.sendQrCode !== false) {
          this.sendMessage(client, {
            sender: this.sender,
            chatId: this.mobile_number + '@c.us',
            type: 'image',
            timestamp: 'qrcode',
            mimetype: 'image/png',
            caption: 'leia o qrCode',
            qrCode: qrCode.replace('data:image/png;base64,', '')
          });
        }
      }, 1000);
    });

    //assiona o evento do status
    _sessionUtil.eventEmitter.on(`status-${session}`, (client, status) => {
      if (config?.chatwoot?.sendStatus !== false) {
        this.sendMessage(client, {
          sender: this.sender,
          chatId: this.mobile_number + '@c.us',
          body: `wppconnect status: ${status} `
        });
      }
    });

    //assina o evento de mensagem
    _sessionUtil.eventEmitter.on(`mensagem-${session}`, (client, message) => {
      this.sendMessage(client, message);
    });
  }

  // async sendMessage(client: any, message: any) {
  //   if (message.isGroupMsg || message.chatId.indexOf('@broadcast') > 0) return;
  //   const contact = await this.createContact(message);
  //   const conversation = await this.createConversation(
  //     contact,
  //     message.chatId.split('@')[0]
  //   );

  //   try {
  //     if (
  //       message.type == 'image' ||
  //       message.type == 'video' ||
  //       message.type == 'in' ||
  //       message.type == 'document' ||
  //       message.type == 'ptt' ||
  //       message.type == 'audio' ||
  //       message.type == 'sticker'
  //     ) {
  //       if (message.mimetype == 'image/webp') message.mimetype = 'image/jpeg';
  //       const extension = mime.extension(message.mimetype);
  //       const filename = `${message.timestamp}.${extension}`;
  //       let b64;

  //       if (message.qrCode) b64 = message.qrCode;
  //       else {
  //         const buffer = await client.decryptFile(message);
  //         b64 = await buffer.toString('base64');
  //       }

  //       const mediaData = Buffer.from(b64, 'base64');

  //       // Create a readable stream from the Buffer
  //       const stream = new Readable();
  //       stream.push(mediaData);
  //       stream.push(null); // Signaling the end of the stream

  //       const data = new FormData();
  //       if (message.caption) {
  //         data.append('content', message.caption);
  //       }

  //       data.append('attachments[]', stream, {
  //         filename: filename,
  //         contentType: message.mimetype,
  //       });

  //       data.append('message_type', 'incoming');
  //       data.append('private', 'false');

  //       const configPost = Object.assign(
  //         {},
  //         {
  //           baseURL: this.config.baseURL,
  //           headers: {
  //             'Content-Type': 'application/json;charset=utf-8',
  //             api_access_token: this.config.token,
  //           },
  //         }
  //       );

  //       configPost.headers = { ...configPost.headers, ...data.getHeaders() };
  //       console.log('PRÉ-REQUEST');
  //       const result = await axios.post(
  //         `api/v1/accounts/${this.account_id}/conversations/${conversation.id}/messages`,
  //         data,
  //         configPost
  //       );
  //       console.log('POS-REQUEST');
  //       return result;
  //     } else {
  //       const body = {
  //         content: message.body,
  //         message_type: 'incoming',
  //       };
  //       const { data } = await this.api.post(
  //         `api/v1/accounts/${this.account_id}/conversations/${conversation.id}/messages`,
  //         body
  //       );
  //       return data;
  //     }
  //   } catch (e) {
  //     return null;
  //   }
  // }

  async sendMessage(client, message) {
    if (message.isGroupMsg || message.chatId.indexOf('@broadcast') > 0) return;
    const contact = await this.createContact(message);
    const conversation = await this.createConversation(contact, message.chatId.split('@')[0]);
    try {
      if (['image', 'video', 'in', 'document', 'ptt', 'audio', 'sticker'].includes(message.type)) {
        if (message.mimetype === 'image/webp') message.mimetype = 'image/jpeg';
        const extension = _mimeTypes.default.extension(message.mimetype);
        const filename = `${message.timestamp}.${extension}`;
        let b64;
        if (message.qrCode) {
          b64 = message.qrCode;
        } else {
          const buffer = await client.decryptFile(message);
          b64 = buffer.toString('base64');
        }
        const mediaData = Buffer.from(b64, 'base64');
        const stream = _bufferutils.default.bufferToReadableStream(mediaData);
        const data = new _formData.default();
        if (message.caption) {
          data.append('content', message.caption);
        }
        data.append('attachments[]', stream, {
          filename: filename,
          contentType: message.mimetype
        });
        data.append('message_type', 'incoming');
        data.append('private', 'false');
        const configPost = {
          baseURL: this.config.baseURL,
          headers: {
            api_access_token: this.config.token,
            ...data.getHeaders()
          }
        };
        const endpoint = `api/v1/accounts/${this.account_id}/conversations/${conversation.id}/messages`;
        const result = await _axios.default.post(endpoint, data, configPost);
        return result;
      } else {
        const body = {
          content: message.body,
          message_type: 'incoming'
        };
        const endpoint = `api/v1/accounts/${this.account_id}/conversations/${conversation.id}/messages`;
        const {
          data
        } = await this.api.post(endpoint, body);
        return data;
      }
    } catch (e) {
      console.error('Error sending message:', e);
      return null;
    }
  }
  async findContact(query) {
    try {
      const {
        data
      } = await this.api.get(`api/v1/accounts/${this.account_id}/contacts/search/?q=${query}`);
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async createContact(message) {
    const body = {
      inbox_id: this.inbox_id,
      name: message.sender.isMyContact ? message.sender.formattedName : message.sender.pushname || message.sender.formattedName,
      phone_number: typeof message.sender.id == 'object' ? message.sender.id.user : message.sender.id.split('@')[0]
    };
    body.phone_number = `+${body.phone_number}`;
    const contact = await this.findContact(body.phone_number.replace('+', ''));
    if (contact && contact.meta.count > 0) return contact.payload[0];
    try {
      const data = await this.api.post(`api/v1/accounts/${this.account_id}/contacts`, body);
      return data.data.payload.contact;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async findConversation(contact) {
    try {
      const {
        data
      } = await this.api.get(`api/v1/accounts/${this.account_id}/contacts/${contact.id}/conversations`);
      return data.payload.find(e => e.inbox_id == this.inbox_id && e.status != 'resolved');
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async createConversation(contact, source_id) {
    const conversation = await this.findConversation(contact);
    if (conversation) return conversation;
    const body = {
      source_id: source_id,
      inbox_id: this.inbox_id,
      contact_id: contact.id,
      status: 'open'
    };
    try {
      const {
        data
      } = await this.api.post(`api/v1/accounts/${this.account_id}/conversations`, body);
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
exports.default = chatWootClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYXhpb3MiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9mb3JtRGF0YSIsIl9taW1lVHlwZXMiLCJfYnVmZmVydXRpbHMiLCJfc2Vzc2lvblV0aWwiLCJlIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJjaGF0V29vdENsaWVudCIsImNvbnN0cnVjdG9yIiwiY29uZmlnIiwic2Vzc2lvbiIsIm1vYmlsZV9uYW1lIiwibW9iaWxlX251bWJlciIsInNlbmRlciIsInB1c2huYW1lIiwiaWQiLCJhY2NvdW50X2lkIiwiaW5ib3hfaWQiLCJhcGkiLCJheGlvcyIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXJzIiwiYXBpX2FjY2Vzc190b2tlbiIsInRva2VuIiwiZXZlbnRFbWl0dGVyIiwib24iLCJxckNvZGUiLCJ1cmxDb2RlIiwiY2xpZW50Iiwic2V0VGltZW91dCIsImNoYXR3b290Iiwic2VuZFFyQ29kZSIsInNlbmRNZXNzYWdlIiwiY2hhdElkIiwidHlwZSIsInRpbWVzdGFtcCIsIm1pbWV0eXBlIiwiY2FwdGlvbiIsInJlcGxhY2UiLCJzdGF0dXMiLCJzZW5kU3RhdHVzIiwiYm9keSIsIm1lc3NhZ2UiLCJpc0dyb3VwTXNnIiwiaW5kZXhPZiIsImNvbnRhY3QiLCJjcmVhdGVDb250YWN0IiwiY29udmVyc2F0aW9uIiwiY3JlYXRlQ29udmVyc2F0aW9uIiwic3BsaXQiLCJpbmNsdWRlcyIsImV4dGVuc2lvbiIsIm1pbWUiLCJmaWxlbmFtZSIsImI2NCIsImJ1ZmZlciIsImRlY3J5cHRGaWxlIiwidG9TdHJpbmciLCJtZWRpYURhdGEiLCJCdWZmZXIiLCJmcm9tIiwic3RyZWFtIiwiYnVmZmVydXRpbHMiLCJidWZmZXJUb1JlYWRhYmxlU3RyZWFtIiwiZGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiY29udGVudFR5cGUiLCJjb25maWdQb3N0IiwiZ2V0SGVhZGVycyIsImVuZHBvaW50IiwicmVzdWx0IiwicG9zdCIsImNvbnRlbnQiLCJtZXNzYWdlX3R5cGUiLCJjb25zb2xlIiwiZXJyb3IiLCJmaW5kQ29udGFjdCIsInF1ZXJ5IiwiZ2V0IiwibG9nIiwibmFtZSIsImlzTXlDb250YWN0IiwiZm9ybWF0dGVkTmFtZSIsInBob25lX251bWJlciIsInVzZXIiLCJtZXRhIiwiY291bnQiLCJwYXlsb2FkIiwiZmluZENvbnZlcnNhdGlvbiIsImZpbmQiLCJzb3VyY2VfaWQiLCJjb250YWN0X2lkIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2NoYXRXb290Q2xpZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMSBXUFBDb25uZWN0IFRlYW1cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCBheGlvcywgeyBBeGlvc0luc3RhbmNlLCBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIEZvcm1EYXRhIH0gZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCBtaW1lIGZyb20gJ21pbWUtdHlwZXMnO1xuXG5pbXBvcnQgYnVmZmVydXRpbHMgZnJvbSAnLi9idWZmZXJ1dGlscyc7XG4vLyBpbXBvcnQgYnVmZmVyVXRpbHMgZnJvbSAnLi9idWZmZXJ1dGlscyc7XG5pbXBvcnQgeyBldmVudEVtaXR0ZXIgfSBmcm9tICcuL3Nlc3Npb25VdGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgY2hhdFdvb3RDbGllbnQge1xuICBkZWNsYXJlIGNvbmZpZzogYW55O1xuICBkZWNsYXJlIHNlc3Npb246IGFueTtcbiAgZGVjbGFyZSBtb2JpbGVfbmFtZTogYW55O1xuICBkZWNsYXJlIG1vYmlsZV9udW1iZXI6IGFueTtcbiAgZGVjbGFyZSBzZW5kZXI6IGFueTtcbiAgZGVjbGFyZSBhY2NvdW50X2lkOiBhbnk7XG4gIGRlY2xhcmUgaW5ib3hfaWQ6IGFueTtcbiAgZGVjbGFyZSBhcGk6IEF4aW9zSW5zdGFuY2U7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBhbnksIHNlc3Npb246IHN0cmluZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMubW9iaWxlX25hbWUgPSB0aGlzLmNvbmZpZy5tb2JpbGVfbmFtZVxuICAgICAgPyB0aGlzLmNvbmZpZy5tb2JpbGVfbmFtZVxuICAgICAgOiBgV1BQQ29ubmVjdGA7XG4gICAgdGhpcy5tb2JpbGVfbnVtYmVyID0gdGhpcy5jb25maWcubW9iaWxlX251bWJlclxuICAgICAgPyB0aGlzLmNvbmZpZy5tb2JpbGVfbnVtYmVyXG4gICAgICA6ICc1NTExOTk5OTk5OTk5JztcbiAgICB0aGlzLnNlbmRlciA9IHtcbiAgICAgIHB1c2huYW1lOiB0aGlzLm1vYmlsZV9uYW1lLFxuICAgICAgaWQ6IHRoaXMubW9iaWxlX251bWJlcixcbiAgICB9O1xuICAgIHRoaXMuYWNjb3VudF9pZCA9IHRoaXMuY29uZmlnLmFjY291bnRfaWQ7XG4gICAgdGhpcy5pbmJveF9pZCA9IHRoaXMuY29uZmlnLmluYm94X2lkO1xuICAgIHRoaXMuYXBpID0gYXhpb3MuY3JlYXRlKHtcbiAgICAgIGJhc2VVUkw6IHRoaXMuY29uZmlnLmJhc2VVUkwsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgYXBpX2FjY2Vzc190b2tlbjogdGhpcy5jb25maWcudG9rZW4sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy9hc3NpbmEgbyBldmVudG8gZG8gcXJjb2RlXG4gICAgZXZlbnRFbWl0dGVyLm9uKGBxcmNvZGUtJHtzZXNzaW9ufWAsIChxckNvZGUsIHVybENvZGUsIGNsaWVudCkgPT4ge1xuICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChjb25maWc/LmNoYXR3b290Py5zZW5kUXJDb2RlICE9PSBmYWxzZSkge1xuICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoY2xpZW50LCB7XG4gICAgICAgICAgICBzZW5kZXI6IHRoaXMuc2VuZGVyLFxuICAgICAgICAgICAgY2hhdElkOiB0aGlzLm1vYmlsZV9udW1iZXIgKyAnQGMudXMnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogJ3FyY29kZScsXG4gICAgICAgICAgICBtaW1ldHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBjYXB0aW9uOiAnbGVpYSBvIHFyQ29kZScsXG4gICAgICAgICAgICBxckNvZGU6IHFyQ29kZS5yZXBsYWNlKCdkYXRhOmltYWdlL3BuZztiYXNlNjQsJywgJycpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcblxuICAgIC8vYXNzaW9uYSBvIGV2ZW50byBkbyBzdGF0dXNcbiAgICBldmVudEVtaXR0ZXIub24oYHN0YXR1cy0ke3Nlc3Npb259YCwgKGNsaWVudCwgc3RhdHVzKSA9PiB7XG4gICAgICBpZiAoY29uZmlnPy5jaGF0d29vdD8uc2VuZFN0YXR1cyAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShjbGllbnQsIHtcbiAgICAgICAgICBzZW5kZXI6IHRoaXMuc2VuZGVyLFxuICAgICAgICAgIGNoYXRJZDogdGhpcy5tb2JpbGVfbnVtYmVyICsgJ0BjLnVzJyxcbiAgICAgICAgICBib2R5OiBgd3BwY29ubmVjdCBzdGF0dXM6ICR7c3RhdHVzfSBgLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vYXNzaW5hIG8gZXZlbnRvIGRlIG1lbnNhZ2VtXG4gICAgZXZlbnRFbWl0dGVyLm9uKGBtZW5zYWdlbS0ke3Nlc3Npb259YCwgKGNsaWVudCwgbWVzc2FnZSkgPT4ge1xuICAgICAgdGhpcy5zZW5kTWVzc2FnZShjbGllbnQsIG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gYXN5bmMgc2VuZE1lc3NhZ2UoY2xpZW50OiBhbnksIG1lc3NhZ2U6IGFueSkge1xuICAvLyAgIGlmIChtZXNzYWdlLmlzR3JvdXBNc2cgfHwgbWVzc2FnZS5jaGF0SWQuaW5kZXhPZignQGJyb2FkY2FzdCcpID4gMCkgcmV0dXJuO1xuICAvLyAgIGNvbnN0IGNvbnRhY3QgPSBhd2FpdCB0aGlzLmNyZWF0ZUNvbnRhY3QobWVzc2FnZSk7XG4gIC8vICAgY29uc3QgY29udmVyc2F0aW9uID0gYXdhaXQgdGhpcy5jcmVhdGVDb252ZXJzYXRpb24oXG4gIC8vICAgICBjb250YWN0LFxuICAvLyAgICAgbWVzc2FnZS5jaGF0SWQuc3BsaXQoJ0AnKVswXVxuICAvLyAgICk7XG5cbiAgLy8gICB0cnkge1xuICAvLyAgICAgaWYgKFxuICAvLyAgICAgICBtZXNzYWdlLnR5cGUgPT0gJ2ltYWdlJyB8fFxuICAvLyAgICAgICBtZXNzYWdlLnR5cGUgPT0gJ3ZpZGVvJyB8fFxuICAvLyAgICAgICBtZXNzYWdlLnR5cGUgPT0gJ2luJyB8fFxuICAvLyAgICAgICBtZXNzYWdlLnR5cGUgPT0gJ2RvY3VtZW50JyB8fFxuICAvLyAgICAgICBtZXNzYWdlLnR5cGUgPT0gJ3B0dCcgfHxcbiAgLy8gICAgICAgbWVzc2FnZS50eXBlID09ICdhdWRpbycgfHxcbiAgLy8gICAgICAgbWVzc2FnZS50eXBlID09ICdzdGlja2VyJ1xuICAvLyAgICAgKSB7XG4gIC8vICAgICAgIGlmIChtZXNzYWdlLm1pbWV0eXBlID09ICdpbWFnZS93ZWJwJykgbWVzc2FnZS5taW1ldHlwZSA9ICdpbWFnZS9qcGVnJztcbiAgLy8gICAgICAgY29uc3QgZXh0ZW5zaW9uID0gbWltZS5leHRlbnNpb24obWVzc2FnZS5taW1ldHlwZSk7XG4gIC8vICAgICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7bWVzc2FnZS50aW1lc3RhbXB9LiR7ZXh0ZW5zaW9ufWA7XG4gIC8vICAgICAgIGxldCBiNjQ7XG5cbiAgLy8gICAgICAgaWYgKG1lc3NhZ2UucXJDb2RlKSBiNjQgPSBtZXNzYWdlLnFyQ29kZTtcbiAgLy8gICAgICAgZWxzZSB7XG4gIC8vICAgICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgY2xpZW50LmRlY3J5cHRGaWxlKG1lc3NhZ2UpO1xuICAvLyAgICAgICAgIGI2NCA9IGF3YWl0IGJ1ZmZlci50b1N0cmluZygnYmFzZTY0Jyk7XG4gIC8vICAgICAgIH1cblxuICAvLyAgICAgICBjb25zdCBtZWRpYURhdGEgPSBCdWZmZXIuZnJvbShiNjQsICdiYXNlNjQnKTtcblxuICAvLyAgICAgICAvLyBDcmVhdGUgYSByZWFkYWJsZSBzdHJlYW0gZnJvbSB0aGUgQnVmZmVyXG4gIC8vICAgICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBSZWFkYWJsZSgpO1xuICAvLyAgICAgICBzdHJlYW0ucHVzaChtZWRpYURhdGEpO1xuICAvLyAgICAgICBzdHJlYW0ucHVzaChudWxsKTsgLy8gU2lnbmFsaW5nIHRoZSBlbmQgb2YgdGhlIHN0cmVhbVxuXG4gIC8vICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgLy8gICAgICAgaWYgKG1lc3NhZ2UuY2FwdGlvbikge1xuICAvLyAgICAgICAgIGRhdGEuYXBwZW5kKCdjb250ZW50JywgbWVzc2FnZS5jYXB0aW9uKTtcbiAgLy8gICAgICAgfVxuXG4gIC8vICAgICAgIGRhdGEuYXBwZW5kKCdhdHRhY2htZW50c1tdJywgc3RyZWFtLCB7XG4gIC8vICAgICAgICAgZmlsZW5hbWU6IGZpbGVuYW1lLFxuICAvLyAgICAgICAgIGNvbnRlbnRUeXBlOiBtZXNzYWdlLm1pbWV0eXBlLFxuICAvLyAgICAgICB9KTtcblxuICAvLyAgICAgICBkYXRhLmFwcGVuZCgnbWVzc2FnZV90eXBlJywgJ2luY29taW5nJyk7XG4gIC8vICAgICAgIGRhdGEuYXBwZW5kKCdwcml2YXRlJywgJ2ZhbHNlJyk7XG5cbiAgLy8gICAgICAgY29uc3QgY29uZmlnUG9zdCA9IE9iamVjdC5hc3NpZ24oXG4gIC8vICAgICAgICAge30sXG4gIC8vICAgICAgICAge1xuICAvLyAgICAgICAgICAgYmFzZVVSTDogdGhpcy5jb25maWcuYmFzZVVSTCxcbiAgLy8gICAgICAgICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnLFxuICAvLyAgICAgICAgICAgICBhcGlfYWNjZXNzX3Rva2VuOiB0aGlzLmNvbmZpZy50b2tlbixcbiAgLy8gICAgICAgICAgIH0sXG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICApO1xuXG4gIC8vICAgICAgIGNvbmZpZ1Bvc3QuaGVhZGVycyA9IHsgLi4uY29uZmlnUG9zdC5oZWFkZXJzLCAuLi5kYXRhLmdldEhlYWRlcnMoKSB9O1xuICAvLyAgICAgICBjb25zb2xlLmxvZygnUFLDiS1SRVFVRVNUJyk7XG4gIC8vICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGF4aW9zLnBvc3QoXG4gIC8vICAgICAgICAgYGFwaS92MS9hY2NvdW50cy8ke3RoaXMuYWNjb3VudF9pZH0vY29udmVyc2F0aW9ucy8ke2NvbnZlcnNhdGlvbi5pZH0vbWVzc2FnZXNgLFxuICAvLyAgICAgICAgIGRhdGEsXG4gIC8vICAgICAgICAgY29uZmlnUG9zdFxuICAvLyAgICAgICApO1xuICAvLyAgICAgICBjb25zb2xlLmxvZygnUE9TLVJFUVVFU1QnKTtcbiAgLy8gICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgLy8gICAgIH0gZWxzZSB7XG4gIC8vICAgICAgIGNvbnN0IGJvZHkgPSB7XG4gIC8vICAgICAgICAgY29udGVudDogbWVzc2FnZS5ib2R5LFxuICAvLyAgICAgICAgIG1lc3NhZ2VfdHlwZTogJ2luY29taW5nJyxcbiAgLy8gICAgICAgfTtcbiAgLy8gICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLmFwaS5wb3N0KFxuICAvLyAgICAgICAgIGBhcGkvdjEvYWNjb3VudHMvJHt0aGlzLmFjY291bnRfaWR9L2NvbnZlcnNhdGlvbnMvJHtjb252ZXJzYXRpb24uaWR9L21lc3NhZ2VzYCxcbiAgLy8gICAgICAgICBib2R5XG4gIC8vICAgICAgICk7XG4gIC8vICAgICAgIHJldHVybiBkYXRhO1xuICAvLyAgICAgfVxuICAvLyAgIH0gY2F0Y2ggKGUpIHtcbiAgLy8gICAgIHJldHVybiBudWxsO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGFzeW5jIHNlbmRNZXNzYWdlKGNsaWVudDogYW55LCBtZXNzYWdlOiBhbnkpIHtcbiAgICBpZiAobWVzc2FnZS5pc0dyb3VwTXNnIHx8IG1lc3NhZ2UuY2hhdElkLmluZGV4T2YoJ0Bicm9hZGNhc3QnKSA+IDApIHJldHVybjtcblxuICAgIGNvbnN0IGNvbnRhY3QgPSBhd2FpdCB0aGlzLmNyZWF0ZUNvbnRhY3QobWVzc2FnZSk7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gYXdhaXQgdGhpcy5jcmVhdGVDb252ZXJzYXRpb24oXG4gICAgICBjb250YWN0LFxuICAgICAgbWVzc2FnZS5jaGF0SWQuc3BsaXQoJ0AnKVswXVxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKFxuICAgICAgICBbXG4gICAgICAgICAgJ2ltYWdlJyxcbiAgICAgICAgICAndmlkZW8nLFxuICAgICAgICAgICdpbicsXG4gICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAncHR0JyxcbiAgICAgICAgICAnYXVkaW8nLFxuICAgICAgICAgICdzdGlja2VyJyxcbiAgICAgICAgXS5pbmNsdWRlcyhtZXNzYWdlLnR5cGUpXG4gICAgICApIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UubWltZXR5cGUgPT09ICdpbWFnZS93ZWJwJykgbWVzc2FnZS5taW1ldHlwZSA9ICdpbWFnZS9qcGVnJztcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uID0gbWltZS5leHRlbnNpb24obWVzc2FnZS5taW1ldHlwZSk7XG4gICAgICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7bWVzc2FnZS50aW1lc3RhbXB9LiR7ZXh0ZW5zaW9ufWA7XG4gICAgICAgIGxldCBiNjQ7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UucXJDb2RlKSB7XG4gICAgICAgICAgYjY0ID0gbWVzc2FnZS5xckNvZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgY2xpZW50LmRlY3J5cHRGaWxlKG1lc3NhZ2UpO1xuICAgICAgICAgIGI2NCA9IGJ1ZmZlci50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZWRpYURhdGEgPSBCdWZmZXIuZnJvbShiNjQsICdiYXNlNjQnKTtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gYnVmZmVydXRpbHMuYnVmZmVyVG9SZWFkYWJsZVN0cmVhbShtZWRpYURhdGEpO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UuY2FwdGlvbikge1xuICAgICAgICAgIGRhdGEuYXBwZW5kKCdjb250ZW50JywgbWVzc2FnZS5jYXB0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEuYXBwZW5kKCdhdHRhY2htZW50c1tdJywgc3RyZWFtLCB7XG4gICAgICAgICAgZmlsZW5hbWU6IGZpbGVuYW1lLFxuICAgICAgICAgIGNvbnRlbnRUeXBlOiBtZXNzYWdlLm1pbWV0eXBlLFxuICAgICAgICB9KTtcblxuICAgICAgICBkYXRhLmFwcGVuZCgnbWVzc2FnZV90eXBlJywgJ2luY29taW5nJyk7XG4gICAgICAgIGRhdGEuYXBwZW5kKCdwcml2YXRlJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgY29uc3QgY29uZmlnUG9zdDogQXhpb3NSZXF1ZXN0Q29uZmlnID0ge1xuICAgICAgICAgIGJhc2VVUkw6IHRoaXMuY29uZmlnLmJhc2VVUkwsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgYXBpX2FjY2Vzc190b2tlbjogdGhpcy5jb25maWcudG9rZW4sXG4gICAgICAgICAgICAuLi5kYXRhLmdldEhlYWRlcnMoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlbmRwb2ludCA9IGBhcGkvdjEvYWNjb3VudHMvJHt0aGlzLmFjY291bnRfaWR9L2NvbnZlcnNhdGlvbnMvJHtjb252ZXJzYXRpb24uaWR9L21lc3NhZ2VzYDtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBheGlvcy5wb3N0KGVuZHBvaW50LCBkYXRhLCBjb25maWdQb3N0KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYm9keSA9IHtcbiAgICAgICAgICBjb250ZW50OiBtZXNzYWdlLmJvZHksXG4gICAgICAgICAgbWVzc2FnZV90eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlbmRwb2ludCA9IGBhcGkvdjEvYWNjb3VudHMvJHt0aGlzLmFjY291bnRfaWR9L2NvbnZlcnNhdGlvbnMvJHtjb252ZXJzYXRpb24uaWR9L21lc3NhZ2VzYDtcblxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuYXBpLnBvc3QoZW5kcG9pbnQsIGJvZHkpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzZW5kaW5nIG1lc3NhZ2U6JywgZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmaW5kQ29udGFjdChxdWVyeTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5hcGkuZ2V0KFxuICAgICAgICBgYXBpL3YxL2FjY291bnRzLyR7dGhpcy5hY2NvdW50X2lkfS9jb250YWN0cy9zZWFyY2gvP3E9JHtxdWVyeX1gXG4gICAgICApO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjcmVhdGVDb250YWN0KG1lc3NhZ2U6IGFueSkge1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBpbmJveF9pZDogdGhpcy5pbmJveF9pZCxcbiAgICAgIG5hbWU6IG1lc3NhZ2Uuc2VuZGVyLmlzTXlDb250YWN0XG4gICAgICAgID8gbWVzc2FnZS5zZW5kZXIuZm9ybWF0dGVkTmFtZVxuICAgICAgICA6IG1lc3NhZ2Uuc2VuZGVyLnB1c2huYW1lIHx8IG1lc3NhZ2Uuc2VuZGVyLmZvcm1hdHRlZE5hbWUsXG4gICAgICBwaG9uZV9udW1iZXI6XG4gICAgICAgIHR5cGVvZiBtZXNzYWdlLnNlbmRlci5pZCA9PSAnb2JqZWN0J1xuICAgICAgICAgID8gbWVzc2FnZS5zZW5kZXIuaWQudXNlclxuICAgICAgICAgIDogbWVzc2FnZS5zZW5kZXIuaWQuc3BsaXQoJ0AnKVswXSxcbiAgICB9O1xuICAgIGJvZHkucGhvbmVfbnVtYmVyID0gYCske2JvZHkucGhvbmVfbnVtYmVyfWA7XG4gICAgY29uc3QgY29udGFjdCA9IGF3YWl0IHRoaXMuZmluZENvbnRhY3QoYm9keS5waG9uZV9udW1iZXIucmVwbGFjZSgnKycsICcnKSk7XG4gICAgaWYgKGNvbnRhY3QgJiYgY29udGFjdC5tZXRhLmNvdW50ID4gMCkgcmV0dXJuIGNvbnRhY3QucGF5bG9hZFswXTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5hcGkucG9zdChcbiAgICAgICAgYGFwaS92MS9hY2NvdW50cy8ke3RoaXMuYWNjb3VudF9pZH0vY29udGFjdHNgLFxuICAgICAgICBib2R5XG4gICAgICApO1xuICAgICAgcmV0dXJuIGRhdGEuZGF0YS5wYXlsb2FkLmNvbnRhY3Q7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmaW5kQ29udmVyc2F0aW9uKGNvbnRhY3Q6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuYXBpLmdldChcbiAgICAgICAgYGFwaS92MS9hY2NvdW50cy8ke3RoaXMuYWNjb3VudF9pZH0vY29udGFjdHMvJHtjb250YWN0LmlkfS9jb252ZXJzYXRpb25zYFxuICAgICAgKTtcbiAgICAgIHJldHVybiBkYXRhLnBheWxvYWQuZmluZChcbiAgICAgICAgKGU6IGFueSkgPT4gZS5pbmJveF9pZCA9PSB0aGlzLmluYm94X2lkICYmIGUuc3RhdHVzICE9ICdyZXNvbHZlZCdcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjcmVhdGVDb252ZXJzYXRpb24oY29udGFjdDogYW55LCBzb3VyY2VfaWQ6IGFueSkge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGF3YWl0IHRoaXMuZmluZENvbnZlcnNhdGlvbihjb250YWN0KTtcbiAgICBpZiAoY29udmVyc2F0aW9uKSByZXR1cm4gY29udmVyc2F0aW9uO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIHNvdXJjZV9pZDogc291cmNlX2lkLFxuICAgICAgaW5ib3hfaWQ6IHRoaXMuaW5ib3hfaWQsXG4gICAgICBjb250YWN0X2lkOiBjb250YWN0LmlkLFxuICAgICAgc3RhdHVzOiAnb3BlbicsXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuYXBpLnBvc3QoXG4gICAgICAgIGBhcGkvdjEvYWNjb3VudHMvJHt0aGlzLmFjY291bnRfaWR9L2NvbnZlcnNhdGlvbnNgLFxuICAgICAgICBib2R5XG4gICAgICApO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBZUEsSUFBQUEsTUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsU0FBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUUsVUFBQSxHQUFBSCxzQkFBQSxDQUFBQyxPQUFBO0FBRUEsSUFBQUcsWUFBQSxHQUFBSixzQkFBQSxDQUFBQyxPQUFBO0FBRUEsSUFBQUksWUFBQSxHQUFBSixPQUFBO0FBQTZDLFNBQUFELHVCQUFBTSxDQUFBLFdBQUFBLENBQUEsSUFBQUEsQ0FBQSxDQUFBQyxVQUFBLEdBQUFELENBQUEsS0FBQUUsT0FBQSxFQUFBRixDQUFBO0FBckI3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LE9BQU8sQ0FBQ0ssR0FBRyxDQUFDN0UsQ0FBQyxDQUFDO01BQ2QsT0FBTyxJQUFJO0lBQ2I7RUFDRjtFQUVBLE1BQU1zRixnQkFBZ0JBLENBQUM1QyxPQUFZLEVBQUU7SUFDbkMsSUFBSTtNQUNGLE1BQU07UUFBRW1CO01BQUssQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDL0MsR0FBRyxDQUFDOEQsR0FBRyxDQUNqQyxtQkFBbUIsSUFBSSxDQUFDaEUsVUFBVSxhQUFhOEIsT0FBTyxDQUFDL0IsRUFBRSxnQkFDM0QsQ0FBQztNQUNELE9BQU9rRCxJQUFJLENBQUN3QixPQUFPLENBQUNFLElBQUksQ0FDckJ2RixDQUFNLElBQUtBLENBQUMsQ0FBQ2EsUUFBUSxJQUFJLElBQUksQ0FBQ0EsUUFBUSxJQUFJYixDQUFDLENBQUNvQyxNQUFNLElBQUksVUFDekQsQ0FBQztJQUNILENBQUMsQ0FBQyxPQUFPcEMsQ0FBQyxFQUFFO01BQ1Z3RSxPQUFPLENBQUNLLEdBQUcsQ0FBQzdFLENBQUMsQ0FBQztNQUNkLE9BQU8sSUFBSTtJQUNiO0VBQ0Y7RUFFQSxNQUFNNkMsa0JBQWtCQSxDQUFDSCxPQUFZLEVBQUU4QyxTQUFjLEVBQUU7SUFDckQsTUFBTTVDLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQzBDLGdCQUFnQixDQUFDNUMsT0FBTyxDQUFDO0lBQ3pELElBQUlFLFlBQVksRUFBRSxPQUFPQSxZQUFZO0lBRXJDLE1BQU1OLElBQUksR0FBRztNQUNYa0QsU0FBUyxFQUFFQSxTQUFTO01BQ3BCM0UsUUFBUSxFQUFFLElBQUksQ0FBQ0EsUUFBUTtNQUN2QjRFLFVBQVUsRUFBRS9DLE9BQU8sQ0FBQy9CLEVBQUU7TUFDdEJ5QixNQUFNLEVBQUU7SUFDVixDQUFDO0lBRUQsSUFBSTtNQUNGLE1BQU07UUFBRXlCO01BQUssQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDL0MsR0FBRyxDQUFDdUQsSUFBSSxDQUNsQyxtQkFBbUIsSUFBSSxDQUFDekQsVUFBVSxnQkFBZ0IsRUFDbEQwQixJQUNGLENBQUM7TUFDRCxPQUFPdUIsSUFBSTtJQUNiLENBQUMsQ0FBQyxPQUFPN0QsQ0FBQyxFQUFFO01BQ1Z3RSxPQUFPLENBQUNLLEdBQUcsQ0FBQzdFLENBQUMsQ0FBQztNQUNkLE9BQU8sSUFBSTtJQUNiO0VBQ0Y7QUFDRjtBQUFDMEYsT0FBQSxDQUFBeEYsT0FBQSxHQUFBQyxjQUFBIiwiaWdub3JlTGlzdCI6W119