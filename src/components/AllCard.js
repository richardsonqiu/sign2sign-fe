import React from "react";
import { Link } from "react-router-dom";

const AllCard = ({ url }) => {
  return (
    <>
      <Link to={`/${url}`}>
        <div className="card">
          <h3 className="card-title">See available {url}</h3>
        </div>
      </Link>
    </>
  );
};

export default AllCard;
