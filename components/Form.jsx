import { categories } from "../data";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { SiWhatsapp } from "react-icons/si";
import "@styles/Form.scss";
import { useState } from "react";

const Form = ({ type, work, setWork, handleSubmit }) => {
  const [whatsappAlert, setWhatsappAlert] = useState(false);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setWork((prevWork) => {
      return {
        ...prevWork,
        photos: [...prevWork.photos, ...newPhotos],
      };
    });
  };

  const handleRemovePhoto = (indexToRemove) => {
    setWork((prevWork) => {
      return {
        ...prevWork,
        photos: prevWork.photos.filter((_, index) => index !== indexToRemove),
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWork((prevWork) => {
      return {
        ...prevWork,
        [name]: value,
      };

      
    });
  };

  // Função para garantir que o input aceite apenas números
  const handleWhatsappInput = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    setWork((prevWork) => {
      return {
        ...prevWork,
        whatsapp: value,
      };
    });
  };

  // Validação para garantir que o número do WhatsApp tenha 11 dígitos
  const validateWhatsapp = () => {
    if (work.whatsapp.length !== 11) {
      setWhatsappAlert(true);
      alert("O número do WhatsApp deve conter exatamente 11 dígitos.");
    } else {
      setWhatsappAlert(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!work.category) {
      alert("Por favor, selecione uma categoria.");
      return;
    }

    if (work.photos.length === 0) {
      alert("Por favor, adicione pelo menos uma imagem.");
      return;
    }

    // Verifica se o número do WhatsApp tem exatamente 11 dígitos
    if (work.whatsapp.length !== 11) {
      alert("Por favor, insira um número de WhatsApp válido com 11 dígitos.");
      return;
    }

    handleSubmit(e);
  };

  return (
    <div className="form">
      <h1>{type} Novo Anúncio</h1>
      <form onSubmit={onSubmit}>
        <h3>Em qual categoria seu anúncio se enquadra?</h3>
        <div className="category-list">
          {categories?.map((item, index) => (
            <p
              key={index}
              className={`${work.category === item ? "selected" : ""}`}
              onClick={() => {
                setWork({ ...work, category: item });
              }}
            >
              {item}
            </p>
          ))}
        </div>

        <h3>Adicione imagens para mostrar o seu anúncio</h3>
        <div className="photos">
          {work.photos.length < 1 && (
            <>
              <input
                id="image"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleUploadPhotos}
                multiple
              />
              <label htmlFor="image" className="alone">
                <div className="icon">
                  <IoIosImages />
                </div>
                <p>Carregar do seu dispositivo</p>
              </label>
            </>
          )}

          {work.photos.length > 0 && (
            <>
              {work?.photos?.map((photo, index) => (
                <div key={index} className="photo">
                  {photo instanceof Object ? (
                    <img src={URL.createObjectURL(photo)} alt="work" />
                  ) : (
                    <img src={photo} alt="work" />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <BiTrash />
                  </button>
                </div>
              ))}
              <input
                id="image"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleUploadPhotos}
                multiple
              />
              <label htmlFor="image" className="together">
                <div className="icon">
                  <IoIosImages />
                </div>
                <p>Carregar imagem</p>
              </label>
            </>
          )}
        </div>

        <h3>O que faz o seu anúncio ser único?</h3>
        <div className="description">
          <p>Título</p>
          <input
            type="text"
            placeholder="Título"
            onChange={handleChange}
            name="title"
            value={work.title}
            required
          />
          <p>Descrição</p>
          <textarea
            type="text"
            placeholder="Descrição"
            onChange={handleChange}
            name="description"
            value={work.description}
            required
          />
          <p>Agora, informe o valor</p>
          <span>R$</span>
          <input
            type="number"
            placeholder="Preço"
            onChange={handleChange}
            name="price"
            value={work.price}
            required
            className="price"
          />
          <p>Número para contato</p>
          <span>
            <SiWhatsapp />
          </span>
          <input
            type="text"
            placeholder="Whatsapp"
            value={work.whatsapp}
            onInput={handleWhatsappInput} // Garante apenas números
            onBlur={validateWhatsapp} // Valida ao sair do campo
            required
            className="price"
          />
          {whatsappAlert && (
            <p className="error-message">O número de WhatsApp deve conter 11 dígitos.</p>
          )}
        </div>
        <button className="submit_btn" type="submit">
          ANÚNCIAR
        </button>
      </form>
    </div>
  );
};

export default Form;
