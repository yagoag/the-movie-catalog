import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchResults } from '../../store/actions';
import './styles.scss';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Busque um filme por nome, ano ou gênero..."
      onChange={e => dispatch(fetchSearchResults(e.target.value))}
    />
  );
};

export default SearchBar;
