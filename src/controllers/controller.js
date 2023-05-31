// const {v4: uuid} = require("uuid");

const {v4: uuid} = require("uuid")
const fs = require("fs").promises
const Io = require("../utils/io")
const path = require("path")
const librauriy = new Io(path.join(process.cwd(), "database", "data.json"))
const Module = require("../models/model")

const getAll = async (req, res) => {
    const readId = await librauriy.readId()
    const books = await librauriy.read()
    for(let i = 0; i < books.length; i++) {
        for(let j = 0; j < readId.length; j++) {
            if(books[i].category == readId[j].category) {
                books[i].category = readId[j]
            }
        }
    }

    res.status(201).json({message: "success", books})
}
const getOne = async (req, res) => {
    
    const books = await librauriy.read()

    const { id } = req.body
    const foundId =  await books.find((user) => user.id == id )

   if(foundId) {
    res.status(201).json(foundId)
   } else {
       res.status(201).json({message: "provided id is not aqual to any book's id"})
   }    
}

const create = async (req, res) => {
    const {image} = req.files
    const {name, category, author, about, year} = req.body

    const readData = await librauriy.read()

    const id = uuid()

    const imageName = `${uuid()}.${
        image.name.split(".")[image.name.split(".").length - 1]
          }`;

    image.mv(path.join(process.cwd(), "uploads", imageName))

    const data = new Module(id, name, category, author, about, year, imageName)
    const newData = readData.length ? [...readData, data] : [data]
    const foundName = readData.find( (books) => books.name == name)
    const foundAthuor = readData.find( (books) => books.author == author)

    if(!foundAthuor || !foundName) {
    await librauriy.write(newData)
    }   

    const categoryData = await fs.readFile(path.join( process.cwd() , "database", "category.json"))
    const read =  categoryData.length ? JSON.parse(categoryData) : [];
    const found = read.find( (user) => user.category == category)
    if(!found) {

            const id = uuid()
            const newData = read.length ? [...read, {id, category}] : [{id, category}]
            await fs.writeFile(path.join(process.cwd(), "database", "category.json"), JSON.stringify(newData, null, 2), "utf-8")
        

    }
    res.status(200).json({message: "succers", newData})

}


const del = async (req, res) => {
    const books = await librauriy.read()
    const { id } = req.body
    const foundId =  await books.find((user) => user.id == id) 
    
    console.log(books);

    res.status(201).json({message: "provided id is not aqual to any book's id"})
    
    
}

module.exports = {
    getAll,
    getOne,
    create,
    del,
}