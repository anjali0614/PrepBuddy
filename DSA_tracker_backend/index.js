const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const { cloudinaryConnect } = require("./config/cloudinary"); 
const errorMiddleware = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes")
const sheetRoutes = require("./routes/sheetRoutes");

dotenv.config();
console.log("Loaded MONGODB_URI =>", process.env.MONGODB_URI);


const app = express();

//Middlewares
app.use(cors({
  origin: [process.env.CLIENT_URL || "http://localhost:3000"],
  credentials: true,
}));

app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

connectDB();
cloudinaryConnect();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`, req.body);
  next();
});


// Routes
app.use("/app/v1/auth", authRoutes);
app.use("/app/v1/profile", userRoutes);
app.use("/app/v1/sheets", sheetRoutes);




// Error handling
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
