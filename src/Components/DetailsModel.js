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
    <div>
      <div className="card" style={{ textAlign: "left" }}>
        <div className="card-title">
          <h2>Vehicle details</h2>
        </div>
        <div className="card-body"></div>
        {modelData && (
          <button className="btn btn-danger" style={{ maxWidth: "20vh" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              HOME PAGE
            </Link>
          </button>
        )}
        <h3>
          Vehicle model name is: {modelData.name} ({modelData.id})
        </h3>
        <h3>Vehicle abbreviation: {modelData.abbreviation}</h3>
        <h3>Vehicle fuel type: {modelData.fuel_type}</h3>
        <h3>Vehicle wheel drive: {modelData.wheel_type}</h3>
      </div>
    </div>
  );
};

export default DetailsModel;
