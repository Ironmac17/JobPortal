import './config/instrument.js'
import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/db.js"
import * as Sentry from "@sentry/node";
import { clerbWebhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'

//express
const app = express()

//connect to db
await connectDB()
await connectCloudinary()


//middlewares
app.use(cors())
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send("Helllo ")
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks',clerbWebhooks)
app.use('/api/company', companyRoutes)

//port
const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
