import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const DetailsModel = () => {
  const { modelid } = useParams();
  console.log(modelid);
  const [modelData, setModelData] = useState({});

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
        setModelData(resp);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [modelid]);
  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <div className="card" style={{ textAlign: "left" }}>
          <div className="card-title">
            <h2>Vehicle details</h2>
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label htmlFor="id" className="col-sm-3 col-form-label">
                ID
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="id"
                  value={modelData.id}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-3 col-form-label">
                Name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="name"
                  value={modelData.name}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="abbreviation" className="col-sm-3 col-form-label">
                Abbreviation
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="abbreviation"
                  value={modelData.abbreviation}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="fuelType" className="col-sm-3 col-form-label">
                Fuel Type
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="fuelType"
                  value={modelData.fuel_type}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="wheelDrive" className="col-sm-3 col-form-label">
                Wheel Drive
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="wheelDrive"
                  value={modelData.wheel_type}
                />
              </div>
            </div>
          </div>
          {modelData && (
            <div className="card-footer">
              <Link to="/" className="btn btn-danger mr-3">
                HOME PAGE
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModel;
