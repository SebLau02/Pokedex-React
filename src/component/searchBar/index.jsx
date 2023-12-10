import React from "react";
import styled from "styled-components";
import { useFetch } from "../../utils/hooks";
import colors from "../../utils/style/colors";

import "./index.css";

const StyledSearchBar = styled.input`
	border-radius: 1rem;
	padding: 0.5rem;
	width: 80%;
	font-size: clamp(1rem, 2vw, 1.4rem);
	max-width: 50vw;
	height: 5vmin;
`;

const StyledSearchWrapper = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

const StyledSelectWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const StyledSelect = styled.select`
	font-size: clamp(0.8rem, 1vw, 1.2rem);
	border-radius: 5px;
`;
const StyledSearchGlobalWrapper = styled.header`
	width: 100%;
	height: 15vmin;

	padding: 1vmax;

	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;

	background: linear-gradient(180deg, ${colors.darkBlue}, ${colors.beige});

	transition: transform 0.1s linear;
`;

const StyledPType = styled.p`
	font-size: clamp(0.8rem, 2vw, 1.2rem);
`;
const StyledSelectContainer = styled.div`
	padding: 1vmin;
`;

export default function SearchBar({
	filterType,
	setFilterType,
	filterName,
	setFilterName,
	selectedGeneration,
	setSelectedGeneration,
	hiddenScroll,
}) {
	const { data } = useFetch(`https://pokebuildapi.fr/api/v1/types`);

	const handleSearch = (e) => {
		e.preventDefault();
		setFilterName(e.target.value);
	};
	const generationArray = ["Tout", "1", "2", "3", "4", "5", "6", "7", "8"];

	return (
		<StyledSearchGlobalWrapper className={hiddenScroll && "hidden"}>
			<StyledSearchWrapper>
				<StyledSearchBar
					type="search"
					onChange={handleSearch}
					value={filterName}
					placeholder="Rechercher"
				/>
			</StyledSearchWrapper>

			<StyledSelectWrapper>
				<StyledSelectContainer>
					<StyledPType>Génération:</StyledPType>

					<StyledSelect
						name="Génération"
						id="pokemon-gen-select"
						onChange={(e) => setSelectedGeneration(e.target.value)}
					>
						<option value={selectedGeneration}>
							{selectedGeneration}
						</option>
						{generationArray.map((el, i) => (
							<option key={i} value={el}>
								{el}
							</option>
						))}
					</StyledSelect>
				</StyledSelectContainer>

				<StyledSelectContainer>
					<StyledPType>Type:</StyledPType>

					<StyledSelect
						name="Type"
						id="pokemon-type-select"
						onChange={(e) => setFilterType(e.target.value)}
						value={filterType}
					>
						<option value="Tout">Tout</option>

						{Object.values(data).map((cat) => (
							<option value={cat.name} key={cat.name + cat.id}>
								{cat.name}
							</option>
						))}
					</StyledSelect>
				</StyledSelectContainer>
			</StyledSelectWrapper>
		</StyledSearchGlobalWrapper>
	);
}
