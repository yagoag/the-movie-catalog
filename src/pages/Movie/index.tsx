import React, { useEffect, useState } from 'react';
import { useRouteMatch, match } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import { api } from '../../services/api';
import { Genre } from '../../components/SearchResult';
import languageNames from '../../i18n/languages.pt-BR';
import statusNames from '../../i18n/status.pt-BR';
import './styles.scss';

interface ApiMovieInfo {
  title: string;
  overview: string;
  genres: Genre[];
  poster_path: string;
  release_date: string;
  vote_average: number;
  status: string;
  budget: number;
  revenue: number;
  runtime: number;
  original_language: string;
}

const Movie: React.FC = () => {
  const routeMatch: match<{ id: string }> = useRouteMatch();
  const [info, setInfo] = useState<ApiMovieInfo | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/movie/${routeMatch.params.id}`, {
        params: { ...api.defaults.params },
      });

      setInfo(data);
      console.log({ data });
    })();
  }, [routeMatch.params.id]);

  return (
    <>
      <div className="movie-title">
        <h1>{info ? info.title : <Skeleton />}</h1>
        <div className="date">{info ? info.release_date : <Skeleton />}</div>
      </div>
      <div className="movie-details">
        <div className="content">
          <div className="section">
            <h3>Sinopse</h3>
            {info ? info.overview : <Skeleton count={5} />}
          </div>
          <div className="section">
            <h3>Informações</h3>
            <div className="info-table">
              <div>
                <h4>Situação</h4>
                {info && translateStatus(info.status)}
              </div>
              <div>
                <h4>Idioma</h4>
                {info ? getLanguageName(info.original_language) : <Skeleton />}
              </div>
              <div>
                <h4>Duração</h4>
                {info ? formatTime(info.runtime) : <Skeleton />}
              </div>
              <div>
                <h4>Orçamento</h4>
                {info ? formatCurrency(info.budget) : <Skeleton />}
              </div>
              <div>
                <h4>Receita</h4>
                {info ? formatCurrency(info.revenue) : <Skeleton />}
              </div>
              <div>
                <h4>Lucro</h4>
                {info ? (
                  formatCurrency(info.revenue - info.budget)
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </div>
          <div className="last-details">
            <div className="movie-genres">
              {info ? (
                info.genres.map(genre => (
                  <div className="tag">{genre.name}</div>
                ))
              ) : (
                <div className="tag">
                  <Skeleton width="50px" />
                </div>
              )}
            </div>
            <div className="movie-rating">
              {info ? `${info.vote_average * 10}%` : <Skeleton width="50px" />}
            </div>
          </div>
        </div>
        {info ? (
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w300${info.poster_path}`}
            alt={info.title}
          />
        ) : (
          <Skeleton width="225px" height="100%" />
        )}
      </div>
      <div className="movie-trailer">
        {info && (
          <iframe
            id="ytplayer"
            title={`${info.title} Trailer`}
            src={`https://www.youtube.com/embed?listType=search&list=${info.title}&yt:stretch=16:9`}
            frameBorder="0"
          ></iframe>
        )}
      </div>
    </>
  );
};

const formatCurrency = (value: number): string =>
  '$' +
  Number(value + 0.001)
    .toLocaleString()
    .slice(0, -1);

const formatTime = (minutes: number): string => {
  let formatted: string = '';

  if (minutes / 60 > 1) {
    formatted += `${Math.floor(minutes / 60)}h `;
  }

  formatted += `${minutes % 60}min`;

  return formatted;
};

const translateStatus = (status: string): string =>
  statusNames.get(status) || status;

const getLanguageName = (code: string): string =>
  languageNames.get(code) || code;

export default Movie;
