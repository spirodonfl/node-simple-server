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
exports.default = SimpleServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUM3QiwyQ0FBNkI7QUFDN0IseUNBQTJCO0FBRzNCLE1BQXFCLFlBQVk7SUFJN0IsWUFBWSxJQUFZLEVBQUUsVUFBa0I7UUFNcEMsY0FBUyxHQUFHLENBQUMsT0FBNkIsRUFBRSxRQUE2QixFQUFFLEVBQUU7WUFDakYsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDeEMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUNsQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO2dCQUMxQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUMzQixJQUFJLFFBQVEsS0FBSyxHQUFHLEVBQUU7b0JBQ2xCLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQztpQkFDOUM7cUJBQU07b0JBQ0gsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztpQkFDNUM7Z0JBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDN0QsTUFBTSxTQUFTLEdBQUc7b0JBQ2QsTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLE1BQU0sRUFBRSwrQkFBK0I7b0JBQ3ZDLE1BQU0sRUFBRSxXQUFXO29CQUNuQixPQUFPLEVBQUUsV0FBVztvQkFDcEIsTUFBTSxFQUFFLFdBQVc7b0JBQ25CLEtBQUssRUFBRSxpQkFBaUI7b0JBQ3hCLE9BQU8sRUFBRSxrQkFBa0I7b0JBQzNCLE1BQU0sRUFBRSxXQUFXO29CQUNuQixNQUFNLEVBQUUsc0JBQXNCO29CQUM5QixNQUFNLEVBQUUsV0FBVztvQkFDbkIsTUFBTSxFQUFFLDJCQUEyQjtvQkFDbkMsTUFBTSxFQUFFLHNCQUFzQjtvQkFDOUIsTUFBTSxFQUFFLFdBQVc7b0JBQ25CLE9BQU8sRUFBRSx1QkFBdUI7aUJBQ25DLENBQUM7Z0JBRUYsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLDBCQUEwQixDQUFDO2dCQUVyRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDckMsSUFBSSxLQUFLLEVBQUU7d0JBQ1AsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTs0QkFDcEQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRTtnQ0FDM0QsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztnQ0FDdkQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQzs0QkFDNUMsQ0FBQyxDQUFDLENBQUM7eUJBQ047NkJBQU07NEJBQ0gsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDeEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDOzRCQUN6RixRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7eUJBQ2xCO3FCQUNKO3lCQUFNO3dCQUNILFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUMsY0FBYyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7d0JBQ3ZELFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3FCQUNsQztnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxDQUFBO1FBdkRHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FvREo7QUE3REQsK0JBNkRDIn0=