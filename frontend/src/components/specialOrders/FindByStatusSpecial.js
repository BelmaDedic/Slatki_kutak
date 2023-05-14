import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

const FindByStatusSpecial = ({ passSetSpecialOrder, user }) => {
  const [status, setStatus] = useState("");
  const [specialOrder, setSpecialOrder] = useState("");

  useEffect(() => {
    fetchData();
  }, [status]);
    
  const fetchData = async () => {
    if (status === "") {
      const data = await fetch("http://localhost:3000/Sweet/SpecialOrders/" + user._id);
      const specialOrder2 = await data.json();
      setSpecialOrder(specialOrder2);
      passSetSpecialOrder(specialOrder2);
    } else {
      const data = await fetch("http://localhost:3000/Sweet/findByStatusSpecial/" + user._id + "/" + status);
      const specialOrder2 = await data.json();
      setSpecialOrder(specialOrder2);
      passSetSpecialOrder(specialOrder2);
    }
  };

  return ( 
    <FormControl sx={{ minWidth: 120 }} size="small" style={{color: "black"}}>
      <InputLabel id="demo-select-small" style={{color: "black"}}>Status</InputLabel>
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
 
export default FindByStatusSpecial;