import connection from "../database/dbConnection.js";

function index(req, res, next) {
  // prova
  // res.json("prova index")

  // implementazione
  const query = "SELECT * FROM  movies";

  connection.query(query, (err, results) => {
    if (err) return next(err);
    // test:
    // console.log(results)
    res.json({
      results,
    });
  });
}

function show(req, res, next) {
  // prova
  // return res.json({message: "show"});

  // implementazione
  const { id } = req.params;

  // 1° query: query film

  const filmQuery = "SELECT * FROM  movies WHERE id = ?";

  connection.query(filmQuery, [id], (err, results) => {
    if(err) return next(err);
    // test:
    // console.log(results)

    if(results.length === 0) {
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
        if(err) return next(err);

        const respObj = {
            ...film,
            reviews: reviewsQuery
        };

        return res.json(respObj)
    })
})
}

export default {
  index,
  show,
}
