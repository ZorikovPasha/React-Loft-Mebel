import React from "react";

interface IEmpty {
  text: string,
}

const Empty: React.FC<IEmpty> = ({ text }) => {
  return (
    <div className="favorites__empty">
      <p className="favorites__empty-text">{text}</p>
    </div>
  );
};

export default Empty;
