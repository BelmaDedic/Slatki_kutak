import { Avatar, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextareaAutosize, TextField, Typography } from "@mui/material";
import CakeIcon from '@mui/icons-material/Cake';
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import FormHelperText from '@mui/material/FormHelperText';
import MakeSpecialOrder from './MakeSpecialOrder';
import Navbar from "../navbar/Navbar";

const SpecialOrder = ({User}) => {
    const [user, setUser] = useState(User);
    const [sort, setSort] = useState("");
    const [size, setSize] = useState("");
    const [inscriptions, setInsriptions] = useState("");
    const [textInscriptions, setTextInsriptions] = useState("");
    const [floorsNumber, setFloorsNumber] = useState("");
    const [shape, setShape] = useState("");
    const [otherShape, setOtherShape] = useState("");
    const [date, setDate] = useState(null);
    const [notes, setNotes] = useState("");
    const [fullPrice, setFullPrice] = useState(0);
    
    const [lastSelected, setLastSelected] = useState("");

    const minDate = new Date(new Date().setDate(new Date().getDate()+15));
    const maxDate = new Date(new Date().setDate(new Date().getDate()+90))

    let NewDate = moment(minDate, 'MM/DD/YYYY').format("MM/DD/YYYY");
    NewDate=NewDate.split('T')[0];
    
    let NewDate2 = moment(maxDate, 'MM/DD/YYYY').format("MM/DD/YYYY");
    NewDate2=NewDate2.split('T')[0];

    const setImageModel = (sort, size, inscriptions, shape, floorsNumber) => {
        let url = "url(";
        if(lastSelected === "sort") {
            if(sort === "Rođendanska") {
                return url + "https://ecom-su-static-prod.wtrecom.com/images/products/4/LN_426334_BP_4.jpg)";
            } else if(sort === "Svadbena") {
                return url + "https://cdn.shopify.com/s/files/1/0319/1449/2041/products/wedding-cake-blue_1024x1024.jpg?v=1605686705)";
            } else if(sort === "Druga prilika") {
                return url + "https://www.cityunbox.com/media/catalog/product/cache/65daba3010571badacafda02aba53f0a/c/h/chocolate-round-large.jpg)"
            }
        } else if(lastSelected === "size") {
            if(size === "Mala") {
                return url + "https://karim.shop/images/Product_11-03-21-05-03-57-am_11149.jpg)";
            } else if(size === "Srednja") {
                return url + "https://www.goodsamaritan.ms/uploads/1/2/7/7/12777965/s736176615899143325_p404_i1_w1024.jpeg)";
            } else if(size === "Velika") {
                return url + "https://i.pinimg.com/564x/56/7e/ff/567eff39689db0bf84173485b7f7ff87.jpg)";
            } else if(size === "Jumbo") {
                return url + "https://glamadelaide.com.au/wp-content/uploads/2022/02/274515358_5456973714347660_4817938423842701468_n.jpg)";
            }
        } else if(lastSelected === "inscriptions") {
            if(inscriptions === "Bez natpisa") {
                return url + "https://www.fnp.com/images/pr/l/v20210702212109/birthday-designer-chocolate-cake-half-kg_1.jpg)";
            } else if(inscriptions === "Sa natpisom") {
                return url + "https://craigies.co.uk/wp-content/uploads/2020/06/Birthday-Cake-e1612181292233.png)";
            }
        } else if(lastSelected === "shape") {
            if(shape === "Krug") {
                return url + "https://m.media-amazon.com/images/I/41L12hLwO2L.jpg)";
            } else if(shape === "Kvadrat") {
                return url + "https://www.keralagifts.in/media/images/product/202006151592205069.jpg)";
            } else if(shape === "Srce") {
                return url + "https://www.sacake.lk/wp-content/uploads/2021/12/rosy-heart-chocolate-cake-sacake_1-1200x1200.jpg)";
            } else if(shape === "Drugo") {
                return url + "https://i.pinimg.com/originals/60/7b/94/607b945f696b6ad40b3d88db48af0da2.jpg)";
            }
        } else if(lastSelected === "floorsNumber") {
            if(floorsNumber === "1") {
                return url + "https://images.heb.com/is/image/HEBGrocery/000520860)";
            } else if(floorsNumber === "2") {
                return url + "https://www.onlinedelivery.in/images/detailed/35/cake-03-440x440.png)";
            } else if(floorsNumber === "3") {
                return url + "https://res.giftalove.com/resources/common/giftimages/largeimage/3-tier-blackforest-cake.jpg)";
            } else if(floorsNumber === "4") {
                return url + "https://5.imimg.com/data5/TY/NA/MY-33701657/wedding-cake-500x500.jpg)";
            } else if(floorsNumber === "5") {
                return url + "https://i.pinimg.com/originals/30/23/a3/3023a3e144207344ac773a7e58b983e8.jpg)";
            }
        }
    }

useEffect(() => {
    let calculatePrice = 0;
    switch(size) {
        case "Mala":
            calculatePrice =  15;
            break;
        case "Srednja":
            calculatePrice = 25;
            break;
        case "Velika":
            calculatePrice = 35;
            break;
        case "Jumbo":
            calculatePrice = 50;
            break;
        default: break;
    }
 
    switch(inscriptions) {
        case "Sa natpisom":
            calculatePrice += 5;
            break;
        default: break;
    }

    switch(shape) {
        case "Drugo":
            calculatePrice += 15;
            break;
        default: break;
    } 

    switch(floorsNumber) {
        case "2":
            calculatePrice +=  18;
            break;
        case "3":
            calculatePrice += 36;
            break;
        case "4":
            calculatePrice += 54;
            break;
        case "5":
            calculatePrice += 72;
            break;
        default: break;
    }

    setFullPrice(calculatePrice);
}, [size, inscriptions, shape, floorsNumber])

    return ( 
        <div>
            < Navbar />
            <div className="specialOrder" style={{paddingTop: "1%"}}>
                <Avatar className="avatar" sx={{ bgcolor: blue[500], margin: "auto" }}>
                    < CakeIcon />
                </Avatar>
                <Typography variant="h5" gutterBottom component="div" mb={ 3 } textAlign={"center"} sx={{ cursor: "default" }}>
                    Odabir torte
                </Typography>
                <div className="formAndMod" style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                    <div className="forma">
                        <form>
                            <FormControl fullWidth required>
                                <InputLabel required id="demo-simple-select-required-label">Vrsta</InputLabel>
                                <Select 
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Vrsta"
                                    value={sort}
                                    onChange={(event) => {
                                        setSort(event.target.value);
                                        setLastSelected("sort");
                                    }
                                    }
                                >
                                    <MenuItem value={"Rođendanska"}>Rođendanska</MenuItem>
                                    <MenuItem value={"Svadbena"}>Svadbena</MenuItem>
                                    <MenuItem value={"Druga prilika"}>Druga prilika</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{marginTop: "4%"}}>
                                <InputLabel required id="demo-simple-select-label">Veličina</InputLabel>
                                <Select required 
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Veličina"
                                    value={size}
                                    onChange={(event) => {
                                        setSize(event.target.value);
                                        setLastSelected("size");
                                    }
                                    }
                                >
                                    <MenuItem value={"Mala"} style={{display: "flex", justifyContent: "space-between"}}>Mala (do 10 osoba)<p style={{margin: 0}}>15KM</p></MenuItem>
                                    <MenuItem value={"Srednja"} style={{display: "flex", justifyContent: "space-between"}}>Srednja (11 - 20 osoba)<p style={{margin: 0}}>25KM</p></MenuItem>
                                    <MenuItem value={"Velika"} style={{display: "flex", justifyContent: "space-between"}}>Velika (21 - 30 osoba)<p style={{margin: 0}}>35KM</p></MenuItem>
                                    <MenuItem value={"Jumbo"} style={{display: "flex", justifyContent: "space-between"}}>Jumbo (30+ osoba)<p style={{margin: 0}}>50KM</p></MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{marginTop: "4%"}}>
                                <InputLabel required id="demo-simple-select-label">Natpis</InputLabel>
                                <Select required 
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Natpis"
                                    value={inscriptions}
                                    onChange={(event) => {
                                        setInsriptions(event.target.value);
                                        setLastSelected("inscriptions");
                                    }}
                                >
                                    <MenuItem value={"Bez natpisa"}>Bez natpisa</MenuItem>
                                    <MenuItem value={"Sa natpisom"} style={{display: "flex", justifyContent: "space-between"}}>Sa natpisom<p style={{margin: 0}}>+ 5KM</p></MenuItem>
                                </Select>
                            </FormControl>
                            {inscriptions === "Sa natpisom" ? <TextField fullWidth required id="outlined-required" label="Tekst natpisa" 
                            autoComplete="off" value={textInscriptions} onChange={(e) => setTextInsriptions(e.target.value)} 
                            style={{marginTop: "4%"}}/> : ""}
                            <FormControl fullWidth required style={{marginTop: "4%"}}>
                                <InputLabel required id="demo-simple-select-required-label">Oblik</InputLabel>
                                <Select required 
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    label="Oblik"
                                    value={shape}
                                    onChange={(event) => {
                                        setShape(event.target.value)
                                        setLastSelected("shape");
                                    }}
                                >
                                    <MenuItem value={"Krug"}>Krug</MenuItem>
                                    <MenuItem value={"Kvadrat"}>Kvadrat</MenuItem>
                                    <MenuItem value={"Srce"}>Srce</MenuItem>
                                    <MenuItem value={"Drugo"} style={{display: "flex", justifyContent: "space-between"}}>Drugo<p style={{margin: 0}}>+ 15KM</p></MenuItem>
                                </Select>
                            </FormControl>
                            {shape === "Drugo" ? <TextField fullWidth required id="outlined-required" label="Željeni oblik" 
                            autoComplete="off" value={otherShape} onChange={(e) => setOtherShape(e.target.value)} 
                            style={{marginTop: "4%"}}/> : ""}
                            <FormControl fullWidth style={{marginTop: "3%", marginBottom: "2%"}}>
                                <FormLabel required  id="demo-row-radio-buttons-group-label">Broj spratova</FormLabel>
                                
                                <RadioGroup required style={{margin: "auto", paddingLeft: "30px"}}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={floorsNumber}
                                >
                                    <FormControlLabel value={"1"} control={<Radio required={true} />} label="1" style={{paddingRight: "30px"}} onChange={(e) => {
                                        setFloorsNumber(e.target.value);
                                        setLastSelected("floorsNumber");
                                    }} />
                                    <FormControlLabel value={"2"} control={<Radio required={true} />} label="2" style={{paddingRight: "30px"}} onChange={(e) => {
                                        setFloorsNumber(e.target.value);
                                        setLastSelected("floorsNumber");
                                    }} />
                                    <FormControlLabel value={"3"} control={<Radio required={true} />} label="3" style={{paddingRight: "30px"}} onChange={(e) => {
                                        setFloorsNumber(e.target.value);
                                        setLastSelected("floorsNumber");
                                    }} />
                                    <FormControlLabel value={"4"} control={<Radio required={true} />} label="4" style={{paddingRight: "30px"}} onChange={(e) => {
                                        setFloorsNumber(e.target.value);
                                        setLastSelected("floorsNumber");
                                    }}/>
                                    <FormControlLabel value={"5"} control={<Radio required={true} />} label="5" style={{paddingRight: "30px"}} onChange={(e) => {
                                        setFloorsNumber(e.target.value);
                                        setLastSelected("floorsNumber");
                                    }} />
                                </RadioGroup>
                                <div className="helper" style={{display: "flex", justifyContent: "space-between"}}>
                                    <FormHelperText>Po broju spratova (2 ili više)</FormHelperText><FormHelperText>+ 18KM</FormHelperText></div>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Datum dostave"
                                    minDate={new Date(NewDate)}
                                    maxDate={new Date(NewDate2)}
                                    value={date}
                                    onChange={(newValue) => {
                                        let NewValue = moment(newValue, 'MM/DD/YYYY').format("MM/DD/YYYY");
                                        NewValue=NewValue.split('T')[0];
                                        setDate(NewValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} required autoComplete="off" style={{width: "100%"}}/>}
                                />
                            </LocalizationProvider>
                            <TextareaAutosize
                            aria-label="minimum height"
                            minRows={5}
                            maxRows={5}
                            placeholder="Dodatne napomene"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            style={{width: "100%", marginTop: "4%", marginBottom: "5%", padding: "5px"}}
                            />   
                        </form>
                    </div>
                    {lastSelected !== "" && <> <div className="model" style={{width: "30%", marginLeft: "5%"}}>
                    <Typography variant="h6" gutterBottom component="div" mt={ 2 } ml={5} sx={{ cursor: "default", fontSize: "18px" }}>
                    PRIKAZ MODELA
                    </Typography> 
                    <p className="modelImage"
                        style={{
                            backgroundImage: setImageModel(sort, size, inscriptions, shape, floorsNumber) 
                        }}
                    ></p>
                    { fullPrice !== 0 && <> <Typography variant="h6" gutterBottom component="div" mt={ 5 } textAlign={"center"} sx={{ cursor: "default", fontSize: "18px" }}>Cijena: {fullPrice}.00KM</Typography></> }
                </div> </>} 
            </div>
            < MakeSpecialOrder User={user} sort={sort} size={size} inscriptions={inscriptions} textInscriptions={textInscriptions} floorsNumber={floorsNumber} shape={shape} otherShape={otherShape} date={date} notes={notes} fullPrice={fullPrice} />
        </div>
    </div>
    );
}
 
export default SpecialOrder;