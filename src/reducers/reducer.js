const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    responseMsg: '',
    responseType: false,
    color: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
      case "UPDATE":
        const stateObj = {...state};
        stateObj[action.entity] = action.value;
        return stateObj;
      case "SET_MSG":
        return {
          ...state,
          responseMsg: action.responseMsg, 
          responseType: action.responseType
        };
      case "SET_COLOR":
        return {
          ...state, 
          color: action.color
        };
      default: 
        return state;
    }
};

export default reducer;
  