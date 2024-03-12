import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "../../../../components/header/components";
import PropTypes from "prop-types";

const RoomCardContainer = ({ className, id, title, imageUrl, price, reviewsCount }) => {
	return (
		<div className={className}>
			<Link to={`/rooms/${id}`}>
				<img
					src={imageUrl}
					alt={title}
				/>
				<div className="room-card-footer">
					<h4>{title}</h4>
					<div className="room-card-info">
						<div className="reviews">
							<Icon
								inactive={true}
								id="fa-star"
								margin="0 7px 0 0"
								size="18px"
							/>
							{reviewsCount}
						</div>
						<div className="price">
							<Icon
								inactive={true}
								id="fa-money"
								margin="0 7px 0 0"
								size="18px"
							/>
							{price}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const RoomCard = styled(RoomCardContainer)`
	display: flex;
	flex-direction: column;
	width: 420px;
	margin: 20px 50px;
	border: 1px solid #000;
	background-color: white;

	& img {
		display: block;
		width: 100%;
		height: 300px;
	}

	& h4 {
		margin: 0;
	}

	& .room-card-footer {
		padding: 5px;
		border-top: 1px solid #000;
	}

	& .room-card-info {
		display: flex;
		margin-top: 5px;
		justify-content: space-between;
	}

	& .price {
		display: flex;
	}

	& .reviews {
		display: flex;
	}
`;

RoomCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
};
