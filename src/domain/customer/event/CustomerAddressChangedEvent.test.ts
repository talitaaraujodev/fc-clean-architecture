import { EventDispatcher } from '../../@shared/event/EventDispatcher';
import { CustomerAddressChangedEvent } from './CustomerAddressChangedEvent';
import { SendConsoleLogHandler } from './handler/SendConsoleLogHandler';

describe('Customer Address is Changed test', () => {
  it('should call the 2 handlers when a customer is created', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);
    expect(
      eventDispatcher.getEventHandlers.CustomerAddressChangedEvent[0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new CustomerAddressChangedEvent({
      id: '1',
      nome: 'Customer 1',
      endereco: 'Streert 1',
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
