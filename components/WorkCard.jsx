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
import { useState } from "react";

const WorkCard = ({ work }) => {
  console.log(work);
  /* SLIDER FOR PHOTOS */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % work.workPhotoPaths.length
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + work.workPhotoPaths.length) %
        work.workPhotoPaths.length
    );
  };

  const router = useRouter();

  /* DELETE WORK */
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

  const { data: session, update } = useSession();
  const userId = session?.user?._id;

  /* ADD TO WISHLIST */
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


      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {work.workPhotoPaths?.map((photo, index) => (
            <div className="slide" key={index}>
              <img src={photo} alt="work" />

              {/* Verifica se há mais de uma foto antes de exibir os botões */}
              {work.workPhotoPaths.length > 1 && (
                <>
                  <div
                    className="prev-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevSlide(e);
                    }}
                  >
                    <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                  </div>

                  <div
                    className="next-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextSlide(e);
                    }}
                  >
                    <ArrowForwardIos sx={{ fontSize: "15px" }} />
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
            <img src={work.creator.profileImagePath} alt="creator" />

            <div style={{ display: "flex", flexDirection: 'column',  }}>
            <span>{work.creator.username}</span>
            <span style={{ fontSize: '14px', fontWeight: '400' }}>{work.category}</span>
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
              backgroundColor: "white",
              padding: "5px",
              fontSize: "30px",
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
                backgroundColor: "white",
                color: "red",
                padding: "5px",
                fontSize: "30px",
              }}
            />
          ) : (
            <FavoriteBorder
              sx={{
                borderRadius: "50%",
                backgroundColor: "white",
                padding: "5px",
                fontSize: "30px",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WorkCard;
