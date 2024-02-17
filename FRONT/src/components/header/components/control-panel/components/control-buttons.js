import styled from "styled-components";
import { ROLE } from "../../../../../constants";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../../../selectors";
import { Link } from "react-router-dom";
import { checkAccess } from "../../../../../utils";

const RightDownAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	position: absolute;
	top: 680px;
	right: 20px;
`;

const NavButtons = styled(Link)`
	color: #fff;
	text-shadow: 1px 1px 1px #000;
	margin: 10px 0 0 16px;
`;

const Anchor = styled.a`
	color: #fff;
	text-shadow: 1px 1px 1px #000;
	margin: 10px 0 0 16px;
`;

const ControlButtonsContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);
	const isModer = checkAccess([ROLE.MODERATOR], roleId);
	const isGuest = checkAccess([ROLE.GUEST], roleId);

	return (
		<div className={className}>
			<RightDownAligned>
				<div className="cursor">
					<div className="go-down">
						<Anchor href="#bottom">Контакты</Anchor>
					</div>
				</div>
				{!isGuest && (
					<>
						<NavButtons
							to="/userreservlist"
							color="#fff"
						>
							Мои бронирования
						</NavButtons>
					</>
				)}
				{isModer ||
					(isAdmin && (
						<>
							<NavButtons to="/reservlist">Все бронирования</NavButtons>
							{isAdmin && <NavButtons to="/users">Пользователи</NavButtons>}
						</>
					))}
			</RightDownAligned>
		</div>
	);
};

export const ControlButtons = styled(ControlButtonsContainer)`
	.cursor {
		margin-top: 10px;
	}
`;
