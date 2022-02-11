import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { authenticate } from '../api';
import { setAuthError } from '../reducers/authReducer';

const Landing = () => {
  const dispatch = useAppDispatch();
  const { error: authError } = useAppSelector((store) => store.auth);

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
