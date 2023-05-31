const {Router} = require("express")
const {getOne, create, getAll, del} = require("../controllers/controller")

const router = Router()


router.get("/getall", getAll)
router.get("/getone", getOne)
router.post("/post", create)
router.delete("/delete", del)

module.exports = router