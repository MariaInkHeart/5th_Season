import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openModal, CLOSE_MODAL } from "../../actions";
import { removeReservationAsync } from "../../actions";
import { Error } from "../../components";
import { RevolvingDot } from "react-loader-spinner";
import { request } from "../../utils";
import { UserReservCard } from "../userreservlist/components";

const ReservListContainer = ({ className }) => {
	const [reservations, setReservations] = useState([]);
	const dispatch = useDispatch();
	const [shouldUpdateReservList, setShouldUpdateReservList] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		request("/reservations").then(({ data: { reservs } }) => {
			if (reservs.error) {
				return;
			}
			setReservations(reservs);
			setIsLoading(false);
		});
	}, [shouldUpdateReservList]);

	const onReservRemove = (id) => {
		dispatch(
			openModal({
				text: "Вы действительно хотите удалить бронь?",

				onConfirm: () => {
					dispatch(removeReservationAsync(id));
					setShouldUpdateReservList(!shouldUpdateReservList);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return isLoading ? (
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
		<div className={className}>
			<div className="rooms-and-search">
				{reservations.length > 0 ? (
					<div className="reserv-list">
						{reservations.map(
							({
								id,
								roomId,
								userLogin,
								options,
								arrivalDate,
								leavingDate,
							}) => (
								<UserReservCard
									key={id}
									id={id}
									roomId={roomId}
									authorId={userLogin}
									options={options}
									arrivalDate={arrivalDate}
									leavingDate={leavingDate}
									onReservRemove={() => onReservRemove(id)}
								/>
							),
						)}
					</div>
				) : (
					<Error error={"Брони не найдены"} />
				)}
			</div>
		</div>
	);
};

export const ReservList = styled(ReservListContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.item {
		display: flex;
		justify-content: center;
		margin: 20px;
	}

	& .reserv-list {
		display: flex;
		flex-wrap: wrap;
		margin: 20px 0 80px 0;
		justify-content: center;
	}
`;
