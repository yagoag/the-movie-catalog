import React from 'react';
import './styles.scss';

export interface Genre {
  id: number;
  name: string;
}

export interface Props {
  id: number;
  title: string;
  date: string;
  rating: number;
  overview: string;
  genres: Genre[];
  posterUrl: string;
}

const SearchResult: React.FC<Props> = ({
  title,
  date,
  rating,
  overview,
  genres,
  posterUrl,
}) => (
  <div className="search-result">
    <img
      src={`https://image.tmdb.org/t/p/w200${posterUrl}`}
      alt={title}
      className="movie-poster"
    />
    <div className="movie-info">
      <h2 className="movie-title">{title}</h2>
      <div className="search-result-subtitle">
        <h3 className="movie-rating">{Math.floor(rating * 10)}%</h3>
        <div className="movie-date">{date}</div>
      </div>
      <div className="movie-overview">{overview}</div>
      <div className="movie-genres">
        {genres.map(genre => (
          <div key={genre.id} className="tag">
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SearchResult;
