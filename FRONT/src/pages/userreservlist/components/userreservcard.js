import styled from "styled-components";
import { Icon } from "../../../components/header/components";
import { useState } from "react";
import { request } from "../../../utils";
import { AuthFormError } from "../../../components";

const UserReservCardContainer = ({
	className,
	id,
	authorId,
	roomId,
	options,
	arrivalDate,
	leavingDate,
	price,
	onReservRemove,
}) => {
	const [serverError, setServerError] = useState(null);
	const minDate = new Date().toISOString().substring(0, 10);
	const minDate2 = arrivalDate || new Date().toISOString().substring(0, 10);

	const [initialArrivalDate, setInitialArrivalDate] = useState(arrivalDate);
	const [editedArrivalDate, setEditedArrivalDate] = useState(arrivalDate);

	const [initalLeavingDate, setInitialLeavingDate] = useState(leavingDate);
	const [editedLeavingDate, setEditedLeavingDate] = useState(leavingDate);

	const [initialOptions, setInitialOptions] = useState(options);
	const [editedOptions, setEditedOptions] = useState(options);

	const onEditedLDateChange = ({ target }) => {
		if (target.value !== "") {
			setServerError(null);
			setEditedLeavingDate(target.value);
		} else {
			setServerError("Поле не может быть пустым");
		}
	};
	const onEditedArDateChange = ({ target }) => {
		if (target.value !== "") {
			setServerError(null);
			setEditedArrivalDate(target.value);
		} else {
			setServerError("Поле не может быть пустым");
		}
	};
	const onEditedOptionChange = ({ target }) => {
		if (target.value !== "") {
			if (target.value <= "3" && target.value >= "1") {
				setServerError(null);
				setEditedOptions(target.value);
			} else {
				setServerError(
					"Максимальное количество гостей номера не может быть меньше 1 или привышать 3",
				);
			}
		} else {
			setServerError("Поле не может быть пустым");
		}
	};

	const onEditedSave = (id, editedArrivalDate, editedLeavingDate, editedOptions) => {
		if ((editedArrivalDate & editedLeavingDate & editedOptions) !== "") {
			request(`/reservations/${id}`, "PATCH", {
				id,
				editedArrivalDate,
				editedLeavingDate,
				editedOptions,
			}).then(() => {
				setInitialArrivalDate(editedArrivalDate);
				setInitialLeavingDate(editedLeavingDate);
				setInitialOptions(editedOptions);
			});
		}
	};

	const isSaveButtonDisabled =
		initialArrivalDate === editedArrivalDate &&
		initalLeavingDate === editedLeavingDate &&
		initialOptions === editedOptions;

	const errorMessage = serverError;
	return (
		<div className={className}>
			<div className="reserv-card-footer">
				<h4>
					<Icon
						id="fa-trash-o"
						onClick={onReservRemove}
					/>

					<Icon
						id="fa-floppy-o"
						size="21px"
						margin="0 0 0 5px"
						disabled={isSaveButtonDisabled}
						onClick={() =>
							onEditedSave(
								id,
								editedArrivalDate,
								editedLeavingDate,
								editedOptions,
							)
						}
					/>

					<div>{`Бронь ${id}`}</div>
				</h4>
				<div className="reserv-card-info">
					<div className="info">
						<div className="row">{`Пользователь: ${authorId}`}</div>
						<div className="row">{`Номер: ${roomId}`}</div>
						<div className="row">
							{`Количество гостей: `}
							<input
								className="guests-amount"
								type="number"
								value={editedOptions}
								onChange={onEditedOptionChange}
							/>
						</div>
						<div className="row">
							{`Дата заезда: `}
							<input
								type="date"
								name="date"
								min={minDate}
								value={editedArrivalDate}
								onChange={onEditedArDateChange}
							/>
						</div>
						<div className="row">
							{`Дата отъезда: `}
							<input
								type="date"
								name="date"
								min={minDate2}
								value={editedLeavingDate}
								onChange={onEditedLDateChange}
							/>
						</div>
						<div className="row">{`Цена: ${price} `}</div>
					</div>
				</div>
			</div>
			{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
		</div>
	);
};

export const UserReservCard = styled(UserReservCardContainer)`
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

	& .row {
		margin: 0;
		padding-left: 20px;
	}

	& .guests-amount {
		width: 55px;
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
`;
