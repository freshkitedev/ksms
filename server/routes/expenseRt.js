import Express from "express";


const router = Express.Router()
import { UpdateExpenses, createexpenses,delexpenses,getexpenses } from "../controller/expenses.js";

router.post("/createexpenses",createexpenses)
router.get("/getexpenses",getexpenses)
router.delete("/delexpenses/:id",delexpenses)

router.put("/updateexpenses",UpdateExpenses)

export default router; 