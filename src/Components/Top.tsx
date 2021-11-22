import React, { FC } from "react";

import TopSlider from "./TopSlider";

const Top: FC = () => {

  return (
    <section className="top">
      <div className="container">
        <TopSlider></TopSlider>
      </div>
    </section>
  );
};

export default Top;