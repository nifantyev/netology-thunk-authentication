import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login as authenticate } from '../api';
import { setAuthError } from '../actions/actionCreators';

const Landing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    token,
    profile,
    error: authError,
  } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (token && profile) {
      navigate('/news');
    }
  }, [token, profile, navigate]);

  useEffect(() => {
    if (authError) {
      window.alert(authError);
      dispatch(setAuthError(null));
    }
  }, [authError, dispatch]);

  const onLogin = async (login: string, password: string) => {
    await dispatch(authenticate(login, password));
  };

  return (
    <>
      <LoginForm onLogin={onLogin} />
      <div className="container landing">
        <div className="row">
          <div className="col">
            <h1>Neto Social</h1>
            <p>Facebook and VK killer.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
