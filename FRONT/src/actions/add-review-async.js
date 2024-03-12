import { request } from "../utils";
import { addReview } from "./add-review";

export const addReviewAsync = (roomId, author, content) => (dispatch) => {
	request(`/rooms/${roomId}/reviews`, "POST", { author, content }).then(
		(reviewData) => {
			dispatch(addReview(reviewData.data));
		},
	);
};
