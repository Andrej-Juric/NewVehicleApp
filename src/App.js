import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VehicleMakeList from "./Components/VehicleMakeList";
import VehicleModelList from "./Components/VehicleModelList";
import CreateMake from "./Components/CreateMake";
import DetailsMake from "./Components/DetailsMake";
import EditMake from "./Components/EditMake";
import CreateModel from "./Components/CreateModel";

function App() {
  return (
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
          <Route path="/make/detail/:makeid" element={<DetailsMake />}></Route>
          <Route path="/make/edit/:makeid" element={<EditMake />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
