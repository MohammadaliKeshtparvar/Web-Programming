import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from '@/components/Icon';
import Text from '@/components/Text';

import Container from 'common/Layout/Container';

import { getInfo, postAPI } from 'redux/core/actions';
import { getAPI } from 'redux/core/actions';
import { loginAction } from './../../redux/user/actions';

import SectionsBox from './Sections/index';
import PriceBox from './PriceContainer/index';
import Card from './ItemsList/index';
import Pagination from '@/components/Pagination';
import ModalManager from './../../libs/ModalManager';
import Translation from 'libs/Translation';
import BuyProduct from './../../components/BuyProduct/index';

const Main = styled.div`
    position: relative;
    .header-title {
        color: white;
        font-size: 32px;
        margin-top: 150px;
    }
`

const HeaderContainer = styled.div`
    width: 100%;
    height: calc(100vh - 65px);
    position: relative;
    background-color: #E04526;
    display: flex;
    align-items: center;
    flex-direction: column;
    @keyframes trans {
        from {
            opacity: 0%;
        }
        to {
            opacity: 100%;
        }
    }
    img {
        position: absolute;
        bottom: 0;
        animation: trans 1s;
        background-image: url(${p => p.src});
        background-repeat: no-repeat;
    }
    @media (max-width: 1100px) {
        height: 80vh;
    }
    @media (max-width: 800px) {
        height: 40vh;
    }
    .search-box {
        background-color: white;
        margin-top: 50px;
        border-radius: 24px;
        padding: 20px;
        height: 50px;
        width: 50%;
        font-size: 16px;
    }
`

const HeaderButton = styled.div`
    background-color: rgb(255, 200, 10);
    color: black;
    border-radius: 24px;
    margin-top: 65px;
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    &:hover {
        box-shadow: 0 4px 8px 0 rgba(247, 243, 28, 0.2), 0 6px 20px 0 rgba(247, 243, 28, 0.19);
    }
`

const Content = styled.div`
`

const Sort = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    margin: 15px 0px;
    height: 50px;
    font-size: 16px;
    padding: 0px 10px;
`

const SortButton = styled.div`
    margin: 0px 20px;
    cursor: pointer;
    width: 120px;
    height: 30px;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${p => p.selected? `
        color: white !important;
        background-color: rgb(0, 157, 255) !important;
    ` : `
        color: black;
        background-color: white;
    `}
`

const MainContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Section = styled.div`
    flex: 1 1 25%;
`

const ItemsContainer = styled.div`
    flex: 1 1 75%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const Home = ({ response, sections, itemsByPrice, query, postAPI, getAPI }) => {

    const myRef = useRef(null)

    const item = [
        {id: 0, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 1, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 2, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 3, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 4, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 5, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 6, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 7, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 8, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 9, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 10, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 11, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 12, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 13, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 14, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 15, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
        {id: 16, src: '/images/clock.png', title: 'موس ریز گیمینگ', section: 'دسته بندی یک', price: 10000},
    ]

    const list2 = [
        {id: 1, src: '/images/clock.png'},
        {id: 2, src: '/images/clock.png'},
        {id: 3, src: '/images/clock.png'}
    ]

    const [fix , setFix] = useState(0);
    const [id, setId] = useState(1);
    const [selected, setSelected] = useState(0);
    const [sectionFilter, setSectionFilter] = useState();

    const [page, setPage] = useState(1);
    const [temp, setTemp] = useState([]);
    
    useEffect(() => {
        if(query.id) {
            myRef.current.scrollIntoView()
        }
    }, [query.id])

    useEffect(() => {
        let list = [...response];
        list = list.slice((page - 1) * 15, page * 15)
        setTemp([...list]);
    }, [])

    useEffect(() => {
        const timerId = setInterval(() => {
            if(id !== 3) {
                setId(id+1)
            } else {
                setId(1)
            }
        }, 5000);

        return () => clearInterval(timerId);
    });


    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
    }, [])

    let off;

    const handleScroll = (e) => {
        if(window.pageYOffset > 300) {
            setFix(1);
        }
        off = window.pageYOffset
    }

    const changeSort = (number) => {
        setSelected(number);
        if(number === 1) {
            setTemp([...itemsByPrice])
        } else {
            setTemp([...response])
        }
    } 

    const changePage = (n) => {
        setPage(n);
        let tempList = [...response]
        tempList = tempList.slice((n - 1) * 15, (n - 1) * 15 + 15)
        setTemp([...tempList])
        console.log(temp)
    }

    const changeSection = (id) => {
        setSectionFilter(id);
        let tempList
        if(selected === 0) {
            tempList = [...response]
        } else {
            tempList = [...itemsByPrice]
        }
        let temp = []
        tempList.map((r, i) => {
            if(r.categoryId === id) {
                temp.push(r)
            }
        })
        setTemp([...temp])
    }

    const search = (word) => {
        getAPI('search', {name: word.target.value}).then((res) => {
            console.log(res)
            setTemp([...res])
        }).catch(err => {
            console.log(err)
        })
    }

    const filterPrice = (low, high) => {
        getAPI('filterPrice', { low: low*1000, height: high*1000 }).then((res) => {
            console.log(res)
            setTemp([...res])
        }).catch(err => {
            console.log(err)
        })
    }
    
    const buyProduct = (id, price, inventory) => {
        ModalManager.show({
            content: <BuyProduct  id={id} price={price} inventory={inventory} />,
            title: `${Translation.t('label.modal.buy')}`,
            size: 'sm'
        });
    }

    return(
        <Main>
            {
                <HeaderContainer>
                    <Text className="header-title">در محصولات سایت جست و جو کنید..</Text>
                    <input
                        className="search-box"
                        onChange={search}
                        type="text"/>
                    <HeaderButton>
                        جستجو کیند
                    </HeaderButton>
                    {
                        list2.map((r, i) => r.id === id && 
                            <img
                                src={r.src}/>)
                    }
                </HeaderContainer>
            }
            <Content>
                <Container>
                    <Sort>
                        <Text>مرتب سازی بر اساس:</Text>
                        <SortButton selected={selected === 0} onClick={() => changeSort(0)}>بیشترین فروش</SortButton>
                        <SortButton selected={selected === 1} onClick={() => changeSort(1)}>قیمت</SortButton>
                    </Sort>
                    <MainContent>
                        <Section>
                            <SectionsBox changeSection={changeSection} sections={sections}/>
                            <PriceBox
                                filterPrice={filterPrice}/>
                        </Section>
                        <ItemsContainer ref={myRef}>
                            {
                                temp.map((r, i) =>
                                    <Card 
                                        key={i}
                                        id={r.id}
                                        src={r.src}
                                        price={r.price}
                                        title={r.name}
                                        buyProduct={buyProduct}
                                        inventory={r.inventory}
                                        section={r.categoryName}/>
                                )
                            }                        
                            <PaginationContainer>
                                <Pagination 
                                    pageCount={Math.ceil(response.length / 15)}
                                    changePage={changePage}/>
                            </PaginationContainer>
                        </ItemsContainer>
                    </MainContent>
                </Container>
            </Content>
        </Main>
    )
}

/* Props ========================================= */
Home.propTypes = {
    user: PropTypes.object,
    fixedTheme: PropTypes.string,
};

Home.defaultProps = {
    fixedTheme: 'transparent'
};

Home.getInitialProps = async ({ store, query }) => {
    const { dispatch } = store;
    let response = await dispatch(getAPI('getItems')); 
    let itemsByPrice = await dispatch(getAPI('getItemsByPrice'))
    let sections = await dispatch(getAPI('getSections'));
    return{ response, sections, itemsByPrice,query };
}

/* Export ===================================== */
const mapStateToProps = store => ({
    user: store.user,
    core: store.core
});

// Any actions to map to the component?
const mapDispatchToProps = {
    getInfo,
    getAPI,
    postAPI,
    loginAction
};

/* Export ===================================== */
export default connect(mapStateToProps, mapDispatchToProps)(Home);