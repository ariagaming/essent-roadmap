import React from "react";
import Button from "@material-ui/core/Button";
import { newEvent, newLane } from "./../services/roadmap";

const Component = props => (
  <div className="main-menu">
    <Button color="primary" variant="outlined" onClick={e => newEvent()}>
      Create Event
    </Button>
    <Button color="primary" variant="outlined" onClick={e => newLane()}>
      Create Lane
    </Button>
  </div>
);

export const MainMenu = Component;
