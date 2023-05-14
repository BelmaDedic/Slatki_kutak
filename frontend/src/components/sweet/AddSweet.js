import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {  useLocation, useNavigate } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { green } from "@mui/material/colors";
import Navbar from "../navbar/Navbar";

const rx_live = /^[+-]?\d*(?:[.]\d*)?$/;

let logedUser = null;

const AddSweet = () => {
    const [ImageUrl, setImageUrl] = useState('');
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [CategoryId, setCategoryId] = useState('');
    const [NameError, setNameError] = useState(false);
    const [PriceError, setPriceError] = useState(false);
    const [CategoryIdError, setCategoryIdError] = useState(false);
    const [user, setUser] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    logedUser = location.state.user;

    useEffect(() => {
      setUser(logedUser);
    }, [logedUser])

    const addSweet = (e) => {
        e.preventDefault();

        setNameError(false);
        setCategoryIdError(false);
        setPriceError(false);

        const url = 'http://localhost:3000/Sweet/new';
        fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                ImageUrl: ImageUrl,
                Name: Name,
                Price: Price,
                CategoryId: CategoryId
            })
        })
        .then(() => {
            if(Name === ""){
                setNameError(true);
            }
            else if(Price === ""){
                setPriceError(true)
            } else if(CategoryId === null){
                setCategoryIdError(true)
            }  else {
            navigate('/Home', {state: {user:  logedUser}});
        }
        })
    }

    const checkAndSetPrice = (e) => {
        if (rx_live.test(e)) {
            setPrice(e);
        }
    }

    return ( 
        <div className="addSweet" style={{height: "100%"}}>
            < Navbar /> 
            <Avatar className="avatar" sx={{ bgcolor: green[500] }}>
                < AddCircleOutlineIcon />
            </Avatar>
             <Typography variant="h5" gutterBottom component="div" mb={ 3 } textAlign={"center"} sx={{ cursor: "default" }}>
                Unesite novu poslasticu
            </Typography>
            <div className="forma2">
                <form onSubmit={addSweet}>
                    <InputLabel className="label">
                        Unesite url slike poslastice
                    </InputLabel>
                    <TextField fullWidth type="url" id="outlined-input" color="success" label="Url slike" 
                    placeholder="https://www.societaallestero.com/wp-content/themes/consultix/images/no-image-found-360x250.png"
                    autoComplete="off" value={ImageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
                    <br/>
                    <InputLabel className="label">
                        Unesite naziv poslastice
                    </InputLabel>
                    <TextField fullWidth required id="outlined-required" color="success" label="Naziv" autoComplete="off"
                    value={Name} onChange={(e) => setName(e.target.value)} error={NameError}/>
                    <br/>
                    <InputLabel className="label">
                        Odaberite kategoriju poslastice
                    </InputLabel>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" required>Kategorija</InputLabel>
                        <Select required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={CategoryId}
                            label="Kategorija"
                            error={CategoryIdError}
                            onChange={(event) => setCategoryId(event.target.value)}
                        >
                            <MenuItem value={'627a5d820138cd807dd32cbe'}>Kolač</MenuItem>
                            <MenuItem value={'627a5dc00138cd807dd32cbf'}>Torta</MenuItem>
                            <MenuItem value={'627a5dcd0138cd807dd32cc0'}>Rolat</MenuItem>
                            <MenuItem value={'627a5de80138cd807dd32cc1'}>Ostalo</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <InputLabel className="label">
                        Unesite cijenu poslastice
                    </InputLabel>
                    <TextField fullWidth required id="outlined-required" color="success" label="Cijena poslastice" 
                    helperText="Valuta je izražena u KM" autoComplete="off" value={Price} onChange={(e) => checkAndSetPrice(e.target.value)}
                    error={PriceError} pattern="[+-]?\d+(?:[.]\d+)?"/>
                    <br/>
                    <Box textAlign='center'>
                        <Button type="submit" variant="contained" color="success" className="submit">DODAJ POSLASTICU</Button>
                    </Box>
                </form>
            </div>
        </div>
    );
}
 
export default AddSweet;