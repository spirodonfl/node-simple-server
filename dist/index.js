"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const console = __importStar(require("console"));
const fs = __importStar(require("fs"));
const http = __importStar(require("http"));
const path = __importStar(require("path"));
const url = __importStar(require("url"));
const rootFolder = './static';
const port = 15000;
http.createServer((request, response) => {
    const requestUrl = url.parse(request.url || '');
    const reqResource = requestUrl.pathname;
    const reqQuery = requestUrl.query;
    if (request.method === 'GET') {
        let filePath = request.url;
        if (filePath === '/') {
            filePath = rootFolder + '/index.html';
        }
        else {
            filePath = rootFolder + request.url;
        }
        console.log(filePath);
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
}).listen(port);
const world = true;
console.log('Hello ' + world);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBQ25DLHVDQUF5QjtBQUN6QiwyQ0FBNkI7QUFDN0IsMkNBQTZCO0FBQzdCLHlDQUEyQjtBQUczQixNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDOUIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUU7SUFDcEMsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7SUFDeEMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNsQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQzFCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDM0IsSUFBSSxRQUFRLEtBQUssR0FBRyxFQUFFO1lBQ2xCLFFBQVEsR0FBRyxVQUFVLEdBQUcsYUFBYSxDQUFDO1NBQ3pDO2FBQU07WUFDSCxRQUFRLEdBQUcsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7U0FDdkM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRCLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0QsTUFBTSxTQUFTLEdBQUc7WUFDZCxNQUFNLEVBQUUsVUFBVTtZQUNsQixNQUFNLEVBQUUsK0JBQStCO1lBQ3ZDLE1BQU0sRUFBRSxXQUFXO1lBQ25CLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixNQUFNLEVBQUUsV0FBVztZQUNuQixNQUFNLEVBQUUsc0JBQXNCO1lBQzlCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLE1BQU0sRUFBRSwyQkFBMkI7WUFDbkMsTUFBTSxFQUFFLHNCQUFzQjtZQUM5QixNQUFNLEVBQUUsV0FBVztZQUNuQixPQUFPLEVBQUUsdUJBQXVCO1NBQ25DLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksMEJBQTBCLENBQUM7UUFFckUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDckMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDcEQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRTt3QkFDM0QsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQzt3QkFDdkQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDNUMsQ0FBQyxDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDeEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDO29CQUN6RixRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ2xCO2FBQ0o7aUJBQU07Z0JBQ0gsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztnQkFDdkQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDbEM7UUFDTCxDQUFDLENBQUMsQ0FBQztLQUNOO0FBQ0wsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWhCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQztBQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyJ9