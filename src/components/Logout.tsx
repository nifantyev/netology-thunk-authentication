import React from 'react';
import { useAppSelector } from '../hooks';

type LogoutProps = {
  onLogout: () => void;
};

const Logout = ({ onLogout }: LogoutProps) => {
  const profile = useAppSelector((store) => store.auth.profile);

  const logo = (
    <div className="col">
      <h2>Neto Social</h2>
    </div>
  );

  const handleLogout = () => {
    onLogout();
  };

  return (
    profile && (
      <div className="container-fluid">
        <div className="row align-items-center">
          {logo}
          <div className="col-auto">Hello, {profile.name}</div>
          <div className="col-auto">
            <img
              className="rounded-circle"
              src={profile.avatar}
              alt={profile.name}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Logout;
