import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import "@styles/WorkCard.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

const WorkCard = ({ work }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderRef = useRef(null);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % work.workPhotoPaths.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + work.workPhotoPaths.length) %
        work.workPhotoPaths.length
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDiff = touchEndX.current - touchStartX.current;
    if (touchDiff > 50) {
      goToPrevSlide();
    } else if (touchDiff < -50) {
      goToNextSlide();
    }
  };

  const router = useRouter();

  const handleDelete = async () => {
    const hasConfirmed = confirm("Tem certeza que deseja excluir o anúncio?");
    if (hasConfirmed) {
      try {
        await fetch(`api/work/${work._id}`, {
          method: "DELETE",
        });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const { data: session, status } = useSession();
  const userId = session?.user?._id;

  const wishlist = session?.user?.wishlist;
  const isLiked = wishlist?.find((item) => item?._id === work._id);

  const patchWishlist = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    const response = await fetch(`api/user/${userId}/wishlist/${work._id}`, {
      method: "PATCH",
    });
    const data = await response.json();
    update({ user: { wishlist: data.wishlist } }); // update session
  };

  return (
    <div
      className="work-card"
      onClick={() => {
        router.push(`/work-details?id=${work._id}`);
      }}
    >
      <div
        className="slider-container"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {work.workPhotoPaths?.map((photo, index) => (
            <div className="slide" key={index}>
              <img src={photo} alt="work" />
              {work.workPhotoPaths.length > 1 && (
                <>
                  <div
                    className="prev-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevSlide();
                    }}
                  >
                    <ArrowBackIosNew sx={{
                      borderRadius: "50%",
                      color: "#21565a",
                      padding: "5px",
                      fontSize: "23px",
                      backgroundColor: "rgba(255, 255, 255, 0.42)", // Ajustado para o valor original fornecido
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(5.3px)",
                      WebkitBackdropFilter: "blur(5.3px)", // `-webkit-` se torna `Webkit` em objetos JavaScript
                      border: "1px solid rgba(255, 255, 255, 0.3)"


                    }} />
                  </div>
                  <div
                    className="next-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextSlide();
                    }}
                  >
                    <ArrowForwardIos sx={{
                      borderRadius: "50%",
                      color: "#21565a",
                      padding: "5px",
                      fontSize: "23px",
                      backgroundColor: "rgba(255, 255, 255, 0.42)", // Ajustado para o valor original fornecido
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(5.3px)",
                      WebkitBackdropFilter: "blur(5.3px)", // `-webkit-` se torna `Webkit` em objetos JavaScript
                      border: "1px solid rgba(255, 255, 255, 0.3)"

                    }} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="info">
        <h3>{work.title}</h3>
        <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
          <div className="creator">
            <img style={{ display: "none" }} src={work.creator.profileImagePath} alt="creator" />
            <div>
              <span style={{ display: "none" }}>{work.creator.username}</span>
              <h3 className="categoria_card">{work.category}</h3>
            </div>
          </div>
          <div className="price">R$ {work.price}</div>
        </div>
      </div>

      {userId === work?.creator._id ? (
        <div
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <Delete
            sx={{
              borderRadius: "50%",
              color: "#21565a",
              padding: "5px",
              fontSize: "25px",
              backgroundColor: "rgba(255, 255, 255, 0.42)", // Ajustado para o valor original fornecido
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5.3px)",
              WebkitBackdropFilter: "blur(5.3px)", // `-webkit-` se torna `Webkit` em objetos JavaScript
              border: "1px solid rgba(255, 255, 255, 0.3)"
            }}
          />
        </div>
      ) : (
        <div
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            patchWishlist();
          }}
        >
          {isLiked ? (
            <Favorite
              sx={{
                borderRadius: "50%",
                color: "#21565a",
                padding: "5px",
                fontSize: "25px",
                backgroundColor: "rgba(255, 255, 255, 0.42)", // Ajustado para o valor original fornecido
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5.3px)",
                WebkitBackdropFilter: "blur(5.3px)", // `-webkit-` se torna `Webkit` em objetos JavaScript
                border: "1px solid rgba(255, 255, 255, 0.3)"
              }}
            />
          ) : (
            <FavoriteBorder
              sx={{
                borderRadius: "50%",
                color: "#21565a",
                padding: "5px",
                fontSize: "25px",
                backgroundColor: "rgba(255, 255, 255, 0.42)", // Ajustado para o valor original fornecido
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5.3px)",
                WebkitBackdropFilter: "blur(5.3px)", // `-webkit-` se torna `Webkit` em objetos JavaScript
                border: "1px solid rgba(255, 255, 255, 0.3)"
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WorkCard;
