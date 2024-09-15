"use client"; // Adicione esta linha

import { categories } from "../data";
import WorkList from "./WorkList";
import { useEffect, useState } from "react";
import "@styles/Categories.scss";
import Loader from "./Loader";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [workList, setWorkList] = useState([]);
  const [categoriesOpen, setCategoriesOpen] = useState(false); // Estado para controlar se as categorias estão abertas

  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const getWorkList = async () => {
    const response = await fetch(`/api/work/list/${selectedCategory}`);
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
      {/* Botão para abrir/fechar as categorias */}
      <button className="toggle-categories" onClick={toggleCategories}>
        {categoriesOpen ? "Fechar Categorias" : " Categorias"}
      </button>

      {/* Div das categorias */}
      <div className={`categories ${categoriesOpen ? 'open' : 'closed'}`}>
        {categories?.map((item, index) => (
          <p
          
          onClick={() => {
            setSelectedCategory(item);
            toggleCategories();
          }}
            className={`${item === selectedCategory ? "selected" : ""}`}
            key={index}
          >
            {item}
          </p>
        ))}
      </div>

      {/* Mostra apenas a categoria selecionada quando as categorias estão fechadas */}
      {!categoriesOpen && selectedCategory !== "Todas" && (
        <div className="selected-category">
          <h3 style={{ marginLeft: '20px', color: '#21565a' }}>{selectedCategory}</h3>
        </div>
      )}


      <WorkList data={workList} />
    </>
  );
};

export default Feed;


