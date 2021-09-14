import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"

const server = express();
const port = 3001;

server.use(cors())
server.use(express.json())

server.listen(port, () => {
    console.log("server started on port", port)
})