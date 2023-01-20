import { EventInterface } from '../../@shared/event/EventInterface';

export class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOcurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
