import { useEffect, useState } from "react";
import styled from "styled-components";
import { UserReservCard } from "./components";
import { useSelector } from "react-redux";
import { selectUserLogin } from "../../selectors";
import { useDispatch } from "react-redux";
import { openModal, CLOSE_MODAL } from "../../actions";
import { removeReservationAsync } from "../../actions";
import { Error } from "../../components";
import { RevolvingDot } from "react-loader-spinner";
import { request } from "../../utils";

const UserReservListContainer = ({ className }) => {
	const [reservations, setReservations] = useState([]);
	const [shouldUpdateReservList, setShouldUpdateReservList] = useState(false);
	const userLogin = useSelector(selectUserLogin);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		request("/reservations").then(({ data: { reservs } }) => {
			if (reservs.error) {
				return;
			}
			const userReservs = reservs.filter(
				(reservs) => reservs.userLogin === `${userLogin}`,
			);
			setReservations(userReservs);
			setIsLoading(false);
		});
	}, [shouldUpdateReservList, userLogin]);

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
					<div className="user-reservs-list">
						{reservations.map(
							({
								id,
								roomId,
								userLogin,
								options,
								arrivalDate,
								leavingDate,
								roomPrice,
							}) => (
								<UserReservCard
									key={id}
									id={id}
									roomId={roomId}
									authorId={userLogin}
									options={options}
									arrivalDate={arrivalDate}
									leavingDate={leavingDate}
									price={roomPrice}
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

export const UserReservList = styled(UserReservListContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.item {
		display: flex;
		justify-content: center;
		margin: 20px;
	}

	& .user-reservs-list {
		display: flex;
		flex-wrap: wrap;
		margin: 20px 0 80px 0;
		justify-content: center;
	}
`;
