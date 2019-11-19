import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchState } from '../../store/types';
import { setVirtualPage, fetchSearchResultPage } from '../../store/actions';
import './styles.scss';

export const pageSize = 20;
export const virtualPageSize = 5;

const Pagination: React.FC = () => {
  const totalPages = useSelector((state: SearchState) => state.totalPages);
  const page = useSelector((state: SearchState) => state.currentPage);
  const virtualPage = useSelector((state: SearchState) => state.virtualPage);
  const dispatch = useDispatch();

  const calculatedPage =
    Math.floor(((virtualPage - 1) * virtualPageSize) / pageSize) + 1;
  if (calculatedPage !== page) {
    dispatch(fetchSearchResultPage(calculatedPage));
  }

  const totalVirtualPages =
    totalPages * (pageSize / (virtualPageSize || pageSize));
  const renderedPages = calculateRenderedPages(virtualPage, totalVirtualPages);

  return (
    <div className="pagination">
      {renderedPages[0] > 1 && <div className="page-number">...</div>}
      {renderedPages.map(number => (
        <div
          key={number}
          className={`page-number${number === virtualPage ? ' active' : ''}`}
          onClick={() => {
            number !== virtualPage && dispatch(setVirtualPage(number));
          }}
        >
          {number}
        </div>
      ))}
      {renderedPages[4] < totalVirtualPages && (
        <div className="page-number">...</div>
      )}
    </div>
  );
};

const calculateRenderedPages = (page: number, totalPages: number) => {
  let renderedPages: number[] = [];

  if (page < 3) {
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      renderedPages.push(i);
    }
  } else if (page < totalPages - 2) {
    for (let i = page - 2; i <= page + 2; i++) {
      renderedPages.push(i);
    }
  } else {
    for (let i = totalPages - 4; i <= totalPages; i++) {
      renderedPages.push(i);
    }
  }

  return renderedPages;
};

export default Pagination;
