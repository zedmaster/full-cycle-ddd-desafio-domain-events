import EventHandlerInterface from "../../event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";


export default class CustomerCreatedHandler1 implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }

}