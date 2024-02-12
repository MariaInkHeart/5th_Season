import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState("");
	const [temperature, setTemperature] = useState("");
	const [weather, setWeather] = useState("");

	useEffect(() => {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=ee7d858d11a71ae520b46538c665e02a",
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Отель "5th season"</div>
				<div>
					<p id="bottom">whichseason@fifthseason.ru</p>
				</div>
			</div>
			<div>
				<div>
					{city},{" "}
					{new Date().toLocaleString("ru", { day: "numeric", month: "long" })}
				</div>
				<div>
					{temperature} градусов, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: auto;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	box-shadow: 0px 2px 17px #000;
	background-color: #fff;
`;
