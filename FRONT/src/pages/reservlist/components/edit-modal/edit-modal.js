import styled from "styled-components";
import { Icon } from "../../../../components/header/components";

const EditModalContainer = (
	className,
	id,
	authorId,
	roomId,
	options,
	arrivalDate,
	leavingDate,
	onReservRemove,
) => {
	const onSave = () => {};

	return (
		<div className={className}>
			<div className="reserv-card-footer">
				<h4>
					<Icon
						id="fa-trash-o"
						margin="0 0 0 10px"
						onClick={onReservRemove}
					/>

					<Icon
						id="fa-pencil-square-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={onSave}
					/>

					<p>{`Бронь ${id}`}</p>
				</h4>
				<div className="reserv-card-info">
					<div className="info">
						<p>{`Пользователь: ${authorId}`}</p>
						<p>{`Номер: ${roomId}`}</p>
						<p>{`Количество гостей: ${options}`}</p>
						<p>{`Дата заезда: ${arrivalDate}`}</p>
						<p>{`Дата отъезда: ${leavingDate}`}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export const EditModal = styled(EditModalContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	margin: 20px;
	border: 1px solid #000;
	background-color: white;

	& h4 {
		margin: 0;
		display: flex;
		align-items: center;
	}

	& p {
		margin: 0;
		padding-left: 20px;
	}

	& .info {
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: flex-start;
		padding-bottom: 5px;
	}

	& .reserv-card-footer {
		padding: 5px;
		border-top: 1px solid #000;
	}

	& .reserv-card-info {
		display: flex;
		justify-content: space-between;
		margin-top: 5px;
	}

	& .price {
		display: flex;
	}
`;
