import React from "react";
import { selectEvent, selectLane } from "./../services/roadmap";
import { px } from "./../helpers/roadmap-helpers";

const generateGradient = (background, okColor, percentage) =>
  percentage > 0
    ? `linear-gradient(
      to right,
      ${okColor},
      ${okColor} ${percentage - 2}%,
      ${background} ${percentage + 2}%,
      ${background})`
    : `linear-gradient(to right, ${background}, ${background} 100%)`;

const getEventStyle = (event, index) => {
  const left = px(event.from * 50 + 200);
  const width = px(event.to * 50);
  const marginTop = px(7 + index * 37);

  return {
    left: left,
    width: width,
    marginTop: marginTop
  };
};

const getEventInnerStyle = (event, lane, index) => {
  return {
    backgroundImage: generateGradient(
      event.background || lane.background || "white",
      event.okColor || lane.okColor || "green",
      event.percentage || 0
    ),
    color: event.fontColor || lane.fontColor || "black"
  };
};

const getLaneTitleStyle = (lane, events) => {
  const height = px(events.filter(e => e.laneId === lane.id).length * 37);

  return {
    height: height
  };
};

const Component = ({ roadmap, selectedEvent }) => {
  const { lanes, events, months } = roadmap;
  return (
    <tbody>
      {lanes.map((lane, i) => (
        <tr key={lane.id}>
          <td>
            <div className="lane-title" style={getLaneTitleStyle(lane, events)}>
              <span>{lane.title}</span>
              <span>
                <i
                  className="fas fa-pencil-alt"
                  onClick={e => selectLane(lane)}
                />
              </span>
            </div>
          </td>

          {months.map((a, i) => {
            return <td key={a + i} />;
          })}
          {events.filter(e => e.laneId === lane.id).map((event, i) => (
            <div
              className="event"
              key={event.id}
              style={getEventStyle(event, i)}
              onClick={e =>
                selectEvent(
                  !selectedEvent || event.id !== selectedEvent.id ? event : null
                )
              }
            >
              <div
                className="event--inner"
                style={getEventInnerStyle(event, lane)}
              >
                <div className="title">{event.title}</div>
              </div>
            </div>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export const RoadmapLanes = Component;
