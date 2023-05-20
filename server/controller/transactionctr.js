import Transaction from "../models/Transaction.js";
import enrollment from "../models/Enrollment.js";
import ledger from "../models/Ledger.js"
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
    const ledgerdata = new ledger({
      date: req.body.dateOfTxn,
      openingBalance: req.body.openingBalance,
      txn: newTransaction,
      closingBalance: req.body.closingBalance,
    })
    console.log(ledgerdata)
    await ledgerdata.save();
    //res.json({ success: "Transaction of student/staff Created SuccessFully" });
    if(req.body.txnType == "credit") 
    {
    const studentEnrollment = await enrollment.findById(req.body.rollNumber)
    const paid = studentEnrollment.totalPaid + req.body.txnAmount
    const balanceamt = studentEnrollment.totalCharges - paid
    const enrollmentdata = await enrollment.findByIdAndUpdate(
      req.params.id,
      { $set: { totalPaid: paid, balance: balanceamt}  },
      { new: "true"}
      
    )
    res.status(200).send("Transaction of student/staff Created SuccessFully");
    }
    else 
    {
      const studentEnrollment = await enrollment.findById(req.body.rollNumber)
    const paid = studentEnrollment.totalPaid - req.body.txnAmount
    const balanceamt = studentEnrollment.totalCharges - paid
    const enrollmentdata = await enrollment.findByIdAndUpdate(
      req.params.id,
      { $set: { totalPaid: paid , balance: balanceamt}  },
      { new: "true"}
      
    )
    }
  } catch (err) {
    next(err)
  }
};

//All Transaction Details
export const getAllTransaction = async (req, res, next) => {
  try {
    const allTransaction = await Transaction.find();
    res.status(201).send(allTransaction);
  } catch (err) {
    next(err);
  }
};

//Get Transaction for particular staff/student
export const getTransaction = async (req, res, next) => {
  try {
    const Transaction = await Transaction.findById(req.params.id);
    res.status(202).send(Transaction);
  } catch (err) {
    next(err)
  }
};

//Get Transaction details by date
export const getTransactionByDate = async (req, res, next) => {
    try {
      const Transaction = await Transaction.findOne(req.body.dateOfTxn);
      res.status(201).send(Transaction);
    } catch (err) {
      next(err)
    }
  };

//Update Transaction Details
export const updateTransaction =async(req,res, next)=>{
  try {
      const updateTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
       res.status(202).send(updateTransaction);
    } catch (err) {
        next(err)
    }
  
  };

/*Revert Transaction
export const revertTransaction =async(req,res, next)=>{
  try {
      const revertTransaction = await transaction.findByIdAndUpdate(req.params.id)
      const studentEnrollment = await enrollment.findById(revertTransaction.rollNumber)
      const paid = studentEnrollment.totalPaid - revertTransaction.txnAmount
      const enrollmentdata = await enrollment.findByIdAndUpdate(
        req.params.id,
        { $set: { totalPaid: paid }  },
        { new: "true"}
        
      )
    } catch (err) {
        next(err)
    }
  
  };
Delete Transaction
export const deleteTransaction = async(req,res,next)=>{
  
  try{
      await transaction.findByIdAndDelete(req.params.id);
      res.status(204).send("Transaction has been deleted" );
  }catch(err){
      next(err)
  }
};*/