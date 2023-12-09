import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Loader from "../loader";
import SearchBar from "../searchBar";
import Error404 from "../error/error404";
import Cards from "../card";

import { useState, useEffect } from "react";
import { useFetch } from "../../utils/hooks";

import "./index.css";

const PokemonContainer = styled.section`
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
const ImagePokemon = styled.img`
	width: 100%;
	height: 100%;
	&:hover {
		border-radius: 20px;
		scale: 1.2;
	}
`;

const PokemonGlobalContainer = styled.main`
	position: relative;

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
const PokemonLink = styled.button`
	width: 10vw;
	height: auto;

	border: none;
	background: none;

	@media (max-width: 425px) {
		width: 20vw;
		height: auto;
		transition: width 0.5s, height 0.5s;
	}
`;
const TotalResult = styled.p`
	position: fixed;
	top: 11vmin;
	left: 8vw;
	z-index: 10;

	font-size: clamp(0.8rem, 2vw, 1.6rem);

	transition: transform 0.1s linear;
`;

export default function Pokemon() {
	//********** state filtre pour les générations choisie **********

	let apiUrl = "";

	//********** je gardes en mémoire local la génération choisi pour le récupérer après chaque premier chargement de la page **********

	const localStorageGen = localStorage.getItem("generation");
	const [filterGeneration, setFilterGeneration] = useState(
		localStorageGen ? localStorageGen : "Tout",
	);

	filterGeneration === "Tout"
		? (apiUrl = `https://pokebuildapi.fr/api/v1/pokemon`)
		: (apiUrl = `https://pokebuildapi.fr/api/v1/pokemon/generation/${filterGeneration}`);

	localStorage.setItem("generation", filterGeneration);

	//********** api call pour récuperer les pokémons **********

	const { data, isLoading, error } = useFetch(apiUrl);

	const [pokemonList, setPokemonList] = useState(Object.values(data));

	useEffect(() => {
		if (data) {
			setPokemonList(Object.values(data));
		}
	}, [data]);

	useEffect(() => {
		const selectedGeneration = [];

		Object.values(data).filter((pokemon) => {
			pokemon.apiGeneration === parseInt(filterGeneration) &&
				selectedGeneration.push(pokemon);
		});

		console.log(selectedGeneration);
	}, [filterGeneration]);

	//********** filtrage par nom et par type **********

	const [filterName, setFilterName] = useState("");
	const localStorageType = localStorage.getItem("type");

	const [filterType, setFilterType] = useState(
		localStorageType ? localStorageType : "Tout",
	);

	const pokemonFiltrerByType = Object.values(pokemonList).filter((el) => {
		return (
			el.apiTypes[0]?.name === filterType ||
			el.apiTypes[1]?.name === filterType
		);
	});

	localStorage.setItem("type", filterType);

	let filteredByName = [];

	filteredByName = Object.values(pokemonList).filter((pokemon) =>
		pokemon.name.toLowerCase().match(filterName.toLowerCase()),
	);

	const [closeCard, setCloseCard] = useState(); // afficher / fermer carte
	const [scrollY, setScrollY] = useState(window.scrollY); //détecter si je scroll vers le bas ou haut
	const [hiddenScroll, setHiddenScroll] = useState(false); //afficher / cacher navbar au scroll
	const [pokemonId, setPokemonId] = useState(1); // id du pokemon choisi
	const [cardPosition, setCardPosition] = useState({ pageY: 0, clientY: 0 }); // position du pokemon choisi

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY <= scrollY) {
				setHiddenScroll(false);
				setScrollY(window.scrollY);
			} else {
				setHiddenScroll(true);
				setScrollY(window.scrollY);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scrollY]);

	return (
		<div>
			{error ? (
				<Error404 />
			) : isLoading ? (
				<Loader />
			) : (
				<PokemonGlobalContainer>
					<SearchBar
						filterType={filterType}
						setFilterType={setFilterType}
						filterName={filterName}
						setFilterName={setFilterName}
						filterGeneration={filterGeneration}
						setFilterGeneration={setFilterGeneration}
						hiddenScroll={hiddenScroll}
					/>

					{filterType === "Tout" ? (
						<PokemonContainer>
							<TotalResult className={hiddenScroll && "hidden"}>
								{filteredByName.length} résultats.
							</TotalResult>
							{filteredByName.map((item) => (
								<PokemonLink
									key={`pokemon-${item.pokedexId}`}
									onClick={(e) => {
										setCloseCard(true);
										setPokemonId(item.pokedexId);
										setCardPosition({
											pageY: e.pageY,
											clientY: e.clientY,
										});
									}}
								>
									<ImagePokemon
										key={item.pokedexId}
										src={item.sprite}
										alt="illustration de pokemon"
									/>
								</PokemonLink>
							))}
						</PokemonContainer>
					) : (
						<PokemonContainer>
							<TotalResult>
								{pokemonFiltrerByType.length} résultats.
							</TotalResult>
							{pokemonFiltrerByType.map((item) => (
								<PokemonLink
									key={`pokemon-${item.pokedexId}`}
									onClick={(e) => {
										setCloseCard(true);
										setPokemonId(item.pokedexId);
										setCardPosition({
											pageY: e.pageY,
											clientY: e.clientY,
										});
									}}
								>
									<ImagePokemon
										key={item.pokedexId}
										src={item.sprite}
										alt="illustration de pokemon"
									/>
								</PokemonLink>
							))}
						</PokemonContainer>
					)}

					<Cards
						closeCard={closeCard}
						setCloseCard={setCloseCard}
						pokemonId={pokemonId}
						setPokemonId={setPokemonId}
						cardPosition={cardPosition}
					/>
				</PokemonGlobalContainer>
			)}
		</div>
	);
}
