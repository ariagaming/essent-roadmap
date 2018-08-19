import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { SketchPicker } from "react-color";
import { px } from "./../helpers/roadmap-helpers";
import shallowCompare from "react-addons-shallow-compare";

export class ColorPicker extends React.Component {
  state = { shown: false };

  handleChange = color => {
    const c = `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b},${
      color.rgb.a
    })`;
    const change = this.props.onChange || (() => {});
    change(c);
  };

  shouldComponentUpdate = (nextProps, nextState) =>
    shallowCompare(this, nextProps, nextState);

  render() {
    const newProps = { ...this.props, value: null };
    return (
      <div
        ref={e => {
          if (e) {
            const rect = e.getBoundingClientRect();
            this.setState({ ...this.state, top: rect.top });
          }
        }}
      >
        <TextField
          label="Background"
          onFocus={e => this.setState({ ...this.state, shown: true })}
          onBlur={e => this.setState({ ...this.state, shown: false })}
          InputProps={{
            value:
              this.props.value ||
              this.props.default ||
              this.props.defaultValue ||
              "",
            onChange: e => {
              const change = this.props.onChange || (() => {});
              change(e.target.value);
              e.preventDefault();
            },
            endAdornment: (
              <InputAdornment position="end">
                <div
                  style={{
                    height: "25px",
                    width: "25px",
                    marginBottom: "5px",
                    background:
                      this.props.value ||
                      this.props.default ||
                      this.props.defaultValue,
                    border: "1px solid lightgray"
                  }}
                />
              </InputAdornment>
            )
          }}
          {...newProps}
        />
        {this.state.shown ? (
          <div
            style={{
              position: "fixed",
              top: px(this.state.top + 65),
              zIndex: 90000
            }}
          >
            <SketchPicker
              color={
                this.props.value ||
                this.props.defaultValue ||
                this.props.default ||
                ""
              }
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
