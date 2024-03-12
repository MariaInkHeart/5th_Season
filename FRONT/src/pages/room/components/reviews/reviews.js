import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../../components/header/components";
import { selectUserLogin, selectUserRole } from "../../../../selectors";
import styled from "styled-components";
import { ROLE } from "../../../../constants";
// import PropTypes from "prop-types"; PROP_TYPE,
import { addReviewAsync } from "../../../../actions";
import { Review } from "./components";
import { RevolvingDot } from "react-loader-spinner";

const ReviewsContainer = ({ className, reviews, roomId }) => {
	const [newReview, setNewReview] = useState("");
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);
	const userLogin = useSelector(selectUserLogin);

	const onNewReviewAdd = (roomId, userLogin, content) => {
		dispatch(addReviewAsync(roomId, userLogin, content));
		setNewReview("");
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-review">
					<textarea
						name="review"
						value={newReview}
						placeholder="Оставьте свой отзыв..."
						onChange={({ target }) => setNewReview(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0 0 0 10px"
						size="18px"
						onClick={() => onNewReviewAdd(roomId, userLogin, newReview)}
					/>
				</div>
			)}
			{reviews ? (
				<div className="reviews">
					{reviews.map(({ id, author, content, publishedAt }) => (
						<Review
							key={id}
							roomId={roomId}
							id={id}
							author={author}
							content={content}
							publishedAt={publishedAt}
						/>
					))}
				</div>
			) : (
				<div className={className}>
					<div className="item">
						<RevolvingDot
							height="80"
							width="80"
							color="#4fa94d"
							ariaLabel="revolving-dot-loading"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export const Reviews = styled(ReviewsContainer)`
	width: 580px;

	& .new-review {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-review textarea {
		width: 550px;
		height: 120px;
		font-size: 18px;
		resize: none;
	}

	.item {
		display: flex;
		justify-content: center;
		margin: 20px;
	}
`;

// Reviews.propTypes = {
// 	reviews: PropTypes.arrayOf(PROP_TYPE.COMMENT),
// 	roomId: PropTypes.string.isRequired,
// };
