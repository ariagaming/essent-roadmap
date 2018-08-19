import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./setup";

import { App } from "./components/app";
import { theme } from "./setup";
import { MuiThemeProvider } from "@material-ui/core/styles";

//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
//registerServiceWorker();
