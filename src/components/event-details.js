import React from "react";
import { connect } from "react-redux";
import { assure } from "./../helpers/assure";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import { ColorPicker } from "./color-picker";
import { id } from "./../helpers/roadmap-helpers";
import {
  selectEvent,
  changeSelectedEvent,
  removeLabelFromEvent,
  addLabelToEvent,
  saveEvent
} from "./../services/roadmap";

/**
 * This could be replaced by a lens framework.
 */
const mapStateToProps = state => state;

/**
 * The actual component
 * @param {roadmap} Roadmap roadmap
 */
const Component = ({ roadmap, selectedEvent }) => (
  <div className="event-details--container">
    <div className="details-header">
      <span className="title">Edit Event: {selectedEvent.title}</span>
      <i className="fas fa-times" />
    </div>
    <div className="details-content">
      <TextField
        label="Lane"
        select
        value={selectedEvent.laneId}
        fullWidth
        onChange={e => changeSelectedEvent("laneId", e.target.value)}
        margin="normal"
      >
        {roadmap.lanes.map(lane => (
          <MenuItem key={lane.id} value={lane.id}>
            {lane.title}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Title"
        value={selectedEvent.title || ""}
        onChange={e => changeSelectedEvent("title", e.target.value)}
        margin="normal"
        fullWidth
      />
      <div>
        <TextField
          label="Add new label"
          onKeyPress={e => {
            if (e.key === "Enter" && e.target.value.length > 0) {
              addLabelToEvent(selectedEvent, e.target.value);
            }
          }}
          fullWidth
          style={{ marginBottom: "1rem" }}
        />

        {(selectedEvent.labels || []).map((label, i) => {
          return (
            <Chip
              key={label + i}
              label={label}
              clickable
              color="default"
              onDelete={e => removeLabelFromEvent(selectedEvent, label)}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <TextField
          label="From"
          type="number"
          value={
            selectedEvent.from || selectedEvent.from === 0
              ? selectedEvent.from
              : 0
          }
          onChange={e => changeSelectedEvent("from", +e.target.value)}
          margin="normal"
          fullWidth
          style={{ marginRight: "1rem" }}
        />
        <TextField
          label="To"
          type="number"
          value={selectedEvent.to || 1}
          onChange={e => changeSelectedEvent("to", +e.target.value)}
          margin="normal"
          inputProps={{ min: "1" }}
          fullWidth
        />
        <TextField
          label="Percentage complete"
          type="number"
          value={selectedEvent.percentage || 0}
          onChange={e => changeSelectedEvent("percentage", +e.target.value)}
          margin="normal"
          inputProps={{ min: "0", max: "100", step: "10" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>
          }}
          fullWidth
          style={{ marginLeft: "1rem" }}
        />
      </div>
      <ColorPicker
        label="Background"
        value={selectedEvent.background}
        onChange={e => changeSelectedEvent("background", e)}
        fullWidth
        margin="normal"
      />
      <ColorPicker
        label="Font color"
        value={selectedEvent.fontColor}
        onChange={e => changeSelectedEvent("fontColor", e)}
        fullWidth
        margin="normal"
      />
      <ColorPicker
        label="OK color"
        value={selectedEvent.okColor}
        onChange={e => changeSelectedEvent("okColor", e)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={selectedEvent.description || ""}
        onChange={e => changeSelectedEvent("description", e.target.value)}
        margin="normal"
        multiline
        rowsMax="7"
        rows="7"
        fullWidth
      />
    </div>
    <div className="details-footer">
      <Button
        color="primary"
        variant="outlined"
        onClick={e => saveEvent(roadmap, selectedEvent)}
        disabled={selectedEvent.title.length < 1 || !selectedEvent.laneId}
      >
        Save
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={e => selectEvent(null)}
      >
        Cancel
      </Button>
      <Button
        color="default"
        variant="outlined"
        onClick={e => saveEvent(roadmap, { ...selectedEvent, id: id() })}
      >
        Clone
      </Button>
    </div>
  </div>
);

export const EventDetails = connect(mapStateToProps)(
  assure(p => p.selectedEvent, Component)
);
