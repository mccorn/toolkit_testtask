import { combineReducers } from "redux";
import * as actions from "./actionTypes";

const initialState = {
	token: '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',
  searchRequestString: localStorage.getItem('searchRequestString'),
  repositories: JSON.parse(localStorage.getItem('repositories')),

  // repositories: null,
  // searchRequestString: '',
}

const defaultReducer = (state = initialState, action) => {
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