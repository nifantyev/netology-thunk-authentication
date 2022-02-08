import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login as authenticate } from '../api';

const Landing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error: authError } = useAppSelector((store) => store.auth);

  const onLogin = async (login: string, password: string) => {
    await dispatch(authenticate(login, password));
    if (!authError) {
      navigate('/news');
    } else {
      window.alert(authError);
    }
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
