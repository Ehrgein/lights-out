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
      <div>
        {data?.bajatension.map((item) => (
          <div className="flex justify-center items-center">
            <span className="text-white px-2">{item.partido}</span>
            <span className="text-white"> {item.afectados}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
