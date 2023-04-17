import { useEffect, useState } from "react";
import getVacas from "../services/getVacas";

export function useVacas() {
  const [vacas, setVacas] = useState({});
  console.log("useVacas", getVacas());
  useEffect(
    function () {
      let options = [{ value: 0, label: "Seleccione.." }];
      getVacas().then((typeEvent) => {
        console.log("typeEventss", typeEvent);
        typeEvent.forEach((option) => {
          let row = {};
          row.value = option.id;
          row.label = " " + option.id + " " + option.name;
          options.push(row);
        });
        console.log("Options", options);
        setVacas(options);
      });
    },
    [setVacas]
  );
  return { vacas };
}
