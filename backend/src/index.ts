import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;

console.log(typeof PORT);

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server started at: http://localhost:${PORT}`);
  }
});
