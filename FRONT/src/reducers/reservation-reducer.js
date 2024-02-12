import { ACTION_TYPE } from "../actions";

const initualReservationState = {
	id: null,
	author: null,
	roomId: null,
	options: null,
	arrivalDate: null,
	leavingdate: null,
};

export const reservationReducer = (state = initualReservationState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_RESERVATION:
			return {
				...state,
			};
		case ACTION_TYPE.REMOVE_RESERVATION:
			return {
				...state,
				reservations: state.reservations.filter(
					(reservation) => reservation.id !== action.payload,
				),
			};
		default:
			return state;
	}
};
