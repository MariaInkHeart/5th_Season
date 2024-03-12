import { request } from "../utils";
import { setRoomsData } from "./set-rooms-data";

export const loadRoomsAsync = () => (dispatch) => {
	request("/rooms").then((roomsData) => {
		if (roomsData.data) {
			dispatch(setRoomsData(roomsData.data));
		}

		return roomsData;
	});
};
