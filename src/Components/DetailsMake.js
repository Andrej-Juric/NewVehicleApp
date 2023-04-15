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
                  value={makeData.id}
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
                  value={makeData.name}
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
                  value={makeData.abbreviation}
                />
              </div>
            </div>
          </div>
          {makeData && (
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

export default DetailsMake;
