// Sets up an Express app
const { express, bodyParser } = require('./modules');
const authRouter = require('./api/auth');
const userRouter = require('./api/user');

const app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.use(authRouter);
app.use(userRouter);

module.exports = app;
