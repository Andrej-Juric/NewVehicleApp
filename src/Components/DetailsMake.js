import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const DetailsMake = () => {
  const { makeid } = useParams();
  console.log(makeid);
  const [makeData, setMakeData] = useState({});

  useEffect(() => {
    fetch("https://api.baasic.com/v1/sata/resources/vehicleMakes/" + makeid, {
      headers: {
        "X-BAASIC-API-KEY": "sata",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setMakeData(resp);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [makeid]);
  return (
    <div>
      <div className="card" style={{ textAlign: "left" }}>
        <div className="card-title">
          <h2>Vehicle details</h2>
        </div>
        <div className="card-body"></div>
        {makeData && (
          <button className="btn btn-danger" style={{ maxWidth: "20vh" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              HOME PAGE
            </Link>
          </button>
        )}
        <h3>
          Vehicle name is: {makeData.name} ({makeData.id})
        </h3>
        <h3>Vehicle abbreviation: {makeData.abbreviation}</h3>
      </div>
    </div>
  );
};

export default DetailsMake;
