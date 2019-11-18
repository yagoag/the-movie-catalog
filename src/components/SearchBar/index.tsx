import React from 'react';
import './styles.scss';

const SearchBar: React.FC = () => (
  <input
    type="text"
    className="search-bar"
    placeholder="Busque um filme por nome, ano ou gênero..."
  />
);

export default SearchBar;
