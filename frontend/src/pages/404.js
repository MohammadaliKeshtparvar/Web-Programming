import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Link from '@/components/Link'

const Main = styled.div`
	padding: 5vh 5vw;
	margin-top: 170px;
    height: 500px;
`

const Wrapper = styled.div`
`

const OopsMessage = styled.div`
    font-weight: 400;
    font-size: 25px;
    text-align: center;
    color: white;
	.test {
		font-weight: 400;
		font-size: 25px;
		text-align: center;
		margin: 10px 0px;
		color: black;
		line-height: 30px;
	}
	.button {
		display: inline-block;
		margin-top: 10rem;
		background: white;
		color: rgb(103, 172, 91);
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
			background-color: rgb(103, 172, 91);
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
				<OopsMessage>
					<div className="test">صفحه مورد نظر یافت نشد</div>
					<Link className="button" to="home">صفحه اصلی</Link>
				</OopsMessage>
			</Wrapper>
		</Main>
    );
}

export default ErrorPage404;