import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VehicleMakeList from "./Components/VehicleMakeList";
import VehicleModelList from "./Components/VehicleModelList";
import CreateMake from "./Components/CreateMake";
import DetailsMake from "./Components/DetailsMake";
import EditMake from "./Components/EditMake";
import EditModel from "./Components/EditModel";
import CreateModel from "./Components/CreateModel";
import DetailsModel from "./Components/DetailsModel";
import { observer } from "mobx-react-lite";

import { GoogleLogin } from "@react-oauth/google";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isShowingMakes, setIsShowingMakes] = useState(true);

  // google login
  const responseMessage = (response) => {
    console.log(response);
    setIsAuthenticated(true);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <>
      {!isAuthenticated ? (
        <div>
          <h2>React Google Login</h2>
          <br />
          <br />
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
      ) : (
        <div className="App">
          <h1>Vehicle App</h1>
          <button
            onClick={() => setIsShowingMakes(true)}
            className="btn btn-success"
          >
            Show Makes
          </button>
          <button
            onClick={() => setIsShowingMakes(false)}
            className="btn btn-success"
          >
            Show Models
          </button>
          <BrowserRouter>
            <Routes>
              {isShowingMakes && (
                <>
                  <Route path="/" element={<VehicleMakeList />} />
                  <Route path="/make/create" element={<CreateMake />} />
                  <Route
                    path="/make/detail/:makeid"
                    element={<DetailsMake />}
                  />
                  <Route path="/make/edit/:makeid" element={<EditMake />} />
                </>
              )}
              {!isShowingMakes && (
                <>
                  <Route path="/" element={<VehicleModelList />} />
                  <Route path="/model/create" element={<CreateModel />} />
                  <Route
                    path="/model/detail/:modelid"
                    element={<DetailsModel />}
                  />
                  <Route path="/model/edit/:modelid" element={<EditModel />} />
                </>
              )}
            </Routes>
          </BrowserRouter>
        </div>
      )}
      <div className="bottom">
        <p>&copy; 2023. Andrej Jurić - Sva prava pridržana.</p>
      </div>
    </>
  );
}

export default observer(App);
