import { useEffect, useState } from "react";

const RenderOrderItems = ({ id }) => {
  const url = "http://localhost:3000";
  const [orderItem, setOrderItem] = useState(null);

  useEffect(() => {
    let data = fetch(url + "/Sweet/orders/sweet/" + id)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    data.then((result) => {
      setOrderItem(result);
    });
  }, [id]);

  return (
    <>
      {orderItem && (
        <div key={orderItem._id}>
          {orderItem.name} - {orderItem.price}KM
        </div>
      )}
    </>
  );
};

export default RenderOrderItems;