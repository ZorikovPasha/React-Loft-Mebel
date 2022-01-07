import React, { FC } from "react";

import arrBack from "../../images/icons/arrow-back.svg";

type BreadcrumbsLinkType = {
  name: string;
  href: string;
  isLink: boolean;
};

interface IBreadcrumbsProps {
  links: Array<BreadcrumbsLinkType>
}

const Breadcrumbs: FC<IBreadcrumbsProps> = ({ links }) => {

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {links && links.map((link, idx) => (
            <li 
              className="breadcrumbs__item"
              key={link.name}
              >
              {
                idx === links.length - 1
                  ? <a 
                      className="breadcrumbs__item-back" 
                      href="catalog.html"
                      >
                      <img 
                        src={arrBack} 
                        alt="back" 
                        />
                    </a>
                  : ''
              }
              {
                link.isLink 
                  ? <a 
                      className="breadcrumbs__link" 
                      href={link.href}
                      >
                      {link.name}
                    </a>
                  : <span className="breadcrumbs__link">{link.name}</span>
              }
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
