// Import the required modules
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";  // Needed for ES modules

import nodemailer from "nodemailer";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an instance of an Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serves static files from 'public' folder
app.use(express.static("pictures"));
app.use(express.static("sound"));
app.use('/java_scr', express.static(path.join(__dirname, 'java_scr'))); // Serves JavaScript files

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));  // Ensure views are located correctly

// Define the port
const PORT = 5500;

// Serve the index.ejs file
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/projects",(req,res)=>{
    res.render("projects")
})
app.get("/exp",(req,res)=>{
    res.render("exp")
})
app.get("/education",(req,res)=>{
    res.render("education")
})
app.get("/1stop",(req,res)=>{
    res.render("intern_1stop")
})
app.get("/madh_res",(req,res)=>{
    res.render("madh_res")
})
app.get("/hs_res",(req,res)=>{
    res.render("hs_res")
})
app.get("/skill",(req,res)=>{
    res.render("skills")
})
app.get("/contact",(req,res)=>{

    res.render("contact")
})

app.post("/send_mail",(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let text = req.body.text;



    // Send OTP to user via email using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or any email service
        secure: true,
        port:465,
        auth: {
          user: 'rishabhgarai7@gmail.com',
          pass: 'xgabndbrcfwliisj' // Use environment variables for production
        }
      });
      //sending otp thrugh mail
      const mailOptions = {
        from: email,
        to: 'rishabhgarai7@gmail.com',
        subject: 'Rishabh tera potfolio ka review aya hem, vai 😊',
        text: `My name is ${name}.Hi Rishabh I want to say that ${text}.\n Sending from ${email}. `
      };

      // Send the OTP email
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.log('Something went wront, the error is ', error);
          res.render("contact");
        } else {
          console.log('Mail send to your eamil  Rishabh' + info.response);
          // Store the OTP in the session (or use any other temporary storage)
          res.render("contact");
    }
})

    
})
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
