import { createMachine, assign } from "xstate";
import { fetchCountries } from "../utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "getCountries",
        src: () => fetchCountries,
        onDone: {
          target: "success",
          actions: assign({
            countries: (context, event) => event.data,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: "Fallo el request",
          }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine(
  {
    predictableActionArguments: true,
    id: "buy plane tickets",
    initial: "home",
    context: {
      passengers: [],
      selectedCountry: "",
      countries: [],
      error: "",
    },
    states: {
      home: {
        on: {
          START: {
            target: "search",
          },
        },
      },
      search: {
        on: {
          CONTINUE: {
            target: "passengers",
            actions: "choiceSelectedCountry",
          },
          CANCEL: "home",
        },
        ...fillCountries,
      },
      passengers: {
        on: {
          DONE: {
            target: "tickets",
            cond: "moreThanOnePassenger",
          },
          CANCEL: {
            target: "home",
            actions: "cleanContext",
          },
          ADD: {
            target: "passengers",
            actions: "addPassengers",
          },
        },
      },
      tickets: {
        after: {
          10000: {
            target: "home",
            actions: "cleanContext",
          },
        },
        on: {
          FINISH: "home",
        },
      },
    },
  },
  {
    actions: {
      addPassengers: assign((context, event) =>
        context.passengers.push(event.newPassengers)
      ),
      choiceSelectedCountry: assign({
        selectedCountry: (context, event) => event.selectedCountry,
      }),
      cleanContext: assign({
        selectedCountry: "",
        passengers: [],
      }),
      // imprimirInicio: () => console.log("Imprimir inicio"),
      // imprimirEntrada: () => console.log("Imprimir entrada search"),
      // imprimirSalida: () => console.log("Imprimir salida del search"),
    },
    guards: {
      moreThanOnePassenger: (context) => {
        return context.passengers.length > 0;
      },
    },
  }
);

export default bookingMachine;
