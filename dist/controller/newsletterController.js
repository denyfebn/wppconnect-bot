"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewsletter = createNewsletter;
exports.destroyNewsletter = destroyNewsletter;
exports.editNewsletter = editNewsletter;
exports.muteNewsletter = muteNewsletter;
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
async function createNewsletter(req, res) {
  /**
     * #swagger.tags = ["Newsletter]
        #swagger.operationId = 'createNewsletter'
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
                        name: { type: "string" },
                        options: { type: "object" },
                    }
                },
                examples: {
                    "Create newsletter/channel": {
                        value: { 
                            name: 'Name for your channel',
                            options: {
                                description: 'Description of channel',
                                picture: '<base64_image>',
                            }
                        }
                    },
                }
            }
        }
        }
     */
  const session = req.session;
  const {
    name,
    options
  } = req.body;
  try {
    res.status(201).json(await req.client.createNewsletter(name, options));
  } catch (error) {
    returnError(req, res, session, error);
  }
}
async function editNewsletter(req, res) {
  /**
       * #swagger.tags = ["Newsletter]
         #swagger.operationId = 'editNewsletter'
         #swagger.autoBody=false
         #swagger.security = [{
                "bearerAuth": []
         }]
         #swagger.parameters["session"] = {
          schema: 'NERDWHATS_AMERICA'
         }
         #swagger.parameters["id"] = {
          schema: '<newsletter_id>'
         }
         #swagger.requestBody = {
        required: true,
        "@content": {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                picture: { type: "string" },
              }
            },
            examples: {
              "Edit newsletter/channel": {
                value: { 
                    name: 'New name of channel',
                    description: 'New description of channel',
                    picture: '<new_base64_image> or send null',
                }
              },
                "Create newsletter/channel": {
                    value: { 
                        name: 'Name for your channel',
                        options: {
                            description: 'Description of channel',
                            picture: '<base64_image>',
                        }
                    }
                },
            }
          }
        }
       }
       */
  const session = req.session;
  const {
    name,
    description,
    picture
  } = req.body;
  const {
    id
  } = req.params;
  try {
    res.status(201).json(await req.client.editNewsletter(id, {
      name,
      description,
      picture
    }));
  } catch (error) {
    returnError(req, res, session, error);
  }
}
async function destroyNewsletter(req, res) {
  /**
  * #swagger.tags = ["Newsletter]
    #swagger.autoBody=false
    #swagger.operationId = 'destroyNewsletter'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.parameters["session"] = {
        schema: 'NERDWHATS_AMERICA'
    }
    #swagger.parameters["id"] = {
        schema: 'NEWSLETTER ID'
    }
    */
  const session = req.session;
  const {
    id
  } = req.params;
  try {
    res.status(201).json(await req.client.destroyNewsletter(id));
  } catch (error) {
    returnError(req, res, session, error);
  }
}
async function muteNewsletter(req, res) {
  /**
   * #swagger.tags = ["Newsletter]
     #swagger.operationId = 'muteNewsletter'
     #swagger.autoBody=false
     #swagger.security = [{
              "bearerAuth": []
      }]
      #swagger.parameters["session"] = {
          schema: 'NERDWHATS_AMERICA'
      }
      #swagger.parameters["id"] = {
          schema: 'NEWSLETTER ID'
      }
      */
  const session = req.session;
  const {
    id
  } = req.params;
  try {
    res.status(201).json(await req.client.muteNesletter(id));
  } catch (error) {
    returnError(req, res, session, error);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXR1cm5FcnJvciIsInJlcSIsInJlcyIsInNlc3Npb24iLCJlcnJvciIsImxvZ2dlciIsInN0YXR1cyIsImpzb24iLCJyZXNwb25zZSIsIm1lc3NhZ2UiLCJsb2ciLCJjcmVhdGVOZXdzbGV0dGVyIiwibmFtZSIsIm9wdGlvbnMiLCJib2R5IiwiY2xpZW50IiwiZWRpdE5ld3NsZXR0ZXIiLCJkZXNjcmlwdGlvbiIsInBpY3R1cmUiLCJpZCIsInBhcmFtcyIsImRlc3Ryb3lOZXdzbGV0dGVyIiwibXV0ZU5ld3NsZXR0ZXIiLCJtdXRlTmVzbGV0dGVyIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvbmV3c2xldHRlckNvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDIzIFdQUENvbm5lY3QgVGVhbVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuZnVuY3Rpb24gcmV0dXJuRXJyb3IoXG4gIHJlcTogUmVxdWVzdCxcbiAgcmVzOiBSZXNwb25zZSxcbiAgc2Vzc2lvbjogc3RyaW5nLFxuICBlcnJvcj86IGFueVxuKSB7XG4gIHJlcS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgc3RhdHVzOiAnRXJyb3InLFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICBtZXNzYWdlOiAnRXJyb3IgcmV0cmlldmluZyBpbmZvcm1hdGlvbicsXG4gICAgICBzZXNzaW9uOiBzZXNzaW9uLFxuICAgICAgbG9nOiBlcnJvcixcbiAgICB9LFxuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU5ld3NsZXR0ZXIocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAqICNzd2FnZ2VyLnRhZ3MgPSBbXCJOZXdzbGV0dGVyXVxuICAgICAgICAjc3dhZ2dlci5vcGVyYXRpb25JZCA9ICdjcmVhdGVOZXdzbGV0dGVyJ1xuICAgICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgICB9XVxuICAgICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgICB9XG4gICAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogeyB0eXBlOiBcIm9iamVjdFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiQ3JlYXRlIG5ld3NsZXR0ZXIvY2hhbm5lbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnTmFtZSBmb3IgeW91ciBjaGFubmVsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRGVzY3JpcHRpb24gb2YgY2hhbm5lbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpY3R1cmU6ICc8YmFzZTY0X2ltYWdlPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9XG4gICAgICovXG4gIGNvbnN0IHNlc3Npb24gPSByZXEuc2Vzc2lvbjtcbiAgY29uc3QgeyBuYW1lLCBvcHRpb25zIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKGF3YWl0IHJlcS5jbGllbnQuY3JlYXRlTmV3c2xldHRlcihuYW1lLCBvcHRpb25zKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIHNlc3Npb24sIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZWRpdE5ld3NsZXR0ZXIocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAgICogI3N3YWdnZXIudGFncyA9IFtcIk5ld3NsZXR0ZXJdXG4gICAgICAgICAjc3dhZ2dlci5vcGVyYXRpb25JZCA9ICdlZGl0TmV3c2xldHRlcidcbiAgICAgICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgICAgICB9XVxuICAgICAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgICAgICB9XG4gICAgICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wiaWRcIl0gPSB7XG4gICAgICAgICAgc2NoZW1hOiAnPG5ld3NsZXR0ZXJfaWQ+J1xuICAgICAgICAgfVxuICAgICAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgcGljdHVyZTogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgICBcIkVkaXQgbmV3c2xldHRlci9jaGFubmVsXCI6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogeyBcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ05ldyBuYW1lIG9mIGNoYW5uZWwnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ05ldyBkZXNjcmlwdGlvbiBvZiBjaGFubmVsJyxcbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZTogJzxuZXdfYmFzZTY0X2ltYWdlPiBvciBzZW5kIG51bGwnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIkNyZWF0ZSBuZXdzbGV0dGVyL2NoYW5uZWxcIjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdOYW1lIGZvciB5b3VyIGNoYW5uZWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRGVzY3JpcHRpb24gb2YgY2hhbm5lbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGljdHVyZTogJzxiYXNlNjRfaW1hZ2U+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgfVxuICAgICAgICovXG4gIGNvbnN0IHNlc3Npb24gPSByZXEuc2Vzc2lvbjtcbiAgY29uc3QgeyBuYW1lLCBkZXNjcmlwdGlvbiwgcGljdHVyZSB9ID0gcmVxLmJvZHk7XG4gIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG5cbiAgdHJ5IHtcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbihcbiAgICAgIGF3YWl0IHJlcS5jbGllbnQuZWRpdE5ld3NsZXR0ZXIoaWQsIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHBpY3R1cmUsXG4gICAgICB9KVxuICAgICk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIHNlc3Npb24sIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVzdHJveU5ld3NsZXR0ZXIocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICogI3N3YWdnZXIudGFncyA9IFtcIk5ld3NsZXR0ZXJdXG4gICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAjc3dhZ2dlci5vcGVyYXRpb25JZCA9ICdkZXN0cm95TmV3c2xldHRlcidcbiAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICB9XVxuICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICB9XG4gICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcImlkXCJdID0ge1xuICAgICAgICBzY2hlbWE6ICdORVdTTEVUVEVSIElEJ1xuICAgIH1cbiAgICAqL1xuICBjb25zdCBzZXNzaW9uID0gcmVxLnNlc3Npb247XG4gIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG5cbiAgdHJ5IHtcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbihhd2FpdCByZXEuY2xpZW50LmRlc3Ryb3lOZXdzbGV0dGVyKGlkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIHNlc3Npb24sIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbXV0ZU5ld3NsZXR0ZXIocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgKiAjc3dhZ2dlci50YWdzID0gW1wiTmV3c2xldHRlcl1cbiAgICAgI3N3YWdnZXIub3BlcmF0aW9uSWQgPSAnbXV0ZU5ld3NsZXR0ZXInXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgICB9XVxuICAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgICB9XG4gICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wiaWRcIl0gPSB7XG4gICAgICAgICAgc2NoZW1hOiAnTkVXU0xFVFRFUiBJRCdcbiAgICAgIH1cbiAgICAgICovXG4gIGNvbnN0IHNlc3Npb24gPSByZXEuc2Vzc2lvbjtcbiAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcblxuICB0cnkge1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKGF3YWl0IHJlcS5jbGllbnQubXV0ZU5lc2xldHRlcihpZCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBzZXNzaW9uLCBlcnJvcik7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLFNBQVNBLFdBQVdBLENBQ2xCQyxHQUFZLEVBQ1pDLEdBQWEsRUFDYkMsT0FBZSxFQUNmQyxLQUFXLEVBQ1g7RUFDQUgsR0FBRyxDQUFDSSxNQUFNLENBQUNELEtBQUssQ0FBQ0EsS0FBSyxDQUFDO0VBQ3ZCRixHQUFHLENBQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0Ms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