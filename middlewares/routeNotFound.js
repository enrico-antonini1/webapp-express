export default function routeNotFound(req, res, next) {
  res.status(404);
  res.json({
    error: "NOT FOUND",
    message: "Rotta non trovata",
  });
}
