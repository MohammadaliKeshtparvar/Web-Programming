import Text from '@/components/Text'
import React, { useState } from 'react'
import styled from 'styled-components'

import Slider from '@material-ui/core/Slider';

const Main = styled.div`
    background-color: white;
    height: fit-content;
    margin-top: 15px;
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
`

const PriceBox = ({ filterPrice }) => {

    const minDistance = 10;

    const valueText = (value) => {
        return `${value}`;
    }

    const [value2, setValue2] = React.useState([20, 37]);

    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue2([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue2([clamped - minDistance, clamped]);
            }
        } else {
            setValue2(newValue);
        }
        filterPrice(value2[0], value2[1])
    };

    return(
        <Main>
            <Header>
                تنظیم قیمت کالا
            </Header>
            <Body>
                <Slider
                    getAriaLabel={() => 'Minimum distance shift'}
                    value={value2}
                    onChange={handleChange2}
                    valueLabelDisplay="auto"
                    getAriaValueText={valueText}
                    disableSwap
                    />
            </Body>
        </Main>
    );
}

export default PriceBox;