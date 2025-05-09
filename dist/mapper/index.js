"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convert = convert;
var _jsonMapperJson = _interopRequireDefault(require("json-mapper-json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
async function convert(prefix, data, event) {
  try {
    data.event = event || data.event;
    event = data.event.indexOf('message') >= 0 ? 'message' : data.event;
    const mappConfEvent = await config_event(prefix, event);
    const mappConfType = await config_type(prefix, event, data.type);
    Object.assign(mappConfEvent, mappConfType);

    // console.log('mappConfEvent', mappConfEvent);

    if (!mappConfEvent) return data;
    return await (0, _jsonMapperJson.default)(data, mappConfEvent);
  } catch (e) {
    return data;
  }
}
async function config_event(prefix, event) {
  try {
    const {
      default: mappConf
    } = await (specifier => new Promise(r => r(specifier)).then(s => _interopRequireWildcard(require(s))))(`./${prefix}${event}.js`);
    if (!mappConf) return undefined;
    return mappConf;
  } catch (e) {
    return undefined;
  }
}
async function config_type(prefix, event, type) {
  try {
    const {
      default: mappConf
    } = await (specifier => new Promise(r => r(specifier)).then(s => _interopRequireWildcard(require(s))))(`./${prefix}${event}-${type}.js`);
    if (!mappConf) return undefined;
    return mappConf;
  } catch (e) {
    return undefined;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfanNvbk1hcHBlckpzb24iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsImUiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIl9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSIsIldlYWtNYXAiLCJyIiwidCIsIl9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkIiwiaGFzIiwiZ2V0IiwibiIsIl9fcHJvdG9fXyIsImEiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJpIiwic2V0IiwiY29udmVydCIsInByZWZpeCIsImRhdGEiLCJldmVudCIsImluZGV4T2YiLCJtYXBwQ29uZkV2ZW50IiwiY29uZmlnX2V2ZW50IiwibWFwcENvbmZUeXBlIiwiY29uZmlnX3R5cGUiLCJ0eXBlIiwiYXNzaWduIiwibWFwcGVyIiwibWFwcENvbmYiLCJzcGVjaWZpZXIiLCJQcm9taXNlIiwidGhlbiIsInMiLCJ1bmRlZmluZWQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbWFwcGVyL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtYXBwZXIgZnJvbSAnanNvbi1tYXBwZXItanNvbic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb252ZXJ0KHByZWZpeDogc3RyaW5nLCBkYXRhOiBhbnksIGV2ZW50PzogYW55KSB7XG4gIHRyeSB7XG4gICAgZGF0YS5ldmVudCA9IGV2ZW50IHx8IGRhdGEuZXZlbnQ7XG4gICAgZXZlbnQgPSBkYXRhLmV2ZW50LmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwID8gJ21lc3NhZ2UnIDogZGF0YS5ldmVudDtcblxuICAgIGNvbnN0IG1hcHBDb25mRXZlbnQgPSBhd2FpdCBjb25maWdfZXZlbnQocHJlZml4LCBldmVudCk7XG4gICAgY29uc3QgbWFwcENvbmZUeXBlID0gYXdhaXQgY29uZmlnX3R5cGUocHJlZml4LCBldmVudCwgZGF0YS50eXBlKTtcblxuICAgIE9iamVjdC5hc3NpZ24obWFwcENvbmZFdmVudCwgbWFwcENvbmZUeXBlKTtcblxuICAgIC8vIGNvbnNvbGUubG9nKCdtYXBwQ29uZkV2ZW50JywgbWFwcENvbmZFdmVudCk7XG5cbiAgICBpZiAoIW1hcHBDb25mRXZlbnQpIHJldHVybiBkYXRhO1xuICAgIHJldHVybiBhd2FpdCBtYXBwZXIoZGF0YSwgbWFwcENvbmZFdmVudCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjb25maWdfZXZlbnQocHJlZml4OiBhbnksIGV2ZW50OiBhbnkpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGRlZmF1bHQ6IG1hcHBDb25mIH0gPSBhd2FpdCBpbXBvcnQoYC4vJHtwcmVmaXh9JHtldmVudH0uanNgKTtcbiAgICBpZiAoIW1hcHBDb25mKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiBtYXBwQ29uZjtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY29uZmlnX3R5cGUocHJlZml4OiBhbnksIGV2ZW50OiBhbnksIHR5cGU6IGFueSkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZGVmYXVsdDogbWFwcENvbmYgfSA9IGF3YWl0IGltcG9ydChcbiAgICAgIGAuLyR7cHJlZml4fSR7ZXZlbnR9LSR7dHlwZX0uanNgXG4gICAgKTtcbiAgICBpZiAoIW1hcHBDb25mKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiBtYXBwQ29uZjtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQUEsZUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQXNDLFNBQUFELHVCQUFBRSxDQUFBLFdBQUFBLENBQUEsSUFBQUEsQ0FBQSxDQUFBQyxVQUFBLEdB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