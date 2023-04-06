import React, { useState, useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react-lite";

function App() {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // API poziv za marku automobila
    const fetchMakes = async () => {
      const response = await fetch(
        "https://api.baasic.com/v1/sata/resources/VehicleMake",
        {
          headers: {
            "X-BAASIC-API-KEY": "sata",
          },
        }
      );
      const data = await response.json();
      setMakes(data.item[0].VehicleMakes || []);
    };
    // API poziv za model automobila
    const fetchModels = async () => {
      const response = await fetch(
        "https://api.baasic.com/v1/sata/resources/VehicleModel",
        {
          headers: {
            "X-BAASIC-API-KEY": "sata",
          },
        }
      );
      const data = await response.json();
      setModels(data.item[0].VehicleModels || []);
    };

    fetchMakes();
    fetchModels();
  }, []);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMakes = makes.filter((make) => {
    return make.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredModels = models.filter((model) => {
    return model.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <>
      <div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="crud-buttons">
          <button>Add</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        {filteredMakes.length > 0 && (
          <div>
            <h1>Vehicle Makes</h1>
            <ul>
              {filteredMakes.map((make) => (
                <li key={make.id}>
                  Car make: {make.name} - (Abbreviation: {make.abrv})
                </li>
              ))}
            </ul>
          </div>
        )}
        {filteredModels.length > 0 && (
          <div>
            <h1>Vehicle Models</h1>
            <ul>
              {filteredModels.map((model) => (
                <li key={model.id}>
                  Model name: {model.name} - (Model Abbreviation: {model.abrv})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
// observer koristim zbog automatskog ažuriranja komponenti kad se promijeni vrijednost u storeu
// posebno korisno u situacijama kao pretraga, filtriranje, dodavanje i brisanje modela i marki automobila npr.
export default observer(App);
