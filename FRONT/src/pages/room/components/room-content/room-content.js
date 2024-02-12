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
	isLoading,
}) => {
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
			<img
				src={imageUrl}
				alt={title}
			/>
			<H2>{title}</H2>

			<div className="room-text">{content}</div>
			<PriceDiv>{price} рублей за ночь</PriceDiv>
		</div>
	);
};

export const RoomContent = styled(RoomContentContainer)`
	& img {
		width: 508px;
		height: 338px;
		float: left;
		margin: 0 20px 5px 0;
	}

	& .room-text {
		font-size: 18px;
		white-space: pre-line;
	}

	.item {
		display: flex;
		justify-content: center;
		margin: 20px;
	}
`;

RoomContent.propTypes = {
	room: PROP_TYPE.ROOM.isRequired,
};
