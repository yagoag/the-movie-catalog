import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import { INITIAL_STATE } from '../store';
import Search from '../pages/Search';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import { movie } from './SearchResult.test';
import Pagination from '../components/Pagination';

const mockStore = configureStore([]);

describe('Search', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={mockStore(INITIAL_STATE)}>
        <Search />
      </Provider>,
    );

    expect(wrapper).not.toBeNull();
  });

  it('shows loading element', () => {
    const wrapper = mount(
      <Provider store={mockStore({ ...INITIAL_STATE, isLoading: true })}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper.find(Skeleton).length).toBeGreaterThan(0);
  });

  it('shows message on empty search', () => {
    const wrapper = mount(
      <Provider store={mockStore(INITIAL_STATE)}>
        <Search />
      </Provider>,
    );

    expect(wrapper.find('.message').text()).toBe(
      'Busque um filme para iniciar!',
    );
  });

  it('shows message when no results are found', () => {
    const wrapper = mount(
      <Provider store={mockStore({ ...INITIAL_STATE, results: [] })}>
        <Search />
      </Provider>,
    );

    expect(wrapper.find('.message').text()).toBe(
      'Sua busca não retornou nenhum resultado',
    );
  });

  it('renders search bar', () => {
    const wrapper = mount(
      <Provider store={mockStore(INITIAL_STATE)}>
        <Search />
      </Provider>,
    );

    expect(wrapper.find(SearchBar)).toHaveLength(1);
  });

  it('renders search results', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          results: [movie],
          totalResults: 1,
        })}
      >
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper.find(SearchResult)).toHaveLength(1);
  });

  it('renders pagination', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          results: [movie],
          totalResults: 1,
        })}
      >
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper.find(Pagination)).toHaveLength(1);
  });

  it('shows at most 5 results per page', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          results: multiplyMovies(21),
          totalResults: 21,
        })}
      >
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper.find(SearchResult)).toHaveLength(5);
  });

  it('renders the correct range of results on the first page', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          results: multiplyMovies(5),
          totalResults: 21,
        })}
      >
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      wrapper
        .find(SearchResult)
        .first()
        .prop('id'),
    ).toBe(1);
    expect(
      wrapper
        .find(SearchResult)
        .last()
        .prop('id'),
    ).toBe(5);
  });

  it('renders the correct range of results on the first virtual page', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          results: multiplyMovies(5),
          totalResults: 40,
          virtualPage: 5,
        })}
      >
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      wrapper
        .find(SearchResult)
        .first()
        .prop('id'),
    ).toBe(1);
    expect(
      wrapper
        .find(SearchResult)
        .last()
        .prop('id'),
    ).toBe(5);
  });

  it('renders the correct range of results on the last virtual page', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          results: multiplyMovies(20),
          totalResults: 20,
          virtualPage: 4,
        })}
      >
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      wrapper
        .find(SearchResult)
        .first()
        .prop('id'),
    ).toBe(16);
    expect(
      wrapper
        .find(SearchResult)
        .last()
        .prop('id'),
    ).toBe(20);
  });

  it('renders uneven number of results on last page', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          results: multiplyMovies(1),
          totalResults: 21,
          virtualPage: 5,
        })}
      >
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper.find(SearchResult).prop('id')).toBe(1);
  });
});

const multiplyMovies = (times: number) => {
  let movies = [];

  for (let i = 0; i < times; i++) {
    movies.push({ ...movie, id: i + 1 });
  }

  return movies;
};
