import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ROLE } from "../../../../../constants";
import { Link } from "react-router-dom";
import { selectUserRole, selectUserLogin } from "../../../../../selectors";
import { Icon } from "../../icon/icon";
import { logout } from "../../../../../actions";

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	position: absolute;
	right: 0;
`;

const Button = styled.button`
	margin: 15px;
	width: 150px;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
	color: #ffff;
	text-shadow: 1px 1px 1px #000;
`;

const AuthButtonContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem("userData");
	};

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Вход/Регистрация</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon
							id="fa-sign-out"
							margin="0 0 0 10px"
							onClick={onLogout}
						/>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const AuthButton = styled(AuthButtonContainer)`
	& .fa-sign-out {
		color: #ffff;
		text-shadow: 1px 1px 1px #000;
	}
`;
