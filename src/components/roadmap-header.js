
import React from "react";


const Component = ({ roadmap }) => {
  const { events, months } = roadmap;
  return (
    <thead>
      <tr className="roadmap--months">
        <th />
        {
          months.map((a, i) => {
            return (<th key={a + i}>{a}</th>)
          })
        }
      </tr>
    </thead>
  );
}

export const RoadmapHeader = Component;