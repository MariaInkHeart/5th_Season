import { ACTION_TYPE } from "./action-type";

export const addReservation = (reservation) => ({
	type: ACTION_TYPE.ADD_RESERVATION,
	payload: reservation,
});
