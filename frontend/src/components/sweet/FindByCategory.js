import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

const FindByCategory = ({ passSetSweet }) => {
  const [categoryId, setCategoryId] = useState("");
  const [sweet, setSweet] = useState("");
      
  useEffect(() => {
    fetchData();
  }, [categoryId]);
      
  const fetchData = async () => {
    if (categoryId === "") {
      const data = await fetch("http://localhost:3000/Home");
      const sweet2 = await data.json();
      setSweet(sweet2);
      passSetSweet(sweet2);
    } else {
      const data = await fetch("http://localhost:3000/Sweet/findByCategory/" + categoryId);
      const sweet2 = await data.json();
      setSweet(sweet2);
      passSetSweet(sweet2);
    }
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Kategorija</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={categoryId}
        label="Kategorija"
        onChange={(event) => setCategoryId(event.target.value)}
      >
        <MenuItem value="">
          <em>Sve</em>
        </MenuItem>
        <MenuItem value={'627a5d820138cd807dd32cbe'}>Kolač</MenuItem>
        <MenuItem value={'627a5dc00138cd807dd32cbf'}>Torta</MenuItem>
        <MenuItem value={'627a5dcd0138cd807dd32cc0'}>Rolat</MenuItem>
        <MenuItem value={'627a5de80138cd807dd32cc1'}>Ostalo</MenuItem>
      </Select>
    </FormControl>
  );
}
 
export default FindByCategory;