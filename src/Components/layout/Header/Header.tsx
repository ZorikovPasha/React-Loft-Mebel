import React, { FC } from "react";

import HeaderMiddle from "./HeaderMiddle";
import HeaderBottom from "./HeaderBottom";
import HeaderTop from "./HeaderTop";

import { IPageProps } from "../../../types";

interface IHeaderProps extends IPageProps {
  headerMiddleTall?: boolean;
  showHeaderTop?: boolean;
}

const Header: FC<IHeaderProps> = ({ showHeaderTop, headerMiddleTall, isMobMenuOpen, setMobMenuOpen }): React.ReactElement => {
  const items = ["Главная", "О нас", "Контакты"];

  return (
    <header className="header">
      {showHeaderTop && <HeaderTop items={items} />}
      <div className="container">
        <HeaderMiddle
          headerMiddleTall={headerMiddleTall}
          isMobMenuOpen={isMobMenuOpen}
          setMobMenuOpen={setMobMenuOpen}
          items={items}
        />
        <HeaderBottom />
      </div>
    </header>
  );
};

export default Header;
