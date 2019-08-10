import { DiagramExtension } from "./DiagramExtension";
import { App } from "./app";
import { HubConnectionBuilder, HubConnection } from "@aspnet/signalr";


export class Comm extends DiagramExtension {
    connection : HubConnection;
    constructor() { super(); }

    setup(app:App) {
        const connection = this.connection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/ed-hub').build();
        connection.start().catch(err => document.write(err));

        // connection.on('messageReceived', (message:any) => {
        //     console.log('message' + message);
        // });
    }

    public sendMessage(msg:string, payload:any = undefined) {
        if(payload) return this.connection.send(msg, payload);
        return this.connection.send(msg);
    }
}