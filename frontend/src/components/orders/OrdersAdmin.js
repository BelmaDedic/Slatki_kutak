import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FindByStatusAdmin from "./FindByStatusAdmin";
import RenderOrderItems from "./RenderOrderItems";

const url = "http://localhost:3000";
let logedUser = null;

const OrdersAdmin = () => {
  const [order, setOrder] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  logedUser = location.state.user;

  useEffect(() => {
    setUser(logedUser);
  }, [logedUser])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchedData = await fetch(url + "/Sweet/Orders");
    const data = await fetchedData.json();
    setOrder(data);
  };

  const editOrder = (id, status) => {
    const url = "http://localhost:3000/Sweet/Orders/order/" + id;
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        Status: status,
      }),
    }).then(() => {
      fetchData();
      navigate("/Sweet/orders", {state: {user:  logedUser}});
    });
  };

  return (
    <div className="ordersAdmin">
      <div className="titlesFind">
        <div className="ordersTitle">
          <p>Narudžbe</p>
        </div>
        <div className="findByStatus">
          <FindByStatusAdmin passSetOrder={setOrder} />
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
                <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 content-card d-flex justify-content-center">
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
                          {" "}
                          {Object.values(order.productListId).map((orderId) => (
                            <div>
                              <RenderOrderItems id={orderId} />
                            </div>
                          ))}{" "}
                        </div>
                        <div class="description" style={{ fontWeight: 600, marginTop: "6%" }}>
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

                        {order.status === 0 ? (
                          <div
                            class="buttons"
                            style={{
                              display: "flex",
                              gap: "5%",
                              marginTop: "5%",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="success"
                              style={{ marginRight: "5%", width: "80px" }}
                              onClick={() => editOrder(order._id, 1)}
                            >
                              Odobri
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              style={{ width: "80px" }}
                              onClick={() => editOrder(order._id, 2)}
                            >
                              Odbij
                            </Button>
                          </div>
                        ) : (
                          ""
                        )}
                        <p
                          class="category"
                          style={{
                            lineHeight: "120%",
                            marginTop: "10%",
                            marginBottom: "-20%",
                          }}
                        >
                          {order.firstName} {order.lastName} (
                          {order.phoneNumber}) <br /> {order.adress},{" "}
                          {order.city}
                        </p>
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
  );
};

export default OrdersAdmin;