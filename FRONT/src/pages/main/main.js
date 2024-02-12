import { useEffect, useState } from "react";
import { RoomCard } from "./components/room-card/room-card";
import styled from "styled-components";
import { RevolvingDot } from "react-loader-spinner";
import { Error } from "../../components";
import { request } from "../../utils";

const MainContainer = ({ className }) => {
	const [rooms, setRooms] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		request("/rooms").then(({ data: { rooms } }) => {
			setRooms(rooms);
			setIsLoading(false);
		});
	}, []);

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
			{rooms.length > 0 ? (
				<div className="room-list">
					{rooms.map(({ id, title, imageUrl, price }) => (
						<RoomCard
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							price={price}
						/>
					))}
				</div>
			) : (
				<Error error={"Номера не найдены"} />
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
		padding: 20px 100px 80px 180px;
	}

	& .no-rooms-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}
`;
