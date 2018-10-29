import * as console from 'console';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as url from 'url';
import { URLSearchParams } from 'url';

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
        } else {
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
                        response.writeHead(404, {'Content-Type': contentType});
                        response.end(fourOFourContent, 'utf-8');
                    });
                } else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error code: ' + error.code + ' ..\n');
                    response.end();
                }
            } else {
                response.writeHead(200, {'Content-Type': contentType});
                response.end(content, 'utf-8');
            }
        });
    }
}).listen(port);
