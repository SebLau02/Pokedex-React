import React from "react";
import styled from "styled-components";
import colors from "../../utils/style/colors";

const Statistique = styled.span`
	display: block;
	height: clamp(1rem, 2vw, 1.5rem);
	max-width: 100%;
	border-radius: 2rem;
	text-align: end;
	padding-right: 1.5rem;
	background: linear-gradient(
		45deg,
		${colors.lightBlue},
		${colors.greenYellow}
	);
	font-size: clamp(1rem, 2vw, 1.6rem);
`;

const StatsWrapper = styled.div`
	max-width: 80rem;
	width: 70%;
	display: grid;
	grid-template-columns: 25% 75%;
	grid-gap: 0.5rem;
	border: 2px solid ${colors.red};
	padding: 1rem;
	border-radius: 1rem;
	margin: 2rem 0;
	box-shadow: 3px 3px 5px #565656;
	background: ${colors.beige};
`;
const StatList = styled.p`
	font-size: clamp(1rem, 3vw, 1.6rem);
`;

export default function Stats({ pokemonData }) {
	return (
		<StatsWrapper>
			<StatList>HP:</StatList>
			<Statistique
				style={{
					width: pokemonData?.stats?.HP / 5 + "rem",
				}}
			>
				{pokemonData?.stats?.HP}
			</Statistique>
			<StatList>ATK:</StatList>
			<Statistique
				style={{
					width: pokemonData?.stats?.attack / 5 + "rem",
				}}
			>
				{pokemonData?.stats?.attack}
			</Statistique>
			<StatList>DEF:</StatList>
			<Statistique
				style={{
					width: pokemonData?.stats?.defense / 5 + "rem",
				}}
			>
				{pokemonData?.stats?.defense}
			</Statistique>
			<StatList>ATK SPE:</StatList>
			<Statistique
				style={{
					width: pokemonData?.stats?.special_attack / 5 + "rem",
				}}
			>
				{pokemonData?.stats?.special_attack}
			</Statistique>
			<StatList>DEF SPE:</StatList>
			<Statistique
				style={{
					width: pokemonData?.stats?.special_defense / 5 + "rem",
				}}
			>
				{pokemonData?.stats?.special_defense}
			</Statistique>
			<StatList>VITESSE:</StatList>
			<Statistique
				style={{
					width: pokemonData.stats?.speed / 5 + "rem",
				}}
			>
				{pokemonData?.stats?.speed}
			</Statistique>
		</StatsWrapper>
	);
}
