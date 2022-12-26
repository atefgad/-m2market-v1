import React from "react";
import { Link } from "react-router-dom";

const SectionHeading = ({ title, path = null }) => {
  return (
    <div className="section__heading">
      <h2 className="section__title">{title} </h2>
      {path ? (
        <Link to={path} className="section__link btn btn-secondary">
          View all <i className="ri-arrow-right-s-line"></i>
        </Link>
      ) : null}
    </div>
  );
};

export default SectionHeading;
