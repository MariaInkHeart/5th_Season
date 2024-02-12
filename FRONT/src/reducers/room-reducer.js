import { ACTION_TYPE } from "../actions";

const initialRoomState = {
	id: "",
	title: "",
	imageUrl: "",
	content: "",
	price: "",
	reservations: [],
};

export const roomReducer = (state = initialRoomState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ROOM_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_ROOM_DATA:
			return initialRoomState;
		default:
			return state;
	}
};
