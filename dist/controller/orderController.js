"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBusinessProfilesProducts = getBusinessProfilesProducts;
exports.getOrderbyMsg = getOrderbyMsg;
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
async function getBusinessProfilesProducts(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["phone"] = {
      in: 'query',
      schema: '5521999999999@c.us',
     }
   */
  const session = req.session;
  const {
    phone
  } = req.query;
  try {
    const results = [];
    const result = await req.client.getBusinessProfilesProducts(phone);
    results.push(result);
    returnSucess(res, session, phone, results);
  } catch (error) {
    returnError(req, res, session, error);
  }
}
async function getOrderbyMsg(req, res) {
  /**
   * #swagger.tags = ["Catalog & Bussiness"]
     #swagger.autoBody=false
     #swagger.security = [{
            "bearerAuth": []
     }]
     #swagger.parameters["session"] = {
      schema: 'NERDWHATS_AMERICA'
     }
     #swagger.parameters["messageId"] = {
      schema: 'true_5521999999999@c.us_3EB0E69ACC5B396B21F2FE'
     }
   */
  const session = req.session;
  const {
    messageId
  } = req.params;
  try {
    const result = await req.client.getOrder(messageId);
    returnSucess(res, session, null, result);
  } catch (error) {
    returnError(req, res, session, error);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXR1cm5TdWNlc3MiLCJyZXMiLCJzZXNzaW9uIiwicGhvbmUiLCJkYXRhIiwic3RhdHVzIiwianNvbiIsInJlc3BvbnNlIiwibWVzc2FnZSIsImNvbnRhY3QiLCJyZXR1cm5FcnJvciIsInJlcSIsImVycm9yIiwibG9nZ2VyIiwibG9nIiwiZ2V0QnVzaW5lc3NQcm9maWxlc1Byb2R1Y3RzIiwicXVlcnkiLCJyZXN1bHRzIiwicmVzdWx0IiwiY2xpZW50IiwicHVzaCIsImdldE9yZGVyYnlNc2ciLCJtZXNzYWdlSWQiLCJwYXJhbXMiLCJnZXRPcmRlciJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVyL29yZGVyQ29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjMgV1BQQ29ubmVjdCBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5mdW5jdGlvbiByZXR1cm5TdWNlc3MoXG4gIHJlczogUmVzcG9uc2UsXG4gIHNlc3Npb246IHN0cmluZyxcbiAgcGhvbmU6IHN0cmluZyB8IG51bGwsXG4gIGRhdGE/OiBhbnlcbikge1xuICByZXMuc3RhdHVzKDIwMSkuanNvbih7XG4gICAgc3RhdHVzOiAnU3VjY2VzcycsXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgIG1lc3NhZ2U6ICdJbmZvcm1hdGlvbiByZXRyaWV2ZWQgc3VjY2Vzc2Z1bGx5LicsXG4gICAgICBjb250YWN0OiBwaG9uZSxcbiAgICAgIHNlc3Npb246IHNlc3Npb24sXG4gICAgICBkYXRhOiBkYXRhLFxuICAgIH0sXG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXR1cm5FcnJvcihcbiAgcmVxOiBSZXF1ZXN0LFxuICByZXM6IFJlc3BvbnNlLFxuICBzZXNzaW9uOiBzdHJpbmcsXG4gIGVycm9yPzogYW55XG4pIHtcbiAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICBzdGF0dXM6ICdFcnJvcicsXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciByZXRyaWV2aW5nIGluZm9ybWF0aW9uJyxcbiAgICAgIHNlc3Npb246IHNlc3Npb24sXG4gICAgICBsb2c6IGVycm9yLFxuICAgIH0sXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QnVzaW5lc3NQcm9maWxlc1Byb2R1Y3RzKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNhdGFsb2cgJiBCdXNzaW5lc3NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcInBob25lXCJdID0ge1xuICAgICAgaW46ICdxdWVyeScsXG4gICAgICBzY2hlbWE6ICc1NTIxOTk5OTk5OTk5QGMudXMnLFxuICAgICB9XG4gICAqL1xuICBjb25zdCBzZXNzaW9uID0gcmVxLnNlc3Npb247XG4gIGNvbnN0IHsgcGhvbmUgfSA9IHJlcS5xdWVyeSBhcyB1bmtub3duIGFzIGFueTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IFtdO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxLmNsaWVudC5nZXRCdXNpbmVzc1Byb2ZpbGVzUHJvZHVjdHMocGhvbmUpO1xuICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuXG4gICAgcmV0dXJuU3VjZXNzKHJlcywgc2Vzc2lvbiwgcGhvbmUsIHJlc3VsdHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBzZXNzaW9uLCBlcnJvcik7XG4gIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRPcmRlcmJ5TXNnKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICogI3N3YWdnZXIudGFncyA9IFtcIkNhdGFsb2cgJiBCdXNzaW5lc3NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuc2VjdXJpdHkgPSBbe1xuICAgICAgICAgICAgXCJiZWFyZXJBdXRoXCI6IFtdXG4gICAgIH1dXG4gICAgICNzd2FnZ2VyLnBhcmFtZXRlcnNbXCJzZXNzaW9uXCJdID0ge1xuICAgICAgc2NoZW1hOiAnTkVSRFdIQVRTX0FNRVJJQ0EnXG4gICAgIH1cbiAgICAgI3N3YWdnZXIucGFyYW1ldGVyc1tcIm1lc3NhZ2VJZFwiXSA9IHtcbiAgICAgIHNjaGVtYTogJ3RydWVfNTUyMTk5OTk5OTk5OUBjLnVzXzNFQjBFNjlBQ0M1QjM5NkIyMUYyRkUnXG4gICAgIH1cbiAgICovXG4gIGNvbnN0IHNlc3Npb24gPSByZXEuc2Vzc2lvbjtcbiAgY29uc3QgeyBtZXNzYWdlSWQgfSA9IHJlcS5wYXJhbXM7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCAocmVxLmNsaWVudCBhcyBhbnkpLmdldE9yZGVyKG1lc3NhZ2VJZCk7XG5cbiAgICByZXR1cm5TdWNlc3MocmVzLCBzZXNzaW9uLCBudWxsLCByZXN1bHQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybkVycm9yKHJlcSwgcmVzLCBzZXNzaW9uLCBlcnJvcik7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxTQUFTQSxZQUFZQSxDQUNuQkMsR0FBYSxFQUNiQyxPQUFlLEVBQ2ZDLEtBQW9CLEVBQ3BCQyxJQUFVLEVBQ1Y7RUFDQUgsR0FBRyxDQUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztJQUNuQkQsTUFBTSxFQUFFLFNBQVM7SUFDakJFLFFBQVEsRUFBRTtNQUNSQyxPQUFPLEVBQUUscUNBQXFDO01BQzlDQyxPQUFPLEVBQUVOLEtBQUs7TUFDZEQsT0FBTyxFQUFFQSxPQUFPO01BQ2hCRSxJQUFJLEVBQUVBO0lBQ1I7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVBLFNBQVNNLFdBQVdBLENBQ2xCQyxHQUFZLEVBQ1pWLEdBQWEsRUFDYkMsT0FBZSxFQUNmVSxLQUFXLEVBQ1g7RUFDQUQsR0FBRyxDQUFDRSxNQUFNLENBQUNELEtBQUssQ0FBQ0EsS0FBSyxDQUFDO0VBQ3ZCWCxHQUFHLENBQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO0lBQ25CRCxNQUFNLEVBQUUsT0FBTztJQUNmRSxRQUFRLEVBQUU7TUFDUkMsT0FBTyxFQUFFLDhCQUE4QjtNQUN2Q04sT0FBTyxFQUFFQSxPQUFPO01BQ2hCWSxHQUFHLEVBQUVGO0lBQ1A7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVPLGVBQWVHLDJCQUEyQkEsQ0FBQ0osR0FBWSxFQUFFVixHQUFhLEVBQUU7RUFDN0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFLE1BQU1DLE9BQU8sR0FBR1MsR0FBRyxDQUFDVCxPQUFPO0VBQzNCLE1BQU07SUFBRUM7RUFBTSxDQUFDLEdBQUdRLEdBQUcsQ0FBQ0ssS0FBdUI7RUFFN0MsSUFBSTtJQUNGLE1BQU1DLE9BQVksR0FBRyxFQUFFO0lBRXZCLE1BQU1DLE1BQU0sR0FBRyxNQUFNUCxHQUFHLENBQUNRLE1BQU0sQ0FBQ0osMkJBQTJCLENBQUNaLEtBQUssQ0FBQztJQUNsRWMsT0FBTyxDQUFDRyxJQUFJLENBQUNGLE1BQU0sQ0FBQztJQUVwQmxCLFlBQVksQ0FBQ0MsR0FBRyxFQUFFQyxPQUFPLEVBQUVDLEtBQUssRUFBRWMsT0FBTyxDQUFDO0VBQzVDLENBQUMsQ0FBQyxPQUFPTCxLQUFLLEVBQUU7SUFDZEYsV0FBVyxDQUFDQyxHQUFHLEVBQUVWLEdBQUcsRUFBRUMsT0FBTyxFQUFFVSxLQUFLLENBQUM7RUFDdkM7QUFDRjtBQUNPLGVBQWVTLGFBQWFBLENBQUNWLEdBQVksRUFBRVYsR0FBYSxFQUFFO0VBQy9EO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0UsTUFBTUMsT0FBTyxHQUFHUyxHQUFHLENBQUNULE9BQU87RUFDM0IsTUFBTTtJQUFFb0I7RUFBVSxDQUFDLEdBQUdYLEdBQUcsQ0FBQ1ksTUFBTTtFQUVoQyxJQUFJO0lBQ0YsTUFBTUwsTUFBTSxHQUFHLE1BQU9QLEdBQUcsQ0FBQ1EsTUFBTSxDQUFTSyxRQUFRLENBQUNGLFNBQVMsQ0FBQztJQUU1RHRCLFlBQVksQ0FBQ0MsR0FBRyxFQUFFQyxPQUFPLEVBQUUsSUFBSSxFQUFFZ0IsTUFBTSxDQUFDO0VBQzFDLENBQUMsQ0FBQyxPQUFPTixLQUFLLEVBQUU7SUFDZEYsV0FBVyxDQUFDQyxHQUFHLEVBQUVWLEdBQUcsRUFBRUMsT0FBTyxFQUFFVSxLQUFLLENBQUM7RUFDdkM7QUFDRiIsImlnbm9yZUxpc3QiOltdfQ==