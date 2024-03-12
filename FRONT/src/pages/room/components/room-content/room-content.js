import styled from "styled-components";
import { H2 } from "../../../../components";
import { PROP_TYPE } from "../../../../constants";
import { RevolvingDot } from "react-loader-spinner";

const PriceDiv = styled.div`
	font-size: 25px;
	margin: 20px 0 20px 0;
	color: red;
`;

const RoomContentContainer = ({
	className,
	room: { id, title, imageUrl, content, price },
}) => {
	return !id ? (
		<div className={className}>
			<div className="dot-item">
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
			<div className="room-item">
				<img
					src={imageUrl}
					alt={title}
				/>
				<div className="room-text">
					<H2 margin="0 ">{title}</H2>

					<div className="room-discr">{content}</div>
					<PriceDiv>{price} рублей за ночь</PriceDiv>
				</div>
			</div>
		</div>
	);
};

export const RoomContent = styled(RoomContentContainer)`
	& .room-item {
		display: flex;
	}

	& img {
		width: 762px;
		height: 507px;
		float: left;
		margin: 0 20px 5px 0;
	}

	& .room-discr {
		font-size: 18px;
		white-space: pre-line;
		text-align: justify;
	}

	.dot-item {
		display: flex;
		justify-content: center;
		margin: 20px;
	}

	.room-text {
	}
`;

RoomContent.propTypes = {
	room: PROP_TYPE.ROOM.isRequired,
};
