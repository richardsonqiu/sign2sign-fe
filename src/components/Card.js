import React from "react";
import { Link } from "react-router-dom";

const Card = ({ progress, url, title, img, desc, isHome }) => {
  return (
    <>
      {/* <Link to={`/${material}/${id}`}> */}
      <Link to={`/${url}`}>
        <div className="card">
          <h3 className="card-title">{title}</h3>
          <img src={img} />
          <div className="card-footer">
            {isHome ? (
              <p>
                <strong>{`Lesson ${progress}`}</strong>
              </p>
            ) : (
              ``
            )}
            <p>{desc}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
