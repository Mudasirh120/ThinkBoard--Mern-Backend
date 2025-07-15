import express from "express";
import notesRouter from "./routes/notes.routes.js";
import connectDd from "./db/mongodb.js";
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";
const app = express();
// middleware is a func that runs between req & res
app.use(express.json()); // middleware to access req.body in json
// rate limiting is use to limit req so server doesn't crash
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(rateLimiter);
app.use("/api/notes", notesRouter);
const PORT = process.env.PORT || 5001;

connectDd().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
