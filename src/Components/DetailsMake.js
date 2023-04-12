import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsMake = () => {
  const { makeid } = useParams();

  const [makeData, setMakeData] = useState({});

  useEffect(() => {
    fetch("https://api.baasic.com/v1/sata/resources/vehicleMakes/" + makeid, {
      headers: {
        "X-BAASIC-API-KEY": "sata",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        setMakeData(resp.item);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return <div></div>;
};

export default DetailsMake;
