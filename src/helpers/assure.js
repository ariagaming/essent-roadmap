
import React from "react";

export const assure = (predicate, Component) =>
  (class extends React.Component {
    shouldComponentUpdate(p, p2) {
      //console.log(p, p2)
      return true;
    }
    render() {
      return predicate(this.props) ?
        <Component {...this.props} /> : null;
    }
  })


export const assureWithDefault = (predicate, Component, DefaultComponent) => props =>
  predicate(props) ? <Component {...props} /> : <DefaultComponent />;


