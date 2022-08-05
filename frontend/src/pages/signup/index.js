import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from 'common/Layout/Container';

import { getInfo, postAPI } from 'redux/core/actions';
import { getAPI } from 'redux/core/actions';
import Translation from 'libs/Translation';
import Util from 'libs/Util';
import Text from '@/components/Text';
import ModalManager from 'libs/ModalManager';
import ModalText from '@/components/ModalText/index';
import { completeProfile } from 'redux/user/actions';

const Main = styled.div`

`

const TitleContainer = styled.div`
    color: rgb(14, 186, 197);
    margin-top: 15%;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 16px;
`

const FormContainer = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .item-container {
        align-items: stretch;
        display: flex;
        justify-content: space-between;
    }
`

const FormItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
    ${p => p.address && `
        width: 715px;
    `}
    margin-bottom: 15px;
    margin-left: 15px;
    ${p => p.error && `
        border: 2px solid red;
    `}
    ${p => p.success && `
        border: 2px solid green;
    `}
    border-radius: 4px;
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

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .error {
        margin-top: -5px;
        margin-bottom: 10px;
        color:  red;
    }
`

const SignUp = ({ postAPI, completeProfile }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const [firstNameValid, setFirstNameValid] = useState(0);
    const [lastNameValid, setLastNameValid] = useState(0);
    const [addressValid, setAddressValid] = useState(0);
    const [emailValid, setEmailValid] = useState(0);
    const [passwordValid, setPasswordValid] = useState(0);

    const changeFirstName = (e) => {
        setFirstName(e.target.value);
        if(Util.validateUsername(e.target.value, 255)) {
            setFirstNameValid(2);
        } else {
            setFirstNameValid(1);
        }
    }

    const changeLastName = (e) => {
        setLastName(e.target.value);
        if(Util.validateUsername(e.target.value, 255)) {
            setLastNameValid(2);
        } else {
            setLastNameValid(1);
        }
    }

    const changeAddress = (e) => {
        setAddress(e.target.value);
        if(Util.validateUsername(e.target.value, 1000)) {
            setAddressValid(2);
        } else {
            setAddressValid(1);
        }
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
        if(Util.validateEmail(e.target.value)) {
            setEmailValid(2);
        } else {
            setEmailValid(1);
        }
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
        if(Util.validatePassword(e.target.value)) {
            setPasswordValid(2);
        } else {
            setPasswordValid(1);
        }
    } 

    const submitForm = () => {
        if(firstNameValid == 2 && lastNameValid == 2 && emailValid == 2 && passwordValid == 2 && addressValid == 2) {
            postAPI('signup', {firstName, lastName, username: email, password, address}).then(res => {
                console.log(res)
                completeProfile(firstName, lastName, address, password).then(res => {
                }).catch(err => {
                })
                ModalManager.show({
                    content: <ModalText valid={true}/>,
                    title: `${Translation.t('title.signup')}`,
                    size: 'sm'
                });
            }).catch(err => {
                console.log(err)
                ModalManager.show({
                    content: <ModalText valid={false}/>,
                    title: `${Translation.t('title.signup')}`,
                    size: 'sm'
                });
            })
        } else {
            ModalManager.show({
                content: <ModalText valid={false}/>,
                title: `${Translation.t('title.signup')}`,
                size: 'sm'
            });
        }
    }

    return(
        <Main>
            <Container>
                <TitleContainer>
                    {Translation.t('label.signup.title')}
                </TitleContainer>
                <FormContainer>
                    <div className="item-container">  
                        <FormBox>                      
                            <FormItem  success={firstNameValid === 2} error={firstNameValid === 1}>
                                <NameContainer>
                                    {Translation.t('label.first_name')}
                                </NameContainer>
                                <input
                                    className="input first-name"
                                    required={true}
                                    value={firstName}
                                    onChange={changeFirstName}
                                    type="text"
                                    placeholder={Translation.t('label.placeholder.first_name')}/>
                            </FormItem>
                            {
                                firstNameValid === 1 ? 
                                <Text className="error">{Translation.t('label.error.firstName')}</Text> : null
                            }
                        </FormBox>
                        <FormBox>
                            <FormItem  success={lastNameValid === 2} error={lastNameValid === 1}>
                                <NameContainer>
                                    {Translation.t('label.last_name')}
                                </NameContainer>
                                <input
                                    className="input last-name"
                                    required={true}
                                    value={lastName}
                                    onChange={changeLastName}
                                    type="text"
                                    placeholder={Translation.t('label.placeholder.last_name')}/>
                            </FormItem>
                            {
                                lastNameValid === 1 ? 
                                <Text className="error">{Translation.t('label.error.lastName')}</Text> : null
                            }
                        </FormBox>
                    </div>
                    <div className="item-container">   
                        <FormBox>                     
                            <FormItem success={emailValid === 2} error={emailValid === 1}>
                                <NameContainer>
                                    {Translation.t('label.email')}
                                </NameContainer>
                                <input
                                    className="input email"
                                    required={true}
                                    value={email}
                                    onChange={changeEmail}
                                    type="email"
                                    placeholder={Translation.t('label.placeholder.email')}/>
                            </FormItem>
                            {
                                emailValid === 1 ? 
                                <Text className="error">{Translation.t('label.error.email')}</Text> : null
                            }
                        </FormBox>
                        <FormBox>
                            <FormItem success={passwordValid === 2} error={passwordValid === 1}>
                                <NameContainer>
                                    {Translation.t('label.password')}
                                </NameContainer>
                                <input
                                    className="input password"
                                    required={true}
                                    value={password}
                                    onChange={changePassword}
                                    type="password"
                                    placeholder={Translation.t('label.placeholder.password')}/>
                            </FormItem>
                            {
                                passwordValid === 1 ? 
                                <Text className="error">{Translation.t('label.error.password')}</Text> : null
                            }
                        </FormBox>
                    </div>
                    <FormBox>
                        <FormItem address={true} success={addressValid === 2} error={addressValid === 1}>
                            <NameContainer address={true}>
                                {Translation.t('label.address')}
                            </NameContainer>
                            <input
                                className="input address"
                                required={true}
                                value={address}
                                onChange={changeAddress}
                                type="text"
                                placeholder={Translation.t('label.placeholder.address')}/>
                        </FormItem>
                        {
                            addressValid === 1 ? 
                            <Text className="error">{Translation.t('label.error.address')}</Text> : null
                        }
                    </FormBox>
                    <Button  onClick={submitForm}>
                        {Translation.t('label.signup')}
                    </Button>
                </FormContainer>
            </Container>
        </Main>
    );
}

/* Props ========================================= */
SignUp.propTypes = {
};

SignUp.defaultProps = {
};

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
    completeProfile
};

/* Export ===================================== */
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);