import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(-20deg) translateX(-7px);
  }
10%{
    transform: rotate(0deg;)
}
20%{
	transform:rotate(20deg) translateX(7px);
}
30%{
    transform: rotate(0deg);
}
  100% {
    transform: rotate(0deg);
  }
`;

const StyledLoader = styled.div`
	border-radius: 50%;

	animation: ${rotate} 1s infinite ease-out;

	height: 200px;
	width: 200px;

	background: linear-gradient(80deg, #871a22 10%, #ad4e56 70%, #a71f2a 98%);

	display: flex;
	justify-content: center;
	align-items: center;

	border: 1px solid black;

	box-shadow: inset 25px 25px 49px #561116, inset -25px -25px 49px #b8232e;

	@media (max-width: 425px) {
		width: 150px;
		height: 150px;
	}
`;

const StyledButton = styled.span`
	display: block;

	height: 50px;
	width: 50px;

	border-radius: 50%;

	background: white;

	border: 10px solid black;

	position: absolute;
`;
const StyledSection = styled.span`
	position: absolute;

	display: block;

	height: 10px;
	width: 100%;

	background: black;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100vh;
`;

export default function Loader() {
	return (
		<Wrapper data-testid="loader">
			<StyledLoader>
				<StyledSection></StyledSection>
				<StyledButton></StyledButton>
			</StyledLoader>
		</Wrapper>
	);
}
