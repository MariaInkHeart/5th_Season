import { Link } from "react-router-dom";
import styled from "styled-components";

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 48px;
	margin-top: 17px;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
	margin-left: 8px;
`;

const LogoDiv = styled.div`
	margin: 10px;
`;

const LogoContainer = ({ className }) => (
	<Link
		className={className}
		to="/"
	>
		<LogoDiv>
			<LargeText>5th</LargeText>
			<SmallText>season</SmallText>
		</LogoDiv>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -21px;
	color: #ffff;
	text-shadow: 1px 1px 1px #000;
`;
