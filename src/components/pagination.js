import React from "react";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li style={{ cursor: "pointer" }} className={page === currentPage ? "page-item active" : "page-item"} key={page}>
            <div className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
