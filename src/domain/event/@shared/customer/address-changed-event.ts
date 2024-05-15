
import { Customer } from "../../../entity/customer";
import EventInterface from "../event.interface";


export default class AddressChangedEvent implements EventInterface{
    
        dateTimeOccurred: Date;
        eventData: Customer;
    
        constructor(eventData: Customer) {
            this.dateTimeOccurred = new Date();
            this.eventData = eventData;
        }
}