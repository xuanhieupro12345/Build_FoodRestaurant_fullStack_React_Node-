const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())// middleware is added to enable CORS for all routes.
//chuyển data API qua hình thức json
app.use(express.json(/* cho kích cỡ dữ liệu */{ limit: "10mb" }))// middleware is added to parse JSON payloads from incoming requests.

const PORT = process.env.PORT || 8080

//mongodb connection 
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("connect to database"))
    .catch((err) => console.log(err))


// schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
})

//
const userModle = mongoose.model("user", userSchema)

// api

app.get("/", (req, res) => {
    res.send("server is running")
})

// app.post("/signup", async (req, res) => {
//     console.log(req.body)
//     const { email } = req.body

//     await userModle.findOne({ email: email }, (err, result) => {
//         console.log(result)
//         console.log(err)
//         if (result) {
//             res.send({ message: "email id is already register" })
//         } else {
//             const data = userModle(req.body)
//             const save = data.save()
//             res.send({ message: "successfully sign up" })
//         }
//     })
// })

// api signup
app.post("/signup", async (req, res) => {
    // console.log(req.body);
    const { email } = req.body; // kiểm tra email có trong database hay không

    try {
        const result = await userModle.findOne({ email: email });
        console.log(result);

        if (result) {
            res.send({ message: "email id is already registered", alert: false });
        } else {
            const data = new userModle(req.body);
            await data.save();
            res.send({ message: "successfully sign up", alert: true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "An error occurred" });
    }
});

//api login
app.post("/login", async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    try {
        const result = await userModle.findOne({ email: email, password: password });
        // console.log(result)
        if (result) {
            const dataSend = {
                id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            }
            console.log(dataSend)
            res.send({ message: "Login is successfully", alert: true, data: dataSend })
        } else {
            res.send({ message: "Invalid email or password, please sign up ", alert: false })
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "An error occurred" })

    }
})


// schema
const schemaProduct = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
})

const productModle = mongoose.model("uploadproduct", schemaProduct)

//save product is data
//api new product 
app.post("/uploadProduct", async (req, res) => {
    // console.log(req.body)
    /* const { image } = req.body; */
    try {
        /* const result = await productModle.findOne({ image: image })
        console.log(result) */
        /* if (result) {
            res.send({ message: "image id is already registered", alert: false })
        } else { */
        const data = await productModle(req.body)
        const dataSave = await data.save()

        res.send({ message: "upload product successfully "/* , alert: true  */ })
        /* } */
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "An error occurred" })

    }
})

// hiển thị dữ liệu của uploadProduct
app.get("/product", async (req, res) => {
    const data = await productModle.find({})
    res.send(JSON.stringify(data))
})




app.listen(PORT, () => console.log("server is running at port :" + PORT))