import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import WebSocket, { WebSocketServer as WsServer } from 'ws';
@WebSocketGateway({
    cors: {
        origin: "*"
    },
    // transports: ["websocket"]
})
export class EventsGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: WsServer;


    @SubscribeMessage('message')
    handleMessage(
        @ConnectedSocket() client: WebSocket,
        @MessageBody() payload: unknown,
    ) {
        const outgoing = JSON.stringify({ event: 'message', data: payload });

        // Broadcast to all open clients on THIS Vercel instance
        for (const peer of this.server.clients) {
            if (peer.readyState === WebSocket.OPEN) {
                peer.send(outgoing);
            }
        }

        console.log(">>>");
    }

    public handleConnection(client: any, ...args: any[]) {
        console.log("connected");

        setInterval(() => {
            this.server.emit("greet", "hello worldss");

        }, 5000);
    }

    @SubscribeMessage("events")
    public state() {
        return { event: "state" };
    }
}
