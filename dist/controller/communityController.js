"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSubgroupsCommunity = addSubgroupsCommunity;
exports.createCommunity = createCommunity;
exports.deactivateCommunity = deactivateCommunity;
exports.demoteCommunityParticipant = demoteCommunityParticipant;
exports.getCommunityParticipants = getCommunityParticipants;
exports.promoteCommunityParticipant = promoteCommunityParticipant;
exports.removeSubgroupsCommunity = removeSubgroupsCommunity;
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

async function createCommunity(req, res) {
  /**
       #swagger.tags = ["Community"]
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
                description: { type: "boolean" },
                groupIds: { type: "array" },
              }
            },
            examples: {
              "Default": {
                value: {
                  name: "My community name",
                  description: "Description for your community",
                  groupIds: ["groupId1", "groupId2"],
                }
              },
            }
          }
        }
       }
     */
  const {
    name,
    description,
    groupIds
  } = req.body;
  try {
    const response = await req.client.createCommunity(name, description, groupIds);
    res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on create community',
      error: error
    });
  }
}
async function deactivateCommunity(req, res) {
  /**
         #swagger.tags = ["Community"]
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
                }
              },
              examples: {
                "Default": {
                  value: {
                    id: "<you_community_id@g.us>",
                  }
                },
              }
            }
          }
         }
       */
  const {
    id
  } = req.body;
  try {
    const response = await req.client.deactivateCommunity(id);
    res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on deactivate community',
      error: error
    });
  }
}
async function addSubgroupsCommunity(req, res) {
  /**
    #swagger.tags = ["Community"]
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
                        groupsIds: { type: "array" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                            id: "<you_community_id@g.us>",
                            groupsIds: ["group1Id@g.us"]
                        }
                    },
                }
            }
        }
    }
    */
  const {
    id,
    groupsIds
  } = req.body;
  try {
    const response = await req.client.addSubgroupsCommunity(id, groupsIds);
    res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on add subgroup',
      error: error
    });
  }
}
async function removeSubgroupsCommunity(req, res) {
  /**
     #swagger.tags = ["Community"]
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
                        groupsIds: { type: "array" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                            id: "<you_community_id@g.us>",
                            groupsIds: ["group1Id@g.us"]
                        }
                    },
                }
            }
        }
    }
    */
  const {
    id,
    groupsIds
  } = req.body;
  try {
    const response = await req.client.removeSubgroupsCommunity(id, groupsIds);
    res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on remove subgroup',
      error: error
    });
  }
}
async function demoteCommunityParticipant(req, res) {
  /**
    #swagger.tags = ["Community"]
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
                        participantsId: { type: "array" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                            id: "<you_community_id@g.us>",
                            participantsId: ["group1Id@g.us"]
                        }
                    },
                }
            }
        }
    }
    */
  const {
    id,
    participantsId
  } = req.body;
  try {
    const response = await req.client.demoteCommunityParticipant(id, participantsId);
    res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on demote participant of communoty',
      error: error
    });
  }
}
async function promoteCommunityParticipant(req, res) {
  /**
    #swagger.tags = ["Community"]
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
                        participantsId: { type: "array" },
                    }
                },
                examples: {
                    "Default": {
                        value: {
                            id: "<you_community_id@g.us>",
                            participantsId: ["group1Id@g.us"]
                        }
                    },
                }
            }
        }
    }
    */
  const {
    id,
    participantsId
  } = req.body;
  try {
    const response = await req.client.promoteCommunityParticipant(id, participantsId);
    res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on demote participant of communoty',
      error: error
    });
  }
}
async function getCommunityParticipants(req, res) {
  /**
    #swagger.tags = ["Community"]
    #swagger.autoBody=false
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.parameters["session"] = {
        schema: 'NERDWHATS_AMERICA'
    }
    #swagger.parameters["id"] = {
        schema: 'communityId@g.us'
    }
    */
  const {
    id
  } = req.params;
  try {
    const response = await req.client.getCommunityParticipants(id);
    res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error on get participant of communoty',
      error: error
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjcmVhdGVDb21tdW5pdHkiLCJyZXEiLCJyZXMiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJncm91cElkcyIsImJvZHkiLCJyZXNwb25zZSIsImNsaWVudCIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsImxvZ2dlciIsIm1lc3NhZ2UiLCJkZWFjdGl2YXRlQ29tbXVuaXR5IiwiaWQiLCJhZGRTdWJncm91cHNDb21tdW5pdHkiLCJncm91cHNJZHMiLCJyZW1vdmVTdWJncm91cHNDb21tdW5pdHkiLCJkZW1vdGVDb21tdW5pdHlQYXJ0aWNpcGFudCIsInBhcnRpY2lwYW50c0lkIiwicHJvbW90ZUNvbW11bml0eVBhcnRpY2lwYW50IiwiZ2V0Q29tbXVuaXR5UGFydGljaXBhbnRzIiwicGFyYW1zIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvY29tbXVuaXR5Q29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjMgV1BQQ29ubmVjdCBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVDb21tdW5pdHkocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJDb21tdW5pdHlcIl1cbiAgICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgICAgfV1cbiAgICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgICAgfVxuICAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogeyB0eXBlOiBcImJvb2xlYW5cIiB9LFxuICAgICAgICAgICAgICAgIGdyb3VwSWRzOiB7IHR5cGU6IFwiYXJyYXlcIiB9LFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJNeSBjb21tdW5pdHkgbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGVzY3JpcHRpb24gZm9yIHlvdXIgY29tbXVuaXR5XCIsXG4gICAgICAgICAgICAgICAgICBncm91cElkczogW1wiZ3JvdXBJZDFcIiwgXCJncm91cElkMlwiXSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgfVxuICAgICAqL1xuICBjb25zdCB7IG5hbWUsIGRlc2NyaXB0aW9uLCBncm91cElkcyB9ID0gcmVxLmJvZHk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQuY3JlYXRlQ29tbXVuaXR5KFxuICAgICAgbmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgZ3JvdXBJZHNcbiAgICApO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBjcmVhdGUgY29tbXVuaXR5JyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVhY3RpdmF0ZUNvbW11bml0eShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICAgICAjc3dhZ2dlci50YWdzID0gW1wiQ29tbXVuaXR5XCJdXG4gICAgICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICAgICAgfV1cbiAgICAgICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICAgICAgfVxuICAgICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiPHlvdV9jb21tdW5pdHlfaWRAZy51cz5cIixcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgICovXG4gIGNvbnN0IHsgaWQgfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LmRlYWN0aXZhdGVDb21tdW5pdHkoaWQpO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBkZWFjdGl2YXRlIGNvbW11bml0eScsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFN1Ymdyb3Vwc0NvbW11bml0eShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgI3N3YWdnZXIudGFncyA9IFtcIkNvbW11bml0eVwiXVxuICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgfV1cbiAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICB9XG4gICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwc0lkczogeyB0eXBlOiBcImFycmF5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiPHlvdV9jb21tdW5pdHlfaWRAZy51cz5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cHNJZHM6IFtcImdyb3VwMUlkQGcudXNcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cbiAgY29uc3QgeyBpZCwgZ3JvdXBzSWRzIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5hZGRTdWJncm91cHNDb21tdW5pdHkoaWQsIGdyb3Vwc0lkcyk7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNwb25zZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGFkZCBzdWJncm91cCcsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVN1Ymdyb3Vwc0NvbW11bml0eShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJDb21tdW5pdHlcIl1cbiAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgIH1dXG4gICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgfVxuICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgXCJAY29udGVudFwiOiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHNJZHM6IHsgdHlwZTogXCJhcnJheVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiRGVmYXVsdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIjx5b3VfY29tbXVuaXR5X2lkQGcudXM+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzSWRzOiBbXCJncm91cDFJZEBnLnVzXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICovXG4gIGNvbnN0IHsgaWQsIGdyb3Vwc0lkcyB9ID0gcmVxLmJvZHk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcS5jbGllbnQucmVtb3ZlU3ViZ3JvdXBzQ29tbXVuaXR5KGlkLCBncm91cHNJZHMpO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiByZW1vdmUgc3ViZ3JvdXAnLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZW1vdGVDb21tdW5pdHlQYXJ0aWNpcGFudChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgI3N3YWdnZXIudGFncyA9IFtcIkNvbW11bml0eVwiXVxuICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgfV1cbiAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICB9XG4gICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBcIkBjb250ZW50XCI6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50c0lkOiB7IHR5cGU6IFwiYXJyYXlcIiB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgICAgICAgICBcIkRlZmF1bHRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCI8eW91X2NvbW11bml0eV9pZEBnLnVzPlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50c0lkOiBbXCJncm91cDFJZEBnLnVzXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICovXG4gIGNvbnN0IHsgaWQsIHBhcnRpY2lwYW50c0lkIH0gPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxLmNsaWVudC5kZW1vdGVDb21tdW5pdHlQYXJ0aWNpcGFudChcbiAgICAgIGlkLFxuICAgICAgcGFydGljaXBhbnRzSWRcbiAgICApO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBkZW1vdGUgcGFydGljaXBhbnQgb2YgY29tbXVub3R5JyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJvbW90ZUNvbW11bml0eVBhcnRpY2lwYW50KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAjc3dhZ2dlci50YWdzID0gW1wiQ29tbXVuaXR5XCJdXG4gICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICB9XVxuICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgIH1cbiAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIFwiQGNvbnRlbnRcIjoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogXCJzdHJpbmdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnRzSWQ6IHsgdHlwZTogXCJhcnJheVwiIH0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4YW1wbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiRGVmYXVsdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIjx5b3VfY29tbXVuaXR5X2lkQGcudXM+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnRzSWQ6IFtcImdyb3VwMUlkQGcudXNcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cbiAgY29uc3QgeyBpZCwgcGFydGljaXBhbnRzSWQgfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LnByb21vdGVDb21tdW5pdHlQYXJ0aWNpcGFudChcbiAgICAgIGlkLFxuICAgICAgcGFydGljaXBhbnRzSWRcbiAgICApO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcS5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBvbiBkZW1vdGUgcGFydGljaXBhbnQgb2YgY29tbXVub3R5JyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29tbXVuaXR5UGFydGljaXBhbnRzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAjc3dhZ2dlci50YWdzID0gW1wiQ29tbXVuaXR5XCJdXG4gICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICB9XVxuICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICB9XG4gICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcImlkXCJdID0ge1xuICAgICAgICBzY2hlbWE6ICdjb21tdW5pdHlJZEBnLnVzJ1xuICAgIH1cbiAgICAqL1xuICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXEuY2xpZW50LmdldENvbW11bml0eVBhcnRpY2lwYW50cyhpZCk7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNwb25zZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm9yIG9uIGdldCBwYXJ0aWNpcGFudCBvZiBjb21tdW5vdHknLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJTyxlQUFlQSxlQUFlQSxDQUFDQyxHQUFZLEVBQUVDLEdBQWEsRUFBRTtFQUNqRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFLE1BQU07SUFBRUMsSUFBSTtJQUFFQyxXQUFXO0lBQUVDO0VBQVMsQ0FBQyxHQUFHSixHQUFHLENBQUNLLElBQUk7RUFFaEQsSUFBSTtJQUNGLE1BQU1DLFFBQVEsR0FBRyxNQUFNTixHQUFHLENBQUNPLE1BQU0sQ0FBQ1IsZUFBZSxDQUMvQ0csSUFBSSxFQUNKQyxXQUFXLEVBQ1hDLFFBQ0YsQ0FBQztJQUVESCxHQUFHLENBQUNPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDSCxRQUFRLENBQUM7RUFDaEMsQ0FBQyxDQUFDLE9BQU9JLEtBQUssRUFBRTtJQUNkVixHQUFHLENBQUNXLE1BQU0sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7SUFDdkJULEdBQUcsQ0FBQ08sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7TUFDbkJELE1BQU0sRUFBRSxPQUFPO01BQ2ZJLE9BQU8sRUFBRSwyQkFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRSxNQUFNO0lBQUVhLEVBQUU7SUFBRUs7RUFBZSxDQUFDLEdBQUduQixHQUFHLENBQUNLLElBQUk7RUFFdkMsSUFBSTtJQUNGLE1BQU1DLFFBQVEsR0FBRyxNQUFNTixHQUFHLENBQUNPLE1BQU0sQ0FBQ2EsMkJBQTJCLENBQzNETixFQUFFLEVBQ0ZLLGNBQ0YsQ0FBQztJQUVEbEIsR0FBRyxDQUFDTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQ0gsUUFBUSxDQUFDO0VBQ2hDLENBQUMsQ0FBQyxPQUFPSSxLQUFLLEVBQUU7SUFDZFYsR0FBRyxDQUFDVyxNQUFNLENBQUNELEtBQUssQ0FBQ0EsS0FBSyxDQUFDO0lBQ3ZCVCxHQUFHLENBQUNPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO01BQ25CRCxNQUFNLEVBQUUsT0FBTztNQUNmSSxPQUFPLEVBQUUsMENBQTBDO01BQ25ERixLQUFLLEVBQUVBO0lBQ1QsQ0FBQyxDQUFDO0VBQ0o7QUFDRjtBQUVPLGVBQWVXLHdCQUF3QkEsQ0FBQ3JCLEdBQVksRUFBRUMsR0FBYSxFQUFFO0VBQzFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0UsTUFBTTtJQUFFYTtFQUFHLENBQUMsR0FBR2QsR0FBRyxDQUFDc0IsTUFBTTtFQUV6QixJQUFJO0lBQ0YsTUFBTWhCLFFBQVEsR0FBRyxNQUFNTixHQUFHLENBQUNPLE1BQU0sQ0FBQ2Msd0JBQXdCLENBQUNQLEVBQUUsQ0FBQztJQUU5RGIsR0FBRyxDQUFDTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQ0gsUUFBUSxDQUFDO0VBQ2hDLENBQUMsQ0FBQyxPQUFPSSxLQUFLLEVBQUU7SUFDZFYsR0FBRyxDQUFDVyxNQUFNLENBQUNELEtBQUssQ0FBQ0EsS0FBSyxDQUFDO0lBQ3ZCVCxHQUFHLENBQUNPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO01BQ25CRCxNQUFNLEVBQUUsT0FBTztNQUNmSSxPQUFPLEVBQUUsdUNBQXVDO01BQ2hERixLQUFLLEVBQUVBO0lBQ1QsQ0FBQyxDQUFDO0VBQ0o7QUFDRiIsImlnbm9yZUxpc3QiOltdfQ==