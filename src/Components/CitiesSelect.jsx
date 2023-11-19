import { useEffect, useState } from "react";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import useCities from "../hooks/useCities";

const CitiesSelect = (props) => {
  const url = "https://data.gov.il/api/3/action/datastore_search";

  const [city, setCity] = useState(props?.city || "");
  const { citiesForTypehead } = useCities();

  // useEffect(() => {
  //   console.clear();
  //   var citisParams = {
  //     params: {
  //       resource_id: "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba",
  //       limit: 5000,
  //     },
  //   };

  //   axios.get(url, citisParams).then((data) => {
  //     const addedCities = data?.data?.result?.records
  //       .map((e) => String(e["שם_ישוב"]).trim())
  //       .sort((a, b) => a.localeCompare(b, "he"))
  //       .filter((e) => e !== "לא רשום")
  //       .map((e, index) => ({ id: index + 1, label: e }));
  //     console.log(addedCities);
  //     setCities(addedCities);
  //   });
  // }, []);

  // const options = ["ערים"];
  // const renderMenuItemChildren = (option, { text }) => <div>תבחר עיר</div>;

  if (citiesForTypehead?.length === 0) return <p></p>;
  return (
    <>
      <Typeahead
        className={props.className}
        id="cities-select"
        size="sm"
        onChange={(selected) => {
          console.log(selected);

          const sel = selected.length > 0 ? selected[0].label : null;
          setCity(sel);
          if (sel) {
            props.setCity(sel);
            console.log(sel);
          }
        }}
        options={citiesForTypehead || []}
        selected={city ? [city] : []}
        align="justify"
        placeholder="לבחור יישוב"
      />
    </>
  );
};

export default CitiesSelect;
