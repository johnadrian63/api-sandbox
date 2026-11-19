import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    public handleConnection(client: any, ...args: any[]) {
        console.log("connected");

        setTimeout(() => {
            this.server.emit("greet", "hello world");

        }, 400);
    }

    @SubscribeMessage("events")
    public state() {
        return { event: "state" };
    }
}
