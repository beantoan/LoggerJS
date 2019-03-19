export class Logger {
  static INFO = 1;
  static WARN = 2;
  static ERROR = 3;

  private static printLog(logType: number, msg: any, style: string = null) {
    switch (logType) {
      case this.INFO:
        console.log(`%c${msg}`, style);
        break;
      case this.WARN:
        console.warn(msg);
        break;
      case this.ERROR:
        console.error(msg);
        break;
    }
  }

  private static objectToStr(parentObjectType, objectName, objectValue) {
    if (objectValue) {
      if (typeof (objectValue) === 'object') {
        const objectStr = Object.keys(objectValue).map((key) => key + '=' + objectValue[key]).join(', ');

        if (parentObjectType === 'Array') {
          return objectStr;
        }

        return objectName + '(' + objectStr + ')';
      } else {
        return `${objectName}=${objectValue}`;
      }
    }

    return null;
  }

  private static parseObject(object, count = 0) {
    count = count + 1;

    if (count > 4) {
      return '...';
    }

    if (object instanceof Object) {
      const objectName = object.constructor.name;

      const paramArr = Object.keys(object).map((key) => [key, object[key]]);

      let paramStr = null;

      if (paramArr.length === 1) {
        paramStr = this.objectToStr(objectName, paramArr[0][0], paramArr[0][1]);
      } else {
        const data = [];

        for (const p of paramArr) {
          const objectStr = p[1] ? this.parseObject(p[1], count) : null;

          data.push(objectName === 'Array' ? objectStr : p[0] + '=' + objectStr);
        }

        paramStr = data.join(', ');
      }

      return objectName + '(' + paramStr + ')';
    } else {
      return object;
    }
  }

  static log(logType: number, className: string, methodName: string, params: any[]) {
    if (params && params.length > 0) {
      this.printLog(logType, `>>> ${className}#${methodName}() at ${Date()}`, 'background: #222; color: #fff');

      for (const param of params) {
        this.printLog(logType, this.parseObject(param, 0));
      }

      this.printLog(logType, 'END <<<', 'background: #222; color: #fff');
    } else {
      this.printLog(logType, `>>> ${className}#${methodName}() at ${Date()} END <<<`, 'background: #222; color: #fff');
    }
  }

  static info(className: string, methodName: string, ...params: any[]) {
    this.log(this.INFO, className, methodName, params);
  }

  static error(className: string, methodName: string, ...params: any[]) {
    this.log(this.ERROR, className, methodName, params);
  }

  static warn(className: string, methodName: string, ...params: any[]) {
    this.log(this.WARN, className, methodName, params);
  }
}
