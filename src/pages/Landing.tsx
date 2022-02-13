import React from 'react';
import LoginForm from '../components/LoginForm';
import { useAppDispatch } from '../store';
import { authenticate } from '../reducers/authReducer';

const Landing = () => {
  const dispatch = useAppDispatch();

  const onLogin = async (login: string, password: string) => {
    try {
      await dispatch(authenticate({ login, password })).unwrap();
    } catch (err) {
      window.alert('Ошибка аутентификации');
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
