export default class Utils {
  static compareObj(obj1: any, obj2: any) {
    return Object.entries(obj2).reduce((acc: any, [key, value]) => {
      if (obj1[key] !== value) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }
}
