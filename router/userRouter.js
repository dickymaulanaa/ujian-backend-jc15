const express = require("express");
const db = require("../database");
const router = express.Router();
const {
  
    createJWTToken,
    hashPassword,
} = require("../helper");

router.post("/", (req, res) => {
    let { username, password, email, alamat } = req.body;
    password = hashPassword(password);
    // Add data to database
    const sql = `INSERT INTO users (uid, username, email, password, role, status) VALUES 
    ('${Date.now}', '${username}', '${email}','${password}', 2, 1)`;
    db.query(sql, (err) => {
      if (err) return res.send(500).send(err);
    
      const responseData = { ...result[0] };
          const token = createJWTToken(responseData);
          responseData.token = token;
          return res.status(200).send(responseData);
      });
    });

    
 
    module.exports =router;