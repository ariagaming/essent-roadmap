import { reducer } from "./domain/reducer";
import { createStore } from "redux";
import { createMuiTheme } from '@material-ui/core/styles';


// One time setup and export of the store and the dispatch function
export const store = createStore(reducer);
export const dispatch = store.dispatch;
export const getState = store.getState;


export const theme = createMuiTheme({
  typography: {
    // In Japanese the characters are usually larger.
    fontSize: 12,
  },
});
