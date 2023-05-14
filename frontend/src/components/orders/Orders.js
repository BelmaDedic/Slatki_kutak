import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import FindByStatus from "./FindByStatus";
import OrdersAdmin from "./OrdersAdmin";
import RenderOrderItems from "./RenderOrderItems";

const url = "http://localhost:3000";
let logedUser = null;

const Orders = ({ User }) => {
  const location = useLocation();
  const [user, setUser] = useState(location.state.user);
  const [order, setOrder] = useState("");

  logedUser = location.state.user;

  useEffect(() => {
    setUser(logedUser);
  }, [logedUser])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchedData = await fetch(url + "/Sweet/orders/" + user._id);
    const data = await fetchedData.json();
    setOrder(data);
  };

  return (
    <>
    < Navbar />
      {user.role === 2 && (
        <div className="orders">
          <div className="titlesFind">
            <div className="ordersTitle">
              <p>Moje narudžbe</p>
            </div>
            <div className="findByStatus">
              <FindByStatus passSetOrder={setOrder} user={user} />
            </div>
          </div>

          <div
            class="container bootstrap snippets bootdeys"
            style={{ cursor: "default" }}
            key={order._id}
          >
            <div class="row">
              <>
              {order && order.length === 0 && <div className="noData" style={{textAlign: "center", fontSize: "25px", marginTop: "8%"}}>Nema pronađenih narudžbi!</div>}
                {order &&
                  Object.values(order).map((order) => (
                    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 content-card d-flex justify-content-center">
                      <div class="card-big-shadow">
                        <div
                          class="card card-just-text"
                          data-background="color"
                          data-color="yellow"
                          data-radius="none"
                        >
                          <div
                            style={{
                              backgroundColor: "red",
                              width: "15px",
                              height: "15px",
                              margin: "auto",
                              marginBottom: "-10%",
                              marginTop: "2%",
                              borderRadius: "30px",
                            }}
                          ></div>
                          <div class="content">
                            <h6 class="category">{order.date}</h6>
                            <h4 class="title2">Narudžba</h4>
                            <div class="description">
                              {Object.values(order.productListId).map(
                                (orderId) => (
                                  <div>
                                    <RenderOrderItems id={orderId} />
                                  </div>
                                )
                              )}
                            </div>
                            <div
                              class="description"
                              style={{ fontWeight: 600, marginTop: "6%" }}
                            >
                              Ukupan iznos: {order.totalPrice}KM
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
      {user.role === 1 && <OrdersAdmin />}
    </>
  );
};

export default Orders;