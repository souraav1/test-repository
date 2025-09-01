import express from 'express';
import mysql from 'mysql2';

const app = express();

const db = mysql.createConnection(
  {
    host:"localhost",
    user:"root",
    password:"123456",
    database:"test"
  }
);

db.connect((err)=>
{
  if(err)
  {
    console.error("db connection failed:", err);
    return;
  }
  console.log("connected to database");
});


app.get('/', (req,res) => {
    res.send("server ready");
});

//get a list of five jokes

/*app.get('/jokes', (req,res) =>
{
    const jokes = 
  [
  {
    "id": 1,
    "title": "joke 1",
    "content": "Why don’t skeletons ever fight each other?They don’t have the guts."
  },
  {
    "id": 2,
    "title": "joke 2",
    "content": "I told my laptop I needed a break.Now it won’t stop sending me Kit-Kats"
  },
  {
    "id": 3,
    "title": "joke 3",
    "content": "Why did the scarecrow win an award? Because he was outstanding in his field."
  },
  {
    "id": 4,
    "title": "joke 4",
    "content": "Parallel lines have so much in common… It’s a shame they’ll never meet."
  },
  {
    "id": 5,
    "title": "joke 5",
    "content": "My bed and I are in a committed relationship… We’re just waiting for the alarm clock to stop trying to break us up."
  }
];
    res.send(jokes);
});*/

app.get('/jokes', (req,res) =>
{
    db.query("select * from jokes", (err, results) =>
    {
      if(err){
        return res.status(500).send({message:"error fetching jokes", error : err});
      }
      res.json(results)
    });
});
const port = process.env.PORT || 3000;

app.listen(port, () => 
{
 console.log(`serve at http://localhost:${port}`);   
});