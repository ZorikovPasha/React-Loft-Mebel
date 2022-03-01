import React from "react";
import { Link } from "react-router-dom";

import { ListsType } from "../../../types";

interface IHeaderSubList {
  items: ListsType;
  parentDir: string;
  rootElClass?: string;
}

const HeaderSubList: React.FC<IHeaderSubList> = ({ items, parentDir, rootElClass }) => {  
  
  return (
    <ul className={`sub-list ${rootElClass}`}>
      {items && items.map(item => (
        <li key={item.link} className="sub-list__item">
          <Link 
            to={`${parentDir}`} 
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
