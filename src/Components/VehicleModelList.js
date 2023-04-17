import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { BiArrowToBottom } from "react-icons/bi";
import { BiArrowToTop } from "react-icons/bi";
import "../App.css";

const VehicleModelList = () => {
  //const [makes, setMakes] = useState("");
  const [models, setModels] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const sortOption = ["name"];

  // pageing

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // handlePageChange funkcija za modele auta

  const handlePageChange = (pageNumber) => {
    fetch(
      `https://api.baasic.com/v1/sata/resources/VehicleModel2?page=${pageNumber}&rpp=${itemsPerPage}`,
      {
        headers: {
          "X-BAASIC-API-KEY": "sata",
        },
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        setModels(resp.item);
        setCurrentPage(pageNumber);
        setTotalPages(resp.totalPages);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // useEffect za dohvaćanje podataka pri inicijalizaciji komponente
  useEffect(() => {
    fetch(
      `https://api.baasic.com/v1/sata/resources/VehicleModel2?page=${currentPage}&rpp=${itemsPerPage}`,
      {
        headers: {
          "X-BAASIC-API-KEY": "sata",
        },
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        setModels(resp.item);
        console.log(resp.item);
        console.log(resp);
        setTotalPages(resp.totalPages);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // handleSort funkcija
  const handleSort = (sortOrder) => {
    setSortValue(sortOrder);
    const sortParam = `name|${sortOrder}`;
    fetch(
      `https://api.baasic.com/v1/sata/resources/VehicleModel2?sort=${sortParam}&page=${currentPage}&rpp=${itemsPerPage}`,
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

  // handleFilter funkcija

  const handleFilter = (fuelType) => {
    fetch(
      `https://api.baasic.com/v1/sata/resources/VehicleModel2?fuel_type=${fuelType}`,
      {
        headers: {
          "X-BAASIC-API-KEY": "sata",
        },
      }
    )
      .then((res) => res.json())
      .then((resp) => {
        let filteredModels = resp.item.filter((model) => {
          return (
            model.fuel_type != null &&
            model.fuel_type.toLowerCase() === fuelType.toLowerCase()
          );
        });
        setModels(filteredModels);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // funkcije search i reset

  const handleReset = () => {
    fetch(
      `https://api.baasic.com/v1/sata/resources/VehicleModel2?page=${currentPage}&rpp=${itemsPerPage}`,
      {
        headers: {
          "X-BAASIC-API-KEY": "sata",
        },
      }
    )
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
  /*useEffect(() => {
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
  }, []);*/

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
                className="btn btn-primary"
                onClick={() => handleFilter("diesel")}
              >
                Show diesel models
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleFilter("petrol")}
              >
                Show petrol models
              </button>

              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>
                      Name <BiArrowToBottom onClick={() => handleSort("asc")} />
                      <BiArrowToTop onClick={() => handleSort("desc")} />
                    </td>
                    <td>Abrv</td>
                    <td>Fuel type</td>
                    <td>Wheel drive</td>
                    <td>Buttons</td>
                  </tr>
                </thead>
                <tbody>
                  <React.Fragment>
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
                  </React.Fragment>
                </tbody>
              </table>
              <div className="pagination-buttons">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModelList;
