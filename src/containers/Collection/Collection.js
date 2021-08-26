// HOOKS IMPORTS
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Collection = ({ userToken }) => {
  const [favs, setFavs] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // FUNCTION TO FETCH THROUGH DATA WITH A USEEFFECT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gamepad-jm.herokuapp.com/user/favs",
          { token: userToken },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        setFavs(response.data);
        setIsLoading(false);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userToken]);

  const updateFavs = async () => {
    try {
      const response = await axios.get(
        "https://gamepad-jm.herokuapp.com/user/favs",
        { token: userToken },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setFavs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="collection-main">
      <h2>My collection</h2>
      <div className="favs">
        {favs.map((elem) => {
          return (
            <div className="favCard" key={elem.id}>
              <Link to={`/games/${elem.id}`}>
                <h4>{elem.name}</h4>
                <img src={elem.image} alt={elem.name} />
                <button
                  onClick={async (event) => {
                    event.preventDefault();
                    try {
                      const response = await axios.post(
                        "https://gamepad-jm.herokuapp.com/user/removeFavorite",
                        { game: { id: elem.id } },
                        { headers: { Authorization: `Bearer ${userToken}` } }
                      );
                      updateFavs();
                      console.log(response);
                    } catch (error) {
                      console.log(error.message);
                    }
                  }}
                >
                  Remove
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collection;
