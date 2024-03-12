import { ACTION_TYPE } from "../actions";

const initialRoomsState = [];

export const roomsReducer = (state = initialRoomsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ROOMS_DATA:
			return [...state, ...action.payload];
		case ACTION_TYPE.RESET_ROOMS_DATA:
			return initialRoomsState;
		default:
			return state;
	}
};
