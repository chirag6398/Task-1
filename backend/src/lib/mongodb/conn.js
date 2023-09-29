import { mongoose } from "./index.js"


export const connectMongodb = async () => {
    try {
        const DB = process.env.DB;
        const conn = await mongoose.connect("mongodb+srv://chirag:6398356528@cluster0.gha33.mongodb.net/project?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        if (conn) {
            console.log("mongodb connected")
            return mongoose.connection;
        }
    } catch (err) {
        console.log("connction failed", err)
    }

}

