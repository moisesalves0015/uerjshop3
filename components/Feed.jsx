"use client";

import { useEffect, useState } from "react";
import { categories } from "../data";
import WorkList from "./WorkList";
import "@styles/Categories.scss";
import Loader from "./Loader";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [workList, setWorkList] = useState([]);

  const getWorkList = async (category = "Todas") => {
    setLoading(true);
    const response = await fetch(`/api/work/list/${category}`);
    const data = await response.json();
    setWorkList(data);
    setLoading(false);
  };

  useEffect(() => {
    getWorkList();
  }, [selectedCategory]);

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* Exibe as categorias como uma lista fixa */}
      <div className="categories">
        {categories?.map((item, index) => (
          <p
            onClick={() => setSelectedCategory(item)}
            className={`${item === selectedCategory ? "selected" : ""}`}
            key={index}
          >
            {item}
          </p>
        ))}
      </div>

      {/* Mostra a categoria selecionada */}
      {selectedCategory !== "Todas" && (
        <div className="selected-category">
          <h3 style={{ marginLeft: '20px', color: '#21565a' }}>{selectedCategory}</h3>
        </div>
      )}

      <WorkList data={workList} />
    </>
  );
};

export default Feed;
