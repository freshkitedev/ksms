import transaction from "../models/Transaction.js";

// Create Transaction
export const createTransaction = async (req, res) => {
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
    res.json({ success: "Transaction of student/staff Created SuccessFully" });
  } catch (err) {
    return res.json({ Error: err });
  }
};

//All Transaction Details
export const getAllTransaction = async (req, res) => {
  try {
    const allTransaction = await transaction.find();
    res.json(allTransaction);
  } catch (err) {
    return res.json({ Error: err });
  }
};

//Get Transaction for particular staff/student
export const getTransaction = async (req, res) => {
  try {
    const Transaction = await transaction.findById(req.params.id);
    res.json(Transaction);
  } catch (err) {
    return res.json({ Error: err });
  }
};

//Get Transaction details by date
export const getTransactionByDate = async (req, res) => {
    try {
      const Transaction = await transaction.findOne(req.body.dateOfTxn);
      res.json(Transaction);
    } catch (err) {
      return res.json({ Error: err });
    }
  };

//Update Transaction Details
export const updateTransaction =async(req,res)=>{
  try {
      const updateTransaction = await transaction.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
       return res.json(updateTransaction);
    } catch (err) {
          return res.json({Error:err});
    }
  
  };

//Delete Transaction
export const deleteTransaction = async(req,res)=>{
  
  try{
      await transaction.findByIdAndDelete(req.params.id);
      return res.json({success:"Transaction has been deleted" });
  }catch(err){
      return res.json({Error:err});
  }
};