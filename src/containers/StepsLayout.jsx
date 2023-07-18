import { Welcome } from "../components/Welcome";
import { Search } from "../components/Search";
import { Passengers } from "../components/Passengers";
import { Tickets } from "../components/Tickets";
import "./StepsLayout.css";

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    if (state.matches("home")) return <Welcome send={send} />;
    if (state.matches("search")) return <Search send={send} />;
    if (state.matches("passengers")) return <Passengers send={send} />;
    if (state.matches("tickets")) return <Tickets send={send} />;
    return null;
  };

  return <div className="StepsLayout">{renderContent()}</div>;
};
