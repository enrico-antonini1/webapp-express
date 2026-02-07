import connection from "../database/dbConnection.js";
import { DateTime } from "luxon";
import dataFormatted from "../function/dataFormatted.js"

// INDEX

function index(req, res, next) {
  // prova
  // res.json("prova index")

  // implementazione
  // const query = "SELECT * FROM  movies";

   // bonus: aggiungo media recensioni
   const query = `
  SELECT movies.*, CAST(AVG(reviews.vote) AS FLOAT) AS average_vote
  FROM  movies
  LEFT JOIN reviews
  ON movies.id = reviews.movie_id
  GROUP BY movies.id  
  `

  connection.query(query, (err, results) => {
    if (err) return next(err);
    // test:
    // console.log(results)

    // restituzione risultato base, senza formattazione dati
    // res.json({
    //   results,
    // });

    // restituzione risultato con formattazione dati
    const filmsFormatted = results.map((film) => {
      const data = film.created_at;
      const dt = DateTime.fromObject(data);

      return {
        ...film,
        created_at: dt.toLocaleString(),
        // si può anche scrivere tutto dentro created_at:
        // created_at: DateTime.fromObject(film.created_at).toLocaleString(),

        // updated_at: DateTime.fromObject(film.updated_at).toLocaleString(),

        // si può portare fuori dal codice come funzione e riportare quando mi serve:
        updated_at: dataFormatted(film.updated_at),
        
        image: `${process.env.SERVER_URL}/images/${film.image}`,
      };
    });
    res.json({
      results: filmsFormatted,
    });
  });
}

// SHOW

function show(req, res, next) {
  // prova
  // return res.json({message: "show"});

  // implementazione
  const { id } = req.params;

  // 1° query: query film

  // const filmQuery = "SELECT * FROM  movies WHERE id = ?";

  // bonus: aggiungo media recensioni
  const filmQuery = ` 
  SELECT movies.*, CAST(AVG(reviews.vote) AS FLOAT) AS average_vote
  FROM  movies
  LEFT JOIN reviews
  ON movies.id = reviews.movie_id
  WHERE movies.id = ?  
  `;

  connection.query(filmQuery, [id], (err, results) => {
    if (err) return next(err);
    // test:
    // console.log(results)

    if (results.length === 0) {
      res.status(404);
      return res.json({
        error: "NOT FOUND",
        message: "Film non trovato",
      });
    }

    const film = results[0];

    // return res.json(film)

    // 2° query: query recensioni
    const reviewsQuery = "SELECT * FROM  movies WHERE id = ?";

    connection.query(reviewsQuery, [id], (err, results) => {
      if (err) return next(err);

      // restituzione risultato base, senza formattazione dati
      // const respObj = {
      //     ...film,
      //     reviews: reviewsQuery
      // };
      // return res.json(respObj)

      // restituzione risultato con formattazione dati
      const reviewsFormatted = results.map((review) => {
        // const data = review.created_at;
        // const dt = DateTime.fromObject(data);

        return {
          ...review,
          created_at: dataFormatted(review.created_at),
          updated_at: dataFormatted(review.updated_at)
        };
      });

      const respObj = {
        ...film,
        image: `${process.env.SERVER_URL}/images/${film.image}`,
        created_at: dataFormatted(film.created_at),
        updated_at: dataFormatted(film.updated_at),
        reviews: reviewsFormatted,
      };

      return res.json(respObj);
    });
  });
}

export default {
  index,
  show,
};
