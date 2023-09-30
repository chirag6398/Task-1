import { express } from "../../lib/index.js";
import { projectService } from "./index.js";

const route = express.Router()

route.get("/projects",projectService.getAll)
route.get("/projects/filter",projectService.filter);

export { route as projectRouter }