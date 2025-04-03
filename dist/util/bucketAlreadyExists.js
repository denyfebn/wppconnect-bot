"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bucketAlreadyExists = bucketAlreadyExists;
var _clientS = require("@aws-sdk/client-s3");
var _ = require("..");
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function bucketAlreadyExists(bucketName) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      if (!_config.default.aws_s3.region) throw new Error('Config your AWS environment');
      const s3Client = new _clientS.S3Client({
        region: _config.default.aws_s3.region
      });
      const command = new _clientS.HeadBucketCommand({
        Bucket: bucketName
      });
      await s3Client.send(command);
      resolve(true);
    } catch (error) {
      if (error.name === 'NoSuchBucket' || error.name === 'NotFound') {
        resolve(false);
      } else {
        _.logger.error(error);
        reject(error);
      }
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY2xpZW50UyIsInJlcXVpcmUiLCJfIiwiX2NvbmZpZyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJlIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJidWNrZXRBbHJlYWR5RXhpc3RzIiwiYnVja2V0TmFtZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29uZmlnIiwiYXdzX3MzIiwicmVnaW9uIiwiRXJyb3IiLCJzM0NsaWVudCIsIlMzQ2xpZW50IiwiY29tbWFuZCIsIkhlYWRCdWNrZXRDb21tYW5kIiwiQnVja2V0Iiwic2VuZCIsImVycm9yIiwibmFtZSIsImxvZ2dlciJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2J1Y2tldEFscmVhZHlFeGlzdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGVhZEJ1Y2tldENvbW1hbmQsIFMzQ2xpZW50IH0gZnJvbSAnQGF3cy1zZGsvY2xpZW50LXMzJztcblxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4nO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYnVja2V0QWxyZWFkeUV4aXN0cyhidWNrZXROYW1lOiBzdHJpbmcpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWFzeW5jLXByb21pc2UtZXhlY3V0b3JcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFjb25maWcuYXdzX3MzLnJlZ2lvbikgdGhyb3cgbmV3IEVycm9yKCdDb25maWcgeW91ciBBV1MgZW52aXJvbm1lbnQnKTtcbiAgICAgIGNvbnN0IHMzQ2xpZW50ID0gbmV3IFMzQ2xpZW50KHsgcmVnaW9uOiBjb25maWcuYXdzX3MzLnJlZ2lvbiB9KTtcblxuICAgICAgY29uc3QgY29tbWFuZCA9IG5ldyBIZWFkQnVja2V0Q29tbWFuZCh7IEJ1Y2tldDogYnVja2V0TmFtZSB9KTtcbiAgICAgIGF3YWl0IHMzQ2xpZW50LnNlbmQoY29tbWFuZCk7XG4gICAgICByZXNvbHZlKHRydWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGlmIChlcnJvci5uYW1lID09PSAnTm9TdWNoQnVja2V0JyB8fCBlcnJvci5uYW1lID09PSAnTm90Rm91bmQnKSB7XG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBQSxRQUFBLEdBQUFDLE9BQUE7QUFFQSxJQUFBQyxDQUFBLEdBQUFELE9BQUE7QUFDQSxJQUFBRSxPQUFBLEdBQUFDLHNCQUFBLENBQUFILE9BQUE7QUFBK0IsU0FBQUcsdUJBQUFDLENBQUEsV0FBQUEsQ0FBQSxJQUFBQSxDQUFBLENBQUFDLFVBQUEsR0FBQUQsQ0FBQSxLQUFBRSxPQUFBLEVBQUFGLENBQUE7QUFFeEIsZUFBZUcsbUJBQW1CQSxDQUFDQyxVQUFrQixFQUFFO0VBQzVEO0VBQ0EsT0FBTyxJQUFJQyxPQUFPLENBQUMsT0FBT0MsT0FBTyxFQUFFQyxNQUFNLEtBQUs7SUFDNUMsSUFBSTtNQUNGLElBQUksQ0FBQ0MsZUFBTSxDQUFDQyxNQUFNLENBQUNDLE1BQU0sRUFBRSxNQUFNLElBQUlDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQztNQUN6RSxNQUFNQyxRQUFRLEdBQUcsSUFBSUMsaUJBQVEsQ0FBQztRQUFFSCxNQUFNLEVBQUVGLGVBQU0sQ0FBQ0MsTUFBTSxDQUFDQztNQUFPLENBQUMsQ0FBQztNQUUvRCxNQUFNSSxPQUFPLEdBQUcsSUFBSUMsMEJBQWlCLENBQUM7UUFBRUMsTUFBTSxFQUFFWjtNQUFXLENBQUMsQ0FBQztNQUM3RCxNQUFNUSxRQUFRLENBQUNLLElBQUksQ0FBQ0gsT0FBTyxDQUFDO01BQzVCUixPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ2YsQ0FBQyxDQUFDLE9BQU9ZLEtBQVUsRUFBRTtNQUNuQixJQUFJQSxLQUFLLENBQUNDLElBQUksS0FBSyxjQUFjLElBQUlELEtBQUssQ0FBQ0MsSUFBSSxLQUFLLFVBQVUsRUFBRTtRQUM5RGIsT0FBTyxDQUFDLEtBQUssQ0FBQztNQUNoQixDQUFDLE1BQU07UUFDTGMsUUFBTSxDQUFDRixLQUFLLENBQUNBLEtBQUssQ0FBQztRQUNuQlgsTUFBTSxDQUFDVyxLQUFLLENBQUM7TUFDZjtJQUNGO0VBQ0YsQ0FBQyxDQUFDO0FBQ0oiLCJpZ25vcmVMaXN0IjpbXX0=