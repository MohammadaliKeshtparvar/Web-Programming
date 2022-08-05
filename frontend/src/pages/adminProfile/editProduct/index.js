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
import Card from 'pages/home/ItemsList';
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
    width: 715px;
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
`

const NameContainer = styled.div`
    background-color: rgb(14, 186, 197);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 45px;
    color: white;
    font-size: 16px;
    padding: 10px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    ${p => p.address && `
        height: 90px;
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
    background-color: rgb(0, 157, 255);
    color: white;
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

const ItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 30px;
`

const createProduct = ({ user }) => {

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

    const tableList2 = [
        {'نام دسته بندی': 'دسته بندی', 'عملیات': ''}
    ]

    const tableTitle2 = [
        'نام دسته بندی',
        'عملیات'
    ]

    const tableList3 = [
        {'کدپیگیری': 'SHOP102030', 'کالا': 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'نام خریدار': 'محمد', 'آدرس ارسال شده': 'تهران'},
        {'کدپیگیری': 'SHOP102030', 'کالا': 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'نام خریدار': 'محمد', 'آدرس ارسال شده': 'تهران'},
        {'کدپیگیری': 'SHOP102030', 'کالا': 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'نام خریدار': 'محمد', 'آدرس ارسال شده': 'تهران'},
        {'کدپیگیری': 'SHOP102030', 'کالا': 'موس گیمینگ ریز', 'قیمت پرداخت شده': '10000', 'نام خریدار': 'محمد', 'آدرس ارسال شده': 'تهران'},
    ]

    const tableTitle3 = [
        'کد پیگیری',
        'کالا',
        'قیمت پرداخت شده',
        'نام خریدار',
        'آدرس ارسال شده'
    ]

    const data = [
        {id: 0, name: 'لیست کالا ها'},
        {id: 1, name: 'لیست دسته ها'},
        {id: 2, name: 'رسید ها'},
    ]

    const item = [
        {id: 0, count: 5,src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 1, count: 5,src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 2, count: 5,src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 3, count: 5,src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 4, count: 5,src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
    ]
    
    const [id, setId] = useState(0);

    const changeTab = (id) => {
        setId(id);
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
                    <div className="item-container">                        
                        <FormItem>
                            <NameContainer>
                                {Translation.t('label.productName')}
                            </NameContainer>
                            <input
                                className="input productName"
                                type="text"
                                placeholder={Translation.t('label.placeholder.productName')}/>
                        </FormItem>
                    </div>
                    <div className="item-container">                        
                        <FormItem>
                            <NameContainer>
                                {Translation.t('label.productPrice')}
                            </NameContainer>
                            <input
                                className="input productPrice"
                                type="text"
                                placeholder={Translation.t('label.placeholder.productPrice')}/>
                        </FormItem>
                    </div>
                    <div className="item-container">                        
                        <FormItem>
                            <NameContainer>
                                {Translation.t('label.productCount')}
                            </NameContainer>
                            <input
                                className="input productCount"
                                type="number"
                                placeholder={Translation.t('label.placeholder.productCount')}/>
                        </FormItem>
                    </div>
                    <div className="item-container">                        
                        <FormItem password={true}>
                            <NameContainer password={true}>
                                {Translation.t('label.productSection')}
                            </NameContainer>
                            <input
                                className="input productSection"
                                type="number"
                                placeholder={Translation.t('label.placeholder.productSection')}/>
                        </FormItem>
                    </div>
                    <FormItem address={true}>
                        <NameContainer address={true}>
                            {Translation.t('label.productImage')}
                        </NameContainer>
                        <input
                            className="input productImage"
                            type="file"
                            placeholder={Translation.t('label.placeholder.productImage')}/>
                    </FormItem>
                </FormContainer>
                <CustomLink to={"adminProfile"}>
                    <ButtonContainer>
                        <Button>
                            {Translation.t('label.editProduct.button')}
                        </Button>
                    </ButtonContainer>
                </CustomLink>
            </Container>
        </Main>
    );
}

/* Props ========================================= */
createProduct.propTypes = {
};

createProduct.defaultProps = {
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
export default connect(mapStateToProps, mapDispatchToProps)(createProduct);