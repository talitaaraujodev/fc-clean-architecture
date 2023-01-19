import { ProductCreatedEvent } from '../../../../src/domain/product/event/ProductCreatedEvent';
import { SendEmailWhenProductIsCreatedHandler } from '../../../../src/domain/product/event/handler/SendEmailWhenProductIsCreatedHandler';
import { EventDispatcher } from '../../../../src/domain/@shared/event/EventDispatcher';
describe('Event tests', () => {
  test('register_whenTheEventRuns_returnRegisterEvent', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined();
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1);
    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
    ).toMatchObject(eventHandler);
  });
  test('unregister_whenCancelEvent_returnNoEvent', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(0);
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined();
  });
  test('unregisterAll_whenUnregisterAllEvent_returnUnsregisterAllEvents', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    // eslint-disable-next-line no-unused-expressions
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeUndefined;
  });
  test('notify_whenNotifyAllEvent_returnNotifyAllEvents', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Product 1 description',
      price: 20,
    });
    // quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
