import React, { useEffect } from 'react';
import { clearAuthInfo } from '../reducers/authReducer';
import { getNews } from '../reducers/newsReducer';
import Logout from '../components/Logout';
import NewsItem from '../components/NewsItem';
import { useAppDispatch, useAppSelector } from '../hooks';

const News = () => {
  const dispatch = useAppDispatch();

  const loadingStatus = useAppSelector((store) => store.news.loadingStatus);
  const news = useAppSelector((store) => store.news.news);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(clearAuthInfo());
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
      {news && news.length > 0 && (
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
