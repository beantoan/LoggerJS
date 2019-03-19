
var Logger = (function () {
    function Logger() {
    }
    Logger.printLog = function (logType, msg, style) {
        if (style === void 0) { style = null; }
        switch (logType) {
            case this.INFO:
                console.log("%c" + msg, style);
                break;
            case this.WARN:
                console.warn(msg);
                break;
            case this.ERROR:
                console.error(msg);
                break;
        }
    };
    Logger.objectToStr = function (parentObjectType, objectName, objectValue) {
        if (objectValue) {
            if (typeof (objectValue) === 'object') {
                var objectStr = Object.keys(objectValue).map(function (key) { return key + '=' + objectValue[key]; }).join(', ');
                if (parentObjectType === 'Array') {
                    return objectStr;
                }
                return objectName + '(' + objectStr + ')';
            }
            else {
                return objectName + "=" + objectValue;
            }
        }
        return null;
    };
    Logger.parseObject = function (object, count) {
        if (count === void 0) { count = 0; }
        count = count + 1;
        if (count > 4) {
            return '...';
        }
        if (object instanceof Object) {
            var objectName = object.constructor.name;
            var paramArr = Object.keys(object).map(function (key) { return [key, object[key]]; });
            var paramStr = null;
            if (paramArr.length === 1) {
                paramStr = this.objectToStr(objectName, paramArr[0][0], paramArr[0][1]);
            }
            else {
                var data = [];
                for (var _i = 0, paramArr_1 = paramArr; _i < paramArr_1.length; _i++) {
                    var p = paramArr_1[_i];
                    var objectStr = p[1] ? this.parseObject(p[1], count) : null;
                    data.push(objectName === 'Array' ? objectStr : p[0] + '=' + objectStr);
                }
                paramStr = data.join(', ');
            }
            return objectName + '(' + paramStr + ')';
        }
        else {
            return object;
        }
    };
    Logger.log = function (logType, className, methodName, params) {
        if (params && params.length > 0) {
            this.printLog(logType, ">>> " + className + "#" + methodName + "() at " + Date(), 'background: #222; color: #fff');
            for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                var param = params_1[_i];
                this.printLog(logType, this.parseObject(param, 0));
            }
            this.printLog(logType, 'END <<<', 'background: #222; color: #fff');
        }
        else {
            this.printLog(logType, ">>> " + className + "#" + methodName + "() at " + Date() + " END <<<", 'background: #222; color: #fff');
        }
    };
    Logger.info = function (className, methodName) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        this.log(this.INFO, className, methodName, params);
    };
    Logger.error = function (className, methodName) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        this.log(this.ERROR, className, methodName, params);
    };
    Logger.warn = function (className, methodName) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        this.log(this.WARN, className, methodName, params);
    };
    Logger.INFO = 1;
    Logger.WARN = 2;
    Logger.ERROR = 3;
    return Logger;
}());
