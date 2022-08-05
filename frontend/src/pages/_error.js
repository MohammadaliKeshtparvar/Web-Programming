import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Link from '@/components/Link'
import Translation from 'libs/Translation';
import Text from '@/components/Text';
import Button from '@/components/Button/index';

const Main = styled.div`
	background: #2ecc71;
	height: 100%;
    width: 100%;
	padding: 5vh 5vw;
`

const Wrapper = styled.div`
    height: 90vh;
    width: 90vw;
    background: #2ecc71;
    box-shadow: 0 2rem 3rem #1b8748;
    font-size: 10px;
    line-height: 30px;
	position: relative;
`

const CircleLayer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 10px;
    line-height: 30px;
	.circle {
		border: 30vw solid white;
		width: 300vw;
		height: 300vw;
		position: absolute;
		top: 50%;
		left: 50%;
		:nth-child(1) {
			border: 30vw solid white;
		}
		:nth-child(2) {
			animation-delay: 100ms;
			border: 25vw solid #1b8748;
		}
		:nth-child(3) {
			animation-delay: 150ms;
			border: 30vw solid white;
		}
		:nth-child(4) {
			animation-delay: 200ms;
			border: 25vw solid #1b8748;
		}
		@keyframes circle-animation {
			0% {
				-webkit-transform: translateX(-50%) translateY(-50%) scale(0);
				transform: translateX(-50%) translateY(-50%) scale(0);
			}
			10% {
				-webkit-transform: translateX(-50%) translateY(-50%) scale(1);
    			transform: translateX(-50%) translateY(-50%) scale(1);
			}
			100% {
				-webkit-transform: translateX(-50%) translateY(-50%) scale(1);
    			transform: translateX(-50%) translateY(-50%) scale(1);
			}
		}
		-webkit-transform: translateX(-50%) translateY(-50%);
		transform: translateX(-50%) translateY(-50%);
		border-radius: 50%;
		-webkit-animation: circle-animation 10s linear infinite;
		animation: circle-animation 10s linear infinite;
		will-change: transform;

	}
` 

const NumbersLayer = styled.div`
	width: 100%;
    height: 100%;
    position: relative;
    top: 10%;
    left: 0%;
    line-height: 30px;
	.number {
		:nth-child(1) {
			top: 5%;
			left: 5%;
		}
		:nth-child(2) {
			top: 15%;
			left: 55%;
		}
		:nth-child(3) {
			top: 25%;
			left: 15%;
		}
		:nth-child(4) {
			top: 75%;
			left: 20%;
		}
		:nth-child(5) {
			top: 25%;
			left: 75%;
		}
		:nth-child(6) {
			top: 65%;
			left: 45%;
		}
		:nth-child(7) {
			top: 45%;
			left: 85%;
		}
		:nth-child(8) {
			top: 10%;
			left: 85%;
		}
		:nth-child(9) {
			top: 40%;
			left: 35%;
		}
		:nth-child(10) {
			top: 70%;
			left: 65%;
		}
		:nth-child(11) {
			top: 10%;
			left: 30%;
		}
		:nth-child(12) {
			top: 45%;
			left: 10%;
		}
		-webkit-animation-delay: 0;
		animation-delay: 0;
		opacity: 0;
		position: absolute;
		font-weight: 300;
		font-size: 15rem;
		color: white;
		@keyframes number-animation {
			0% {
				-webkit-transform: scale(0);
				transform: scale(0);
				opacity: 0;
			}
			30% {
				-webkit-transform: scale(0);
				transform: scale(0);
				opacity: 0;
			}
			32% {
				-webkit-transform: scale(0.95);
				transform: scale(0.95);
				opacity: 1;
			}
			35% {
				-webkit-transform: scale(1);
				transform: scale(1);
				opacity: 1;
			}
			37% {
				-webkit-transform: scale(1);
				transform: scale(1);
				opacity: 1;
			}
			0% {
				-webkit-transform: scale(0);
				transform: scale(0);
				opacity: 0;
			}
			40% {
				-webkit-transform: scale(0);
				transform: scale(0);
				opacity: 0;
			}
			50% {
				-webkit-transform: scale(0);
				transform: scale(0);
				opacity: 0;
			}
			52% {
				-webkit-transform: scale(.45);
				transform: scale(.45);
				opacity: 1;
			}
			55% {
				-webkit-transform: scale(0.5);
				transform: scale(0.5);
				opacity: 1;
			}
			57% {
				-webkit-transform: scale(0.5);
				transform: scale(0.5);
				opacity: 1;
			}
			60% {
				-webkit-transform: scale(0);
				transform: scale(0);
				opacity: 0;
			}
			70% {
				-webkit-transform: scale(0);
				transform: scale(0);
				opacity: 0;
			}
			72% {
				-webkit-transform: scale(0.75);
				transform: scale(0.75);
				opacity: 1;
			}
			75% {
				-webkit-transform: scale(0.8);
				transform: scale(0.8);
				opacity: 1;
			}
			77% {
				-webkit-transform: scale(0.8);
				transform: scale(0.8);
				opacity: 1;
			}
			80% {
				-webkit-transform: scale(0);
				transform: scale(0);
				opacity: 0;
			}
			100% {
				-webkit-transform: scale(0);
				transform: scale(0);
				opacity: 0;
			}
		}
		-webkit-transform: scale(0);
		transform: scale(0);
		-webkit-animation: number-animation 10s linear infinite;
		animation: number-animation 10s linear infinite;
		will-change: transform, opacity;
		line-height: 30px;
	}
	.with-shadow {
		text-shadow: 1rem 1rem #1b8748;
	}
`

const OopsMessage = styled.div`
	width: 20rem;
    position: absolute;
    left: 50%;
    bottom: 2rem;
    margin-left: -10rem;
    font-weight: 400;
    font-size: 25px;
    text-align: center;
    color: white;
	.errorText {
		margin-bottom: 30px;
	}
	.test {
		font-weight: 400;
		font-size: 25px;
		text-align: center;
		color: white;
		margin: 10px 0px;
		line-height: 30px;
	}
	.button {
		display: inline-block;
		margin-top: .5rem;
		background: white;
		color: #2ecc71;
		padding: .5em 2.5em;
		line-height: 2rem;
		text-decoration: none;
		border-radius: 1em;
		-webkit-transition: all 120ms ease-in;
		transition: all 120ms ease-in;
		cursor: pointer;
		font-weight: 400;
		text-align: center;
		&:hover {
			background-color: #1b8748;
			color: white;
		}
	}
`    

const ErrorPage404 = () => {

	const router = useRouter()
	const path = router.asPath;
	console.log(path)
	console.log(router.route)

    return(
		<Main>
			<Wrapper>
				<CircleLayer>
					<div className="circle -white"></div>
					<div className="circle -red"></div>
					<div className="circle -white"></div>
					<div className="circle -red"></div>
				</CircleLayer>

				<NumbersLayer>
					<div className="number">5</div>
					<div className="number">5</div>
					<div className="number">5</div>
					<div className="number">5</div>
					<div className="number">5</div>
					<div className="number">5</div>
					<div className="number">5</div>
					<div className="number">5</div>
					<div className="number with-shadow">0</div>
					<div className="number with-shadow">0</div>
					<div className="number with-shadow">0</div>
					<div className="number with-shadow">0</div>
				</NumbersLayer>

				<OopsMessage>
					<div className="errorText">
						<Text color="lll" weight="l" size="lll">
							{Translation.t('error.500')}
						</Text>
					</div>
					<div>
						<Link to="home">
							<Button fullWidth={false} color="dark">
								<Text weight="m">
									{Translation.t('label.go_home')}
								</Text>
							</Button>
						</Link>
					</div>
				</OopsMessage>
			</Wrapper>
		</Main>
    );
}

export default ErrorPage404;