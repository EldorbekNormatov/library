const fs = require("fs").promises
const path = require('path')

class Model {
    constructor(id, name, category, author, about, year ) {
            this.id  = id,
            this.category = category,
            this.name = name,
            this.author = author,
            this.about = about,
            this.year = year
    }

   
}


module.exports = Model