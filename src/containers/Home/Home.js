// HOOKS IMPORTS
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

// COMPONENTS IMPORTS
import logo from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// CONTAINER LOGIC
const Home = ({ value }) => {
  // STATES
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // FUNCTION TO FETCH THROUGH DATA USING A USEEFFECT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/games?search=${search}&page=${page}`
        );
        setData(response.data.results);
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
          <input type="text" placeholder="Search for a game..." />
          <FontAwesomeIcon icon="search" className="searchIcon" />
          <span>Search 2349 595 games</span>
        </div>
      </div>
      <div className="gamesMain">
        <h2>Most Relevance Games</h2>
        <div className="gamesList">
          {data.map((game, index) => {
            return (
              <div className="gameCard">
                <img src={game.background_image} alt="" />
                <h4 className="gameTitle">{game.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
