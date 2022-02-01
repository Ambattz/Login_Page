import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const formReducer = (state, action) => {
  if (action.type === 'EMAIL_CHANGE') {
    return {
      email: action.value,
      emailIsValid: action.value.includes('@'),
      password: state.password,
      passwordIsValid: state.passwordIsValid,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === 'EMAIL_BLUR') {
    return {
      email: action.value,
      emailIsValid: action.value.includes('@'),
      password: state.password,
      passwordIsValid: state.passwordIsValid,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === 'PASSWORD_CHANGE') {
    return {
      email: state.email,
      emailIsValid: state.emailIsValid,
      password: action.value,
      passwordIsValid: action.value.trim().length > 6,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === 'PASSWORD_BLUR') {
    return {
      email: state.email,
      emailIsValid: state.emailIsValid,
      password: action.value,
      passwordIsValid: action.value.trim().length > 6,
      formIsValid: state.formIsValid,
    };
  }
  if (action.type === 'FORM_VALIDITY') {
    if (state.emailIsValid === true && state.passwordIsValid === true) {
      return {
        email: state.email,
        emailIsValid: state.emailIsValid,
        password: state.password,
        passwordIsValid: state.passwordIsValid,
        formIsValid: true,
      };
    }
    else {
      return {
        email: state.email,
        emailIsValid: state.emailIsValid,
        password: state.password,
        passwordIsValid: state.passwordIsValid,
        formIsValid: false,
      };
    }
  }
  return {
    email: '',
    emailIsValid: null,
    password: '',
    passwordIsValid: null,
    formIsValid: null,
  };
};

const Login = (props) => {

  const [formState, dispatchForm] = useReducer(formReducer, {
    email: '',
    emailIsValid: null,
    password: '',
    passwordIsValid: null,
    formIsValid: null,
  });

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const validateTimer = setTimeout(() => {
      console.log('Form Validity useeffect', formState);
      dispatchForm({ type: 'FORM_VALIDITY' });
    }, 500)
    return () => {
      clearTimeout(validateTimer);
    }
  }, [formState.emailIsValid, formState.passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchForm({ type: 'EMAIL_CHANGE', value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({ type: 'PASSWORD_CHANGE', value: event.target.value });
  };

  const validateEmailHandler = (event) => {
    dispatchForm({ type: 'EMAIL_BLUR', value: event.target.value });
  };

  const validatePasswordHandler = (event) => {
    dispatchForm({ type: 'PASSWORD_BLUR', value: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formState.email, formState.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${formState.emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${formState.passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formState.formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
