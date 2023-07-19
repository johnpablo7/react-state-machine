import { createMachine } from "xstate";

const bookingMachine = createMachine(
  {
    predictableActionArguments: true,
    id: "buy plane tickets",
    initial: "home",
    context: {
      passengers: [],
      selectedCountry: "",
    },
    states: {
      home: {
        on: {
          START: {
            target: "search",
            actions: "imprimirInicio",
          },
        },
      },
      search: {
        entry: "imprimirEntrada",
        exit: "imprimirSalida",
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
  },
  {
    actions: {
      imprimirInicio: () => console.log("Imprimir inicio"),
      imprimirEntrada: () => console.log("Imprimir entrada search"),
      imprimirSalida: () => console.log("Imprimir salida del search"),
    },
  }
);

export default bookingMachine;
