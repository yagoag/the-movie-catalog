import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SearchResult from '../components/SearchResult';
import { formatDate } from '../format';

const movie = {
  id: 1,
  title: 'The Fast and the Furious: Tokyo Drift',
  rating: 6.2,
  date: '2006-06-03',
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
  posterUrl: '/f9V0iTSYwnxW6tPIjSE7jrGC7eP.jpg',
};

describe('SearchResult', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchResult {...movie} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).not.toBeNull();
  });

  it('renders the movie poster', () => {
    expect(wrapper.find('.movie-poster').prop('src')).toContain(
      movie.posterUrl,
    );
  });

  it('shows movie title', () => {
    expect(wrapper.find('.movie-title').text()).toBe(movie.title);
  });

  it('shows movie rating', () => {
    expect(wrapper.find('.movie-rating').text()).toBe(movie.rating * 10 + '%');
  });

  it('shows movie release date', () => {
    expect(wrapper.find('.movie-date').text()).toBe(formatDate(movie.date));
  });

  it('shows movie overview', () => {
    expect(wrapper.find('.movie-overview').text()).toBe(movie.overview);
  });

  it('shows movie genre', () => {
    expect(
      wrapper
        .find('.movie-genres')
        .children()
        .at(0)
        .text(),
    ).toBe(movie.genres[0].name);
  });

  it('shows multiple movie genres', () => {
    expect(wrapper.find('.movie-genres').children()).toHaveLength(
      movie.genres.length,
    );
  });
});
