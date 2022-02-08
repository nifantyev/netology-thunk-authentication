import React from 'react';

type NewsItemProps = {
  src: string;
  title: string;
  content: string;
};

const NewsItem = ({ src, title, content }: NewsItemProps) => {
  return (
    <div className="card mb-4">
      <img src={src} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

export default NewsItem;
