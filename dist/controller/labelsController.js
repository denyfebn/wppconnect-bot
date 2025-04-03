"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewLabel = addNewLabel;
exports.addOrRemoveLabels = addOrRemoveLabels;
exports.deleteAllLabels = deleteAllLabels;
exports.deleteLabel = deleteLabel;
exports.getAllLabels = getAllLabels;
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

async function addNewLabel(req, res) {
  /**
     #swagger.tags = ["Labels"]
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
        "application/json": {
          schema: {
            type: "object",
            properties: {
              $name: { type: "string" },
              $options: {
                type: "object",
                properties: {
                  labelColor: { type: "number" }
                }
              }
            },
            required: ["name", "options"]
          },
          examples: {
            "Default": {
              value: {
                name: "Name of your label",
                options: { labelColor: 4292849392 }
              }
            }
          }
        }
      }
    }
   */
  const {
    name,
    options
  } = req.body;
  if (!name) res.status(401).send({
    message: 'Name was not informed'
  });
  try {
    const result = await req.client.addNewLabel(name, options);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Erro ao adicionar etiqueta.',
      error: error
    });
  }
}
async function addOrRemoveLabels(req, res) {
  /**
     #swagger.tags = ["Labels"]
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
        "application/json": {
          schema: {
            type: "object",
            properties: {
              chatIds: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              options: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    labelId: { type: "string" },
                    type: { type: "string" }
                  },
                }
              }
            },
            required: ["chatIds"]
          },
          examples: {
            "Default": {
              value: {
                chatIds: ["5521999999999"],
                options: [
                  { labelId: "76", type: "add" },
                  { labelId: "75", type: "remove" }
                ]
              }
            }
          }
        }
      }
    }
   */
  const {
    chatIds,
    options
  } = req.body;
  if (!chatIds || !options) res.status(401).send({
    message: 'chatIds or options was not informed'
  });
  try {
    const result = await req.client.addOrRemoveLabels(chatIds, options);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Erro ao adicionar/deletar etiqueta.',
      error: error
    });
  }
}
async function getAllLabels(req, res) {
  /**
     #swagger.tags = ["Labels"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const result = await req.client.getAllLabels();
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Erro ao buscar etiquetas.',
      error: error
    });
  }
}
async function deleteAllLabels(req, res) {
  /**
     #swagger.tags = ["Labels"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
   */
  try {
    const result = await req.client.deleteAllLabels();
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Erro ao deletar todas as etiquetas.',
      error: error
    });
  }
}
async function deleteLabel(req, res) {
  /**
     #swagger.tags = ["Labels"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["id"] = {
      schema: '<labelId>'
     }
   */
  const {
    id
  } = req.params;
  try {
    const result = await req.client.deleteLabel(id);
    res.status(201).json({
      status: 'success',
      response: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Erro ao deletar etiqueta.',
      error: error
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhZGROZXdMYWJlbCIsInJlcSIsInJlcyIsIm5hbWUiLCJvcHRpb25zIiwiYm9keSIsInN0YXR1cyIsInNlbmQiLCJtZXNzYWdlIiwicmVzdWx0IiwiY2xpZW50IiwianNvbiIsInJlc3BvbnNlIiwiZXJyb3IiLCJhZGRPclJlbW92ZUxhYmVscyIsImNoYXRJZHMiLCJnZXRBbGxMYWJlbHMiLCJkZWxldGVBbGxMYWJlbHMiLCJkZWxldGVMYWJlbCIsImlkIiwicGFyYW1zIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvbGFiZWxzQ29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgV1BQQ29ubmVjdCBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGROZXdMYWJlbChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJMYWJlbHNcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICRuYW1lOiB7IHR5cGU6IFwic3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgJG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsQ29sb3I6IHsgdHlwZTogXCJudW1iZXJcIiB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFtcIm5hbWVcIiwgXCJvcHRpb25zXCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIk5hbWUgb2YgeW91ciBsYWJlbFwiLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHsgbGFiZWxDb2xvcjogNDI5Mjg0OTM5MiB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAqL1xuICBjb25zdCB7IG5hbWUsIG9wdGlvbnMgfSA9IHJlcS5ib2R5O1xuICBpZiAoIW5hbWUpXG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoe1xuICAgICAgbWVzc2FnZTogJ05hbWUgd2FzIG5vdCBpbmZvcm1lZCcsXG4gICAgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXEuY2xpZW50LmFkZE5ld0xhYmVsKG5hbWUsIG9wdGlvbnMpO1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXN1bHQgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnRXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm8gYW8gYWRpY2lvbmFyIGV0aXF1ZXRhLicsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZE9yUmVtb3ZlTGFiZWxzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIkxhYmVsc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgICAjc3dhZ2dlci5yZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgY29udGVudDoge1xuICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgY2hhdElkczoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICAgICAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxJZDogeyB0eXBlOiBcInN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHsgdHlwZTogXCJzdHJpbmdcIiB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBbXCJjaGF0SWRzXCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBjaGF0SWRzOiBbXCI1NTIxOTk5OTk5OTk5XCJdLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgIHsgbGFiZWxJZDogXCI3NlwiLCB0eXBlOiBcImFkZFwiIH0sXG4gICAgICAgICAgICAgICAgICB7IGxhYmVsSWQ6IFwiNzVcIiwgdHlwZTogXCJyZW1vdmVcIiB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgKi9cbiAgY29uc3QgeyBjaGF0SWRzLCBvcHRpb25zIH0gPSByZXEuYm9keTtcbiAgaWYgKCFjaGF0SWRzIHx8ICFvcHRpb25zKVxuICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcbiAgICAgIG1lc3NhZ2U6ICdjaGF0SWRzIG9yIG9wdGlvbnMgd2FzIG5vdCBpbmZvcm1lZCcsXG4gICAgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXEuY2xpZW50LmFkZE9yUmVtb3ZlTGFiZWxzKGNoYXRJZHMsIG9wdGlvbnMpO1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXN1bHQgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnRXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm8gYW8gYWRpY2lvbmFyL2RlbGV0YXIgZXRpcXVldGEuJyxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxsTGFiZWxzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIkxhYmVsc1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5zZWN1cml0eSA9IFt7XG4gICAgICAgICAgICBcImJlYXJlckF1dGhcIjogW11cbiAgICAgfV1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInNlc3Npb25cIl0gPSB7XG4gICAgICBzY2hlbWE6ICdORVJEV0hBVFNfQU1FUklDQSdcbiAgICAgfVxuICAgKi9cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXEuY2xpZW50LmdldEFsbExhYmVscygpO1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXN1bHQgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnRXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm8gYW8gYnVzY2FyIGV0aXF1ZXRhcy4nLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVBbGxMYWJlbHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiTGFiZWxzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAqL1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQuZGVsZXRlQWxsTGFiZWxzKCk7XG4gICAgcmVzLnN0YXR1cygyMDEpLmpzb24oeyBzdGF0dXM6ICdzdWNjZXNzJywgcmVzcG9uc2U6IHJlc3VsdCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICBzdGF0dXM6ICdFcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJybyBhbyBkZWxldGFyIHRvZGFzIGFzIGV0aXF1ZXRhcy4nLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVMYWJlbChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgLyoqXG4gICAgICNzd2FnZ2VyLnRhZ3MgPSBbXCJMYWJlbHNcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcImlkXCJdID0ge1xuICAgICAgc2NoZW1hOiAnPGxhYmVsSWQ+J1xuICAgICB9XG4gICAqL1xuICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcS5jbGllbnQuZGVsZXRlTGFiZWwoaWQpO1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgc3RhdHVzOiAnc3VjY2VzcycsIHJlc3BvbnNlOiByZXN1bHQgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgc3RhdHVzOiAnRXJyb3InLFxuICAgICAgbWVzc2FnZTogJ0Vycm8gYW8gZGVsZXRhciBldGlxdWV0YS4nLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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