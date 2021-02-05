const express = require("express");
const db = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  const { time, location, status } = req.query;
  let sql = `select 
  m.name,
  m.release_date,
  m.release_month,
  m.release_year,
  m.duration_min,
  m.genre,
  m.description,
  ms.status,
  l.location,
  st.time
    from movies m join schedules s on m.id = s.id
    join movie_status ms on ms.id = m.status
    join show_times st on s.time_id = st.id
    join locations l on s.location_id = l.id`;

  if (time && location && status) {
    sql += ` WHERE ms.status = '${status}' AND l.location = '${location}' AND st.time = '${time}'`;
  } else if (status) {
    sql += ` WHERE ms.status = '${status}'`;
  } else if (location) {
    sql += ` WHERE l.location = '${location}' `;
  }else if (time) {
    sql += ` WHERE st.time= '${time}'`;
  }
  console.log(sql);
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send(data);
  });
});

router.post("/add", (req, res) => {
  const {
  name,
  genre,
  release_date,
  release_month,
  release_year,
  duration_min,
  description } = req.body;

  let sql = `INSERT INTO movies (name, genre, release_date, release_month, release_year,duration_min, description ) VALUES 
  ('${name}', '${genre}',${release_date},${release_month},${release_year},${duration_min}, '${description}')`;
  
  db.query(sql, req.body, (err, data) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(201).send({ message: "Data Created", status: "Created"});
  });
});

router.patch("/edit/:id", (req, res) => {
  let sql = `UPDATE movies SET status = '${req.body.status}' WHERE id = ${req.params.id}`;
  db.query(sql, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send({ message: "status has been changed" });
  });
});



module.exports = router;