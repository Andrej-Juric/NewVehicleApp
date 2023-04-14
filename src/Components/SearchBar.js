import React, { useState, useEffect } from "react";

function SearchBar() {
  const [makes, setMakes] = useState([]);
  const [value, setValue] = useState("");

  //api poziv
  useEffect(() => {
    fetch("https://api.baasic.com/v1/sata/resources/vehicleMakes", {
      headers: {
        "X-BAASIC-API-KEY": "sata",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        setMakes(resp.item);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleReset = () => {};
  const handleSearch = (e) => {
    e.preventDefault();
    fetch(
      `https://api.baasic.com/v1/sata/resources/vehicleMakes?searchQuery=${value}`,
      {
        headers: {
          "X-BAASIC-API-KEY": "sata",
        },
      }
    )
      .then((res) => res.json())
      .then((resp) => {
        setMakes([resp.item]);

        setValue("");
        console.log(resp);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search Vehicle ... "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        <button
          onClick={() => handleReset}
          type="submit"
          className="btn btn-primary"
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
