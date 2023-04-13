import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditModel = () => {
  const { modelid } = useParams();

  //const [makeData, setMakeData] = useState({});

  useEffect(() => {
    fetch("https://api.baasic.com/v1/sata/resources/VehicleModel2/" + modelid, {
      headers: {
        "X-BAASIC-API-KEY": "sata",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setId(resp.id);
        setName(resp.name);
        setAbrv(resp.abbreviation);
        setFuelType(resp.fuel_type);
        setWheelType(resp.wheel_type);
        //console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [modelid]);

  const [name, setName] = useState("");
  const [abrv, setAbrv] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [wheelType, setWheelType] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const modelData = {
      abbreviation: abrv,
      name: name,
      fuel_type: fuelType,
      wheel_type: wheelType,
    };

    // api poziv za model

    fetch("https://api.baasic.com/v1/sata/resources/VehicleModel2/" + modelid, {
      method: "PUT",
      headers: {
        "X-BAASIC-API-KEY": "sata",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modelData),
    })
      .then((resp) => {
        alert("Saved successfully");
        navigate("/");
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ "text-align": "left" }}>
              <div className="card-title">
                <h2>Edit Model</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Abrv</label>
                      <input
                        required
                        value={abrv}
                        onChange={(e) => setAbrv(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Fuel type</label>
                      <input
                        required
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Wheel drive</label>
                      <input
                        required
                        value={wheelType}
                        onChange={(e) => setWheelType(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="form-control"
                        disabled="disabled"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Make ID</label>
                      <input
                        className="form-control"
                        disabled="disabled"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label className="form-check-label">Is active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModel;
