import { useEffect, useState } from "react";
import getClases from "../services/getClases";

export function useClases() {
  const [clases, setClases] = useState({});
  //console.log("useClases", getClases());
  useEffect(
    function () {
      let options = [{ value: 0, label: "Seleccione.." }];
      getClases().then((typeEvent) => {
        //console.log("typeEventss", typeEvent);
        typeEvent.forEach((option) => {
          let row = {};
          row.value = option.id;
          row.label = " " + option.id + " " + option.description;
          options.push(row);
        });
        //console.log("Options", options);
        setClases(options);
      });
    },
    [setClases]
  );
  return { clases };
}
