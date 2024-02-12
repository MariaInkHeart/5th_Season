import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { selectUserRole } from "../../../../../../selectors";
import { openModal } from "../../../../../../actions";
import { removeReservationAsync, CLOSE_MODAL } from "../../../../../../actions";
import { ROLE } from "../../../../../../constants";
import { Icon } from "../../../../../../components/header/components";

const ReservationContainer = ({ className, roomId, id, author, content }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onReservationRemove = (id) => {
		dispatch(
			openModal({
				text: "Вы действительно хотите удалить бронь?",
				onConfirm: () => {
					dispatch(removeReservationAsync(roomId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="reservation">
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
				</div>
				<div className="reservation-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa-trash-o"
					size="21px"
					margin="0 0 0 10px"
					onClick={() => onReservationRemove(id)}
				/>
			)}
		</div>
	);
};

export const Reservation = styled(ReservationContainer)`
	display: flex;
	margin-top: 10px;

	& .reservation {
		width: 550px;
		padding: 5px 10px;
		border: 1px solid #000;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}
`;

Reservation.propTypes = {
	roomId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};
