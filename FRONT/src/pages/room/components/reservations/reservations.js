import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../../components/header/components";
import { selectUserId, selectUserRole } from "../../../../selectors";
import { addReservationAsync } from "../../../../actions";
import { ROLE, PROP_TYPE } from "../../../../constants";
import { Reservation } from "./components";
import styled from "styled-components";
import PropTypes from "prop-types";

const ReservationsContainer = ({ className, reservations, roomId }) => {
	const [newReservation, setNewReservation] = useState("");
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);

	const onNewReservationAdd = (userId, roomId, content) => {
		dispatch(addReservationAsync(userId, roomId, content));
		setNewReservation("");
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-reservation">
					<textarea
						name="reservation"
						value={newReservation}
						placeholder="Комментарий..."
						onChange={({ target }) => setNewReservation(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0 0 0 10px"
						size="18px"
						onClick={() =>
							onNewReservationAdd(userId, roomId, newReservation)
						}
					/>
				</div>
			)}

			<div className="reservations">
				{reservations.map(({ id, author, content }) => (
					<Reservation
						key={id}
						roomId={roomId}
						id={id}
						author={author}
						content={content}
					/>
				))}
			</div>
		</div>
	);
};

export const Reservations = styled(ReservationsContainer)`
	width: 580px;
	margin: 0 auto;

	& .new-reservation {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-reservation textarea {
		width: 550px;
		height: 120px;
		font-size: 18px;
		resize: none;
	}
`;

Reservations.propTypes = {
	reservations: PropTypes.arrayOf(PROP_TYPE.RESERVATION).isRequired,
	roomId: PropTypes.string.isRequired,
};
