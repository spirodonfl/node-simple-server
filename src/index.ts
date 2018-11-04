import * as console from 'console';
import * as Events from 'events';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as url from 'url';
import { URLSearchParams } from 'url';

interface IRouteArray {
    [position: number]: IRoute;
    length: number;
    push(item: IRoute): number;
}
interface IRoute {
    method: string;
    path: string;
    callback: (request: http.IncomingMessage, response: http.ServerResponse) => void;
}

export class SimpleServer {
    public server: http.Server;
    public events: Events.EventEmitter;
    public mimeTypes: object;

    private port: number;
    private rootFolder: string;
    private routes: IRouteArray;

    constructor(port: number, rootFolder: string) {
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

    public addRoute(requestMethod: string, requestPath: string, requestCallback: (request: http.IncomingMessage, response: http.ServerResponse) => void) {
        this.routes.push({method: requestMethod, path: requestPath, callback: requestCallback});
    }

    public getRoutes() {
        return this.routes;
    }

    public startServer() {
        this.server.listen(this.port, () => {
            this.events.emit('Server Is Listening');
        });
    }

    private onRequest = (request: http.IncomingMessage, response: http.ServerResponse) => {
        const requestUrl = url.parse(request.url || '');
        const requestResource = requestUrl.pathname;
        const requestQuery = requestUrl.query;

        let foundRoute = false;
        let route:IRoute|boolean = false;
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
        } else {
            // Default route
            if (request.method === 'GET') {
                let filePath = requestResource;
                if (filePath === '/') {
                    filePath = this.rootFolder + '/index.html';
                } else {
                    filePath = this.rootFolder + requestResource;
                }

                const extName = String(path.extname(filePath)).toLowerCase();

                const contentType = this.mimeTypes[extName] || 'application/octet-stream';

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
            } else {
                // TODO: Pass an error here
            }
        }
    }
}
