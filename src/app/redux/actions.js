import store from './store';
import * as types from './actionTypes';

export function getItems() {
	store.dispatch({ type: types.GET_ITEMS });
}
