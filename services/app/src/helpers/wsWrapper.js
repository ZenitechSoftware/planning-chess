import wsReadyStates from '../constants/wsReadyStates';

export default (wsClass) =>
  new Proxy(wsClass, {
    construct(Target, constructorArgs) {
      const instance = new Target(...constructorArgs);

      const sendProxy = new Proxy(instance.send, {
        apply(target, thisArg, args) {
          if (instance.readyState === wsReadyStates.OPEN) {
            const [{ type, payload }] = args; // If we would decide to send other data formats than string make changes here.
            if (!type) {
              throw new Error(`Cannot send event without type object property`);
            }
            target.apply(thisArg, [JSON.stringify({ type, payload })]);
          } else {
            throw new Error(
              `Web sockets cannot send event on '${instance.readyState}' ready state`,
            );
          }
        },
      });

      instance.send = sendProxy;
      return instance;
    },
  });
