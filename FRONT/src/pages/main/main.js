import { useEffect, useLayoutEffect, useState } from "react";
import { RoomCard } from "./components/room-card/room-card";
import styled from "styled-components";
import { RevolvingDot } from "react-loader-spinner";
import { Error } from "../../components";
import { Icon } from "../../components/header/components";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ROOMS_DATA, loadRoomsAsync } from "../../actions";
import { selectRooms } from "../../selectors";

const MainContainer = ({ className }) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [shouldSort, setShouldSort] = useState(false);
	const rooms = useSelector(selectRooms);

	useLayoutEffect(() => {
		if (!shouldSort) {
			rooms.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
			setIsLoading(false);
		} else {
			rooms.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
			setIsLoading(false);
		}
	}, [shouldSort, rooms]);

	useEffect(() => {
		dispatch(loadRoomsAsync());
	}, [dispatch]);

	setTimeout(setIsLoading, 1000);

	const { currentPath } = window.location.href;
	const mainPath = "http://localhost:3000/";

	useLayoutEffect(() => {
		if (mainPath !== currentPath) {
			dispatch(RESET_ROOMS_DATA);
		}
	}, [currentPath, dispatch]);

	return (
		<div className={className}>
			<button
				className="sorted"
				onClick={() => setShouldSort(!shouldSort)}
			>
				<Icon
					id="fa-sort"
					margin="0"
					size="18px"
				/>
				Сортировать по цене
			</button>

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
				<div className={className}>
					{rooms.length > 0 ? (
						<div className="room-list">
							{rooms.map(({ id, title, imageUrl, price, reviews }) => (
								<RoomCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									price={price}
									reviewsCount={reviews.length}
								/>
							))}
						</div>
					) : (
						<Error error={"Номера не найдены"} />
					)}
				</div>
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.item {
		display: flex;
		justify-content: center;
		margin: 20px;
	}

	& .room-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 100px 80px 180px;
	}

	& .no-rooms-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}

	& .sorted {
		display: flex;
		width: 175px;
		justify-content: space-between;
		align-items: center;
		margin: auto;
		margin-top: 15px;
		padding: 0 10px;
	}
`;
