const path = require("path")

function getPost(req, res) {
    // res.send("<div><h1>POST TITLE</h1><p>THIS IS A POST</p></div>")
    res.sendFile(path.join(__dirname, "..", "public", "images", "logo.png"))
}

module.exports = { getPost }
