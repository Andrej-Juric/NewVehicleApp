import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const VehicleModelList = () => {
  //const [makes, setMakes] = useState("");
  const [models, setModels] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const sortOption = ["name"];

  // funkcija za sort

  // handleSort funkcija
  const handleSort = (sortOrder) => {
    setSortValue(sortOrder);
    const sortParam = `name|${sortOrder}`;
    fetch(
      `https://api.baasic.com/v1/sata/resources/VehicleModel2?sort=${sortParam}`,
      {
        headers: {
          "X-BAASIC-API-KEY": "sata",
        },
      }
    )
      .then((res) => res.json())
      .then((resp) => {
        setModels(resp.item);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // funkcije search i reset

  const handleReset = () => {
    fetch("https://api.baasic.com/v1/sata/resources/VehicleModel2/", {
      headers: {
        "X-BAASIC-API-KEY": "sata",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        setModels(resp.item);
        setSearchResults([]);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSearch = (value) => {
    fetch(
      `https://api.baasic.com/v1/sata/resources/VehicleModel2/?searchQuery=${value}`,
      {
        headers: {
          "X-BAASIC-API-KEY": "sata",
        },
      }
    )
      .then((res) => res.json())
      .then((resp) => {
        setModels(resp.item);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // funckije
  const LoadModelDetail = (id) => {
    navigate("/model/detail/" + id);
  };

  const LoadModelEdit = (id) => {
    navigate("/model/edit/" + id);
  };

  const RemoveModelFunction = (id) => {
    if (window.confirm("Do you really want to delete this Model?!")) {
      fetch("https://api.baasic.com/v1/sata/resources/VehicleModel2/" + id, {
        method: "DELETE",
        headers: {
          "X-BAASIC-API-KEY": "sata",
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(makeData),
      }).then((resp) => {
        alert("Removed successfully");
        window.location.reload();
      });
    }
    //navigate("/make/detail/" + id);
  };

  // api poziv za model automobila // api call for vehicle model
  useEffect(() => {
    fetch("https://api.baasic.com/v1/sata/resources/VehicleModel2", {
      headers: {
        "X-BAASIC-API-KEY": "sata",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        setModels(resp.item);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-title">
            <h2>Vehicle Model Listing</h2>
            <div className="card-body">
              <div className="divbtn">
                <Link to="model/create" className="btn btn-success">
                  Add new model (+)
                </Link>
              </div>
              <SearchBar
                onSearch={handleSearch}
                onReset={handleReset}
              ></SearchBar>
              <button
                onClick={() => handleSort("asc")}
                className="btn btn-success"
              >
                Sort Ascending
              </button>
              <button
                onClick={() => handleSort("desc")}
                className="btn btn-success"
              >
                Sort Descending
              </button>

              {sortOption.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>Name:</td>
                    <td>Abrv:</td>
                    <td>Fuel type:</td>
                    <td>Wheel drive:</td>
                    <td>Buttons</td>
                  </tr>
                </thead>
                <tbody>
                  {models &&
                    models.length > 0 &&
                    models.map((model) => (
                      <tr key={model.id}>
                        <td>{model.name}</td>
                        <td>{model.abbreviation}</td>
                        <td>{model.fuel_type}</td>
                        <td>{model.wheel_type}</td>
                        <td>
                          <a
                            onClick={() => {
                              LoadModelEdit(model.id);
                            }}
                            className="btn btn-success"
                          >
                            Edit
                          </a>
                          <a
                            onClick={() => {
                              RemoveModelFunction(model.id);
                            }}
                            className="btn btn-danger"
                          >
                            Remove
                          </a>
                          <a
                            onClick={() => {
                              LoadModelDetail(model.id);
                            }}
                            className="btn btn-primary"
                          >
                            Details
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModelList;
