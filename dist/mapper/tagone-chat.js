"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  id: 'id',
  type: 'kind',
  phone: {
    path: 'id.user',
    formatting: value => {
      return value.split('@')[0];
    }
  },
  author: {
    path: 'contact',
    formatting: value => {
      return value.isMyContact ? value.formattedName : value.pushname;
    }
  },
  timestamp: 't'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpZCIsInR5cGUiLCJwaG9uZSIsInBhdGgiLCJmb3JtYXR0aW5nIiwidmFsdWUiLCJzcGxpdCIsImF1dGhvciIsImlzTXlDb250YWN0IiwiZm9ybWF0dGVkTmFtZSIsInB1c2huYW1lIiwidGltZXN0YW1wIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hcHBlci90YWdvbmUtY2hhdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGlkOiAnaWQnLFxuICB0eXBlOiAna2luZCcsXG4gIHBob25lOiB7XG4gICAgcGF0aDogJ2lkLnVzZXInLFxuICAgIGZvcm1hdHRpbmc6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ0AnKVswXTtcbiAgICB9LFxuICB9LFxuICBhdXRob3I6IHtcbiAgICBwYXRoOiAnY29udGFjdCcsXG4gICAgZm9ybWF0dGluZzogKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiB2YWx1ZS5pc015Q29udGFjdCA/IHZhbHVlLmZvcm1hdHRlZE5hbWUgOiB2YWx1ZS5wdXNobmFtZTtcbiAgICB9LFxuICB9LFxuICB0aW1lc3RhbXA6ICd0Jyxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztpQ0FBZTtFQUNiQSxFQUFFLEVBQUUsSUFBSTtFQUNSQyxJQUFJLEVBQUUsTUFBTTtFQUNaQyxLQUFLLEVBQUU7SUFDTEMsSUFBSSxFQUFFLFNBQVM7SUFDZkMsVUFBVSxFQUFHQyxLQUFVLElBQUs7TUFDMUIsT0FBT0EsS0FBSyxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCO0VBQ0YsQ0FBQztFQUNEQyxNQUFNLEVBQUU7SUFDTkosSUFBSSxFQUFFLFNBQVM7SUFDZkMsVUFBVSxFQUFHQyxLQUFVLElBQUs7TUFDMUIsT0FBT0EsS0FBSyxDQUFDRyxXQUFXLEdBQUdILEtBQUssQ0FBQ0ksYUFBYSxHQUFHSixLQUFLLENBQUNLLFFBQVE7SUFDakU7RUFDRixDQUFDO0VBQ0RDLFNBQVMsRUFBRTtBQUNiLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=