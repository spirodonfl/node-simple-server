"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const http = __importStar(require("http"));
const path = __importStar(require("path"));
const url = __importStar(require("url"));
class SimpleServer {
    constructor(port, rootFolder) {
        this.onRequest = (request, response) => {
            const requestUrl = url.parse(request.url || '');
            const reqResource = requestUrl.pathname;
            const reqQuery = requestUrl.query;
            if (request.method === 'GET') {
                let filePath = request.url;
                if (filePath === '/') {
                    filePath = this.rootFolder + '/index.html';
                }
                else {
                    filePath = this.rootFolder + request.url;
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
        };
        this.port = port;
        this.rootFolder = rootFolder;
        this.server = http.createServer(this.onRequest);
        this.server.listen(this.port);
    }
}
exports.SimpleServer = SimpleServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUM3QiwyQ0FBNkI7QUFDN0IseUNBQTJCO0FBRzNCLE1BQWEsWUFBWTtJQUlyQixZQUFZLElBQVksRUFBRSxVQUFrQjtRQU1wQyxjQUFTLEdBQUcsQ0FBQyxPQUE2QixFQUFFLFFBQTZCLEVBQUUsRUFBRTtZQUNqRixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7WUFDaEQsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUN4QyxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ2xDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7Z0JBQzFCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQzNCLElBQUksUUFBUSxLQUFLLEdBQUcsRUFBRTtvQkFDbEIsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDO2lCQUM5QztxQkFBTTtvQkFDSCxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO2lCQUM1QztnQkFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUM3RCxNQUFNLFNBQVMsR0FBRztvQkFDZCxNQUFNLEVBQUUsVUFBVTtvQkFDbEIsTUFBTSxFQUFFLCtCQUErQjtvQkFDdkMsTUFBTSxFQUFFLFdBQVc7b0JBQ25CLE9BQU8sRUFBRSxXQUFXO29CQUNwQixNQUFNLEVBQUUsV0FBVztvQkFDbkIsS0FBSyxFQUFFLGlCQUFpQjtvQkFDeEIsT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsTUFBTSxFQUFFLFdBQVc7b0JBQ25CLE1BQU0sRUFBRSxzQkFBc0I7b0JBQzlCLE1BQU0sRUFBRSxXQUFXO29CQUNuQixNQUFNLEVBQUUsMkJBQTJCO29CQUNuQyxNQUFNLEVBQUUsc0JBQXNCO29CQUM5QixNQUFNLEVBQUUsV0FBVztvQkFDbkIsT0FBTyxFQUFFLHVCQUF1QjtpQkFDbkMsQ0FBQztnQkFFRixNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksMEJBQTBCLENBQUM7Z0JBRXJFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO29CQUNyQyxJQUFJLEtBQUssRUFBRTt3QkFDUCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFOzRCQUNwRCxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFO2dDQUMzRCxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO2dDQUN2RCxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDOzRCQUM1QyxDQUFDLENBQUMsQ0FBQzt5QkFDTjs2QkFBTTs0QkFDSCxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN4QixRQUFRLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUM7NEJBQ3pGLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt5QkFDbEI7cUJBQ0o7eUJBQU07d0JBQ0gsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQzt3QkFDdkQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7cUJBQ2xDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUE7UUF2REcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQW9ESjtBQTdERCxvQ0E2REMifQ==