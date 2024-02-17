import styled from "styled-components";
import { ROLE } from "../../../../../../constants";
import { useSelector, useDispatch } from "react-redux";
import { selectUserLogin, selectUserRole } from "../../../../../../selectors";
import { useState } from "react";
import { addReservationAsync } from "../../../../../../actions";
import { AuthFormError, ConfirmationForm } from "../../../../../../components";
import { Error } from "../../../../../../components";

// const reservFormSchema = yup.object().shape({
// 	options: yup.string().required("Выберите дополнительные опции"),
// 	arrivalDate: yup.string().required("Выберите дату заезда"),
// 	leavingDate: yup.string().required("Выберите дату отъезда"),
// });

const ReservationContentContainer = ({ className, roomId }) => {
	const userLogin = useSelector(selectUserLogin);
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);
	const [arrivalDate, setArrivalDate] = useState();
	const [leavingDate, setLeavingDate] = useState();
	const [options, setOptions] = useState();
	const [serverError, setServerError] = useState(null);
	const [confirmation, setConfirmation] = useState(null);

	const minDate = new Date().toISOString().substring(0, 10);
	const minDate2 = arrivalDate || new Date().toISOString().substring(0, 10);

	const isGuest = userRole === ROLE.GUEST;
	const errorMessage = serverError;

	const onLDateChange = ({ target }) => {
		setConfirmation(null);
		setLeavingDate(target.value);
	};
	const onArDateChange = ({ target }) => {
		setConfirmation(null);
		setArrivalDate(target.value);
	};
	const onOptionChange = ({ target }) => {
		if (target.value <= "3" && target.value >= "1") {
			setServerError(null);
			setConfirmation(null);
			setOptions(target.value);
		} else {
			setServerError(
				"Максимальное количество гостей номера не может быть меньше 1 или привышать 3",
			);
		}
	};

	const onSubmit = () => {
		if (arrivalDate && leavingDate && options) {
			setServerError(null);
			dispatch(
				addReservationAsync(userLogin, roomId, options, arrivalDate, leavingDate),
			);
			setConfirmation("Ваша бронь подтверждена");
		} else {
			setServerError("Заполните все поля");
		}
	};

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-reservation">
					<div>
						<div>
							<label>
								Дата заезда:
								<input
									type="date"
									name="date"
									min={minDate}
									value={arrivalDate}
									required
									onChange={onArDateChange}
								/>
							</label>
						</div>
						<div>
							<label>
								Дата отъезда:
								<input
									type="date"
									name="date"
									id="leavingDate"
									min={minDate2}
									value={leavingDate}
									required
									onChange={onLDateChange}
								/>
							</label>
						</div>
					</div>
					<div>
						<label htmlFor="amountOfPeople">Количество гостей:</label>
						<input
							className="amount-of-people"
							type="number"
							name="number"
							id="amountOfPeople"
							max="5"
							value={options}
							onChange={onOptionChange}
							required
						/>
					</div>
					<button
						style={{ margin: "8px 0 0 0" }}
						onClick={onSubmit}
					>
						Забронировать
					</button>
					{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
					{confirmation && <ConfirmationForm>{confirmation}</ConfirmationForm>}
				</div>
			)}
			{isGuest && (
				<Error error={"Для совершения брони необходимо авторизоваться"} />
			)}
		</div>
	);
};

export const ReservationContent = styled(ReservationContentContainer)`
	background-color: white;
	text-align: center;
	padding: 5px 0 5px 0;

	.amount-of-people {
		width: 50px;
	}
`;
