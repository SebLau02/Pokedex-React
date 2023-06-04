import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

//********** styled component **********

const HomeWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
`;

const Button = styled.span`
	display: block;
	width: 50%;
	height: 50%;
	border-radius: 50%;
	background: #ffffff;
	box-shadow: 5px 5px 21px #262626, -5px -5px 21px #0a0a0a;

	:active {
		box-shadow: 5px 5px 21px #cccccc, -5px -5px 21px #757575;
		background: #ff0000;
		opacity: 0.2;
	}
`;
const PokeButton = styled.div`
	background: #ffffff;
	width: 200px;
	height: 200px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2rem solid black;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;

	@media (max-width: 425px) {
		width: 150px;
		height: 150px;
		border: 15px solid black;
	}
`;
const StyledSpanBackground = styled.span`
	display: block;
	height: 50%;
	width: 100%;
	background: linear-gradient(80deg, #871a22 10%, #ad4e56 70%, #a71f2a 98%);
`;

//********** composant accueil **********

export default function Home() {
	const [toggle, setToogle] = useState(false);

	const changeState = () => {
		setToogle(!toggle);
	};

	const navigate = useNavigate();

	//********** useref pour gsap **********

	const cardRefTop = useRef(null);
	const cardRefBottom = useRef(null);
	const buttonRef = useRef(null);

	useEffect(() => {
		gsap.from(cardRefTop.current, {
			opacity: 0,
			duration: 1,
		});
		gsap.from(cardRefBottom.current, {
			opacity: 0,
			duration: 1,
		});
		gsap.from(buttonRef.current, {
			scale: 0.2,
			duration: 1,
		});
	}, []);

	useEffect(() => {
		toggle &&
			gsap.to(cardRefTop.current, {
				y: "-100%",
				duration: 1,
			});
		toggle &&
			gsap.to(cardRefBottom.current, {
				y: "100%",
				duration: 1,
			});
		toggle &&
			gsap.to(buttonRef.current, {
				opacity: 0,
				duration: 2,
			});
		toggle && setTimeout(() => navigate("/pokemon"), "1500");
	}, [toggle, navigate]);

	return (
		<HomeWrapper>
			<StyledSpanBackground
				style={{ borderBottom: "2rem solid black" }}
				ref={cardRefTop}
			></StyledSpanBackground>

			<PokeButton ref={buttonRef}>
				<Button onClick={changeState}></Button>
			</PokeButton>

			<StyledSpanBackground
				style={{ borderTop: "2rem solid black" }}
				ref={cardRefBottom}
			></StyledSpanBackground>
		</HomeWrapper>
	);
}
