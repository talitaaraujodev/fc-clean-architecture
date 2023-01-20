import { EventDispatcher } from '../../../../src/domain/@shared/event/EventDispatcher';
import { CustomerAddressChangedEvent } from '../../../../src/domain/customer/event/CustomerAddressChangedEvent';
import { SendConsoleLogHandler } from '../../../../src/domain/customer/event/handler/SendConsoleLogHandler';

describe('Customer Address is Changed test', () => {
  test('should call the 2 handlers when a customer is created', () => {
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
