import { express, connectMongodb, cookieParser, cors, morgan } from "./lib/index.js";
import { projectRouter } from "./routes.js"

const startApp = async () => {
    try {
        const app = express();
        const PORT = process.env.PORT || 5000;
        app.use(cors());
        app.use(morgan('dev'))
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(projectRouter);
        const dbConnection = await connectMongodb();
        const server = await app.listen(PORT, () => {
            console.log(`server is running at port ${PORT}`);
        });
        return { app, dbConnection, server }
    } catch (err) {
        console.log(err)
    }
}

const useGraceFullShutdown = async ({
    server = null,
    dbConnection,
}) => {
    process.on('SIGINT', handleExit({ server, dbConnection }));
    process.on('SIGTERM', handleExit({ server, dbConnection }));
};

export const handleExit =
    ({ server = null, dbConnection }) =>
        async () => {

            await closeConnections({ dbConnection });
            closeServer({ server });

        };

export const closeConnections = async ({
    dbConnection
}) => {
    dbConnection.close()
};

export const closeServer = ({ server }) => {
    server.close();
};

export { startApp, useGraceFullShutdown }