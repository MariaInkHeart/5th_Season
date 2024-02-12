import styled from "styled-components";
import img from "../../images/main/lobby1.png";
import { Logo } from "./components";
import { AuthButton, ControlButtons } from "./components/control-panel";

const Discription = styled.div`
	font-style: italic;
	font-family: Times;
	align-items: center;
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin-right: 200px;
`;

const Slogan = styled.p`
	font-size: 28px;
	color: #ffffff;
	text-shadow: 1px 1px 1px #000;
`;

const Welcoming = styled.p`
	font-size: 76px;
	color: #ffffff;
	margin: 0px 0px 30px 0px;
	text-shadow: 1px 1px 1px #000;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<AuthButton />
		<Discription>
			<Slogan>
				Первый отель, объединяющий в себе несколько дизайнерских решений
			</Slogan>
			<Welcoming>Добро пожаловать в отель </Welcoming>
			<Welcoming>5th Season</Welcoming>
		</Discription>
		<ControlButtons />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	height: 720px;
	width: auto;
	background-image: url(${img});
`;
