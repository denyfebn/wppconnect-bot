"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  event: 'event',
  session: 'session',
  id: 'id',
  content: {
    path: '$item',
    formatting: value => {
      return value.mimetype ? value.caption || '' : value.body;
    }
  },
  type: 'type',
  timestamp: 't',
  phone: {
    path: 'from',
    formatting: value => {
      return value.split('@')[0];
    }
  },
  status: 'ack',
  isGroupMsg: 'isGroupMsg',
  contactName: {
    path: 'sender',
    formatting: value => {
      return value.isMyContact ? value.formattedName : value.pushname;
    }
  },
  imgContactUrl: 'sender.profilePicThumbObj.eurl'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJldmVudCIsInNlc3Npb24iLCJpZCIsImNvbnRlbnQiLCJwYXRoIiwiZm9ybWF0dGluZyIsInZhbHVlIiwibWltZXR5cGUiLCJjYXB0aW9uIiwiYm9keSIsInR5cGUiLCJ0aW1lc3RhbXAiLCJwaG9uZSIsInNwbGl0Iiwic3RhdHVzIiwiaXNHcm91cE1zZyIsImNvbnRhY3ROYW1lIiwiaXNNeUNvbnRhY3QiLCJmb3JtYXR0ZWROYW1lIiwicHVzaG5hbWUiLCJpbWdDb250YWN0VXJsIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hcHBlci90YWdvbmUtbWVzc2FnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGV2ZW50OiAnZXZlbnQnLFxuICBzZXNzaW9uOiAnc2Vzc2lvbicsXG4gIGlkOiAnaWQnLFxuICBjb250ZW50OiB7XG4gICAgcGF0aDogJyRpdGVtJyxcbiAgICBmb3JtYXR0aW5nOiAodmFsdWU6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHZhbHVlLm1pbWV0eXBlID8gdmFsdWUuY2FwdGlvbiB8fCAnJyA6IHZhbHVlLmJvZHk7XG4gICAgfSxcbiAgfSxcbiAgdHlwZTogJ3R5cGUnLFxuICB0aW1lc3RhbXA6ICd0JyxcbiAgcGhvbmU6IHtcbiAgICBwYXRoOiAnZnJvbScsXG4gICAgZm9ybWF0dGluZzogKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnQCcpWzBdO1xuICAgIH0sXG4gIH0sXG4gIHN0YXR1czogJ2FjaycsXG4gIGlzR3JvdXBNc2c6ICdpc0dyb3VwTXNnJyxcbiAgY29udGFjdE5hbWU6IHtcbiAgICBwYXRoOiAnc2VuZGVyJyxcbiAgICBmb3JtYXR0aW5nOiAodmFsdWU6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHZhbHVlLmlzTXlDb250YWN0ID8gdmFsdWUuZm9ybWF0dGVkTmFtZSA6IHZhbHVlLnB1c2huYW1lO1xuICAgIH0sXG4gIH0sXG4gIGltZ0NvbnRhY3RVcmw6ICdzZW5kZXIucHJvZmlsZVBpY1RodW1iT2JqLmV1cmwnLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2lDQUFlO0VBQ2JBLEtBQUssRUFBRSxPQUFPO0VBQ2RDLE9BQU8sRUFBRSxTQUFTO0VBQ2xCQyxFQUFFLEVBQUUsSUFBSTtFQUNSQyxPQUFPLEVBQUU7SUFDUEMsSUFBSSxFQUFFLE9BQU87SUFDYkMsVUFBVSxFQUFHQyxLQUFVLElBQUs7TUFDMUIsT0FBT0EsS0FBSyxDQUFDQyxRQUFRLEdBQUdELEtBQUssQ0FBQ0UsT0FBTyxJQUFJLEVBQUUsR0FBR0YsS0FBSyxDQUFDRyxJQUFJO0lBQzFEO0VBQ0YsQ0FBQztFQUNEQyxJQUFJLEVBQUUsTUFBTTtFQUNaQyxTQUFTLEVBQUUsR0FBRztFQUNkQyxLQUFLLEVBQUU7SUFDTFIsSUFBSSxFQUFFLE1BQU07SUFDWkMsVUFBVSxFQUFHQyxLQUFVLElBQUs7TUFDMUIsT0FBT0EsS0FBSyxDQUFDTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCO0VBQ0YsQ0FBQztFQUNEQyxNQUFNLEVBQUUsS0FBSztFQUNiQyxVQUFVLEVBQUUsWUFBWTtFQUN4QkMsV0FBVyxFQUFFO0lBQ1haLElBQUksRUFBRSxRQUFRO0lBQ2RDLFVBQVUsRUFBR0MsS0FBVSxJQUFLO01BQzFCLE9BQU9BLEtBQUssQ0FBQ1csV0FBVyxHQUFHWCxLQUFLLENBQUNZLGFBQWEsR0FBR1osS0FBSyxDQUFDYSxRQUFRO0lBQ2pFO0VBQ0YsQ0FBQztFQUNEQyxhQUFhLEVBQUU7QUFDakIsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==