import { useMachine } from "@xstate/react";
import bookingMachine from "../Machines/bookingMachine";

export const BaseLayout = () => {
  const [state] = useMachine(bookingMachine);
  console.log("nuestra maquina", state);
  return <div>BaseLayout</div>;
};
