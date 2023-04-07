import React from "react";
import styled from "styled-components";
import colors from "../../utils/style/colors";

const StyledSpanStatsAnimation = styled.span`
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

const SyledStatsWrapper = styled.div`
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
const StyledLiText = styled.p`
	font-size: clamp(1rem, 3vw, 1.6rem);
`;

export default function Stats({ resultats }) {
	return (
		<SyledStatsWrapper>
			<StyledLiText>HP:</StyledLiText>
			<StyledSpanStatsAnimation
				style={{
					width: resultats?.stats?.HP / 5 + "rem",
				}}
			>
				{resultats?.stats?.HP}
			</StyledSpanStatsAnimation>
			<StyledLiText>ATK:</StyledLiText>
			<StyledSpanStatsAnimation
				style={{
					width: resultats?.stats?.attack / 5 + "rem",
				}}
			>
				{resultats?.stats?.attack}
			</StyledSpanStatsAnimation>
			<StyledLiText>DEF:</StyledLiText>
			<StyledSpanStatsAnimation
				style={{
					width: resultats?.stats?.defense / 5 + "rem",
				}}
			>
				{resultats?.stats?.defense}
			</StyledSpanStatsAnimation>
			<StyledLiText>ATK SPE:</StyledLiText>
			<StyledSpanStatsAnimation
				style={{
					width: resultats?.stats?.special_attack / 5 + "rem",
				}}
			>
				{" "}
				{resultats?.stats?.special_attack}
			</StyledSpanStatsAnimation>
			<StyledLiText>DEF SPE:</StyledLiText>
			<StyledSpanStatsAnimation
				style={{
					width: resultats?.stats?.special_defense / 5 + "rem",
				}}
			>
				{resultats?.stats?.special_defense}
			</StyledSpanStatsAnimation>
			<StyledLiText>VITESSE:</StyledLiText>
			<StyledSpanStatsAnimation
				style={{
					width: resultats.stats?.speed / 5 + "rem",
				}}
			>
				{resultats?.stats?.speed}
			</StyledSpanStatsAnimation>
		</SyledStatsWrapper>
	);
}
