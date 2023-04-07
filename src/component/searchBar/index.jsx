import React from "react";
import styled from "styled-components";
import { useFetch } from "../../utils/hooks";
import colors from "../../utils/style/colors";

const StyledSearchBar = styled.input`
	border-radius: 1rem;
	padding: 0.5rem;
	width: 80%;
	max-width: 50rem;
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
	font-size: 1rem;
`;
const StyledSearchglobalWrapper = styled.header`
	width: 100%;
	background: linear-gradient(180deg, ${colors.darkBlue}, ${colors.beige});
	padding: 1rem;
`;

export default function SearchBar({
	setFilterType,
	filterName,
	setFilterName,
}) {
	const { data } = useFetch(`https://pokebuildapi.fr/api/v1/types`);

	const handleSearch = (e) => {
		e.preventDefault();
		setFilterName(e.target.value);
	};

	return (
		<StyledSearchglobalWrapper>
			<StyledSearchWrapper>
				<StyledSearchBar
					type="search"
					onChange={handleSearch}
					value={filterName}
					placeholder="Rechercher"
				/>
			</StyledSearchWrapper>

			<StyledSelectWrapper>
				<div>
					<p>Type:</p>

					<StyledSelect
						name="Type"
						id="pokemon-select"
						onChange={(e) => setFilterType(e.target.value)}
					>
						<option value="Tout">Tout</option>

						{Object.values(data).map((cat) => (
							<option value={cat.name} key={cat.name + cat.id}>
								{cat.name}
							</option>
						))}
					</StyledSelect>
				</div>
			</StyledSelectWrapper>
		</StyledSearchglobalWrapper>
	);
}
