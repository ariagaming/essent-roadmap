
import React from "react";
import { connect } from "react-redux";
import { getRoadmap } from "./../services/roadmap";
import { assure } from "./../helpers/assure";
import { RoadmapHeader } from "./roadmap-header";
import { RoadmapLanes } from "./roadmap-lanes";

getRoadmap();

/**
 * This could be replaced by a lens framework.
 */
const mapStateToProps = state => state;

/**
 * The actual component
 * @param {roadmap} Roadmap roadmap
 */
const Component = ({ roadmap, selectedEvent }) => (
  <div className="roadmap--container">
    <table className="roadmap">
      <RoadmapHeader roadmap={roadmap} />
      <RoadmapLanes roadmap={roadmap} selectedEvent={selectedEvent} />
    </table>
  </div>
);

export const Roadmap =
  connect(mapStateToProps)(
    assure(p => p.roadmap, Component));

