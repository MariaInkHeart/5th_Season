import { ACTION_TYPE } from "../actions";

const initialRoomState = {
	id: "",
	title: "",
	imageUrl: "",
	content: "",
	price: "",
	reviews: [],
};

export const roomReducer = (state = initialRoomState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_REVIEW:
			return {
				...state,
				reviews: [...state.reviews, action.payload],
			};
		case ACTION_TYPE.REMOVE_REVIEW:
			return {
				...state,
				reviews: state.reviews.filter((review) => review.id !== action.payload),
			};
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
