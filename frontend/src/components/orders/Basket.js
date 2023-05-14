import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from '../navbar/Navbar';
import { Box } from "@mui/system";
import MakeOrder from './MakeOrder';
import { useLocation } from "react-router-dom";

const url = "http://localhost:3000";
const noImageFound = "https://www.societaallestero.com/wp-content/themes/consultix/images/no-image-found-360x250.png";
let logedUser = null;

const Basket = ({User}) => {
  const location = useLocation();
  const [basket, setBasket] = useState();
  const [user, setUser] = useState(location.state.user);

  logedUser = location.state.user;

  useEffect(() => {
    setUser(logedUser);
  }, [logedUser])
  
  let total = 0;
  let totalParse;

  useEffect(() => {
    setUser(logedUser);
    fetching();
    }, []);

  const fetching = async() => {
    await fetchData();
  }

  const fetchData = async () => {   
    let ids = [];  
    const fetchedData = await fetch(url + "/Sweet/Basket/" + user._id);
    const data = await fetchedData.json();
    for(let i = 0; i < Object.keys(data).length; i++) {
      ids.push(data[i].sweetId);
    }
    fetchSweets(ids);
  };

  const fetchSweets = async(sweetIds) => {
    let cake = [];
    for(let i = 0; i < sweetIds.length; i++){
      cake.push(fetchSweetById(sweetIds[i]));
    }
    Promise.all(cake).then((value) => {setBasket(value)});
    return <></>
  }

  const fetchSweetById = async(id) => {
    const fetched = await fetch(url + "/Sweet/basket/sweet/" + id);
    const realData = await fetched.json();
    return realData[0];
  }

  const deleteSweet = (id) => {
    fetch(url + "/Sweet/basket/delete/" + user._id + "/" + id, {
      method: "DELETE",
    }).then(() => {
      fetchData();
    });
  };

  const getTotalPrice = (price) => {
    let newPrice = parseFloat(price);
    total += newPrice;
    totalParse = parseFloat(total).toFixed(2);
    return <></>;
  }

  return ( 
    <div className="basket">
      < Navbar />
      <div className="basketTitle" style={{paddingTop: "0.5%"}}>
        <p>Poslastice u korpi</p>
      </div>
      <div className="sweetFlex">
        {basket && basket.length === 0 && <div className="noData" style={{textAlign: "center", fontSize: "25px", marginTop: "8%"}}>Trenutno nema poslastica u korpi!</div>}
        {basket && Object.values(basket).map((sweet) => (
          <div className="sweetFrame">
            <div className="sweetOffer" key={sweet.id}>
              <div className="image">
                <p
                  style={{
                    backgroundImage: `url(${
                      sweet.imageUrl === "" ? noImageFound : sweet.imageUrl
                    })`,
                  }}
                ></p>
              </div>
              <div className="name" style={{marginTop: "-6%"}}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  <p>{sweet.name}</p>
                </Typography>
              </div>
              <div className="price" style={{marginTop: "-5%", marginBottom: "-2%"}}>
                <Typography variant="body2" gutterBottom component="div">
                  <p>{sweet.price}KM</p>
                  {getTotalPrice(sweet.price)}
                </Typography>
              </div>
              <hr />
              <div className="deleteAndUpdate">
                <p className="delete" onClick={() => deleteSweet(sweet._id)}>
                  <DeleteIcon fontSize="large" />
                </p>
              </div>
            </div>
          </div>
        ))
      }
      </div>
      {basket && basket.length > 0 &&
        <><><Typography variant="h6" textAlign={"center"} gutterBottom component="div" sx={{ mt: 5, mb: 1, fontSize: 18 }}>
              Ukupno za platiti: {totalParse}KM
            </Typography><Box textAlign='center'>
                <MakeOrder User={user} totalParse={totalParse} />
              </Box></></>
      } 
    </div>
  );
}
 
export default Basket;