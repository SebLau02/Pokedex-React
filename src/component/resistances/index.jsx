import React, { useState } from "react";
import styled from "styled-components";
import { useFetch } from "../../utils/hooks";
import "./index.css";
import colors from "../../utils/style/colors";

const TypeImg = styled.img`
	width: 3vw;
	min-width: 20px;
`;

const Section = styled.section`
	display: grid;
	grid-template-columns: repeat(3, 190px);
	grid-template-rows: 40px 1fr;
	width: 100%;
	border: 2px solid ${colors.red};
	margin-bottom: 3rem;
	box-shadow: 3px 3px 5px #565656;
	border-radius: 1rem;

	@media (max-width: 768px) {
		grid-template-columns: repeat(3, 90px);
	}
`;

const ResistancesList = styled.ul`
	grid-column: span 3;
	width: 100%;
	border-bottom-left-radius: 1rem;
	border-bottom-right-radius: 1rem;
	min-height: 7rem;
`;

const Onglet = styled.button`
	grid-column: span 1;
	font-size: clamp(1rem, 1.6vw, 1.6rem);
	padding: 1rem;
`;

const Resitance = styled.li`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: clamp(1rem, 1vw, 1.2rem);
	margin: 1rem 0.5rem;
`;

export default function Resistances({ pokemonData }) {
	const resistances = pokemonData.apiResistances;

	const vulnerability = [];
	const resistant = [];
	const neutre = [];

	resistances?.forEach((el) => {
		if (el.damage_relation === "vulnerable") {
			vulnerability.push(el);
		} else if (el.damage_relation === "neutral") {
			neutre.push(el);
		} else if (el.damage_relation === "resistant") {
			resistant.push(el);
		}
	});

	const { data } = useFetch(`https://pokebuildapi.fr/api/v1/types`);

	const [toggleTabs, setToggleTabs] = useState(1);

	const toggleTab = (index) => {
		setToggleTabs(index);
	};

	return (
		<div>
			<Section id="section">
				<Onglet
					onClick={() => toggleTab(1)}
					style={{ border: "none" }}
					className={toggleTabs === 1 ? "active-tab" : "tab"}
				>
					Vulnérable
				</Onglet>
				<Onglet
					onClick={() => toggleTab(2)}
					style={{
						border: "none",
					}}
					className={toggleTabs === 2 ? "active-tab" : "tab"}
				>
					Neutre
				</Onglet>
				<Onglet
					onClick={() => toggleTab(3)}
					style={{ border: "none" }}
					className={toggleTabs === 3 ? "active-tab" : "tab"}
				>
					Résistant
				</Onglet>
				<ResistancesList
					className={
						toggleTabs === 1 ? "contenu active-contenu" : "contenu"
					}
				>
					{vulnerability.map((item) => (
						<Resitance key={item.name}>
							{Object.values(data).map(
								(object) =>
									object.name === item.name && (
										<TypeImg
											src={object.image}
											alt="illustration du type"
											key={object.name.toUpperCase()}
										/>
									),
							)}
							{item.name}
						</Resitance>
					))}
				</ResistancesList>
				<ResistancesList
					className={
						toggleTabs === 2 ? "contenu active-contenu" : "contenu"
					}
				>
					{neutre.map((item) => (
						<Resitance key={item.name}>
							{Object.values(data).map(
								(object) =>
									object.name === item.name && (
										<TypeImg
											src={object.image}
											alt="illustration du type"
											key={object.name.toUpperCase()}
										/>
									),
							)}
							{item.name}
						</Resitance>
					))}
				</ResistancesList>
				<ResistancesList
					className={
						toggleTabs === 3 ? "contenu active-contenu" : "contenu"
					}
				>
					{resistant.map((item) => (
						<Resitance key={item.name}>
							{Object.values(data).map(
								(object) =>
									object.name === item.name && (
										<TypeImg
											src={object.image}
											alt="illustration du type"
											key={object.name.toUpperCase()}
										/>
									),
							)}
							{item.name}
						</Resitance>
					))}
				</ResistancesList>
			</Section>
		</div>
	);
}
