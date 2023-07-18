import { createMachine } from "xstate";

const bookingMachine = createMachine({
  predictableActionArguments: true,
  id: "buy plane tickets",
  initial: "home",
  states: {
    home: {
      on: {
        START: "search",
      },
    },
    search: {
      on: {
        CONTINUE: "passengers",
        CANCEL: "home",
      },
    },
    passengers: {
      on: {
        DONE: "tickets",
        CANCEL: "home",
      },
    },
    tickets: {
      on: {
        FINISH: "home",
        CANCEL: "home",
      },
    },
    success: {
      on: {},
    },
  },
});

export default bookingMachine;
