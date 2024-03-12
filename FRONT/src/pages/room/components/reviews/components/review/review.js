import styled from "styled-components";
import { Icon } from "../../../../../../components/header/components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../../../../../selectors";
import { ROLE } from "../../../../../../constants";
// import PropTypes from "prop-types";
import { openModal, CLOSE_MODAL, removeReviewAsync } from "../../../../../../actions";
import { useState } from "react";

const ReviewContainer = ({ className, roomId, id, author, publishedAt, content }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);
	const [shouldUpdateReservList, setShouldUpdateReservList] = useState(false);

	const onReviewRemove = (id) => {
		dispatch(
			openModal({
				text: "Вы действительно хотите удалить отзыв?",
				onConfirm: () => {
					dispatch(removeReviewAsync(roomId, id));
					setShouldUpdateReservList(!shouldUpdateReservList);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="review">
				<div className="information-panel">
					<div className="author">
						<Icon
							inactive={true}
							id="fa-user-circle-o"
							size="18px"
							margin="0 10px 0 0"
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							inactive={true}
							id="fa-calendar-o"
							size="18px"
							margin="0 10px 0 0"
						/>
						{publishedAt}
					</div>
				</div>
				<div className="review-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa-trash-o"
					size="21px"
					margin="0 0 0 10px"
					onClick={() => onReviewRemove(id)}
				/>
			)}
		</div>
	);
};

export const Review = styled(ReviewContainer)`
	display: flex;
	margin-top: 10px;

	& .review {
		width: 550px;
		padding: 5px 10px;
		border: 1px solid #000;
		background-color: white;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}

	& .review-text {
		text-align: justify;
		margin-top: 5px;
	}
`;

// Review.propTypes = {
// 	postId: PropTypes.string.isRequired,
// 	id: PropTypes.string.isRequired,
// 	author: PropTypes.string.isRequired,
// 	publishedAt: PropTypes.string.isRequired,
// 	content: PropTypes.string.isRequired,
// };
