import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import MockAdapter from 'axios-mock-adapter';
import { api } from '../services/api';
import Movie from '../pages/Movie';
import { act } from 'react-dom/test-utils';
import {
  formatDate,
  translateStatus,
  getLanguageName,
  formatTime,
  formatCurrency,
} from '../format';

const mock = new MockAdapter(api);

const movie = {
  id: 1,
  title: 'The Fast and the Furious: Tokyo Drift',
  vote_average: 6.2,
  release_date: '2006-06-03',
  overview:
    'In order to avoid a jail sentence, Sean Boswell heads to Tokyo to live with his military father. In a low-rent section of the city, Shaun gets caught up in the underground world of drift racing',
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 53,
      name: 'Thriller',
    },
  ],
  poster_path: '/f9V0iTSYwnxW6tPIjSE7jrGC7eP.jpg',
  status: 'Released',
  budget: 85000000,
  revenue: 158468292,
  runtime: 104,
  original_language: 'en',
};

mock.onGet('/movie/1').reply(200, movie);
mock.onGet('/movie/2').reply(200, null);

describe('Movie', () => {
  let wrapper: ReactWrapper;

  beforeAll(async done => {
    wrapper = mount(
      <MemoryRouter initialEntries={['movie/1']}>
        <Route path="movie/:id">
          <Movie />
        </Route>
      </MemoryRouter>,
    );

    await waitForUseEffect(wrapper, done);
  });

  it('renders without crashing', () => {
    expect(wrapper).not.toBeNull();
  });

  it('renders skeleton during loading', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['movie/2']}>
        <Route path="movie/:id">
          <Movie />
        </Route>
      </MemoryRouter>,
    );

    expect(wrapper.find(Skeleton)).toHaveLength(12);
  });

  it('does not render skeleton after loading', () => {
    expect(wrapper.find(Skeleton)).toHaveLength(0);
  });

  it('shows title', () => {
    expect(wrapper.find('.movie-title h1').text()).toBe(movie.title);
  });

  it('shows release date', () => {
    expect(wrapper.find('.movie-title .date').text()).toBe(
      formatDate(movie.release_date),
    );
  });

  it('shows overview', () => {
    expect(wrapper.find('.overview h3').text()).toBe('Sinopse');
    expect(wrapper.find('.overview .overview-text').text()).toBe(
      movie.overview,
    );
  });

  it('shows info section', () => {
    expect(wrapper.find('.general-info h3').text()).toBe('Informações');
  });

  it('shows translated status', () => {
    expect(wrapper.find('.info-table .status div').text()).toBe(
      translateStatus(movie.status),
    );
  });

  it('shows translated language', () => {
    expect(wrapper.find('.info-table .language div').text()).toBe(
      getLanguageName(movie.original_language),
    );
  });

  it('shows formatted runtime', () => {
    expect(wrapper.find('.info-table .runtime div').text()).toBe(
      formatTime(movie.runtime),
    );
  });

  it('shows formatted budget', () => {
    expect(wrapper.find('.info-table .budget div').text()).toBe(
      formatCurrency(movie.budget),
    );
  });

  it('shows formatted revenue', () => {
    expect(wrapper.find('.info-table .revenue div').text()).toBe(
      formatCurrency(movie.revenue),
    );
  });

  it('shows correct profit', () => {
    expect(wrapper.find('.info-table .profit div').text()).toBe(
      formatCurrency(movie.revenue - movie.budget),
    );
  });

  it('shows genre tags', () => {
    expect(wrapper.find('.movie-genres .tag')).toHaveLength(
      movie.genres.length,
    );
    expect(wrapper.find('.movie-genres').text()).toBe(
      movie.genres.map(genre => genre.name).join(''),
    );
  });

  it('shows correct rating', () => {
    expect(wrapper.find('.movie-rating').text()).toBe(
      movie.vote_average * 10 + '%',
    );
  });

  it('shows poster', () => {
    expect(wrapper.find('.poster').prop('src')).toContain(movie.poster_path);
  });

  it('shows trailer', () => {
    expect(wrapper.find('#ytplayer').prop('src')).toContain(
      movie.title + '+Trailer',
    );
  });
});

// Thanks to https://stackoverflow.com/a/55389616/3889512
const waitForUseEffect = async (wrapper: ReactWrapper, done: Function) => {
  await act(
    () =>
      new Promise<void>(() => {
        setImmediate(() => {
          wrapper.update();
          done();
        });
      }),
  );
};
