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
import SearchBar from "./Components/SearchBar";

function App() {
  const [isShowingMakes, setIsShowingMakes] = useState(true);

  return (
    <>
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
                <Route path="/make/detail/:makeid" element={<DetailsMake />} />
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
      <div class="bottom">
        <p>&copy; 2023. Andrej Jurić - Sva prava pridržana.</p>
      </div>
    </>
  );
}

export default App;
