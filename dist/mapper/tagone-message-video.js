"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  caption: {
    path: '$item',
    formatting: value => {
      return value.caption || '';
    }
  },
  mimetype: 'mimetype',
  size: 'size',
  duration: 'duration',
  fileUrl: {
    path: '$item',
    formatting: value => {
      return value.fileUrl || '';
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjYXB0aW9uIiwicGF0aCIsImZvcm1hdHRpbmciLCJ2YWx1ZSIsIm1pbWV0eXBlIiwic2l6ZSIsImR1cmF0aW9uIiwiZmlsZVVybCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYXBwZXIvdGFnb25lLW1lc3NhZ2UtdmlkZW8udHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjYXB0aW9uOiB7XG4gICAgcGF0aDogJyRpdGVtJyxcbiAgICBmb3JtYXR0aW5nOiAodmFsdWU6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHZhbHVlLmNhcHRpb24gfHwgJyc7XG4gICAgfSxcbiAgfSxcbiAgbWltZXR5cGU6ICdtaW1ldHlwZScsXG4gIHNpemU6ICdzaXplJyxcbiAgZHVyYXRpb246ICdkdXJhdGlvbicsXG4gIGZpbGVVcmw6IHtcbiAgICBwYXRoOiAnJGl0ZW0nLFxuICAgIGZvcm1hdHRpbmc6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgICByZXR1cm4gdmFsdWUuZmlsZVVybCB8fCAnJztcbiAgICB9LFxuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2lDQUFlO0VBQ2JBLE9BQU8sRUFBRTtJQUNQQyxJQUFJLEVBQUUsT0FBTztJQUNiQyxVQUFVLEVBQUdDLEtBQVUsSUFBSztNQUMxQixPQUFPQSxLQUFLLENBQUNILE9BQU8sSUFBSSxFQUFFO0lBQzVCO0VBQ0YsQ0FBQztFQUNESSxRQUFRLEVBQUUsVUFBVTtFQUNwQkMsSUFBSSxFQUFFLE1BQU07RUFDWkMsUUFBUSxFQUFFLFVBQVU7RUFDcEJDLE9BQU8sRUFBRTtJQUNQTixJQUFJLEVBQUUsT0FBTztJQUNiQyxVQUFVLEVBQUdDLEtBQVUsSUFBSztNQUMxQixPQUFPQSxLQUFLLENBQUNJLE9BQU8sSUFBSSxFQUFFO0lBQzVCO0VBQ0Y7QUFDRixDQUFDIiwiaWdub3JlTGlzdCI6W119