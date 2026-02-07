function index (req, res) {
    res.json("prova index")
}


function show (req, res) {
   return res.json({
        message: "show"
    });
}

export default {
    index,
    show,
};