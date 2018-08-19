import React from "react";

import { Roadmap } from "./roadmap";
import { EventDetails } from "./event-details";
import { LaneDetails } from "./lane-details";
import { MainMenu } from "./main-menu";

/**
 * The root of the application
 */
const Component = () => (
  <div className="app-root">
    <MainMenu />
    <div className="App">
      <Roadmap />
      <EventDetails />
      <LaneDetails />
    </div>
  </div>
);

export const App = Component;
