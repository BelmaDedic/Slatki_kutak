import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

const FindByStatusAdmin = ({ passSetOrder }) => {
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");
  
  useEffect(() => {
    fetchData();
  }, [status]);
  
  const fetchData = async () => {
    if (status === "") {
      const data = await fetch("http://localhost:3000/Sweet/Orders");
      const order2 = await data.json();
      setOrder(order2);
      passSetOrder(order2);
    } else {
      const data = await fetch("http://localhost:3000/Sweet/findByStatus/" + status);
      const order2 = await data.json();
      setOrder(order2);
      passSetOrder(order2);
    }
  };

  return ( 
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Status</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        label="Status"
        value = {status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <MenuItem value="">
        <em>Sve</em>
        </MenuItem>
        <MenuItem value={0}>Na čekanju</MenuItem>
        <MenuItem value={1}>Odobrene</MenuItem>
        <MenuItem value={2}>Odbijene</MenuItem>
    </Select>
  </FormControl>
  );
}
 
export default FindByStatusAdmin;