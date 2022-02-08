import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuthInfo } from '../actions/actionCreators';
import Logout from '../components/Logout';
import NewsItem from '../components/NewsItem';
import { useAppDispatch, useAppSelector } from '../hooks';

const News = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadingStatus = useAppSelector((store) => store.news.loadingStatus);
  const news = useAppSelector((store) => store.news.news);

  const onLogout = () => {
    dispatch(clearAuthInfo());
    navigate('/');
  };

  return (
    <>
      <Logout onLogout={onLogout} />
      {loadingStatus === 'pending' && (
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {loadingStatus === 'error' && (
        <div className="container">
          <div className="row">
            <div className="col">Произошла ошибка!</div>
          </div>
        </div>
      )}
      {loadingStatus === 'success' && (
        <div className="container">
          <div className="row">
            {news.map((o) => (
              <div key={o.id} className="col-4">
                <NewsItem src={o.image} title={o.title} content={o.content} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default News;
