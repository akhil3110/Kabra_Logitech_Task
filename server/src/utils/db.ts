import mongoose from "mongoose"

export const connectDb = async () => {

    mongoose.connect("mongodb+srv://testUser:3zlzXNI4GS8Fi96a@cluster0.zndmteo.mongodb.net/").then((c)=>{
        console.log(`Connected to ${c.connection.host}`);
    })
    
}