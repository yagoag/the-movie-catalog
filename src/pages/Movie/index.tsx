import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import { api } from '../../services/api';
import { Genre } from '../../components/SearchResult';
import {
  formatDate,
  translateStatus,
  getLanguageName,
  formatCurrency,
  formatTime,
} from '../../format';
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
  const { id } = useParams();
  const [info, setInfo] = useState<ApiMovieInfo | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/movie/${id}`, {
        params: { ...api.defaults.params },
      });

      setInfo(data);
    })();
  }, [id]);

  return (
    <>
      <div className="movie-title">
        <h1>{info ? info.title : <Skeleton />}</h1>
        <div className="date">
          {info ? formatDate(info.release_date) : <Skeleton />}
        </div>
      </div>
      <div className="movie-details">
        <div className="content">
          <div className="section overview">
            <h3>Sinopse</h3>
            <div className="overview-text">
              {info ? info.overview : <Skeleton count={5} />}
            </div>
          </div>
          <div className="section general-info">
            <h3>Informações</h3>
            <div className="info-table">
              <div className="status">
                <h4>Situação</h4>
                <div>{info && translateStatus(info.status)}</div>
              </div>
              <div className="language">
                <h4>Idioma</h4>
                <div>
                  {info ? (
                    getLanguageName(info.original_language)
                  ) : (
                    <Skeleton />
                  )}
                </div>
              </div>
              <div className="runtime">
                <h4>Duração</h4>
                <div>{info ? formatTime(info.runtime) : <Skeleton />}</div>
              </div>
              <div className="budget">
                <h4>Orçamento</h4>
                <div>{info ? formatCurrency(info.budget) : <Skeleton />}</div>
              </div>
              <div className="revenue">
                <h4>Receita</h4>
                <div>{info ? formatCurrency(info.revenue) : <Skeleton />}</div>
              </div>
              <div className="profit">
                <h4>Lucro</h4>
                <div>
                  {info ? (
                    formatCurrency(info.revenue - info.budget)
                  ) : (
                    <Skeleton />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="last-details">
            <div className="movie-genres">
              {info ? (
                info.genres.map(genre => (
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
        {info ? (
          <iframe
            id="ytplayer"
            title={`${info.title} Trailer`}
            src={`https://www.youtube.com/embed?listType=search&list=${info.title}+Trailer&yt:stretch=16:9`}
            frameBorder="0"
          ></iframe>
        ) : (
          <Skeleton width="100vw" height="56vw" />
        )}
      </div>
    </>
  );
};

export default Movie;
