"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendImageStorie = sendImageStorie;
exports.sendTextStorie = sendTextStorie;
exports.sendVideoStorie = sendVideoStorie;
var _functions = require("../util/functions");
function returnError(req, res, error) {
  req.logger.error(error);
  res.status(500).json({
    status: 'Error',
    message: 'Erro ao enviar status.',
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
async function sendTextStorie(req, res) {
  /**
     #swagger.tags = ["Status Stories"]
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
        text: 'My new storie',
        options: { backgroundColor: '#0275d8', font: 2},
      }
     }
     #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              text: { type: 'string' },
              options: { type: 'object' },
            },
            required: ['text'],
          },
          examples: {
            'Default': {
              value: {
                text: 'My new storie',
                options: { backgroundColor: '#0275d8', font: 2},
              },
            },
          },
        },
      },
    }
   */
  const {
    text,
    options
  } = req.body;
  if (!text) res.status(401).send({
    message: 'Text was not informed'
  });
  try {
    const results = [];
    results.push(await req.client.sendTextStatus(text, options));
    if (results.length === 0) res.status(400).json('Error sending the text of stories');
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendImageStorie(req, res) {
  /**
     #swagger.tags = ["Status Stories"]
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
              path: { type: 'string' },
            },
            required: ['path'],
          },
          examples: {
            'Default': {
              value: {
                path: 'Path of your image',
              },
            },
          },
        },
      },
    }
   */
  const {
    path
  } = req.body;
  if (!path && !req.file) res.status(401).send({
    message: 'Sending the image is mandatory'
  });
  const pathFile = path || req.file?.path;
  try {
    const results = [];
    results.push(await req.client.sendImageStatus(pathFile));
    if (results.length === 0) res.status(400).json('Error sending the image of stories');
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
async function sendVideoStorie(req, res) {
  /**
     #swagger.tags = ["Status Stories"]
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
              path: { type: "string" }
            },
            required: ["path"]
          },
          examples: {
            "Default": {
              value: {
                path: "Path of your video"
              }
            }
          }
        }
      }
    }
   */
  const {
    path
  } = req.body;
  if (!path && !req.file) res.status(401).send({
    message: 'Sending the Video is mandatory'
  });
  const pathFile = path || req.file?.path;
  try {
    const results = [];
    results.push(await req.client.sendVideoStatus(pathFile));
    if (results.length === 0) res.status(400).json('Error sending message');
    if (req.file) await (0, _functions.unlinkAsync)(pathFile);
    returnSucess(res, results);
  } catch (error) {
    returnError(req, res, error);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZnVuY3Rpb25zIiwicmVxdWlyZSIsInJldHVybkVycm9yIiwicmVxIiwicmVzIiwiZXJyb3IiLCJsb2dnZXIiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsInJldHVyblN1Y2VzcyIsImRhdGEiLCJyZXNwb25zZSIsIm1hcHBlciIsInNlbmRUZXh0U3RvcmllIiwidGV4dCIsIm9wdGlvbnMiLCJib2R5Iiwic2VuZCIsInJlc3VsdHMiLCJwdXNoIiwiY2xpZW50Iiwic2VuZFRleHRTdGF0dXMiLCJsZW5ndGgiLCJzZW5kSW1hZ2VTdG9yaWUiLCJwYXRoIiwiZmlsZSIsInBhdGhGaWxlIiwic2VuZEltYWdlU3RhdHVzIiwic2VuZFZpZGVvU3RvcmllIiwic2VuZFZpZGVvU3RhdHVzIiwidW5saW5rQXN5bmMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlci9zdGF0dXNDb250cm9sbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCB7IHVubGlua0FzeW5jIH0gZnJvbSAnLi4vdXRpbC9mdW5jdGlvbnMnO1xuXG5mdW5jdGlvbiByZXR1cm5FcnJvcihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIGVycm9yOiBhbnkpIHtcbiAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gIHJlc1xuICAgIC5zdGF0dXMoNTAwKVxuICAgIC5qc29uKHsgc3RhdHVzOiAnRXJyb3InLCBtZXNzYWdlOiAnRXJybyBhbyBlbnZpYXIgc3RhdHVzLicsIGVycm9yOiBlcnJvciB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmV0dXJuU3VjZXNzKHJlczogUmVzcG9uc2UsIGRhdGE6IGFueSkge1xuICByZXMuc3RhdHVzKDIwMSkuanNvbih7IHN0YXR1czogJ3N1Y2Nlc3MnLCByZXNwb25zZTogZGF0YSwgbWFwcGVyOiAncmV0dXJuJyB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRUZXh0U3RvcmllKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIlN0YXR1cyBTdG9yaWVzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJvYmpcIl0gPSB7XG4gICAgICBpbjogJ2JvZHknLFxuICAgICAgc2NoZW1hOiB7XG4gICAgICAgIHRleHQ6ICdNeSBuZXcgc3RvcmllJyxcbiAgICAgICAgb3B0aW9uczogeyBiYWNrZ3JvdW5kQ29sb3I6ICcjMDI3NWQ4JywgZm9udDogMn0sXG4gICAgICB9XG4gICAgIH1cbiAgICAgI3N3YWdnZXIucmVxdWVzdEJvZHkgPSB7XG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgdGV4dDogeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICBvcHRpb25zOiB7IHR5cGU6ICdvYmplY3QnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFsndGV4dCddLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXhhbXBsZXM6IHtcbiAgICAgICAgICAgICdEZWZhdWx0Jzoge1xuICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdNeSBuZXcgc3RvcmllJyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7IGJhY2tncm91bmRDb2xvcjogJyMwMjc1ZDgnLCBmb250OiAyfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfVxuICAgKi9cbiAgY29uc3QgeyB0ZXh0LCBvcHRpb25zIH0gPSByZXEuYm9keTtcblxuICBpZiAoIXRleHQpXG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoe1xuICAgICAgbWVzc2FnZTogJ1RleHQgd2FzIG5vdCBpbmZvcm1lZCcsXG4gICAgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHRzOiBhbnkgPSBbXTtcbiAgICByZXN1bHRzLnB1c2goYXdhaXQgcmVxLmNsaWVudC5zZW5kVGV4dFN0YXR1cyh0ZXh0LCBvcHRpb25zKSk7XG5cbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPT09IDApXG4gICAgICByZXMuc3RhdHVzKDQwMCkuanNvbignRXJyb3Igc2VuZGluZyB0aGUgdGV4dCBvZiBzdG9yaWVzJyk7XG4gICAgcmV0dXJuU3VjZXNzKHJlcywgcmVzdWx0cyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZEltYWdlU3RvcmllKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIlN0YXR1cyBTdG9yaWVzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBjb250ZW50OiB7XG4gICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzoge1xuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHBhdGg6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1aXJlZDogWydwYXRoJ10sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgJ0RlZmF1bHQnOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgcGF0aDogJ1BhdGggb2YgeW91ciBpbWFnZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH1cbiAgICovXG4gIGNvbnN0IHsgcGF0aCB9ID0gcmVxLmJvZHk7XG5cbiAgaWYgKCFwYXRoICYmICFyZXEuZmlsZSlcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7XG4gICAgICBtZXNzYWdlOiAnU2VuZGluZyB0aGUgaW1hZ2UgaXMgbWFuZGF0b3J5JyxcbiAgICB9KTtcblxuICBjb25zdCBwYXRoRmlsZSA9IHBhdGggfHwgcmVxLmZpbGU/LnBhdGg7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHRzOiBhbnkgPSBbXTtcbiAgICByZXN1bHRzLnB1c2goYXdhaXQgcmVxLmNsaWVudC5zZW5kSW1hZ2VTdGF0dXMocGF0aEZpbGUpKTtcblxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKCdFcnJvciBzZW5kaW5nIHRoZSBpbWFnZSBvZiBzdG9yaWVzJyk7XG4gICAgcmV0dXJuU3VjZXNzKHJlcywgcmVzdWx0cyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuRXJyb3IocmVxLCByZXMsIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFZpZGVvU3RvcmllKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIlN0YXR1cyBTdG9yaWVzXCJdXG4gICAgICNzd2FnZ2VyLmF1dG9Cb2R5PWZhbHNlXG4gICAgICNzd2FnZ2VyLnNlY3VyaXR5ID0gW3tcbiAgICAgICAgICAgIFwiYmVhcmVyQXV0aFwiOiBbXVxuICAgICB9XVxuICAgICAjc3dhZ2dlci5wYXJhbWV0ZXJzW1wic2Vzc2lvblwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ05FUkRXSEFUU19BTUVSSUNBJ1xuICAgICB9XG4gICAgICNzd2FnZ2VyLnJlcXVlc3RCb2R5ID0ge1xuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBjb250ZW50OiB7XG4gICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBwYXRoOiB7IHR5cGU6IFwic3RyaW5nXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBbXCJwYXRoXCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGFtcGxlczoge1xuICAgICAgICAgICAgXCJEZWZhdWx0XCI6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICBwYXRoOiBcIlBhdGggb2YgeW91ciB2aWRlb1wiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAqL1xuICBjb25zdCB7IHBhdGggfSA9IHJlcS5ib2R5O1xuXG4gIGlmICghcGF0aCAmJiAhcmVxLmZpbGUpXG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoe1xuICAgICAgbWVzc2FnZTogJ1NlbmRpbmcgdGhlIFZpZGVvIGlzIG1hbmRhdG9yeScsXG4gICAgfSk7XG5cbiAgY29uc3QgcGF0aEZpbGUgPSBwYXRoIHx8IHJlcS5maWxlPy5wYXRoO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0czogYW55ID0gW107XG5cbiAgICByZXN1bHRzLnB1c2goYXdhaXQgcmVxLmNsaWVudC5zZW5kVmlkZW9TdGF0dXMocGF0aEZpbGUpKTtcblxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkgcmVzLnN0YXR1cyg0MDApLmpzb24oJ0Vycm9yIHNlbmRpbmcgbWVzc2FnZScpO1xuICAgIGlmIChyZXEuZmlsZSkgYXdhaXQgdW5saW5rQXN5bmMocGF0aEZpbGUpO1xuICAgIHJldHVyblN1Y2VzcyhyZXMsIHJlc3VsdHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBlcnJvcik7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQSxJQUFBQSxVQUFBLEdBQUFDLE9BQUE7QUFFQSxTQUFTQyxXQUFXQSxDQUFDQyxHQUFZLEVBQUVDLEdBQWEsRUFBRUMsS0FBVSxFQUFFO0VBQzVERixHQUFHLENBQUNHLE1BQU0sQ0FBQ0QsS0FBSyxDQUFDQSxLQUFLLENBQUM7RUFDdkJELEdBQUcsQ0FDQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNYQyxJQUFJLENBQUM7SUFBRUQsTUFBTSxFQUFFLE9BQU87SUFBRUUsT0FBTyxFQUFFLHdCQUF3QjtJQUFFSixLQUFLLEVBQUVBO0VBQU0sQ0FBQyxDQUFDO0FBQy9FO0FBRUEsZUFBZUssWUFBWUEsQ0FBQ04sR0FBYSxFQUFFTyxJQUFTLEVBQUU7RUFDcERQLEdBQUcsQ0FBQ0csTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENB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