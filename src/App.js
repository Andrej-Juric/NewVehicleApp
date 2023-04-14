import "./App.css";
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
  return (
    <>
      <SearchBar></SearchBar>
      <div className="App">
        <h1>Vehicle App</h1>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <VehicleMakeList />
                  <VehicleModelList />
                </>
              }
            ></Route>
            <Route path="/make/create" element={<CreateMake />}></Route>
            <Route path="/model/create" element={<CreateModel />}></Route>
            <Route
              path="/make/detail/:makeid"
              element={<DetailsMake />}
            ></Route>
            <Route
              path="/model/detail/:modelid"
              element={<DetailsModel />}
            ></Route>
            <Route path="/make/edit/:makeid" element={<EditMake />}></Route>
            <Route path="/model/edit/:modelid" element={<EditModel />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
