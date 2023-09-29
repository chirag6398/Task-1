import { express } from "../../lib/index.js";
import { projectService } from "./index.js";

const route = express.Router()

route.get("/", (req, res) => {
    res.send("its working");
});
route.get("/projects",projectService.getAll)

export { route as projectRouter }