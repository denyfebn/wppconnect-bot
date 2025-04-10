"use strict";

var _swaggerAutogen = _interopRequireDefault(require("swagger-autogen"));
var _config = _interopRequireDefault(require("./config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/*
 * Copyright 2023 WPPConnect Team
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

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/routes/index.ts'];
const doc = {
  info: {
    version: '2.0.0',
    title: 'WPPConnect API Rest',
    description: 'Welcome to the wppconnect-server API documentation. This API provides a set of endpoints to interact with the wppconnect-server application, allowing you to build integrations and automate interactions with WhatsApp.'
  },
  host: `${_config.default.host}:${_config.default.port}`,
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  tags: [{
    name: 'Auth',
    description: ''
  }, {
    name: 'Chat',
    description: 'Manages chat-related operations.'
  }, {
    name: 'Contact',
    description: 'Handles operations related to contacts, such as managing contact lists, adding or removing contacts, and retrieving contact information.'
  }, {
    name: 'Catalog & Bussiness',
    description: 'Handles operations related to catalogs and business-related functionalities, such as managing product catalogs and business information.'
  }, {
    name: 'Community',
    description: 'Manage communities.'
  }, {
    name: 'Messages',
    description: 'Handles message-related operations, including sending, receiving, and managing messages.'
  }, {
    name: 'Profile',
    description: 'Manages user profile-related operations, such as retrieving and updating profile information'
  }, {
    name: 'Status Stories',
    description: 'Handles operations related to status stories, such as viewing, updating, and managing status stories'
  }, {
    name: 'Labels',
    description: 'Manages labels or tags associated with chats or messages for organization and categorization purposes.'
  }, {
    name: 'Group',
    description: 'Manages operations related to WhatsApp groups, such as creating, modifying, and managing group settings.'
  }, {
    name: 'Misc',
    description: 'Handles miscellaneous operations that do not fit into other specific categories.'
  }],
  definitions: {},
  components: {
    '@schemas': {
      session: {
        type: 'string',
        schema: 'NERDWHATS_AMERICA'
      }
    }
  }
};
(0, _swaggerAutogen.default)({
  openapi: '3.0.0'
})(outputFile, endpointsFiles, doc);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc3dhZ2dlckF1dG9nZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9jb25maWciLCJlIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJvdXRwdXRGaWxlIiwiZW5kcG9pbnRzRmlsZXMiLCJkb2MiLCJpbmZvIiwidmVyc2lvbiIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJob3N0IiwiY29uZmlnIiwicG9ydCIsInNlY3VyaXR5RGVmaW5pdGlvbnMiLCJiZWFyZXJBdXRoIiwidHlwZSIsInNjaGVtZSIsImJlYXJlckZvcm1hdCIsInRhZ3MiLCJuYW1lIiwiZGVmaW5pdGlvbnMiLCJjb21wb25lbnRzIiwic2Vzc2lvbiIsInNjaGVtYSIsInN3YWdnZXJBdXRvZ2VuIiwib3BlbmFwaSJdLCJzb3VyY2VzIjpbIi4uL3NyYy9zd2FnZ2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyMyBXUFBDb25uZWN0IFRlYW1cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCBzd2FnZ2VyQXV0b2dlbiBmcm9tICdzd2FnZ2VyLWF1dG9nZW4nO1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuY29uc3Qgb3V0cHV0RmlsZSA9ICcuL3NyYy9zd2FnZ2VyLmpzb24nO1xuY29uc3QgZW5kcG9pbnRzRmlsZXMgPSBbJy4vc3JjL3JvdXRlcy9pbmRleC50cyddO1xuXG5jb25zdCBkb2MgPSB7XG4gIGluZm86IHtcbiAgICB2ZXJzaW9uOiAnMi4wLjAnLFxuICAgIHRpdGxlOiAnV1BQQ29ubmVjdCBBUEkgUmVzdCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnV2VsY29tZSB0byB0aGUgd3BwY29ubmVjdC1zZXJ2ZXIgQVBJIGRvY3VtZW50YXRpb24uIFRoaXMgQVBJIHByb3ZpZGVzIGEgc2V0IG9mIGVuZHBvaW50cyB0byBpbnRlcmFjdCB3aXRoIHRoZSB3cHBjb25uZWN0LXNlcnZlciBhcHBsaWNhdGlvbiwgYWxsb3dpbmcgeW91IHRvIGJ1aWxkIGludGVncmF0aW9ucyBhbmQgYXV0b21hdGUgaW50ZXJhY3Rpb25zIHdpdGggV2hhdHNBcHAuJyxcbiAgfSxcbiAgaG9zdDogYCR7Y29uZmlnLmhvc3R9OiR7Y29uZmlnLnBvcnR9YCxcbiAgc2VjdXJpdHlEZWZpbml0aW9uczoge1xuICAgIGJlYXJlckF1dGg6IHtcbiAgICAgIHR5cGU6ICdodHRwJyxcbiAgICAgIHNjaGVtZTogJ2JlYXJlcicsXG4gICAgICBiZWFyZXJGb3JtYXQ6ICdKV1QnLFxuICAgIH0sXG4gIH0sXG4gIHRhZ3M6IFtcbiAgICB7XG4gICAgICBuYW1lOiAnQXV0aCcsXG4gICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnQ2hhdCcsXG4gICAgICBkZXNjcmlwdGlvbjogJ01hbmFnZXMgY2hhdC1yZWxhdGVkIG9wZXJhdGlvbnMuJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdDb250YWN0JyxcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAnSGFuZGxlcyBvcGVyYXRpb25zIHJlbGF0ZWQgdG8gY29udGFjdHMsIHN1Y2ggYXMgbWFuYWdpbmcgY29udGFjdCBsaXN0cywgYWRkaW5nIG9yIHJlbW92aW5nIGNvbnRhY3RzLCBhbmQgcmV0cmlldmluZyBjb250YWN0IGluZm9ybWF0aW9uLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnQ2F0YWxvZyAmIEJ1c3NpbmVzcycsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgJ0hhbmRsZXMgb3BlcmF0aW9ucyByZWxhdGVkIHRvIGNhdGFsb2dzIGFuZCBidXNpbmVzcy1yZWxhdGVkIGZ1bmN0aW9uYWxpdGllcywgc3VjaCBhcyBtYW5hZ2luZyBwcm9kdWN0IGNhdGFsb2dzIGFuZCBidXNpbmVzcyBpbmZvcm1hdGlvbi4nLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ0NvbW11bml0eScsXG4gICAgICBkZXNjcmlwdGlvbjogJ01hbmFnZSBjb21tdW5pdGllcy4nLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ01lc3NhZ2VzJyxcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAnSGFuZGxlcyBtZXNzYWdlLXJlbGF0ZWQgb3BlcmF0aW9ucywgaW5jbHVkaW5nIHNlbmRpbmcsIHJlY2VpdmluZywgYW5kIG1hbmFnaW5nIG1lc3NhZ2VzLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnUHJvZmlsZScsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgJ01hbmFnZXMgdXNlciBwcm9maWxlLXJlbGF0ZWQgb3BlcmF0aW9ucywgc3VjaCBhcyByZXRyaWV2aW5nIGFuZCB1cGRhdGluZyBwcm9maWxlIGluZm9ybWF0aW9uJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdTdGF0dXMgU3RvcmllcycsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgJ0hhbmRsZXMgb3BlcmF0aW9ucyByZWxhdGVkIHRvIHN0YXR1cyBzdG9yaWVzLCBzdWNoIGFzIHZpZXdpbmcsIHVwZGF0aW5nLCBhbmQgbWFuYWdpbmcgc3RhdHVzIHN0b3JpZXMnLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ0xhYmVscycsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgJ01hbmFnZXMgbGFiZWxzIG9yIHRhZ3MgYXNzb2NpYXRlZCB3aXRoIGNoYXRzIG9yIG1lc3NhZ2VzIGZvciBvcmdhbml6YXRpb24gYW5kIGNhdGVnb3JpemF0aW9uIHB1cnBvc2VzLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnR3JvdXAnLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICdNYW5hZ2VzIG9wZXJhdGlvbnMgcmVsYXRlZCB0byBXaGF0c0FwcCBncm91cHMsIHN1Y2ggYXMgY3JlYXRpbmcsIG1vZGlmeWluZywgYW5kIG1hbmFnaW5nIGdyb3VwIHNldHRpbmdzLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnTWlzYycsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgJ0hhbmRsZXMgbWlzY2VsbGFuZW91cyBvcGVyYXRpb25zIHRoYXQgZG8gbm90IGZpdCBpbnRvIG90aGVyIHNwZWNpZmljIGNhdGVnb3JpZXMuJyxcbiAgICB9LFxuICBdLFxuICBkZWZpbml0aW9uczoge30sXG4gIGNvbXBvbmVudHM6IHtcbiAgICAnQHNjaGVtYXMnOiB7XG4gICAgICBzZXNzaW9uOiB7XG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuXG5zd2FnZ2VyQXV0b2dlbih7IG9wZW5hcGk6ICczLjAu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