import React from "react";
import { connect } from "react-redux";
import { assure, assureWithDefault } from "./../helpers/assure";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { ColorPicker } from "./color-picker";
import { id } from "./../helpers/roadmap-helpers";
import {
  selectLane,
  changeSelectedLane,
  saveLane,
  addLabelToLane,
  removeLabelFromLane
} from "./../services/roadmap";

/**
 * This could be replaced by a lens framework.
 */
const mapStateToProps = state => state;

/**
 * The actual component
 * @param {roadmap} Roadmap roadmap
 */
const Component = ({ roadmap, selectedLane }) => (
  <div className="event-details--container">
    <div className="details-header">
      <span className="title">Edit Lane: {selectedLane.title}</span>
      <i className="fas fa-times" />
    </div>
    <div className="details-content">
      <TextField
        label="Title"
        value={selectedLane.title || ""}
        onChange={e => changeSelectedLane("title", e.target.value)}
        margin="normal"
        fullWidth
      />
      <div>
        <TextField
          label="Add new label"
          onKeyPress={e => {
            if (e.key === "Enter" && e.target.value.length > 0) {
              addLabelToLane(selectedLane, e.target.value);
            }
          }}
          fullWidth
          style={{ marginBottom: "1rem" }}
        />

        {(selectedLane.labels || []).map((label, i) => {
          return (
            <Chip
              key={label + i}
              label={label}
              clickable
              color="default"
              onDelete={e => removeLabelFromLane(selectedLane, label)}
            />
          );
        })}
      </div>
      <TextField
        label="Sort order"
        type="number"
        value={selectedLane.percentage || ""}
        onChange={e => changeSelectedLane("order", +e.target.value)}
        margin="normal"
        fullWidth
      />
      <ColorPicker
        label="Background"
        value={selectedLane.background}
        onChange={e => changeSelectedLane("background", e)}
        fullWidth
        margin="normal"
      />
      <ColorPicker
        label="Font color"
        value={selectedLane.fontColor}
        onChange={e => changeSelectedLane("fontColor", e)}
        fullWidth
        margin="normal"
      />
      <ColorPicker
        label="OK color"
        value={selectedLane.okColor}
        onChange={e => changeSelectedLane("okColor", e)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={selectedLane.description || ""}
        onChange={e => changeSelectedLane("description", e.target.value)}
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
        onClick={e => saveLane(roadmap, selectedLane)}
        disabled={selectedLane.title.length < 1}
      >
        Save
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={e => selectLane(null)}
      >
        Cancel
      </Button>
      <Button
        color="default"
        variant="outlined"
        onClick={e => saveLane(roadmap, { ...selectedLane, id: id() })}
      >
        Clone
      </Button>
    </div>
  </div>
);

export const LaneDetails = connect(mapStateToProps)(
  assure(p => p.selectedLane, Component)
);
