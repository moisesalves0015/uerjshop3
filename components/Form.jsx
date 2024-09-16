import { categories } from "../data";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { SiWhatsapp } from "react-icons/si";
import "@styles/Form.scss";
import { useState } from "react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB em bytes

const Form = ({ type, work, setWork, handleSubmit }) => {
  const [whatsappAlert, setWhatsappAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para gerenciar o status do envio
  const [isLoading, setIsLoading] = useState(false); // Estado para gerenciar o estado do loader

  // Garantir que photos esteja sempre definido como um array
  const workPhotos = Array.isArray(work.photos) ? work.photos : [];

  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files);

    // Filtra os arquivos que são maiores do que o tamanho máximo permitido
    const validPhotos = newPhotos.filter(photo => photo.size <= MAX_FILE_SIZE);
    
    if (validPhotos.length < newPhotos.length) {
      alert("Algumas imagens foram rejeitadas devido ao tamanho excessivo.");
    }

    setWork((prevWork) => ({
      ...prevWork,
      photos: [...workPhotos, ...validPhotos],
    }));
  };

  const handleRemovePhoto = (indexToRemove) => {
    setWork((prevWork) => ({
      ...prevWork,
      photos: workPhotos.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWork((prevWork) => ({
      ...prevWork,
      [name]: value,
    }));
  };

  // Função para garantir que o input aceite apenas números
  const handleWhatsappInput = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    setWork((prevWork) => ({
      ...prevWork,
      whatsapp: value,
    }));
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

  const onSubmit = async (e) => {
    e.preventDefault();

    // Verifica se já está enviando
    if (isSubmitting) return;

    if (!work.category) {
      alert("Por favor, selecione uma categoria.");
      return;
    }

    if (workPhotos.length === 0) {
      alert("Por favor, adicione pelo menos uma imagem.");
      return;
    }

    // Verifica se o número do WhatsApp tem exatamente 11 dígitos
    if (work.whatsapp.length !== 11) {
      alert("Por favor, insira um número de WhatsApp válido com 11 dígitos.");
      return;
    }

    setIsSubmitting(true); // Define que o formulário está sendo enviado
    setIsLoading(true); // Exibe o loader

    try {
      await handleSubmit(e); // Chama a função handleSubmit que deve lidar com o envio dos dados
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsSubmitting(false); // Restaura o estado de envio
      setIsLoading(false); // Oculta o loader
    }
  };

  return (
    <div className="form">
      <h1>{type} Novo Anúncio</h1>
      <form onSubmit={onSubmit}>
        <h3>Em qual categoria seu anúncio se enquadra?</h3>
        <div className="category-list">
          {categories
            ?.filter(item => item !== "Todas")
            .map((item, index) => (
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
          {workPhotos.length < 1 && (
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

          {workPhotos.length > 0 && (
            <>
              {workPhotos.map((photo, index) => (
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
            value={work.title || ''} // Garantir que work.title não seja undefined
            required
          />
          <p>Descrição</p>
          <textarea
            type="text"
            placeholder="Descrição"
            onChange={handleChange}
            name="description"
            value={work.description || ''} // Garantir que work.description não seja undefined
            required
          />
          <p>Agora, informe o valor</p>
          <span>R$</span>
          <input
            type="number"
            placeholder="Preço"
            onChange={handleChange}
            name="price"
            value={work.price || ''} // Garantir que work.price não seja undefined
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
            value={work.whatsapp || ''} // Garantir que work.whatsapp não seja undefined
            onChange={handleWhatsappInput} // Corrigido para onChange
            onBlur={validateWhatsapp} // Valida ao sair do campo
            required
            className="price"
          />
          {whatsappAlert && (
            <p className="error-message">O número de WhatsApp deve conter 11 dígitos.</p>
          )}
        </div>
        <button
          className="submit_btn"
          type="submit"
          disabled={isSubmitting} // Desativa o botão enquanto está enviando
        >
          {isLoading ? "Enviando..." : "ANÚNCIAR"} {/* Exibe o texto do botão conforme o status */}
        </button>
      </form>
      
    </div>
  );
};

export default Form;
