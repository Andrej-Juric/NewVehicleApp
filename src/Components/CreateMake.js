import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import makeStore from "../Common/store";

const CreateMake = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [abrv, setAbrv] = useState("");
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const makeData = {
      abbreviation: abrv,
      name: name,
    };

    makeStore.addMake(makeData);

    // api poziv za make

    fetch("https://api.baasic.com/v1/sata/resources/vehicleMakes", {
      method: "POST",
      headers: {
        "X-BAASIC-API-KEY": "sata",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makeData),
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
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Create Make</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        disabled="disabled"
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
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
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
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

export default observer(CreateMake);
