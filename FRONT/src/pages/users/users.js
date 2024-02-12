import styled from "styled-components";
import { useEffect, useState } from "react";
import { ROLE } from "../../constants";
import { PrivateContent, H2 } from "../../components";
import { TableRow, UserRow } from "./components";
import { RevolvingDot } from "react-loader-spinner";
import { request } from "../../utils";

const UsersContainer = ({ className }) => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		Promise.all([request("/users"), request("/users/roles")]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.data);
				setRoles(rolesRes.data);
				setIsLoading(false);
			},
		);
	}, [shouldUpdateUserList]);

	const onUserRemove = (userId) => {
		request(`/users/${userId}`, "DELETE").then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

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
		<PrivateContent
			access={[ROLE.ADMIN]}
			serverError={errorMessage}
		>
			<div className={className}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-colomn">Логин</div>
						<div className="registered-at-colomn">Дата регистрации</div>
						<div className="role-colomn">Роль</div>
					</TableRow>

					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto 50px auto;
	width: 570px;
	height: auto;

	.item {
		display: flex;
		justify-content: center;
		margin: 20px;
	}
`;
