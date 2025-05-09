"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("../../../config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const redis = _config.default.tokenStoreType === 'redis' ? require('redis') : null;
let RedisClient = null;
if (_config.default.tokenStoreType === 'redis') {
  RedisClient = redis.createClient(_config.default.db.redisPort, _config.default.db.redisHost, {
    password: _config.default.db.redisPassword,
    db: _config.default.db.redisDb
  });
}
var _default = exports.default = RedisClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29uZmlnIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJlIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJyZWRpcyIsImNvbmZpZyIsInRva2VuU3RvcmVUeXBlIiwiUmVkaXNDbGllbnQiLCJjcmVhdGVDbGllbnQiLCJkYiIsInJlZGlzUG9ydCIsInJlZGlzSG9zdCIsInBhc3N3b3JkIiwicmVkaXNQYXNzd29yZCIsInJlZGlzRGIiLCJfZGVmYXVsdCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbC9kYi9yZWRpcy9kYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XG5cbmNvbnN0IHJlZGlzID0gY29uZmlnLnRva2VuU3RvcmVUeXBlID09PSAncmVkaXMnID8gcmVxdWlyZSgncmVkaXMnKSA6IG51bGw7XG5cbmxldCBSZWRpc0NsaWVudDogYW55ID0gbnVsbDtcblxuaWYgKGNvbmZpZy50b2tlblN0b3JlVHlwZSA9PT0gJ3JlZGlzJykge1xuICBSZWRpc0NsaWVudCA9IHJlZGlzLmNyZWF0ZUNsaWVudChjb25maWcuZGIucmVkaXNQb3J0LCBjb25maWcuZGIucmVkaXNIb3N0LCB7XG4gICAgcGFzc3dvcmQ6IGNvbmZpZy5kYi5yZWRpc1Bhc3N3b3JkLFxuICAgIGRiOiBjb25maWcuZGIucmVkaXNEYixcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlZGlzQ2xpZW50O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFBcUMsU0FBQUQsdUJBQUFFLENBQUEsV0FBQUEsQ0FBQSxJQUFBQSxDQUFBLENBQUFDLFVBQUEsR0FBQUQsQ0FBQSxLQUFBRSxPQUFBLEVBQUFGLENBQUE7QUFFckMsTUFBTUcsS0FBSyxHQUFHQyxlQUFNLENBQUNDLGNBQWMsS0FBSyxPQUFPLEdBQUdOLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJO0FBRXpFLElBQUlPLFdBQWdCLEdBQUcsSUFBSTtBQUUzQixJQUFJRixlQUFNLENBQUNDLGNBQWMsS0FBSyxPQUFPLEVBQUU7RUFDckNDLFdBQVcsR0FBR0gsS0FBSyxDQUFDSSxZQUFZLENBQUNILGVBQU0sQ0FBQ0ksRUFBRSxDQUFDQyxTQUFTLEVBQUVMLGVBQU0sQ0FBQ0ksRUFBRSxDQUFDRSxTQUFTLEVBQUU7SUFDekVDLFFBQVEsRUFBRVAsZUFBTSxDQUFDSSxFQUFFLENBQUNJLGFBQWE7SUFDakNKLEVBQUUsRUFBRUosZUFBTSxDQUFDSSxFQUFFLENBQUNLO0VBQ2hCLENBQUMsQ0FBQztBQUNKO0FBQUMsSUFBQUMsUUFBQSxHQUFBQyxPQUFBLENBQUFiLE9BQUEsR0FFY0ksV0FBVyIsImlnbm9yZUxpc3QiOltdfQ==