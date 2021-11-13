require("dotenv").config();
const Express = require("express");
const db = require("./db");

const app = Express();

// Import middlewares as a bundle
const middleware = require("./middleware");

// Import controllers as a bundle
const controllers = require("./controller");

// Parse the body of all requests as JSON
app.use(middleware.CORS)
app.use(Express.json());
app.use("/user", controllers.User);

let daily = require('./controller/dailycontroller')
let medical = require('./controller/medicalcontroller')
app.use('/daily', daily)
app.use('/medical', medical)


const resetDatabase = {force:true}
db.authenticate()
// add a resetDatabase inside the db.sync to drop all your tables if needed
// example:  .then(() => db.sync(resetDatabase))
  .then(() => db.sync())
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening on ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
