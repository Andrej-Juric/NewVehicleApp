import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const VehicleMakeList = () => {
  const [makes, setMakes] = useState("");
  const navigate = useNavigate();

  //const [models, setModels] = useState("");

  // funckije
  const LoadDetail = (id) => {
    navigate("/make/detail/" + id);
  };

  const LoadEdit = (id) => {
    navigate("/make/edit/" + id);
  };

  const RemoveFunction = (id) => {
    navigate("/make/remove/" + id);
  };

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
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>Name:</td>
                    <td>Abr:</td>
                  </tr>
                </thead>
                <tbody>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleMakeList;
