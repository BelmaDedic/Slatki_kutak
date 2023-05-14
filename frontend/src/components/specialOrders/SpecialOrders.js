import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import FindByStatusSpecial from "./FindByStatusSpecial";
import SpecialOrdersAdmin from './SpecialOrdersAdmin';

let logedUser = null;

const SpecialOrders = ({User}) => {
  const location = useLocation();
  const [user, setUser] = useState(location.state.user);
  const [specialOrder, setSpecialOrder] = useState("");

  logedUser = location.state.user;

  useEffect(() => {
    setUser(logedUser);
  }, [logedUser])

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const url = "http://localhost:3000";
    const fetchedData = await fetch(url + "/Sweet/SpecialOrders/" + user._id);
    const data = await fetchedData.json();
    setSpecialOrder(data);
  };
    
  return ( 
    <>
    < Navbar />
    {user.role === 2 && (
      <div className="specialOrders">
        <div className="titlesFind">
          <div className="ordersTitle">
            <p className="specialTitle">Moje posebne narudžbe</p>
          </div>
          <div className="findByStatus">
            <FindByStatusSpecial passSetSpecialOrder={setSpecialOrder} user={user} />
          </div>
        </div>
        <div
          class="container bootstrap snippets bootdeys"
          style={{ cursor: "default" }}
          key={specialOrder._id}
        >
        <div class="row">
          <>
          {specialOrder && specialOrder.length === 0 && <div className="noData" style={{textAlign: "center", fontSize: "25px", marginTop: "10%"}}>Nema pronađenih posebnih narudžbi!</div>}
            {specialOrder &&
              Object.values(specialOrder).map((order) => (
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 content-card d-flex justify-content-center">
                  <div class="card-big-shadow">
                    <div
                      class="card card-just-text"
                      data-background="color"
                      data-color="purple"
                      data-radius="none"
                    >
                      <div
                        style={{
                          backgroundColor: "blueviolet",
                          width: "15px",
                          height: "15px",
                          margin: "auto",
                          marginBottom: "-10%",
                          marginTop: "2%",
                          borderRadius: "30px",
                        }}
                      ></div>
                      <div class="content">
                        <h6 class="category">{order.dateOfOrder}</h6>
                        <h4 class="title2">Narudžba</h4>
                        <div class="description">
                          Vrsta torte: {order.sort} <br/>
                          Veličina: {order.size} <br/>
                          {order.inscriptions} <br/>
                          {order.inscriptions === "Bez natpisa" ? "" : "Natpis: " + order.textInscriptions} 
                          {order.textInscriptions === "" ? "" : <br></br>}
                          Broj spratova: {order.floorsNumber} <br/>
                          Oblik torte: {order.shape !== "Drugo" ? order.shape : order.otherShape} 
                          <br/>
                          Isporuka: {order.date} <br/>
                          {order.notes !== "" ? "Dodatne napomene: " + order.notes : ""}
                        </div>
                        <div
                          class="description"
                          style={{ fontWeight: 600, marginTop: "6%" }}
                        >
                          Ukupan iznos: {order.fullPrice}.00KM
                        </div>
                        {order.status === 0 ? (
                          <div
                            class="description"
                            style={{
                              color: "black",
                              marginTop: "5%",
                              fontWeight: 450,
                            }}
                          >
                            Na čekanju
                          </div>
                        ) : (
                          ""
                        )}
                        {order.status === 1 ? (
                          <div
                            class="description"
                            style={{
                              color: "green",
                              marginTop: "5%",
                              fontWeight: 450,
                            }}
                          >
                            Odobreno
                          </div>
                        ) : (
                          ""
                      )}
                      {order.status === 2 ? (
                        <div
                          class="description"
                          style={{
                            color: "red",
                            marginTop: "5%",
                            fontWeight: 450,
                          }}
                        >
                          Odbijeno
                        </div>
                      ) : (
                        ""
                    )}
                  </div>
                </div>
                {/* end card  */}
              </div>
            </div>
          ))}{" "}
          </>
        </div>
      </div>
    </div>
  )}
    {user.role === 1 && < SpecialOrdersAdmin />}
    </>
  );
}
 
export default SpecialOrders;