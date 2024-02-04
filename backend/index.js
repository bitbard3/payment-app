import express from "express"
import { router } from "./routes/routes"

const app = express()
const port = 3000

app.use('/api/v1', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})