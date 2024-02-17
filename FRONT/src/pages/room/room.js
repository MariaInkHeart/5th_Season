import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRoom } from "../../selectors";
import { RESET_ROOM_DATA, loadRoomAsync } from "../../actions";
import { RoomContent } from "./components";
import { ReservationContent } from "./components/reservations/components";
import { useState } from "react";
import { RevolvingDot } from "react-loader-spinner";

const RoomContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);

	const room = useSelector(selectRoom);

	useLayoutEffect(() => {
		dispatch(RESET_ROOM_DATA);
	}, [dispatch]);

	useEffect(() => {
		dispatch(loadRoomAsync(params.id));
		setIsLoading(false);
	}, [dispatch, params.id]);

	return (
		<div className={className}>
			{isLoading ? (
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
			) : (
				<RoomContent
					room={room}
					isLoading={isLoading}
				/>
			)}
			<ReservationContent roomId={room.sysId} />
		</div>
	);
};

export const Room = styled(RoomContainer)`
	margin: 40px 0;
	padding: 0 80px;

	.item {
		display: flex;
		justify-content: center;
		margin: 20px;
	}
`;
