import React from "react";
import pika from "../../assets/pika.png";
import styled from "styled-components";
import colors from "../../utils/style/colors";

const ErrorWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
`;
const Title = styled.h1`
	font-size: clamp(2rem, 4vw, 4rem);
`;

const Message = styled.h2`
	font-size: clamp(1.6rem, 3vw, 3rem);
	border: 5px solid ${colors.red};
	border-radius: 10px;
	padding: 10px;
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ErrorImage = styled.img`
	width: 40%;
	min-width: 200px;
`;
export default function error() {
	return (
		<ErrorWrapper>
			<Title>Oups...</Title>
			<ErrorImage src={pika} alt="pikachu" />
			<Message>Une erreur 404 a été détecté !</Message>
		</ErrorWrapper>
	);
}
