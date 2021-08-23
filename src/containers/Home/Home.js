// HOOKS IMPORTS
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

// COMPONENTS IMPORTS
import logo from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// CONTAINER LOGIC
const Home = () => {
  // STATES
  const [data, setData] = useState();
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // FUNCTION TO FETCH THROUGH DATA USING A USEEFFECT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gamepad-jm.herokuapp.com/games?search=${search}&page=${page}`
        );
        setData(response.data.results);
        setCount(response.data.count);
        console.log("DATA ==>", response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, search]);

  return isLoading ? (
    <div className="loading">
      <span>Loading...</span>
    </div>
  ) : (
    <div className="main">
      <div className="topOfPage">
        <div className="homeLogoAndTitle">
          <img src={logo} alt="logo" className="homeLogo" />
          <h1 className="homeTitle">Gamepad</h1>
        </div>
        <div className="input">
          <input
            type="search"
            placeholder="Search for a game..."
            onChange={(event) => setSearch(event.target.value)}
          />
          <FontAwesomeIcon icon="search" className="searchIcon" />
          <span>search {count} games</span>
        </div>
      </div>
      <div className="gamesMain">
        <h2>Most Relevance Games</h2>
        <div className="gamesList">
          {data.map((game, index) => {
            return (
              <div className="gameCard" key={index}>
                <Link to={`/games/${game.id}`}>
                  <img src={game.background_image} alt="" />
                  <h4 className="gameTitle">{game.name}</h4>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="nav-btns">
        <button
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Previous
        </button>

        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
