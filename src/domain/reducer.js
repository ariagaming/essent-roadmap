/**
 * Initial state of the application
 */
const initialState = {
  version: "1"
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "get-roadmap--started":
      return state;
    case "get-roadmap--success":
      return { ...state, roadmap: action.payload };
    case "select-event":
      return {
        ...state,
        selectedEvent: action.payload ? { ...action.payload } : null,
        selectedLane: null
      };
    case "change-selected-event":
      return {
        ...state,
        selectedEvent: {
          ...state.selectedEvent,
          [action.payload.key]: action.payload.value
        }
      };
    case "update-selected-event":
      return {
        ...state,
        selectedEvent: { ...action.payload }
      };
    case "update-selected-lane":
      return {
        ...state,
        selectedLane: { ...action.payload }
      };
    case "select-lane":
      return {
        ...state,
        selectedLane: action.payload ? { ...action.payload } : null,
        selectedEvent: null
      };
    case "change-selected-lane":
      return {
        ...state,
        selectedLane: {
          ...state.selectedLane,
          [action.payload.key]: action.payload.value
        }
      };
    case "save-roadmap":
      return {
        ...state,
        roadmap: action.payload,
        selectedEvent: null,
        selectedLane: null
      };
    default:
      return { ...state };
  }
};
