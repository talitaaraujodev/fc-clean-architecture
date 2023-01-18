import { ProductCreatedEvent } from '../ProductCreatedEvent';
import { EventHandlerInterface } from './../../../@shared/event/EventHandlerInterface';

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent>{
    handle(event: ProductCreatedEvent): void {
      console.log("Sending e-mail...")
    }
    
}