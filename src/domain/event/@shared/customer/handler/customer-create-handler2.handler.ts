import EventHandlerInterface from "../../event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";


export default class CustomerCreatedHandler2 implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log("Este é o segundo console.log do evento:  CustomerCreated");
    }

}