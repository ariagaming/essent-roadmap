import { wrapDelayedAction, notify } from "./../eventQueue";
import { getMinMax, months, id } from "./../helpers/roadmap-helpers";

/**
 * Customer-01 - This service will get a list of customers async
 */
const _getRoadmap = () => {
  return new Promise((resolve, reject) => {
    let roadmap = {
      title: "This is my roadmap",
      lanes: [
        { id: "lane-001", title: "something" },
        { id: "lane-002", title: "Elmse" }
      ],
      events: [
        {
          id: "event-001",
          laneId: "lane-001",
          title: "My event",
          from: 4,
          to: 4
        },
        {
          id: "event-002",
          laneId: "lane-001",
          title: "My event",
          from: 5,
          to: 9,
          percentage: 20,
          background: "#6f1289",
          fontColor: "white"
        },
        {
          id: "event-003",
          laneId: "lane-001",
          title: "My event",
          from: 1,
          to: 2
        },
        {
          id: "event-004",
          laneId: "lane-002",
          title: "Boo",
          from: 1,
          to: 7,
          percentage: 10
        }
      ]
    };

    const minMax = getMinMax(roadmap.events);
    const numberOfMonths = [];

    let index = -1;
    for (var i = minMax.min - 1; i < minMax.months; ++i) {
      numberOfMonths[++index] = months[i % 12];
    }

    roadmap.minMax = minMax;
    roadmap.months = numberOfMonths;

    setTimeout(() => {
      resolve(roadmap);
    }, 0);
  });
};

// export the wrapped action, you wioll usually do this in a different module!!
export const getRoadmap = wrapDelayedAction("get-roadmap", _getRoadmap);

export const selectEvent = event => notify("select-event", event);
export const selectLane = lane => notify("select-lane", lane);

export const changeSelectedEvent = (key, value) =>
  notify("change-selected-event", { key, value });

export const changeSelectedLane = (key, value) =>
  notify("change-selected-lane", { key, value });

export const removeLabelFromEvent = (event, label) => {
  event.labels.splice(event.labels.indexOf(label), 1);
  notify("update-selected-event", event);
};
export const addLabelToEvent = (event, label) => {
  if ((event.labels || []).indexOf(label) === -1) {
    const newEvent = {
      ...event,
      labels: [...(event.labels || []), label]
    };
    notify("update-selected-event", newEvent);
  }
};

export const removeLabelFromLane = (lane, label) => {
  lane.labels.splice(lane.labels.indexOf(label), 1);
  notify("update-selected-lane", lane);
};
export const addLabelToLane = (lane, label) => {
  if ((lane.labels || []).indexOf(label) === -1) {
    const newlane = {
      ...lane,
      labels: [...(lane.labels || []), label]
    };
    notify("update-selected-lane", newlane);
  }
};

export const saveEvent = (roadmap, newEvent) => {
  const eventExists = !!roadmap.events.filter(e => e.id === newEvent.id).length;
  let r;
  if (eventExists) {
    r = {
      ...roadmap,
      events: roadmap.events.map(
        event => (event.id === newEvent.id ? newEvent : event)
      )
    };
  } else {
    r = {
      ...roadmap,
      events: [...roadmap.events, newEvent]
    };
  }

  const minMax = getMinMax(r.events);
  const numberOfMonths = [];

  let index = -1;
  for (var i = minMax.min - 1; i < minMax.months; ++i) {
    numberOfMonths[++index] = months[i % 12];
  }

  r.minMax = minMax;
  r.months = numberOfMonths;
  notify("save-roadmap", r);
};

export const saveLane = (roadmap, newLane) => {
  const laneExists = !!roadmap.lanes.filter(e => e.id === newLane.id).length;
  let r;
  if (laneExists) {
    r = {
      ...roadmap,
      lanes: roadmap.lanes.map(
        lane => (lane.id === newLane.id ? newLane : lane)
      )
    };
  } else {
    r = {
      ...roadmap,
      lanes: [...roadmap.lanes, newLane]
    };
  }
  notify("save-roadmap", r);
};

export const newEvent = () => {
  notify("select-event", {
    id: id(),
    title: "New event",
    from: 0,
    to: 3,
    background: "white",
    fontColor: "gray",
    okColor: "maroon"
  });
};

export const newLane = () => {
  notify("select-lane", {
    id: id(),
    title: "New lane",
    background: "white",
    fontColor: "gray",
    okColor: "maroon"
  });
};
