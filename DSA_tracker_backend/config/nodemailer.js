const nodemailer = require("nodemailer");
const express = require("express");
require('dotenv').config(); 
const transporter = nodemailer.createTransport({
  
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
   


  },
});

module.exports = transporter;
