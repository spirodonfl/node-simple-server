"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Events = __importStar(require("events"));
const fs = __importStar(require("fs"));
const http = __importStar(require("http"));
const path = __importStar(require("path"));
const url = __importStar(require("url"));
class SimpleServer {
    constructor(port, rootFolder) {
        this.onRequest = (request, response) => {
            const requestUrl = url.parse(request.url || '');
            const requestResource = requestUrl.pathname;
            const requestQuery = requestUrl.query;
            let foundRoute = false;
            let route = false;
            for (let r = 0; r < this.routes.length; ++r) {
                const thisRoute = this.routes[r];
                if (thisRoute.method === request.method && thisRoute.path === requestResource) {
                    route = thisRoute;
                    foundRoute = true;
                    break;
                }
            }
            if (foundRoute && route) {
                // Execute callback
                route.callback(request, response);
                // Emit event in case we are using events
                this.events.emit('Route', request, response);
            }
            else {
                // Default route
                if (request.method === 'GET') {
                    let filePath = requestResource;
                    if (filePath === '/') {
                        filePath = this.rootFolder + '/index.html';
                    }
                    else {
                        filePath = this.rootFolder + requestResource;
                    }
                    const extName = String(path.extname(filePath)).toLowerCase();
                    const mimeTypes = {
                        '.css': 'text/css',
                        '.eot': 'application/vnd.ms-fontobject',
                        '.gif': 'image/gif',
                        '.html': 'text/html',
                        '.jpg': 'image/jpg',
                        '.js': 'text/javascript',
                        '.json': 'application/json',
                        '.mp4': 'video/mp4',
                        '.otf': 'application/font-otf',
                        '.png': 'image/png',
                        '.svg': 'application/image/svg+xml',
                        '.ttf': 'application/font-ttf',
                        '.wav': 'audio/wav',
                        '.woff': 'application/font-woff',
                    };
                    const contentType = mimeTypes[extName] || 'application/octet-stream';
                    fs.readFile(filePath, (error, content) => {
                        if (error) {
                            if (error.code === 'ENOENT' || error.code === 'EISDIR') {
                                fs.readFile('./404.html', (fourOFourError, fourOFourContent) => {
                                    response.writeHead(404, { 'Content-Type': contentType });
                                    response.end(fourOFourContent, 'utf-8');
                                });
                            }
                            else {
                                response.writeHead(500);
                                response.end('Sorry, check with the site admin for error code: ' + error.code + ' ..\n');
                                response.end();
                            }
                        }
                        else {
                            response.writeHead(200, { 'Content-Type': contentType });
                            response.end(content, 'utf-8');
                        }
                    });
                }
                else {
                    // TODO: Pass an error here
                }
            }
        };
        this.port = port;
        this.rootFolder = rootFolder;
        this.routes = [];
        this.events = new Events.EventEmitter();
        this.server = http.createServer(this.onRequest);
    }
    addRoute(requestMethod, requestPath, requestCallback) {
        this.routes.push({ method: requestMethod, path: requestPath, callback: requestCallback });
    }
    getRoutes() {
        return this.routes;
    }
    startServer() {
        this.server.listen(this.port);
    }
}
exports.SimpleServer = SimpleServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsK0NBQWlDO0FBQ2pDLHVDQUF5QjtBQUN6QiwyQ0FBNkI7QUFDN0IsMkNBQTZCO0FBQzdCLHlDQUEyQjtBQWMzQixNQUFhLFlBQVk7SUFRckIsWUFBWSxJQUFZLEVBQUUsVUFBa0I7UUFvQnBDLGNBQVMsR0FBRyxDQUFDLE9BQTZCLEVBQUUsUUFBNkIsRUFBRSxFQUFFO1lBQ2pGLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNoRCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQzVDLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFFdEMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksS0FBSyxHQUFrQixLQUFLLENBQUM7WUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO2dCQUN6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLGVBQWUsRUFBRTtvQkFDM0UsS0FBSyxHQUFHLFNBQVMsQ0FBQztvQkFDbEIsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDbEIsTUFBTTtpQkFDVDthQUNKO1lBRUQsSUFBSSxVQUFVLElBQUksS0FBSyxFQUFFO2dCQUNyQixtQkFBbUI7Z0JBQ25CLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyx5Q0FB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