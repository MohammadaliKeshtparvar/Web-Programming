import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from 'common/Layout/Container';

import { getInfo } from 'redux/core/actions';
import { getAPI } from 'redux/core/actions';
import Translation from 'libs/Translation';
import TabBar from '@/components/Tabbar';
import Table from '@/components/Table';
import CustomLink from '@/components/Link';

const Main = styled.div`

`

const TitleContainer = styled.div`
    margin-top: 15%;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    .name-text {
        font-size: 20px;
        color: black;
        font-weight: 700;
        margin-left: 5px;
    }
    .price {
        margin-right: 5px;
    }
`

const FormContainer = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .item-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

const FormItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 450px;
    ${p => p.address && `
        width: 715px;
    `}
    ${p => p.password && `
        width: 715px;
    `}
    margin-bottom: 15px;
    margin-left: 15px;
    .input {
        background-color: white;
        padding: 10px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        height: 45px;
        ${p => p.address && `
            height: 90px;
        `}
    }
    span {
        font-size: 16px;
        color: black;
        margin-right: 10px;
    }
`

const NameContainer = styled.div`
    background-color: rgb(14, 186, 197);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 45px;
    color: white;
    font-size: 16px;
    padding: 10px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    ${p => p.address && `
        width: 125px !important;
        height: 90px;
    `}
    ${p => p.password && `
        width: 125px !important;
    `}
`

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.div`
    margin-top: 30px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 30px;
    background-color:rgb(255, 200, 10);
    color: black;
    border-radius: 24px;
    padding: 20px 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 157, 255, 0.2), 0 6px 20px 0 rgba(0, 157, 255, 0.2);
`

const Button2 = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 20px;
    background-color:rgb(255, 200, 10);
    color: black;
    border-radius: 24px;
    padding: 20px 10px;
    font-size: 12px;
    margin-right: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 157, 255, 0.2), 0 6px 20px 0 rgba(0, 157, 255, 0.2);
`

const EditSection = ({ user }) => {

    const [balance, setBalance] = useState('');

    const tableList = [
        {کدپیگیری: 'SHOP102030', کالا: 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'آدرس ارسال شده': 'تهران'},
        {کدپیگیری: 'SHOP102030', کالا: 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'آدرس ارسال شده': 'تهران'},
        {کدپیگیری: 'SHOP102030', کالا: 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'آدرس ارسال شده': 'تهران'},
        {کدپیگیری: 'SHOP102030', کالا: 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'آدرس ارسال شده': 'تهران'},
        {کدپیگیری: 'SHOP102030', کالا: 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'آدرس ارسال شده': 'تهران'},
        {کدپیگیری: 'SHOP102030', کالا: 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'آدرس ارسال شده': 'تهران'},
        {کدپیگیری: 'SHOP102030', کالا: 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'آدرس ارسال شده': 'تهران'},
        {کدپیگیری: 'SHOP102030', کالا: 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'آدرس ارسال شده': 'تهران'},
        {کدپیگیری: 'SHOP102030', کالا: 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'آدرس ارسال شده': 'تهران'},
        {کدپیگیری: 'SHOP102030', کالا: 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'آدرس ارسال شده': 'تهران'},
        {کدپیگیری: 'SHOP102030', کالا: 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'آدرس ارسال شده': 'تهران'},
    ]

    const tableTitle = [
        'کد پیگیری',
        'کالا',
        'قیمت پرداخت شده',
        'آدرس ارسال شده'
    ]

    const data = [
        {id: 0, name: 'پروفایل'},
        {id: 1, name: 'رسید ها'},
    ]

    const [id, setId] = useState(0);

    const changeTab = (id) => {
        setId(id);
    }

    const changeBalance = (e) => {
        let str = ''
        str += e.target.value.toString()
        str = `${Translation.n(str, {comma: true})}`
        setBalance(str)
    }

    return(
        <Main>
            <Container>
                <TitleContainer>
                    <span className="name-text">
                        {"ادمین "}
                        عزیز،
                        خوش آمدید
                    </span>
                </TitleContainer>
                <FormContainer>
                    <FormItem>
                        <NameContainer>
                            {Translation.t('label.section')}
                        </NameContainer>
                        <input
                            className="input section"
                            type="text"
                            value={balance}
                            onChange={changeBalance}
                            placeholder={Translation.t('label.placeholder.section')}/>
                    </FormItem>
                </FormContainer>
                <CustomLink to={"adminProfile"}>
                    <ButtonContainer>
                        <Button>
                            {Translation.t('label.editSection.button')}
                        </Button>
                    </ButtonContainer>
                </CustomLink>
            </Container>
        </Main>
    );
}

/* Props ========================================= */
EditSection.propTypes = {
};

EditSection.defaultProps = {
};

/* Export ===================================== */
const mapStateToProps = store => ({
    user: store.user,
    core: store.core
});

// Any actions to map to the component?
const mapDispatchToProps = {
    getInfo,
    getAPI
};

/* Export ===================================== */
export default connect(mapStateToProps, mapDispatchToProps)(EditSection);