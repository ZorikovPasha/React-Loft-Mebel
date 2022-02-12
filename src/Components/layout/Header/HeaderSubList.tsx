import React from "react";
import { Link } from "react-router-dom";

import { ListsType } from "../../../types";

interface IHeaderSubList {
  items: ListsType;
  parentDir: string;
}

const HeaderSubList: React.FC<IHeaderSubList> = ({ items, parentDir }) => {  
  
  return (
    <ul className="sub-list">
      {items && items.map((item) => (
        <li key={item.link} className="sub-list__item">
          <Link 
            to={`${parentDir}/${item.link}`} 
            className="sub-list__link"
            >
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HeaderSubList;
