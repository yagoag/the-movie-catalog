import React from 'react';
import { useSelector } from 'react-redux';
import { SearchState } from '../../store/types';
import SearchBar from '../../components/SearchBar';
import SearchResult from '../../components/SearchResult';
import './styles.scss';

const Search: React.FC = () => {
  const searchResults = useSelector((state: SearchState) => state.results);

  return (
    <div className="search">
      <SearchBar />
      {searchResults !== null ? (
        searchResults.length !== 0 ? (
          searchResults.map(result => <SearchResult {...result} />)
        ) : (
          <div className="no-result">
            Sua busca não retornou nenhum resultado
          </div>
        )
      ) : (
        <div className="no-result">Busque um filme para iniciar!</div>
      )}
    </div>
  );
};

export default Search;
