import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Library management api",
    endpoints: {
      books: "/api/books",
      borrow: "/api/borrow",
    },
  });
});

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("error handler:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
      error: {
        message: error.message,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
    });
  }
);

export default app;
