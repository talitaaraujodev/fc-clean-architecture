import { EventDispatcher } from "../../../../src/domain/@shared/event/EventDispatcher";
import { CustomerCreatedEvent } from "../../../../src/domain/customer/event/CustomerCreatedEvent";
import { SendConsoleLog1Handler } from "../../../../src/domain/customer/event/handler/SendConsoleLog1Handler";

describe("Customer event created test", () => {
  test("should handler when a customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers.CustomerCreatedEvent
    ).toHaveLength(1);
     expect(
       eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]
     ).toMatchObject(eventHandler);

     const productCreatedEvent = new CustomerCreatedEvent({});

    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
