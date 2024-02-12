import { request } from "../utils";
import { setRoomData } from "./set-room-data";

export const loadRoomAsync = (roomId) => (dispatch) => {
	request(`/rooms/${roomId}`).then((roomData) => {
		if (roomData.data) {
			dispatch(setRoomData(roomData.data));
		}
		return roomData;
	});
};
