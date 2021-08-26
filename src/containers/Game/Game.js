// HOOKS IMPORTS
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Game.css";

// COMPONENTS IMPORTS
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// CONTAINER LOGIC
const Game = ({ userToken }) => {
  // STATES
  const { id } = useParams();
  const [game, setGame] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // FUNCTION TO FETCH THROUGH DATA USING A USEEFFECT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamepad-jm.herokuapp.com/games/${id}`
        );
        setGame(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  const addFavorite = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://gamepad-jm.herokuapp.com/user/addFavorite",
        {
          game: {
            id: game.id,
            name: game.name,
            image: game.background_image,
          },
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      console.log(response.data);
    } catch (error) {}
  };

  return isLoading ? (
    <div className="loading">
      <span>Loading...</span>
    </div>
  ) : (
    <div className="game-main">
      <div className="game-infos">
        <div className="game-name-and-pic">
          <h2 className="game-title">{game.name}</h2>
          <img
            src={game.background_image}
            alt="game cover"
            className="game-image"
          />
        </div>
        <div className="game-details">
          <div className="game-btns">
            <button onClick={addFavorite}>Save to collection</button>
            <span className="feature-is-coming">Feature is coming...</span>
            <button>Add a review</button>
            <span className="feature-is-coming">Feature is coming...</span>
          </div>
          <div className="details-cols">
            <div className="details-left-col">
              <h4>Plateforms</h4>
              {game.platforms.map((elem, index) => (
                <span key={elem.platform.id}>
                  {elem.platform.name}
                  {index < game.platforms.length - 1 ? "," : ""}{" "}
                </span>
              ))}

              <h4>Released date</h4>
              <span>{game.released}</span>

              <h4>Publisher</h4>
              <span>{game.publishers[0].name}</span>
            </div>
            <div className="details-right-col">
              <h4>Genre</h4>
              {game.genres.map((elem, index) => (
                <span key={index}>
                  {elem.name} {index < game.genres.length - 1 ? "," : ""}
                </span>
              ))}

              <h4>Developer</h4>
              {game.developers.map((elem, index) => (
                <span key={index}>
                  {" "}
                  {elem.name} {index < game.developers.length - 1 ? "," : ""}{" "}
                </span>
              ))}

              <h4>Age rating</h4>
              <span> {game.esrb_rating.id && game.esrb_rating.name} </span>
            </div>
          </div>
          <div className="game-desc-div">
            <h4 className="game-desc-title">About</h4>
            <p className="game-description">
              <br />
              {game.description_raw}
            </p>
          </div>
        </div>
      </div>
      <div className="suggested-games">
        <h2 className="games-like" style={{ marginLeft: "5vw" }}>
          Games like {game.name}
        </h2>
        <div className="sugg-games-cards">
          <h3>Feature is coming...</h3>
        </div>
      </div>
      <div className="game-reviews">
        <h2 style={{ marginLeft: "5vw" }}>Reviews</h2>
        <h3>Feature is coming...</h3>
      </div>
    </div>
  );
};

export default Game;

// async () => {
//   try {
//     const response = await axios.post(
//       "https://gamepad-jm.herokuapp.com/user/addFavorite",
//       {
//         token: userToken,
//         game: {
//           id: game.id,
//           name: game.name,
//           image: game.background_image,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     console.log(response);
//   } catch (error) {
//     console.log(error.response);
//   }
// }
