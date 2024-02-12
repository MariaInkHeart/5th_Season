import styled from "styled-components";
import { Header, Modal, Error, Footer } from "./components";
import { useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { setUser } from "./actions";
import { Route, Routes } from "react-router";
import {
	Main,
	Authorization,
	Registration,
	Users,
	ReservList,
	UserReservList,
} from "./pages";
import { ERROR } from "./constants";
import { Room } from "./pages";

const Page = styled.div`
	text-align: center;
`;

export const App = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem("userData");

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
	}, [dispatch]);

	return (
		<div>
			<Header />
			<Page>
				<Routes>
					<Route
						path="/"
						element={<Main />}
					/>
					<Route
						path="/login"
						element={<Authorization />}
					/>
					<Route
						path="/register"
						element={<Registration />}
					/>
					<Route
						path="/users"
						element={<Users />}
					/>
					<Route
						path="/rooms"
						element={<Room />}
					/>
					<Route
						path="/rooms/:id"
						element={<Room />}
					/>
					<Route
						path="/userreservlist"
						element={<UserReservList />}
					/>
					<Route
						path="/reservlist"
						element={<ReservList />}
					/>
					<Route
						path="*"
						element={<Error error={ERROR.PAGE_NOT_EXIST} />}
					/>
					<Route />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</div>
	);
};
