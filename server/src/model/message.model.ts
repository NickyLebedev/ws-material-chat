import { User } from './user.model';

export class Message {
    constructor(private _from: User, private _content: string) { }
}

export class ChatMessage extends Message {
    constructor(from: User, content: string) {
        super(from, content);
    }
}