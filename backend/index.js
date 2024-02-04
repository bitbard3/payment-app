import express from "express"
import { router } from "./routes/routes.js"
import cors from "cors";

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})