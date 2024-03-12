import { request } from "../utils";
import { addReservation } from "./add-reservation";

export const addReservationAsync =
	(userLogin, roomName, options, arrivalDate, leavingDate, roomPrice) => (dispatch) => {
		request("/reservations", "POST", {
			userLogin,
			roomName,
			options,
			arrivalDate,
			leavingDate,
			roomPrice,
		}).then((reservationData) => {
			dispatch(addReservation(reservationData.data));
		});
	};
