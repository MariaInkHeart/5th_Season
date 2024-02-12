import { request } from "../utils";
import { ACTION_TYPE } from "./action-type";
import { setRoomData } from "./set-room-data";

export const removeReservationAsync = (id) => (dispatch) => {
	request(`/reservations/${id}`, "DELETE").then((reservationData) => {
		dispatch(setRoomData(reservationData.data));
		return ACTION_TYPE.REMOVE_RESERVATION_ASYNC;
	});
};
