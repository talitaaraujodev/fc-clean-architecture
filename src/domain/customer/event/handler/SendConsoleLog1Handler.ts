import { EventHandlerInterface } from "../../../@shared/event/EventHandlerInterface";
import { CustomerCreatedEvent } from "../CustomerCreatedEvent";

//Desafio FC sobre Domain Events
//Crie 2 handlers exibindo um "console.log".
export class SendConsoleLog1Handler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`This is the first console.log of event: CustomerCreated`);
  }
}
