import React from 'react';
import './styles.scss';

interface Props {
  title: string;
  date: string;
  rating: number;
  description: string;
  tags: string[];
  posterUrl: string;
}

const SearchResult: React.FC<Props> = ({
  title,
  date,
  rating,
  description,
  tags,
  posterUrl,
}) => (
  <div className="search-result">
    <div className="movie-poster">
      <img src={posterUrl} alt={title} />
    </div>
    <div className="movie-info">
      <h2 className="movie-title">{title}</h2>
      <div className="search-result-subtitle">
        <h3 className="movie-rating">{Math.floor(rating)}%</h3>
        <div className="movie-date">{date}</div>
      </div>
      <div className="movie-description">{description}</div>
      <div className="movie-tags">
        {tags.map(name => (
          <div className="tag">{name}</div>
        ))}
      </div>
    </div>
  </div>
);

export default SearchResult;
