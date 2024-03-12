import styled from "styled-components";
import PropTypes from "prop-types";

const H2Conrainer = ({ children, className }) => (
	<h2 className={className}>{children}</h2>
);

export const H2 = styled(H2Conrainer)`
	margin: ${({ margin = "40px 0 15px 0" }) => margin};
`;

H2.propTypes = {
	children: PropTypes.node.isRequired,
};
