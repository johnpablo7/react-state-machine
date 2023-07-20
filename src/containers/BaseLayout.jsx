import { useMachine } from "@xstate/react";
import bookingMachine from "../Machines/bookingMachine";
import { Nav } from "../components/Nav";
import { StepsLayout } from "./StepsLayout";
import "./BaseLayout.css";

export const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine);

  // console.log("nuestra maquina", state);
  // console.log("matches true", state.matches("home"));
  // console.log("matches false", state.matches("tickets"));
  // console.log("can", state.can("FINISH"));

  console.log("muestra maquina: ", state.value, state.context);

  return (
    <div className="BaseLayout">
      <Nav state={state} send={send} />
      <StepsLayout state={state} send={send} />
    </div>
  );
};
