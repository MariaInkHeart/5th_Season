import { ACTION_TYPE } from "./action-type";

export const setRoomData = (roomData) => ({
	type: ACTION_TYPE.SET_ROOM_DATA,
	payload: roomData,
});
