import { useState, useEffect } from "react";
import "@styles/WorkList.scss";
import WorkCard from "./WorkCard";

const WorkList = ({ data }) => {
  const [itemsToShow, setItemsToShow] = useState(12); // Começa com 12 itens
  const [hasMore, setHasMore] = useState(true); // Estado para saber se há mais itens para carregar

  // Função para carregar mais 12 itens
  const loadMore = () => {
    if (itemsToShow < data.length) {
      setItemsToShow((prev) => prev + 12); // Carrega mais 12
    } else {
      setHasMore(false); // Se não há mais itens, desativa o carregamento
    }
  };

  // Monitora o scroll do usuário para saber se ele chegou ao fim da lista
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore) {
      loadMore();
    }
  };

  // useEffect para adicionar o listener de scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [itemsToShow, hasMore]); // Reexecuta quando esses valores mudam

  return (
    <div className='work-list'>
      {data
        .slice(0, itemsToShow) // Mostra apenas os primeiros `itemsToShow` itens
        .reverse()
        .map((work) => (
          <WorkCard key={work._id} work={work} />
        ))}
        <div>
        {!hasMore && <p className="no-more">Não há mais trabalhos a serem exibidos</p>} {/* Exibe uma mensagem se não houver mais itens */}
        </div>
      
    </div>
  );
};

export default WorkList;
