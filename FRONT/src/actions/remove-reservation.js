import { ACTION_TYPE } from "./action-type";

export const removeReservation = (reservationId) => ({
	type: ACTION_TYPE.REMOVE_RESERVATION,
	payload: reservationId,
});
