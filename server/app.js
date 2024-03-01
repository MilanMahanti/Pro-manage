const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const authRouter = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

app.use(express.json());

const corsOptions = {
  origin: "https://pro-manage-frontend-rose.vercel.app",
  credentials: true,
};

app.use(helmet());
app.use(mongoSanitize());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1/user", authRouter);
app.use("/api/v1/task", taskRouter);

app.all("*", (req, res, next) => {
  next(new AppError("Route not found!", 404));
});

app.use(globalErrorHandler);

module.exports = app;
