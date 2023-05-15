import transaction from "../models/Transaction.js";
import { createError } from "../error.js";
// Create Transaction
export const createTransaction = async (req, res, next) => {
  try {
    const newTransaction = new Transaction({
        dateOfTxn:         req.body.dateOfTxn,
        txnType:           req.body.txnType,
        paymentMode:       req.body.paymentMode,
        txnCategory:       req.body.txnCategory,
        txnAmount:         req.body.txnAmount,
        txnNotes:          req.body.txnNotes,
        rollNumber:        req.body.rollNumber,
        StaffID:           req.body.StaffID,
        templateID:        req.body.templateID,
        courseName:        req.body.courseName,
        year:              req.body.year
    });
    console.log(newTransaction);
    await newTransaction.save();
    //res.json({ success: "Transaction of student/staff Created SuccessFully" });
    res.status(200).send("Transaction of student/staff Created SuccessFully");
  } catch (err) {
    next(err)
  }
};

//All Transaction Details
export const getAllTransaction = async (req, res, next) => {
  try {
    const allTransaction = await transaction.find();
    res.status(201).send(allTransaction);
  } catch (err) {
    next(err);
  }
};

//Get Transaction for particular staff/student
export const getTransaction = async (req, res, next) => {
  try {
    const Transaction = await transaction.findById(req.params.id);
    res.status(202).send(Transaction);
  } catch (err) {
    next(err)
  }
};

//Get Transaction details by date
export const getTransactionByDate = async (req, res, next) => {
    try {
      const Transaction = await transaction.findOne(req.body.dateOfTxn);
      res.status(201).send(Transaction);
    } catch (err) {
      next(err)
    }
  };

//Update Transaction Details
export const updateTransaction =async(req,res, next)=>{
  try {
      const updateTransaction = await transaction.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
       res.status(202).send(updateTransaction);
    } catch (err) {
        next(err)
    }
  
  };

//Delete Transaction
export const deleteTransaction = async(req,res,next)=>{
  
  try{
      await transaction.findByIdAndDelete(req.params.id);
      res.status(204).send("Transaction has been deleted" );
  }catch(err){
      next(err)
  }
};