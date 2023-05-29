import { combineReducers } from "redux";
import * as actions from "./actionTypes";

const repositories = localStorage.getItem('repositories')

const initialState = {
  token: '8c61dcb376512b2f1e4bf6a0e05d690165dca693',
  searchRequestString: localStorage.getItem('searchRequestString'),
  repositories: repositories ? JSON.parse(repositories) : null,
}

const defaultReducer = (state = initialState, action: { type: string, payload?: any }) => {
  switch (action.type) {
    case actions.SET_ITEMS: {
      return { ...state, repositories: action.payload };
    }
    case actions.SET_SEARCH_REQUEST_STRING: {
      return { ...state, searchRequestString: action.payload };
    }
    default: return state;
  }
}

export default combineReducers({
  defaultReducer,
});