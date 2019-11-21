import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { formatDate } from '../../format';
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
  loading?: boolean;
}

const SearchResult: React.FC<Props> = ({
  id,
  title,
  date,
  rating,
  overview,
  genres,
  posterUrl,
  loading,
}) => (
  <div className="search-result">
    {!loading ? (
      <img
        src={`https://image.tmdb.org/t/p/w200${posterUrl}`}
        alt={title}
        className="movie-poster"
      />
    ) : (
      <Skeleton width="200px" height="100%" />
    )}
    <div className="movie-info">
      <Link to={`/movie/${id}`}>
        <h2 className="movie-title">
          {!loading ? title : <Skeleton width="200px" />}
        </h2>
      </Link>
      <div className="search-result-subtitle">
        <h3 className="movie-rating">
          {!loading ? `${Math.floor(rating * 10)}%` : <Skeleton width="35px" />}
        </h3>
        <div className="movie-date">
          {!loading ? formatDate(date) : <Skeleton width="100px" />}
        </div>
      </div>
      <div className="movie-overview">
        {!loading ? overview : <Skeleton count={5} />}
      </div>
      <div className="movie-genres">
        {!loading ? (
          genres.map(genre => (
            <div key={genre.id} className="tag">
              {genre.name}
            </div>
          ))
        ) : (
          <div className="tag">
            <Skeleton width="50px" />
          </div>
        )}
      </div>
    </div>
  </div>
);

export default SearchResult;
