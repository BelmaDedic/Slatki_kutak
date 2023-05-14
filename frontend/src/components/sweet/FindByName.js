import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

const rx_live = /^[a-zA-Z ]*$/;

const FindByName = ({ passSetSweet }) => {
  const [name, setName] = useState("");
  const [sweet, setSweet] = useState("");

  useEffect(() => {
    fetchData();
  }, [name]);

  const fetchData = async () => {
    if (name === "") {
      const data = await fetch("http://localhost:3000/Home");
      const sweet2 = await data.json();
      setSweet(sweet2);
      passSetSweet(sweet2);
    } else {
      const data = await fetch("http://localhost:3000/Sweet/findByName/" + name);
      const sweet2 = await data.json();
      setSweet(sweet2);
      passSetSweet(sweet2);
    }
  };

  const handleChange = (event) => {
    if (rx_live.test(event.target.value)) {
      setName(event.target.value);
  }  
  };

  return (
    <TextField id="outlined-size-small" size="small" value={name} label="Naziv poslastice" variant="outlined" onChange={handleChange}
      autoComplete="off" pattern="[+-]?\d+(?:[.,]\d+)?"
      InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              < SearchIcon />
            </InputAdornment>
          ),
        }}
  	/>
  );
};

export default FindByName;
