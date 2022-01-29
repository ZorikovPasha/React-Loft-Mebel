import React from "react";

const Pagination: React.FC = () => {
  return (
    <div className="catalog__pagination pagination">
      <ul className="pagination__list">
        <li className="pagination__item pagination__item--active">
          <a className="pagination__link" href="#">
            1
          </a>
        </li>
        <li className="pagination__item">
          <a className="pagination__link" href="#">
            2
          </a>
        </li>
        <li className="pagination__item">
          <a className="pagination__link" href="#">
            3
          </a>
        </li>
        <li className="pagination__item">
          <a className="pagination__link" href="#">
            4
          </a>
        </li>
        <li className="pagination__item">
          <a className="pagination__link" href="#">
            5
          </a>
        </li>
        <li className="pagination__item">
          <a className="pagination__link" href="#">
            6
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
