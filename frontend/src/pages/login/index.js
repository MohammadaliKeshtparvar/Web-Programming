import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from 'common/Layout/Container';

import { getInfo, postAPI } from 'redux/core/actions';
import { getAPI } from 'redux/core/actions';
import { loginAction } from 'redux/user/actions';

import Translation from 'libs/Translation';
import Text from '@/components/Text';
import Util from 'libs/Util';
import ModalManager from 'libs/ModalManager';
import ModalText from '@/components/ModalText/index';

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
`

const FormItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
    margin-bottom: 15px;
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
    }
`

const NameContainer = styled.div`
    background-color: rgb(14, 186, 197);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 45px;
    color: white;
    font-size: 16px;
    padding: 10px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
`

const Button = styled.div`
    margin-top: 30px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 30px;
    background-color: rgb(255, 200, 10);
    color: black;
    border-radius: 24px;
    padding: 20px 10px;
    box-shadow: 0 4px 8px 0 rgba(255, 200, 10, 0.2), 0 6px 20px 0 rgba(255, 200, 10, 0.2);
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

const Login = ({ postAPI, loginAction }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const [emailValid, setEmailValid] = useState(0);
    const [passwordValid, setPasswordValid] = useState(0);

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
            console.log(1)
            setPasswordValid(2);
        } else {
            console.log(2)
            setPasswordValid(1);
        }
    } 

    const submitForm = () => {
        if(emailValid == 2 && passwordValid == 2) {
            loginAction(email, password).then(res => {
                console.log(res)
                ModalManager.show({
                    content: <ModalText valid={true}/>,
                    title: `${Translation.t('title.login')}`,
                    size: 'sm'
                });
            }).catch(err => {
                console.log(err)
                ModalManager.show({
                    content: <ModalText valid={false}/>,
                    title: `${Translation.t('title.login')}`,
                    size: 'sm'
                });
            })
        }
    }
    
    return(
        <Main>
            <Container>
                <TitleContainer>
                    {Translation.t('label.login.title')}
                </TitleContainer>
                <FormContainer>
                    <FormBox>
                        <FormItem success={emailValid === 2} error={emailValid === 1}>
                            <NameContainer>
                                {Translation.t('label.email')}
                            </NameContainer>
                            <input
                                className="input email"
                                type="email"
                                required={true}
                                value={email}
                                onChange={changeEmail}
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
                    <Button  onClick={submitForm}>
                        {Translation.t('label.login')}
                    </Button>
                </FormContainer>
            </Container>
        </Main>
    );
}

/* Props ========================================= */
Login.propTypes = {
};

Login.defaultProps = {
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
    loginAction
};

/* Export ===================================== */
export default connect(mapStateToProps, mapDispatchToProps)(Login);