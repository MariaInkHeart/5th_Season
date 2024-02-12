import { request } from "../utils";
import { addReservation } from "./add-reservation";

export const addReservationAsync =
	(userLogin, roomId, options, arrivalDate, leavingDate) => (dispatch) => {
		request("/reservations", "POST", {
			userLogin,
			roomId,
			options,
			arrivalDate,
			leavingDate,
		}).then((reservationData) => {
			dispatch(addReservation(reservationData.data));
		});
	};
