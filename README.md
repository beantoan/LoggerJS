### INSTRUCTION

1. Include `Logger` into your web page:
    
    * JavaScript
    ```html
    <script src="logger.js"></script>
    ```
    
    * TypeScript
    ```typescript
    import {Logger} from './logger';
    ```

1. Usage:
    * JavaScript
    ```javascript
    
    var Example = {};
    
    Example.functionX = function () {
        var varX = {a: 1, b: 2};
        Logger.info('Example', 'functionX', 'varX', varX);    
        Logger.warn('Example', 'functionX', 'varX', varX);    
        Logger.error('Example', 'functionX', 'varX', varX);    
    };
    ```
    
    * TypeScript
    ```typescript
    @Injectable()
    export class ExampleService {
       
      index(page: number, size: number) {
        Logger.info(ExampleService.name, 'index', `page=${page}, size=${size}`);
        Logger.warn(ExampleService.name, 'index', `page=${page}, size=${size}`);
        Logger.error(ExampleService.name, 'index', `page=${page}, size=${size}`);
      }
    }
    ```