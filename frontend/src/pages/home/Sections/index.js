import Text from '@/components/Text'
import React, { useState } from 'react'
import styled from 'styled-components'

const Main = styled.div`
    background-color: white;
    height: fit-content;
`

const Header = styled.div`
    display: flex;
    padding: 15px 10px;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #D5D3D3;
`

const Body = styled.div`
    padding: 10px 10px;
    height: 135px;
    overflow: auto;
`

const Item = styled.div`
    .sectionText {
        font-size: 16px;
        margin-right: 20px;
    }
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0px;
`

const Circle = styled.div`
    cursor: pointer;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    border: 1px solid #D5D3D3;
    ${p => p.selected && `
        border: 1px solid rgb(0, 157, 255);
        background-color: rgb(0, 157, 255);
    `}
`

const SectionsBox = ({ sections, changeSection }) => {

    const List = [
        {id: 0, name: 'دسته بندی یک'},
        {id: 1, name: 'دسته بندی دو'},
        {id: 2, name: 'دسته بندی سه'},
        {id: 3, name: 'دسته بندی چهار'},
    ]

    const [select, setSelect] = useState(0);

    const changeSelect = (id) => {
        changeSection(id)
        setSelect(id);
    }   

    return(
        <Main>
            <Header>
                دسته بندی ها
            </Header>
            <Body>
                {
                    sections.map((r, i) =>
                        <React.Fragment key={r.id}>
                            <Item>
                                <Circle selected={select === r.id} onClick={() => changeSelect(r.id)}></Circle>
                                <Text className="sectionText">{r.categoryName}</Text>
                            </Item>
                        </React.Fragment>
                    )
                }
            </Body>
        </Main>
    );
}

export default SectionsBox;