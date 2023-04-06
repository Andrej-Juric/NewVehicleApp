import React, { useState, useEffect } from "react";

function App() {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.baasic.com/v1/sata/resources/test2",
        {
          headers: {
            "X-BAASIC-API-KEY": "sata",
          },
        }
      );
      const data = await response.json();
      //console.log(data);
      setMakes(data.item[0].VehicleMakes || []);
      setModels(data.item[0].VehicleModels || []);
      console.log(data.item[0].VehicleMakes);
      console.log(data.item[0].VehicleModels);
    };
    fetchData();
  }, []);

  return (
    <div>
      {makes.length > 0 && (
        <div>
          <h1>Vehicle Makes</h1>
          <ul>
            {makes.map((make) => (
              <li key={make.id}>
                {make.abrv} - {make.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {models.length > 0 && (
        <div>
          <h1>Vehicle Models</h1>
          <ul>
            {models.map((model) => (
              <li key={model.id}>
                {model.abrv} - {model.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
