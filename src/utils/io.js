const fs = require("fs").promises
const path = require("path")
class Io {
    #dir
    constructor(dir) {
        this.#dir = dir 
    }

    async read () {
        const data = await fs.readFile(this.#dir, "utf-8")
        
        return data ? JSON.parse(data) : []
    }

    async write(data) {
        await fs.writeFile(this.#dir, JSON.stringify(data, null, 2), "utf-8")
    }
   
    async readId () {
        const data = await fs.readFile(path.join(process.cwd(), "database", "category.json")) 
        return data ? JSON.parse(data) : []
    }
}

module.exports = Io 