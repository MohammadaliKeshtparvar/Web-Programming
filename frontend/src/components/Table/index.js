import Translation from 'libs/Translation'
import React from 'react'
import styled from 'styled-components'
import Icon from '../Icon'
import CustomLink from '../Link'
import Text from '../Text'

const Main = styled.div`
    background-color: white;
    border-radius: 4px;
    padding: 0px 15px;
    margin-top: 30px;
    height: fit-content;
    max-height: 400px;
    overflow: auto;
`

const Row = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #D5D3D3;
`

const Item = styled.div`
    flex: ${p => p.flexCount} 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    ${p => p.header ? `
        color: #C5C5C5;
    ` : `
        color: black;
    `}
    font-size: 14px;
`

const EditContainer = styled.div`
    flex: ${p => p.flexCount} 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .delete-section {
        margin-right: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .text {
        cursor: pointer;
        color: black;
        font-size: 14px;
        &:hover {
            color: rgb(14, 186, 197);
        }
    }
    .text2 {
        cursor: pointer;
        color: black;
        font-size: 14px;
        &:hover {
            color: red;
        }
    }
    .icon {
        color: red;
    }
`

const Table = ({ tableTitle, tableList, priceIndex, edit }) => {

    return(
        <Main>
            <Row>
                {
                    tableTitle.map((r, i) =>
                        <Item header={true}>{r}</Item>
                    )
                }
            </Row>
            {
                tableList.map((r, i) =>
                    <Row>
                        {
                            Object.keys(r).map(function(key, index) {
                                if(edit) {
                                    if(index === 1) {
                                        return(
                                            <EditContainer>
                                                <CustomLink to={"editSection"} params={{id: r.id}}>
                                                    <Text className="text">???????????? ???????? ????????</Text>
                                                </CustomLink>
                                                <div className="delete-section">
                                                    <Icon
                                                        className="icon"
                                                        width="20px"
                                                        height="20px"
                                                        name="x"/>
                                                    <Text className="text2">?????? ???????? ????????</Text>
                                                </div>
                                            </EditContainer>
                                        )
                                    } else {
                                        return (
                                            <Item>{r[key]}</Item>
                                        )
                                    }
                                } else {
                                    if(index === priceIndex) {
                                        return (
                                            <Item>{Translation.n(r[key], {comma: true})} ??????????</Item>
                                        )
                                    } else {
                                        return (
                                            <Item>{r[key]}</Item>
                                        )
                                    }
                                }
                            })
                        }
                    </Row>
                )
            }
        </Main>
    );
}

export default Table;