import { useState } from "react";
import "@oicl/openbridge-webcomponents/src/palettes/variables.css";
import { ObcTopBar } from "@oicl/openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "@oicl/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";
import "./App.css";
import SampleUI from "./components/UI/SampleUI";
import Compass from "./components/Compass/Compass";
import Rudder from "./components/Rudder/Rudder";
import Watch from "./components/Watch/Watch";
import Thruster from "./components/Thruster/Thruster";
import AzimuthThruster from "./components/AzimuthThruster/AzimuthThruster";

const handleBrillianceChange = (e: CustomEvent) => {
  document.documentElement.setAttribute("data-obc-theme", e.detail.value);
};

function App() {
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);

  const handleDimmingButtonClicked = () => {
    setShowBrillianceMenu(!showBrillianceMenu);
  };

  return (
    <>
      <header>
        <ObcTopBar
          appTitle="React"
          pageName="Demo"
          showDimmingButton
          showAppsButton
          onDimmingButtonClicked={handleDimmingButtonClicked}
        />
      </header>
      <main>
        {showBrillianceMenu && (
          <ObcBrillianceMenu
            onPaletteChanged={handleBrillianceChange}
            show-auto-brightness
            className="brilliance"
          />
        )}

        {/* <SampleUI /> */}
        <Compass heading={150} />
        <Rudder />
        <Watch />
        <Thruster />
        {/* <AzimuthThruster /> */}
      </main>
    </>
  );
}

export default App;
