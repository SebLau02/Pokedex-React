import styled from "styled-components";
import { Link } from "react-router-dom";
import { useFetch } from "../../utils/hooks";
import Loader from "../loader";
import SearchBar from "../searchBar";
import { useState } from "react";

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
		transition: width 1s, height 1s;
	}
`;

export default function Pokemon() {
	const { data, isLoading } = useFetch(
		`https://pokebuildapi.fr/api/v1/pokemon/generation/1`
	);
	const listePokemon = data;

	const [filterName, setFilterName] = useState("");

	const [filterType, setFilterType] = useState("Tout");
	const pokemonFiltrerByType = Object.values(listePokemon).filter((el) => {
		return (
			el.apiTypes[0]?.name === filterType ||
			el.apiTypes[1]?.name === filterType
		);
	});

	let filteredByName = [];

	filteredByName = Object.values(listePokemon).filter((pokemon) =>
		pokemon.name.toLowerCase().match(filterName.toLowerCase())
	);

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<StyledWrapper>
					<SearchBar
						setFilterType={setFilterType}
						filterName={filterName}
						setFilterName={setFilterName}
						listePokemon={listePokemon}
						filteredByName={filteredByName}
					/>

					{filterType === "Tout" ? (
						<StyledPokemonContainer>
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
