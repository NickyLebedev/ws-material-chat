import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIO from 'socket.io';

import { Message } from './model/message.model';

export class ChatServer {
    public static readonly PORT = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp() {
        this.app = express();
    }

    private createServer() {
        this.server = createServer(this.app);
    }

    private sockets() {
        this.io = socketIO(this.server);
    }

    private config() {
        this.port = process.env.PORT || ChatServer.PORT;
    }

    private listen() {
        this.server.listen(this.port, () => {
            console.log(`Server running on PORT ${this.port}`);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m: Message) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        })
    }

    public getApp(): express.Application {
        return this.app;
    }
 
}
