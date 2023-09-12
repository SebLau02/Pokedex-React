import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "../loader";
import SearchBar from "../searchBar";
import Error404 from "../error/error404";
import { useState, useEffect } from "react";
import { useFetch } from "../../utils/hooks";

const StyledPokemonContainer = styled.div`
	max-width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	margin: 30px auto;
	padding: 0 10px;
	justify-items: center;
	min-height: 83vh;
`;
const StyledImagePokemon = styled.img`
	width: 100%;
	height: 100%;
	&:hover {
		border-radius: 20px;
		scale: 1.2;
	}
`;

const StyledWrapper = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	margin-top: 15vmin;
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
`;
const StyledLink = styled(Link)`
	width: 10vw;
	height: auto;

	@media (max-width: 425px) {
		width: 20vw;
		height: auto;
		transition: width 0.5s, height 0.5s;
	}
`;
const StyledResultP = styled.p`
	position: fixed;
	top: 11vmin;
	left: 8vw;
	z-index: 10;
	font-size: clamp(0.8rem, 2vw, 1.6rem);
`;

export default function Pokemon() {
	//********** state filtre pour les générations choisie **********

	let apiUrl = "";

	//********** je gardes en mémoire local la génération choisi pour le récupérer après chaque premier charment de la page **********

	const localStorageGen = localStorage.getItem("generation");
	const [filterGeneration, setFilterGeneration] = useState(
		localStorageGen ? localStorageGen : "Tout"
	);

	filterGeneration === "Tout"
		? (apiUrl = "https://pokebuildapi.fr/api/v1/pokemon")
		: (apiUrl = `https://pokebuildapi.fr/api/v1/pokemon/generation/${filterGeneration}`);

	localStorage.setItem("generation", filterGeneration);

	//********** api call pour récuperer les pokémons **********

	const { data, isLoading, error } = useFetch(apiUrl);
	const listePokemon = data;

	//********** filtrage par nom et par type **********

	const [filterName, setFilterName] = useState("");
	const localStorageType = localStorage.getItem("type");

	const [filterType, setFilterType] = useState(
		localStorageType ? localStorageType : "Tout"
	);

	const pokemonFiltrerByType = Object.values(listePokemon).filter((el) => {
		return (
			el.apiTypes[0]?.name === filterType ||
			el.apiTypes[1]?.name === filterType
		);
	});

	localStorage.setItem("type", filterType);

	let filteredByName = [];

	filteredByName = Object.values(listePokemon).filter((pokemon) =>
		pokemon.name.toLowerCase().match(filterName.toLowerCase())
	);

	return (
		<div>
			{error ? (
				<Error404 />
			) : isLoading ? (
				<Loader />
			) : (
				<StyledWrapper>
					<SearchBar
						filterType={filterType}
						setFilterType={setFilterType}
						filterName={filterName}
						setFilterName={setFilterName}
						listePokemon={listePokemon}
						filteredByName={filteredByName}
						filterGeneration={filterGeneration}
						setFilterGeneration={setFilterGeneration}
					/>

					{filterType === "Tout" ? (
						<StyledPokemonContainer>
							<StyledResultP>
								{filteredByName.length} résultats.
							</StyledResultP>
							{filteredByName.map((item) => (
								<StyledLink
									key={`pokemon-${item.pokedexId}`}
									to={`/pokemon/${item.pokedexId}`}
								>
									<StyledImagePokemon
										key={item.pokedexId}
										src={item.sprite}
										alt="illustration de pokemon"
									/>
								</StyledLink>
							))}
						</StyledPokemonContainer>
					) : (
						<StyledPokemonContainer>
							<StyledResultP>
								{pokemonFiltrerByType.length} résultats.
							</StyledResultP>
							{pokemonFiltrerByType.map((item) => (
								<StyledLink
									key={`pokemon-${item.pokedexId}`}
									to={`/pokemon/${item.pokedexId}`}
								>
									<StyledImagePokemon
										key={item.pokedexId}
										src={item.sprite}
										alt="illustration de pokemon"
									/>
								</StyledLink>
							))}
						</StyledPokemonContainer>
					)}
				</StyledWrapper>
			)}
		</div>
	);
}
