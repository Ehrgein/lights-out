import { useEffect, useState } from "react";
import Data from "./components/Data";

function App() {
  const [data, setData] = useState();

  const getEdesurData = async () => {
    const response = await fetch("http://localhost:9000").then((response) =>
      response.json()
    );
    setData(response);
  };

  useEffect(() => {
    getEdesurData();
  }, []);

  console.log(data);

  return (
    <div className="App">
      <Data />
    </div>
  );
}

export default App;
