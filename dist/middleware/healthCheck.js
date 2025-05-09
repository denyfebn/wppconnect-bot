"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.healthz = healthz;
exports.unhealthy = unhealthy;
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

async function healthz(req, res) {
  /**
     #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.description = 'This endpoint can be used to check the health status of the API. It returns a response with a status code indicating the API's health status.'
     }
   */
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  try {
    res.status(200).send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
}
async function unhealthy(req, res) {
  /**
     #swagger.tags = ["Misc"]
     #swagger.autoBody=false
     #swagger.description = 'This endpoint is used to force the API into an unhealthy state. It can be useful for testing error handling or simulating service disruptions.'
     }
   */
  res.status(503).send();
  process.exit();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJoZWFsdGh6IiwicmVxIiwicmVzIiwiaGVhbHRoY2hlY2siLCJ1cHRpbWUiLCJwcm9jZXNzIiwibWVzc2FnZSIsInRpbWVzdGFtcCIsIkRhdGUiLCJub3ciLCJzdGF0dXMiLCJzZW5kIiwiZSIsInVuaGVhbHRoeSIsImV4aXQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9oZWFsdGhDaGVjay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgV1BQQ29ubmVjdCBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoZWFsdGh6KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAvKipcbiAgICAgI3N3YWdnZXIudGFncyA9IFtcIk1pc2NcIl1cbiAgICAgI3N3YWdnZXIuYXV0b0JvZHk9ZmFsc2VcbiAgICAgI3N3YWdnZXIuZGVzY3JpcHRpb24gPSAnVGhpcyBlbmRwb2ludCBjYW4gYmUgdXNlZCB0byBjaGVjayB0aGUgaGVhbHRoIHN0YXR1cyBvZiB0aGUgQVBJLiBJdCByZXR1cm5zIGEgcmVzcG9uc2Ugd2l0aCBhIHN0YXR1cyBjb2RlIGluZGljYXRpbmcgdGhlIEFQSSdzIGhlYWx0aCBzdGF0dXMuJ1xuICAgICB9XG4gICAqL1xuICBjb25zdCBoZWFsdGhjaGVjayA9IHtcbiAgICB1cHRpbWU6IHByb2Nlc3MudXB0aW1lKCksXG4gICAgbWVzc2FnZTogJ09LJyxcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gIH07XG4gIHRyeSB7XG4gICAgcmVzLnN0YXR1cygyMDApLnNlbmQoaGVhbHRoY2hlY2spO1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBoZWFsdGhjaGVjay5tZXNzYWdlID0gZTtcbiAgICByZXMuc3RhdHVzKDUwMykuc2VuZCgpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1bmhlYWx0aHkocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gIC8qKlxuICAgICAjc3dhZ2dlci50YWdzID0gW1wiTWlzY1wiXVxuICAgICAjc3dhZ2dlci5hdXRvQm9keT1mYWxzZVxuICAgICAjc3dhZ2dlci5kZXNjcmlwdGlvbiA9ICdUaGlzIGVuZHBvaW50IGlzIHVzZWQgdG8gZm9yY2UgdGhlIEFQSSBpbnRvIGFuIHVuaGVhbHRoeSBzdGF0ZS4gSXQgY2FuIGJlIHVzZWZ1bCBmb3IgdGVzdGluZyBlcnJvciBoYW5kbGluZyBvciBzaW11bGF0aW5nIHNlcnZpY2UgZGlzcnVwdGlvbnMuJ1xuICAgICB9XG4gICAqL1xuICByZXMuc3RhdHVzKDUwMykuc2VuZCgpO1xuICBwcm9jZXNzLmV4aXQoKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJTyxlQUFlQSxPQUFPQSxDQUFDQyxHQUFZLEVBQUVDLEdBQWEsRUFBRTtFQUN6RDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRSxNQUFNQyxXQUFXLEdBQUc7SUFDbEJDLE1BQU0sRUFBRUMsT0FBTyxDQUFDRCxNQUFNLENBQUMsQ0FBQztJQUN4QkUsT0FBTyxFQUFFLElBQUk7SUFDYkMsU0FBUyxFQUFFQyxJQUFJLENBQUNDLEdBQUcsQ0FBQztFQUN0QixDQUFDO0VBQ0QsSUFBSTtJQUNGUCxHQUFHLENBQUNRLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDUixXQUFXLENBQUM7RUFDbkMsQ0FBQyxDQUFDLE9BQU9TLENBQU0sRUFBRTtJQUNmVCxXQUFXLENBQUNHLE9BQU8sR0FBR00sQ0FBQztJQUN2QlYsR0FBRyxDQUFDUSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQyxDQUFDO0VBQ3hCO0FBQ0Y7QUFFTyxlQUFlRSxTQUFTQSxDQUFDWixHQUFZLEVBQUVDLEdBQWEsRUFBRTtFQUMzRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDRUEsR0FBRyxDQUFDUSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQyxDQUFDO0VBQ3RCTixPQUFPLENBQUNTLElBQUksQ0FBQyxDQUFDO0FBQ2hCIiwiaWdub3JlTGlzdCI6W119