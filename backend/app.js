const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Users = require("./models/users");
const Sweet = require("./models/sweet");
const Basket = require("./models/basket");
const Order = require("./models/orders");
const SpecialOrders = require("./models/specialOrders");

var fs = require('fs');
var nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://belma:svadba1712@cluster0.kn4cg.mongodb.net/slatkiKutak?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.post("/", async (req, res) => {
  let user = await Users.find({
    name: req.body.name,
    password: req.body.password,
  });
  if (user.length === 0) {
    res.json("User not found");
  }
  res.json(user[0]);
});

app.get("/Guest", (req, res) => {
  const guestUser = new Users({
    name: "guest",
    password: "guest",
    role: 3,
  });
  res.json(guestUser);
});

app.get("/GetGuest", async (req, res) => {
  let guest = await Users.find({ role: 3 });
  res.json(guest);
});

app.post("/SignUp", (req, res) => {
  const newUser = new Users({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    role: 2,
  });
  newUser.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(newUser);
    }
  });
});

app.get("/ifUserExist/:name", async (req, res) => {
  const user = await Users.find({name: req.params.name});
  if(user.length > 0) {
    res.json(true);
  } else {
    res.json(false);
  }
})

app.post("/Sweet/new", async (req, res) => {
  const sweet = new Sweet({
    imageUrl: req.body.ImageUrl,
    name: req.body.Name,
    price: req.body.Price,
    categoryId: req.body.CategoryId,
  });
  sweet.save();
  res.json(sweet);
  sendMails(req.body.Name);
});

const sendMails = async(name) => {
  const users = await Users.find();
  for (let i = 0; i < users.length; i++) { 
    if(users[i].email !== "") {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'example@gmail.com',
          pass: 'test123'        
        }
      });
    
      fs.readFile('./mails.html', {encoding: 'utf-8'}, function (err, html) {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from: 'belma.dedic2019@size.ba',
            to: users[i].email,
            subject: 'Slatki kutak - nova poslastica',
            html: html
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });  
        }
      });
    }
  }
}

app.get("/Home", async (req, res) => {
  const sweet = await Sweet.find();
  res.json(sweet);
});

app.delete("/Sweet/delete/:id", async (req, res) => {
  const sweet = await Sweet.findByIdAndDelete(req.params.id);
  res.json(sweet);
});

app.get("/Sweet/edit/:id", async (req, res) => {
  const editSweet = await Sweet.findById(req.params.id);
  res.json(editSweet);
});

app.post("/Sweet/edit/:id", async (req, res) => {
  const update = await Sweet.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        imageUrl: req.body.ImageUrl,
        name: req.body.Name,
        categoryId: req.body.CategoryId,
        price: req.body.Price,
      },
    }
  );
  update.save();
  res.json(update);
});

app.get("/Sweet/findByName/:name", async (req, res) => {
  var thename = req.params.name;
  const findSweet = await Sweet.find({
    name: { $regex: new RegExp(thename, "i") },
  });
  res.json(findSweet);
});

app.get("/Sweet/findByCategory/:categoryId", async (req, res) => {
  const findSweet = await Sweet.find({ categoryId: req.params.categoryId });
  res.json(findSweet);
});

app.post("/Sweet/addInBasket", async (req, res) => {
  const basket = new Basket({
    sweetId: req.body.SweetId,
    userId: req.body.UserId,
  });
  basket.save();
  res.json(basket);
});

app.get("/Sweet/basket/:id", async (req, res) => {
  const basket = await Basket.find({ userId: req.params.id });
  res.json(basket);
});

app.get("/Sweet/basket/sweet/:id", async (req, res) => {
  const sweet = await Sweet.find({ _id: req.params.id });
  res.json(sweet);
});

app.delete("/Sweet/basket/delete/:userId/:sweetId", async (req, res) => {
  const basket = await Basket.findOneAndDelete({
    userId: req.params.userId,
    sweetId: req.params.sweetId,
  });
  res.json(basket);
});

app.post("/Sweet/addOrders", async (req, res) => {
  const basket = await Basket.find({ userId: req.body.UserId });
  let productIds = [];
  for (let i = 0; i < basket.length; i++) {
    productIds.push(basket[i].sweetId);
  }
  const order = new Order({
    userId: req.body.UserId,
    productListId: productIds,
    status: req.body.Status,
    firstName: req.body.FirstName,
    lastName: req.body.LastName,
    adress: req.body.Adress,
    city: req.body.City,
    phoneNumber: req.body.PhoneNumber,
    date: req.body.date,
    totalPrice: req.body.TotalPrice,
  });
  order.save();
  for (let i = 0; i < basket.length; i++) {
    await Basket.findByIdAndDelete({ _id: basket[i]._id });
  }
  res.json(order);
});

app.get("/Sweet/Orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.get("/Sweet/orders/:id", async (req, res) => {
  const orders = await Order.find({ userId: req.params.id });
  res.json(orders);
});

app.get("/Sweet/orders/sweet/:id", async (req, res) => {
  const sweet = await Sweet.find({ _id: req.params.id });
  res.json(sweet[0]);
});

app.get("/Sweet/findByStatus/:status", async (req, res) => {
  const findOrders = await Order.find({ status: req.params.status });
  res.json(findOrders);
});

app.get("/Sweet/findByStatus/:userId/:status", async (req, res) => {
  const findOrders = await Order.find({
    userId: req.params.userId,
    status: req.params.status,
  });
  res.json(findOrders);
});

app.get("/Sweet/Orders/:userId", async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

app.post("/Sweet/Orders/order/:id", async (req, res) => {
  const update = await Order.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: req.body.Status,
      },
    }
  );
  update.save();
  res.json(update);
});

app.post("/Sweet/subscribe/:id", async (req, res) => {
  const update = await Users.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        email: req.body.email
      },
    }
  );
  update.save();
  res.json(update);
});

app.get("/ifSubscribeExist/:email", async (req, res) => {
  const user = await Users.find({email: req.params.email});
  if(user.length > 0) {
    res.json(true);
  } else {
    res.json(false);
  }
})

app.post("/Sweet/addSpecialOrder", async (req, res) => {
  const specialOrder = new SpecialOrders({
    userId: req.body.userId,
    sort: req.body.sort,
    size: req.body.size,
    inscriptions: req.body.inscriptions,
    textInscriptions: req.body.textInscriptions,
    floorsNumber: req.body.floorsNumber,
    shape: req.body.shape,
    otherShape: req.body.otherShape,
    date: req.body.date,
    notes: req.body.notes,
    fullPrice: req.body.fullPrice,
    status: req.body.Status,
    firstName: req.body.FirstName,
    lastName: req.body.LastName,
    adress: req.body.Adress,
    city: req.body.City,
    phoneNumber: req.body.PhoneNumber,
    dateOfOrder: req.body.dateOfOrder,
  });
  specialOrder.save();
  res.json(specialOrder);
});

app.get("/Sweet/SpecialOrders", async (req, res) => {
  const specialOrders = await SpecialOrders.find();
  res.json(specialOrders);
});

app.get("/Sweet/SpecialOrders/:id", async (req, res) => {
  const specialOrders = await SpecialOrders.find({ userId: req.params.id });
  res.json(specialOrders);
});

app.get("/Sweet/findByStatusSpecial/:userId/:status", async (req, res) => {
  const findSpecialOrders = await SpecialOrders.find({
    userId: req.params.userId,
    status: req.params.status,
  });
  res.json(findSpecialOrders);
});

app.get("/Sweet/findByStatusSpecial/:status", async (req, res) => {
  const findSpecialOrders = await SpecialOrders.find({ status: req.params.status });
  res.json(findSpecialOrders);
});

app.post("/Sweet/SpecialOrders/specialOrder/:id", async (req, res) => {
  const update = await SpecialOrders.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: req.body.Status,
      },
    }
  );
  update.save();
  res.json(update);
});

app.listen(3000, () => {
  console.log("Server started!");
});
