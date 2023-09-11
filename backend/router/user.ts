// import express, { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import User from "../models/user";
// import validate from "../middleware/validate";

// const router = express.Router();

// router.get("/", async (req: Request, res: Response) => {
//   res.send("hello from property backend server");
// });

// // route for register

// router.post("/api/register", async (req: Request, res: Response) => {
//   const { name, email, password, cpassword } = req.body;

//   if (!name || !email || !password || !cpassword) {
//     return res.status(403).json({ error: "Please fill up all fields" });
//   }

//   if (!password || !cpassword) {
//     return res.status(401).json({ error: "Passwords are required!" });
//   }

//   const check = await User.findOne({ email: email });
//   if (check) {
//     return res.status(401).json({ msg: "user already exists" });
//   }

//   try {
//     const newUser = new User({ name, email, password });
//     await newUser.save();
//     res.status(200).json({ msg: "user created successfully" });
//   } catch (e) {
//     res.status(400).json({ msg: e });
//   }
// });

// // route for login 
// router.post("/api/login", async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ msg: "field missing" });
//   }
//   try {
//     const findEmail = await User.findOne({ email: email });

//     if (findEmail) {
//       const userPass = await bcrypt.compare(password, findEmail.password);

//       if (!userPass) {
//         return res.status(400).json({ msg: "invalid credentials" });
//       } else {
//         // Generate the user token
//         const userToken = await findEmail.generateToken();
//         const userId = findEmail._id; 

//         if (!userToken) {
//           return res.status(500).json({ msg: "internal server error" });
//         } else {
//           res.status(200).json({
//             msg: "user logged in successfully",
//             token: userToken,
//             userId: userId 
//           });
//         }
//       }
//     } else {
//       return res.status(404).json({ msg: "user not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "error in login", error: error });
//   }
// });

// router.put("/api/login/:id", async (req: Request, res: Response) => {
//   console.log(req.body);
// });

// // route for Property page

// router.get("/api/property", validate, (req: Request, res: Response) => {
//   console.log(req.correctUser);

//   const finalUser = req.correctUser;

//   res.send(finalUser);
// });

// export default router;
