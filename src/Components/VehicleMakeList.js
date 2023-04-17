import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { BiArrowToBottom } from "react-icons/bi";
import { BiArrowToTop } from "react-icons/bi";
import "../App.css";

const VehicleMakeList = () => {
  const [makes, setMakes] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const sortOption = ["name"];
  const navigate = useNavigate();

  // pageing
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // handlePageChange funkcija
  const handlePageChange = (pageNumber) => {
    fetch(
      `https://api.baasic.com/v1/sata/resources/vehicleMakes?page=${pageNumber}&rpp=${itemsPerPage}`,
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
        setMakes(resp.item);
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
      `https://api.baasic.com/v1/sata/resources/vehicleMakes?page=${currentPage}&rpp=${itemsPerPage}`,
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
        setMakes(resp.item);
        console.log(resp.item);
        console.log(resp);
        setTotalPages(resp.totalPages);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // handleReset funkcija
  const handleReset = () => {
    fetch(
      `https://api.baasic.com/v1/sata/resources/vehicleMakes?page=${currentPage}&rpp=${itemsPerPage}`,
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
        setMakes(resp.item);
        setSearchResults([]);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSearch = (value) => {
    fetch(
      `https://api.baasic.com/v1/sata/resources/vehicleMakes?searchQuery=${value}`,
      {
        headers: {
          "X-BAASIC-API-KEY": "sata",
        },
      }
    )
      .then((res) => res.json())
      .then((resp) => {
        setMakes(resp.item);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // handleSort funkcija
  const handleSort = (sortOrder) => {
    setSortValue(sortOrder);
    setCurrentPage(1);
    const sortParam = `name|${sortOrder}`;
    fetch(
      `https://api.baasic.com/v1/sata/resources/vehicleMakes?sort=${sortParam}&page=${currentPage}&rpp=${itemsPerPage}`,
      {
        headers: {
          "X-BAASIC-API-KEY": "sata",
        },
      }
    )
      .then((res) => res.json())
      .then((resp) => {
        setMakes(resp.item);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    if (sortValue !== "") {
      handleSort(sortValue);
    }
  }, [sortValue]);

  // funckije
  const LoadDetail = (id) => {
    navigate("/make/detail/" + id);
  };

  const LoadEdit = (id) => {
    navigate("/make/edit/" + id);
  };

  const RemoveFunction = (id) => {
    if (window.confirm("Do you really want to delete this Vehicle?")) {
      fetch("https://api.baasic.com/v1/sata/resources/vehicleMakes/" + id, {
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

    //navigate("/make/remove/" + id);
  };
  /*
  // api poziv za marke automobila // api call for vehicle make
  useEffect(() => {
    fetch("https://api.baasic.com/v1/sata/resources/vehicleMakes", {
      headers: {
        "X-BAASIC-API-KEY": "sata",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        setMakes(resp.item);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
*/
  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-title">
            <h2>Vehicle Listing</h2>
            <div className="card-body">
              <div className="divbtn">
                <Link to="make/create" className="btn btn-success">
                  Add new make (+)
                </Link>
              </div>
              <SearchBar
                onSearch={handleSearch}
                onReset={handleReset}
              ></SearchBar>

              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>
                      Name <BiArrowToBottom onClick={() => handleSort("asc")} />
                      <BiArrowToTop onClick={() => handleSort("desc")} />
                    </td>
                    <td>Abr:</td>
                    <td>Buttons</td>
                  </tr>
                </thead>
                <tbody>
                  <React.Fragment>
                    {makes &&
                      makes.length > 0 &&
                      makes.map((make) => (
                        <tr key={make.id}>
                          <td>{make.name}</td>
                          <td>{make.abbreviation}</td>

                          <td>
                            <a
                              onClick={() => {
                                LoadEdit(make.id);
                              }}
                              className="btn btn-success"
                            >
                              Edit
                            </a>
                            <a
                              onClick={() => {
                                RemoveFunction(make.id);
                              }}
                              className="btn btn-danger"
                            >
                              Remove
                            </a>
                            <a
                              onClick={() => {
                                LoadDetail(make.id);
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

export default VehicleMakeList;
