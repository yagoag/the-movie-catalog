import React from 'react';
import './styles.scss';

interface Genres {
  id: number;
  name: string;
}

interface Props {
  title: string;
  date: string;
  rating: number;
  overview: string;
  genres: Genres[];
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
    <div className="movie-poster">
      <img src={`https://image.tmdb.org/t/p/w200${posterUrl}`} alt={title} />
    </div>
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
