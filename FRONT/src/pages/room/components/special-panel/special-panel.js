import styled from "styled-components";
import { useSelector } from "react-redux";
import { ROLE } from "../../../../constants";
import { selectUserRole } from "../../../../selectors";
import PropTypes from "prop-types";
import { checkAccess } from "../../../../utils";

const SpecialPanelContainer = ({ className, id, editButton }) => {
	const userRole = useSelector(selectUserRole);

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			{isAdmin && <div className="buttons">{editButton}</div>}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .published-at {
		display: flex;
		font-size: 18px;
	}

	& .buttons {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
