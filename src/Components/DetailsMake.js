import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const DetailsMake = () => {
  const { makeid } = useParams();
  console.log(makeid);

  const [makeData, setMakeData] = useState({});

  useEffect(() => {
    fetch("https://api.baasic.com/v1/sata/resources/vehicleMakes" + makeid, {
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
  }, []);
  return (
    <div>
      {makeData && (
        <h1>
          <Link to="/">Go back to home page</Link>
          Vehicle name is: {makeData.name} ({makeData.id})
        </h1>
      )}
    </div>
  );
};

export default DetailsMake;
