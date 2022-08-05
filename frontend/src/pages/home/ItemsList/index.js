import React, { useState } from 'react'
import styled from 'styled-components'

import Text from '@/components/Text'
import Translation from 'libs/Translation'
import CustomLink from '@/components/Link'

const Main = styled.div`
    height: fit-content;
    width: 33.333333%;
    padding: 0px 30px;
    margin-bottom: 15px;
    position: relative;
`

const Content = styled.div`
    margin-bottom: 10px;
    background-color: white;
    .title {
        display: block;
        font-size: 16px;
        margin-top: 15px;
    }
    .section {
        display: block;
        font-size: 16px;
        margin-top: 15px;
    }
`

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 150px;
    img {
        cursor: pointer;
        width: 100%;
        height: 100%;
    }
`

const MainContainer = styled.div`
    padding: 0px 15px;
`

const BottomContainer = styled.div`
    border-top: 1px solid #D5D3D3;
    margin-top: 30px;
    padding: 15px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Button = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 30px;
    background-color: rgb(0, 157, 255);
    color: white;
    border-radius: 24px;
    padding: 5px 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 157, 255, 0.2), 0 6px 20px 0 rgba(0, 157, 255, 0.2);
`

const Count = styled.div`
    background-color: white;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(14, 186, 197);
    box-shadow: 0 4px 8px 0 rgba(0, 157, 255, 0.2), 0 6px 20px 0 rgba(0, 157, 255, 0.2);
    z-index: 100;
    position: absolute;
    top: -15px;
    left: 15px;
`

const Card = ({ id, src, title, section, price, count, admin, buyProduct, inventory }) => {

    return(
        <Main>
            <Content>
                {
                    admin ?
                    <Count>
                        {Translation.n(count)}
                    </Count> : null
                }
                <ImageContainer>
                    <img src={src}/>
                </ImageContainer>
                <MainContainer>
                    <Text className="title">{title}</Text>
                    <Text className="section">{section}</Text>
                    <BottomContainer>
                        <Text className="price">{Translation.n(price, {comma: true})}</Text>
                        {
                            admin ?
                            <CustomLink to={"editProduct"} params={{id: id}}>
                                <Button>ویرایش محصول</Button>
                            </CustomLink> :
                            <Button onClick={ () => buyProduct(id, price, inventory) }>خرید محصول</Button> 
                        }
                    </BottomContainer>
                </MainContainer>
            </Content>
        </Main>
    );
}

export default Card;