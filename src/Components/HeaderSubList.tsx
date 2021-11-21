import React, { FC } from "react";

interface IHeaderSubList {
  items: Array<string>;
}

const HeaderSubList: FC<IHeaderSubList> = ({ items }) => {
  return (
    <ul className="sub-list">
      {items.map((text) => (
        <li key={text} className="sub-list__item">
          <a href="catalog.html" className="sub-list__link">
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default HeaderSubList;
