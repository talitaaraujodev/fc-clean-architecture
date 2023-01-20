import { EventHandlerInterface } from '../../../@shared/event/EventHandlerInterface';
import { CustomerAddressChangedEvent } from '../CustomerAddressChangedEvent';

// Desafio FC sobre Domain Events
export class SendConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle({ eventData }: CustomerAddressChangedEvent): void {
    console.log(
      `Address of client: ${eventData.id}, ${eventData.nome} chenged to: ${eventData.endereco}`
    );
  }
}
