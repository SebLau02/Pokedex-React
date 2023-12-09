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

const NameIdWrapper = styled.div`
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
const NextPreviousWrapper = styled.div`
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
const IllustrationWrapper = styled.div`
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 3.5rem 0;
	padding: 3.5rem;
	border-radius: 1rem;
	box-shadow: 3px 3px 5px #565656;
`;

const EvolutionWrapper = styled.div`
	width: 70%;
	max-width: 70%;
	border: 2px solid ${colors.red};
	border-radius: 1rem;
	margin-bottom: 2rem;
	background-color: white;
	box-shadow: 3px 3px 5px #565656;
	background: ${colors.beige};
`;
const EvolutionTitle = styled.h3`
	margin: 1rem;
	font-size: clamp(1rem, 2vw, 1.8rem);
`;

const PokeId = styled.h2`
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

const EvolutionLink = styled.div`
	color: ${colors.green};
	text-decoration: none;
`;

const NavButton = styled.button`
	border: none;
	background: none;
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

	const [pokemonData, setPokemonData] = useState(data);

	useEffect(() => {
		if (data) {
			setPokemonData(data);
		}
	}, [data]);

	const suivant = pokemonData?.pokedexId + 1;
	const precedent = pokemonData?.pokedexId - 1;

	//---------------------------------------------

	const type = pokemonData?.apiTypes; // récupérer le type
	const themeByType = []; // theme par type

	type?.forEach((el) => themeByType.push(theme[`${el.name}`])); // définition des couleurs en fonction du type

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
						<NextPreviousWrapper>
							{precedent >= 1 ? (
								<NavButton
									onClick={() => {
										setPokemonId(pokemonId--);
									}}
								>
									<LeftArrow
										fill="#ffff"
										className="arrow-nav left "
									/>
								</NavButton>
							) : (
								<LeftArrow
									fill="#a0a0a0"
									className="arrow-nav active-left"
								/>
							)}

							{suivant <= 898 ? (
								<NavButton
									onClick={() => {
										setPokemonId(pokemonId++);
									}}
								>
									<RightArrow
										fill="#ffff"
										className="arrow-nav right"
									/>
								</NavButton>
							) : (
								<RightArrow
									fill="#a0a0a0"
									className="arrow-nav active-right"
								/>
							)}
						</NextPreviousWrapper>

						<NameIdWrapper>
							<PokeId>N°{pokemonId}</PokeId>

							<PokeId>{pokemonData?.name}</PokeId>
						</NameIdWrapper>

						<IllustrationWrapper
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
								src={pokemonData?.image}
								alt="illustration"
							/>

							<StyledUlType>
								{pokemonData?.apiTypes?.map((item) => (
									<StyledLi key={item.name}>
										<StyledImgType
											src={item.image}
											alt="illustration type"
										/>
										{item.name}
									</StyledLi>
								))}
							</StyledUlType>
						</IllustrationWrapper>

						<Stats pokemonData={pokemonData} />

						<EvolutionWrapper>
							{pokemonData?.apiPreEvolution === "none" ? (
								<EvolutionTitle>
									Pas de pré-évolution
								</EvolutionTitle>
							) : (
								<EvolutionTitle>
									Pré-évolution:
									<EvolutionLink
										onClick={() => {
											setPokemonId(
												pokemonData?.apiPreEvolution
													.pokedexIdd,
											);
										}}
									>
										{pokemonData?.apiPreEvolution?.name}
									</EvolutionLink>
								</EvolutionTitle>
							)}
							{pokemonData?.apiEvolutions &&
								(pokemonData?.apiEvolutions?.length === 0 ? (
									<EvolutionTitle>
										Evolution: Max
									</EvolutionTitle>
								) : (
									<EvolutionTitle>
										Evolution:
										<EvolutionLink
											onClick={() => {
												setPokemonId(
													pokemonData
														?.apiEvolutions[0]
														?.pokedexId,
												);
											}}
										>
											{
												pokemonData?.apiEvolutions[0]
													?.name
											}
										</EvolutionLink>
									</EvolutionTitle>
								))}
						</EvolutionWrapper>

						<Resistances pokemonData={pokemonData} />

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
