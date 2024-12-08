import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import data from "../../../db.json";

const SimpleCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setCategories(data.categories);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : categories.length > 0 ? (
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
              <h3 className="category-name">{category.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No categories available.</p>
      )}
    </>
  );
};

export default SimpleCategories;
