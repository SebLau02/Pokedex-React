import React, { useRef } from "react";
import styled from "styled-components";

import Loader from "../loader";
import SearchBar from "../searchBar";
import Error404 from "../error/error404";
import Cards from "../card";

import { useState, useEffect } from "react";
import { useFetch } from "../../utils/hooks";

const PokemonContainer = styled.section`
	max-width: 100vw;
	min-height: 85vh;
	height: auto;

	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;

	padding: 0 10px;
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
	// variables pour les filtres
	const [selectedGeneration, setSelectedGeneration] = useState("Tout");
	const [filterName, setFilterName] = useState("");

	let apiUrl = "https://pokebuildapi.fr/api/v1/pokemon";

	//********** appel de l'api pour récuperer les données pokémons **********

	const { data, isLoading, error } = useFetch(apiUrl);

	const [pokemonList, setPokemonList] = useState(Object.values(data));

	useEffect(() => {
		if (data) {
			setPokemonList(Object.values(data));
		}
	}, [data]);

	//********** filtrage par génération et nom**********

	useEffect(() => {
		setPokemonList(
			Object.values(data).filter((pokemon) => {
				if (selectedGeneration !== "Tout") {
					if (filterName !== "") {
						return pokemon.name
							.toLowerCase()
							.match(filterName.toLowerCase());
					}
					return (
						pokemon.apiGeneration === parseInt(selectedGeneration)
					);
				} else if (filterName !== "") {
					return pokemon.name
						.toLowerCase()
						.match(filterName.toLowerCase());
				} else {
					return true;
				}
			}),
		);
	}, [selectedGeneration, filterName]);

	//********** filtrage par type **********

	const [filterType, setFilterType] = useState("Tout");

	const pokemonFiltrerByType = Object.values(pokemonList).filter((type) => {
		return (
			type.apiTypes[0]?.name === filterType ||
			type.apiTypes[1]?.name === filterType
		);
	});

	//---------------------------------------------

	const [closeCard, setCloseCard] = useState(); // afficher / fermer carte
	const [scrollY, setScrollY] = useState(window.scrollY); //détecter si je scroll vers le bas ou haut
	const [hiddenScroll, setHiddenScroll] = useState(false); //afficher / cacher navbar au scroll
	const [pokemonId, setPokemonId] = useState(1); // id du pokemon choisi
	const [cardPosition, setCardPosition] = useState({ pageY: 0, clientY: 0 }); // position dans le vp du pokemon choisi
	const [listToDisplay, setListToDisplay] = useState(100); // nombre de pokémon à afficher (pour l'affichage dynamique)

	const pokemonContainerRef = useRef();

	useEffect(() => {
		const handleScroll = () => {
			// ici on vérifie si on scroll vers le bas ou le haut
			// vers le bas on cache la navbar, vers le haut on l'affiche

			if (window.scrollY <= scrollY) {
				setHiddenScroll(false);
				setScrollY(window.scrollY);
			} else {
				setHiddenScroll(true);
				setScrollY(window.scrollY);
			}

			// permet de déterminer le nombre de pokémon à afficher
			// par affichage conditionnel, lorsqu'on scroll jusqu'en bas on augment le nombre de pokémon affiché
			// permet d'augmenter la performance en limitant la quantité de donnée à afficher

			if (
				window.innerHeight + document.documentElement.scrollTop - 121 >=
				pokemonContainerRef.current.offsetHeight
			) {
				setListToDisplay((prevValue) => {
					// Limiter la nouvelle valeur à 900
					const newValue = prevValue + 40;
					return newValue <= 900 ? newValue : 900;
				});
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scrollY]);

	//---------------------------------------------
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
						selectedGeneration={selectedGeneration}
						setSelectedGeneration={setSelectedGeneration}
						hiddenScroll={hiddenScroll}
					/>

					{filterType === "Tout" ? (
						<PokemonContainer ref={pokemonContainerRef}>
							<TotalResult className={hiddenScroll && "hidden"}>
								{pokemonList.length} résultats.
							</TotalResult>
							{pokemonList.map(
								(item, index) =>
									index < listToDisplay && (
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
												alt={item.name}
												loading="lazy"
											/>
										</PokemonLink>
									),
							)}
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
										alt={item.name}
										loading="lazy"
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
