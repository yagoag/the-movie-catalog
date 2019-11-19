import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchState } from '../../store/types';
import { setVirtualPage } from '../../store/actions';
import './styles.scss';

export const pageSize = 20;
export const virtualPageSize = 5;

const Pagination: React.FC = () => {
  const totalPages = useSelector((state: SearchState) => state.totalPages);
  const page = useSelector((state: SearchState) => state.currentPage);
  const virtualPage = useSelector((state: SearchState) => state.virtualPage);
  const dispatch = useDispatch();

  const totalVirtualPages =
    totalPages * (pageSize / (virtualPageSize || pageSize));

  let renderedPages: number[] = [];

  if (virtualPage < 3) {
    for (let i = 1; i <= Math.min(5, totalVirtualPages); i++) {
      renderedPages.push(i);
    }
  } else if (virtualPage < totalVirtualPages - 2) {
    for (let i = virtualPage - 2; i <= virtualPage + 2; i++) {
      renderedPages.push(i);
    }
  } else {
    for (let i = totalVirtualPages - 4; i <= totalVirtualPages; i++) {
      renderedPages.push(i);
    }
  }

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

export default Pagination;
