import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

//********** styled component **********

const HomeWrapper = styled.div`
	width: 100%;
	height: 100vh;
	overflow: hidden;
`;

const Button = styled.span`
	display: block;

	width: 25%;
	height: 25%;
	border-radius: 50%;

	background: #ffffff;

	box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
		rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
		rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

	:active {
		background: #ff0000;
		opacity: 0.2;
	}
`;
const PokeButton = styled.div`
	width: 20vw;
	height: 20vw;
	min-height: 150px;
	min-width: 150px;

	display: flex;
	justify-content: center;
	align-items: center;

	border: 2vh solid #161616;
	border-radius: 50%;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;

	background: #ffffff;
`;
const PokeballPart = styled.div`
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
			<PokeballPart
				style={{ borderBottom: "1vh solid #161616" }}
				ref={cardRefTop}
			></PokeballPart>

			<PokeButton ref={buttonRef}>
				<Button onClick={changeState}></Button>
			</PokeButton>

			<PokeballPart
				style={{ borderTop: "1vh solid #161616" }}
				ref={cardRefBottom}
			></PokeballPart>
		</HomeWrapper>
	);
}
