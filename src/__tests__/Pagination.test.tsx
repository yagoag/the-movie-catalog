import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import Pagination, { virtualPageSize } from '../components/Pagination';
import { INITIAL_STATE } from '../store';

const mockStore = configureStore([]);

describe('Pagination', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={mockStore(INITIAL_STATE)}>
        <Pagination />
      </Provider>,
    );
    expect(wrapper).not.toBeNull();
  });

  it('does not render non-positive pages', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          totalResults: virtualPageSize * 2,
        })}
      >
        <Pagination />
      </Provider>,
    );

    expect(wrapper.text()).not.toContain('0');
    expect(wrapper.text()).not.toContain('-');
  });

  it('shows only 5 page numbers at once', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          totalResults: virtualPageSize * 6,
        })}
      >
        <Pagination />
      </Provider>,
    );

    expect(wrapper.find('.page-number')).toHaveLength(6); // Includes ...
    expect(wrapper.text()).toContain('5');
    expect(wrapper.text()).not.toContain('6');
  });

  it('displays only as many pages as necessary', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          totalResults: virtualPageSize * 1.5,
        })}
      >
        <Pagination />
      </Provider>,
    );

    expect(wrapper.find('.page-number')).toHaveLength(2);
  });

  it('displays the correct page numbers at the beginning', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          totalResults: virtualPageSize * 7,
          virtualPage: 1,
        })}
      >
        <Pagination />
      </Provider>,
    );

    expect(wrapper.text()).toContain('1');
    expect(wrapper.text()).toContain('5');
    expect(wrapper.text()).not.toContain('6');
  });

  it('displays the correct page numbers in the middle', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          totalResults: virtualPageSize * 7,
          virtualPage: 4,
        })}
      >
        <Pagination />
      </Provider>,
    );

    expect(wrapper.text()).not.toContain('1');
    expect(wrapper.text()).toContain('2');
    expect(wrapper.text()).toContain('6');
    expect(wrapper.text()).not.toContain('7');
  });

  it('displays the correct page numbers at the end', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          totalResults: virtualPageSize * 7,
          virtualPage: 6,
        })}
      >
        <Pagination />
      </Provider>,
    );

    expect(wrapper.text()).not.toContain('2');
    expect(wrapper.text()).toContain('3');
    expect(wrapper.text()).toContain('7');
  });

  it('highlights the active page', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          totalResults: virtualPageSize * 4,
          virtualPage: 3,
        })}
      >
        <Pagination />
      </Provider>,
    );

    expect(wrapper.find('.page-number.active').text()).toBe('3');
  });

  it('shows ... at the beginning', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          totalResults: virtualPageSize * 6,
          virtualPage: 4,
        })}
      >
        <Pagination />
      </Provider>,
    );

    expect(
      wrapper
        .find('.page-number')
        .at(0)
        .text(),
    ).toBe('...');
  });

  it('does not show ... at the beginning', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          totalResults: virtualPageSize * 6,
          virtualPage: 3,
        })}
      >
        <Pagination />
      </Provider>,
    );

    expect(
      wrapper
        .find('.page-number')
        .at(0)
        .text(),
    ).not.toBe('...');
  });

  it('shows ... at the end', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          totalResults: virtualPageSize * 6,
          virtualPage: 3,
        })}
      >
        <Pagination />
      </Provider>,
    );

    expect(
      wrapper
        .find('.page-number')
        .at(5)
        .text(),
    ).toBe('...');
  });

  it('does not show ... at the end', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          totalResults: virtualPageSize * 6,
          virtualPage: 5,
        })}
      >
        <Pagination />
      </Provider>,
    );

    expect(
      wrapper
        .find('.page-number')
        .at(5)
        .text(),
    ).not.toBe('...');
  });
});
