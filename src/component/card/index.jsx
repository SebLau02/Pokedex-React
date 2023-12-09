import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useFetch } from "../../utils/hooks";
import { Link, useParams } from "react-router-dom";

import Loader from "../loader";
import Resistances from "../resistances";
import Stats from "../stats";
import Error404 from "../error/error404";
import Error from "../error/error";
import "./index.css";

import colors from "../../utils/style/colors";
import theme from "../../utils/style/theme";

import { ReactComponent as LeftArrow } from "../../assets/left_arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/right_arrow.svg";

const StyledImagePokemon = styled.img`
	width: 80%;
	max-width: 40rem;
	border-radius: 2rem;
`;

const StyledUlType = styled.ul`
	width: 10rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
`;

const StyledLi = styled.li`
	font-size: 1.2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: 1rem;
`;

const StyledImgType = styled.img`
	width: 4rem;
	height: auto;
`;

const PokemonCard = styled.article`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	border: 10px solid ${colors.yellow};
	border-radius: 2rem;

	max-width: 800px;

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	font-size: 1.6rem;

	width: 80%;

	background-image: repeating-linear-gradient(
			524deg,
			transparent 0px,
			transparent 3px,
			rgb(232, 225, 214) 3px,
			rgb(232, 225, 214) 32px
		),
		repeating-linear-gradient(
			582deg,
			transparent 0px,
			transparent 3px,
			rgb(232, 225, 214) 3px,
			rgb(232, 225, 214) 32px
		),
		linear-gradient(
			365deg,
			hsl(191, 85%, 78%),
			hsl(242.429, 85%, 78%),
			hsl(293.857, 85%, 78%),
			hsl(345.286, 85%, 78%),
			hsl(36.714, 85%, 78%),
			hsl(88.143, 85%, 78%),
			hsl(139.571, 85%, 78%)
		);

	@media (max-width: 425px) {
		width: 100%;
		transition: width 0.5s;
	}
`;

const StyledNamePokeIdWrapper = styled.div`
	width: 80%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 2rem;
	border: 2px solid ${colors.red};
	border-radius: 1rem;
	padding: 0.5rem 0;
	box-shadow: 3px 3px 5px #565656;
	background-color: ${colors.yellow};
`;
const StyledLinkWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: none;
	border-top-left-radius: 1rem;
	border-top-right-radius: 1rem;
	background: linear-gradient(
		180deg,
		${colors.darkBlue},
		${colors.beige} 120%
	);

	padding: 1rem 3rem 0.5rem;
`;
const StyledIllustrationTypeWrapper = styled.div`
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 3.5rem 0;
	padding: 3.5rem;
	border-radius: 1rem;
	box-shadow: 3px 3px 5px #565656;
`;

const StyledEvolutionWrapper = styled.div`
	width: 70%;
	max-width: 70%;
	border: 2px solid ${colors.red};
	border-radius: 1rem;
	margin-bottom: 2rem;
	background-color: white;
	box-shadow: 3px 3px 5px #565656;
	background: ${colors.beige};
`;
const StyledH3evolution = styled.h3`
	margin: 1rem;
	font-size: clamp(1rem, 2vw, 1.8rem);
`;

const StyledPokeId = styled.h2`
	font-size: clamp(1.6rem, 2vw, 2rem);
`;

const CloseButton = styled.button`
	position: relative;

	width: 3vw;
	height: 3vw;
	min-width: 23px;
	min-height: 23px;

	border: 1px solid black;
	border-radius: 0.5vw;

	padding: 0.5rem;
	margin-bottom: 1rem;

	box-shadow: 3px 3px 5px #565656;
	background-color: white;

	:active {
		transform: translate(2px, 2px);
		box-shadow: 1px 1px 5px #565656;
	}
`;

const CardGlobalSection = styled.section`
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0%);

	width: 100%;
	height: 100%;

	backdrop-filter: blur(8px);
	padding: 10px 0;

	@media (max-width: 425px) {
		padding: 0;
	}
`;

const EvolutionLink = styled(Link)`
	color: ${colors.green};
	text-decoration: none;
`;

export default function Cards({
	closeCard,
	setCloseCard,
	pokemonId,
	setPokemonId,
	cardPosition,
}) {
	const { data, isLoading, error } = useFetch(
		`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId}`,
	);

	const resultats = data;

	const suivant = resultats?.pokedexId + 1;
	const precedent = resultats?.pokedexId - 1;

	const type = resultats?.apiTypes;
	const themeByType = [];

	type?.forEach((el) => themeByType.push(theme[`${el.name}`]));

	return (
		<div>
			{error ? (
				<Error404 />
			) : pokemonId > 898 ? (
				<Error />
			) : isLoading ? (
				<Loader />
			) : (
				<CardGlobalSection className={!closeCard && "active"}>
					<PokemonCard
						style={{
							top: cardPosition.pageY - cardPosition.clientY,
						}}
					>
						<StyledLinkWrapper>
							{precedent >= 1 ? (
								<Link to={`/pokemon/${precedent}`}>
									<LeftArrow
										fill="#ffff"
										className="arrow-nav left "
									/>
								</Link>
							) : (
								<LeftArrow
									fill="#a0a0a0"
									className="arrow-nav active-left"
								/>
							)}

							{suivant <= 898 ? (
								<Link to={`/pokemon/${suivant}`}>
									<RightArrow
										fill="#ffff"
										className="arrow-nav right"
									/>
								</Link>
							) : (
								<RightArrow
									fill="#a0a0a0"
									className="arrow-nav active-right"
								/>
							)}
						</StyledLinkWrapper>

						<StyledNamePokeIdWrapper>
							<StyledPokeId>N°{pokemonId}</StyledPokeId>

							<StyledPokeId>{resultats?.name}</StyledPokeId>
						</StyledNamePokeIdWrapper>

						<StyledIllustrationTypeWrapper
							style={
								themeByType.length > 1
									? {
											background: `linear-gradient(45deg,${themeByType[0]},${themeByType[1]}`,
									  }
									: {
											background: `linear-gradient(45deg,${themeByType[0]}, #b2b2b2`,
									  }
							}
						>
							<StyledImagePokemon
								src={resultats?.image}
								alt="illustration"
							/>

							<StyledUlType>
								{resultats?.apiTypes?.map((item) => (
									<StyledLi key={item.name}>
										<StyledImgType
											src={item.image}
											alt="illustration type"
										/>
										{item.name}
									</StyledLi>
								))}
							</StyledUlType>
						</StyledIllustrationTypeWrapper>

						<Stats resultats={resultats} />

						<StyledEvolutionWrapper>
							{resultats?.apiPreEvolution === "none" ? (
								<StyledH3evolution>
									Pas de pré-évolution
								</StyledH3evolution>
							) : (
								<StyledH3evolution>
									Pré-évolution:
									<EvolutionLink
										key={`pokemon-${resultats?.apiPreEvolution.pokedexId}`}
										to={`/pokemon/${resultats?.apiPreEvolution.pokedexId}`}
									>
										{resultats?.apiPreEvolution.name}
									</EvolutionLink>
								</StyledH3evolution>
							)}
							{resultats?.apiEvolutions.length === 0 ? (
								<StyledH3evolution>
									Evolution: Max
								</StyledH3evolution>
							) : (
								<StyledH3evolution>
									Evolution:
									<EvolutionLink
										key={`pokemon-${resultats?.apiEvolutions[0].pokedexId}`}
										to={`/pokemon/${resultats?.apiEvolutions[0].pokedexId}`}
									>
										{resultats?.apiEvolutions[0]?.name}
									</EvolutionLink>
								</StyledH3evolution>
							)}
						</StyledEvolutionWrapper>

						<Resistances resultats={resultats} />

						<CloseButton
							onClick={() => {
								setCloseCard(false);
							}}
							className="close-btn"
						>
							<span className="ligne"></span>
							<span className="ligne"></span>
						</CloseButton>
					</PokemonCard>
				</CardGlobalSection>
			)}
		</div>
	);
}
