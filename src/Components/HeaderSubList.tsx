import React, { FC } from "react";
import { Link } from "react-router-dom";

interface IHeaderSubList {
  items: string[];
}

const HeaderSubList: FC<IHeaderSubList> = ({ items }) => {  
  
  return (
    <ul className="sub-list">
      {items && items.map((text) => (
        <li key={text} className="sub-list__item">
          <Link to="/catalog" className="sub-list__link">
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HeaderSubList;
