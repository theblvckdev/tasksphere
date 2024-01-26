const express = require("express");
const authRoutes = require("./routes/auth.routes");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/auth/", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
