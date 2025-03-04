import EventInterface from "../event.interface";


export default class CustomerCreatedEvent implements EventInterface{
    
        dateTimeOccurred: Date;
        eventData: any;
    
        constructor(eventData: any) {
            this.dateTimeOccurred = new Date();
            this.eventData = eventData;
        }
}