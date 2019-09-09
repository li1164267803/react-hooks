let defaultState = {
  num: 0,
}

export const home = (state = defaultState, action = {}) => {
  switch (action.type) {
    case "ADD_NUM":
      return {num: state.num + 1};
    default:
      return state;
  }
}