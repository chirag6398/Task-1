import { dotenv } from "./src/lib/index.js";
import { startApp, useGraceFullShutdown  } from './app.js';

dotenv.config({ path: "./.env" });
(async () => {
    console.log('Starting app...');
    const { app, dbConnection, server } = await startApp();
    console.log('Registering shutdown...');
    useGraceFullShutdown({ server, dbConnection });
})();
