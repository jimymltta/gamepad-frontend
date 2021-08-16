// HOOKS IMPORTS
import { useStat, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// COMPONENTS IMPORTS

// CONTAINER LOGIC
const Home = ({ value }) => {
  // STATES
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // FUNCTION TO FETCH THROUGH DATA USING A USEEFFECT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("urlexample.com/games");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loading">
      <span>Loading...</span>
    </div>
  ) : (
    <div className="main"></div>
  );
};

export default Home;
