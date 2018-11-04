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
                    const contentType = this.mimeTypes[extName] || 'application/octet-stream';
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
        this.mimeTypes = {
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
        this.server.listen(this.port, () => {
            this.events.emit('Server Is Listening');
        });
    }
}
exports.SimpleServer = SimpleServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsK0NBQWlDO0FBQ2pDLHVDQUF5QjtBQUN6QiwyQ0FBNkI7QUFDN0IsMkNBQTZCO0FBQzdCLHlDQUEyQjtBQWMzQixNQUFhLFlBQVk7SUFTckIsWUFBWSxJQUFZLEVBQUUsVUFBa0I7UUFzQ3BDLGNBQVMsR0FBRyxDQUFDLE9BQTZCLEVBQUUsUUFBNkIsRUFBRSxFQUFFO1lBQ2pGLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNoRCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQzVDLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFFdEMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksS0FBSyxHQUFrQixLQUFLLENBQUM7WUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO2dCQUN6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLGVBQWUsRUFBRTtvQkFDM0UsS0FBSyxHQUFHLFNBQVMsQ0FBQztvQkFDbEIsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDbEIsTUFBTTtpQkFDVDthQUNKO1lBRUQsSUFBSSxVQUFVLElBQUksS0FBSyxFQUFFO2dCQUNyQixtQkFBbUI7Z0JBQ25CLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyx5Q0FB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