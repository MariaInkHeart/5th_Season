import { request } from "../utils";
import { removeReview } from "./remove-review";

export const removeReviewAsync = (roomId, id) => (dispatch) => {
	request(`/rooms/${roomId}/reviews/${id}`, "DELETE").then(() => {
		dispatch(removeReview(id));
	});
};
