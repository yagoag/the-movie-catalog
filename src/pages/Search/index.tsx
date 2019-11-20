import React from 'react';
import { useSelector } from 'react-redux';
import { SearchState } from '../../store/types';
import SearchBar from '../../components/SearchBar';
import SearchResult, {
  Props as SearchResultType,
} from '../../components/SearchResult';
import Pagination, {
  virtualPageSize,
  pageSize,
} from '../../components/Pagination';
import './styles.scss';

const Search: React.FC = () => {
  const searchResults = useSelector((state: SearchState) => state.results);
  const isLoading = useSelector((state: SearchState) => state.isLoading);
  const virtualPage = useSelector((state: SearchState) => state.virtualPage);

  const shownResults: SearchResultType[] = [];
  if (searchResults !== null) {
    const initialShownResult = ((virtualPage - 1) * virtualPageSize) % pageSize;
    for (
      let i = initialShownResult;
      i < initialShownResult + virtualPageSize;
      i++
    ) {
      shownResults.push(searchResults[i]);
    }
  }

  return (
    <div className="search">
      <SearchBar />
      {isLoading ? (
        <SearchResult
          id={0}
          title=""
          date=""
          rating={0}
          overview=""
          genres={[]}
          posterUrl=""
          loading
        />
      ) : searchResults ? (
        searchResults.length !== 0 ? (
          shownResults.map(result => (
            <SearchResult key={result.id} {...result} />
          ))
        ) : (
          <div className="message">Sua busca não retornou nenhum resultado</div>
        )
      ) : (
        <div className="message">Busque um filme para iniciar!</div>
      )}
      {!isLoading && searchResults && searchResults.length > 0 && (
        <Pagination />
      )}
    </div>
  );
};

export default Search;
