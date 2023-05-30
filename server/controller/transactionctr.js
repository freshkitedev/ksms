import Transaction from "../models/Transaction.js";
import enrollments from "../models/Enrollment.js";
import ledgers from "../models/Ledger.js"
//import { createError } from "../error.js";
// Create Transaction
export const createTransaction = async (req, res, next) => {
  try {
    const newTransaction = new Transaction({
      dateOfTxn: req.body.dateOfTxn,
      txnType: req.body.txnType,
      paymentMode: req.body.paymentMode,
      txnCategory: req.body.txnCategory,
      txnAmount: req.body.txnAmount,
      txnNotes: req.body.txnNotes,
      rollNumber: req.body.rollNumber,
      StaffID: req.body.StaffID,
      templateID: req.body.templateID,
      courseName: req.body.courseName,
      year: req.body.year
    });
    console.log(newTransaction);
    await newTransaction.save();
    const query = { date: req.body.dateOfTxn };
    const ledgerCnt = await ledgers.countDocuments(query);
    const transactionType = req.body.txnType;
    const transactionAmt = req.body.txnAmount;
    var amt;
    console.log(ledgerCnt);
    if (ledgerCnt < 1) {
      console.log("inside if of ledger")
      const ledgerdata = new ledgers({
        date: req.body.dateOfTxn,
        openingBalance: req.body.openingBalance,
        txn: [newTransaction],
        closingBalance: transactionAmt,
      })
      console.log(ledgerdata)
      await ledgerdata.save();
    }
    else {
      console.log("inside else of ledger")
      const query = { date: req.body.dateOfTxn }
      const ledgerinfo = await ledgers.findOne(query)
      const finalbalance = ledgerinfo.closingBalance;
      if(transactionType == "credit") {
        amt = transactionAmt + finalbalance;
      } else if(transactionType == "debit") {
        amt = finalbalance - transactionAmt ;
      } else {
        amt = finalbalance - transactionAmt;
      }
      const ledgerdata = await ledgers.findOneAndUpdate(query,
        { $set: { txn: [newTransaction] , closingBalance: amt} },
        { new: "true" })
      console.log(ledgerdata)
      await ledgerdata.save();

    }
    const type = req.body.txnType
    console.log(type)
    //res.json({ success: "Transaction of student/staff Created SuccessFully" });
    if (type == "credit") {
      const category = req.body.txnCategory
      console.log(category)
      if (category == "termFees") {
        console.log("inside term fees")
        const query = {
          userId: req.body.rollNumber,
          feesCategory: req.body.txnCategory,
          year: req.body.year
        };
        const termEnrollment = await enrollments.findOne(query)
        console.log(termEnrollment)
        const paid = termEnrollment.totalPaid + req.body.txnAmount
        const balanceamt = termEnrollment.totalCharges - paid
        const enrollmentdata = await enrollments.findOneAndUpdate(
          query,
          { $set: { totalPaid: paid, balance: balanceamt } },
          { new: "true" }

        )
        console.log(enrollmentdata)
        await enrollmentdata.save();
        res.status(200).send("Transaction of student/staff Created SuccessFully");
      } else if (category == "vanFees") {
        console.log("inside van fees")
        const query = {
          userId: req.body.rollNumber,
          feesCategory: req.body.txnCategory,
          year: req.body.year
        };
        const vanEnrollment = await enrollments.findOne(query)
        console.log(vanEnrollment)
        const paid = vanEnrollment.totalPaid + req.body.txnAmount
        const balanceamt = vanEnrollment.vanFees - paid
        const enrollmentdata = await enrollments.findOneAndUpdate(
          query,
          { $set: { totalPaid: paid, balance: balanceamt } },
          { new: "true" }

        )
        console.log(enrollmentdata)
        await enrollmentdata.save();
        res.status(200).send("Transaction of student/staff Created SuccessFully");

      } else if (category == "bookFees") {
        console.log("inside book fees")
        const query = {
          userId: req.body.rollNumber,
          feesCategory: "termFees",
          year: req.body.year
        };
        const bookEnrollment = await enrollments.findOne(query)
        console.log(bookEnrollment)
        const paid = bookEnrollment.totalPaid + req.body.txnAmount
        const balanceamt = bookEnrollment.bookFees - paid
        const enrollmentdata = await enrollments.findOneAndUpdate(
          query,
          { $set: { totalPaid: paid, bookFeesBalance: balanceamt } },
          { new: "true" }

        )
        console.log(enrollmentdata)
        await enrollmentdata.save();
        res.status(200).send("Transaction of student/staff Created SuccessFully");

      } else {
        console.log("inside admission fees")
        const query = {
          userId: req.body.rollNumber,
          feesCategory: "termFees",
          year: req.body.year
        };
        const studentEnrollment = await enrollments.findOne(query)
        console.log(studentEnrollment)
        const paid = studentEnrollment.totalPaid + req.body.txnAmount
        const balanceamt = studentEnrollment.admissionFees - paid
        const enrollmentdata = await enrollments.findOneAndUpdate(
          query,
          { $set: { totalPaid: paid, admissionFeesBalance: balanceamt } },
          { new: "true" }

        )
        console.log(enrollmentdata)
        await enrollmentdata.save();
        res.status(200).send("Transaction of student/staff Created SuccessFully");
      }
    }
    else if (type == "debit") {
      const studentEnrollment = await enrollments.findOne({ userId: req.body.rollNumber })
      const paid = studentEnrollment.totalPaid - req.body.txnAmount
      const balanceamt = studentEnrollment.totalCharges - paid
      const enrollmentdata = await enrollment.findOneAndUpdate(
        { userId: req.body.rollNumber },
        { $set: { totalPaid: paid, balance: balanceamt } },
        { new: "true" }

      )
      console.log(enrollmentdata)
      await enrollmentdata.save();
    }
    else {
      console.log("inside else")
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
export const updateTransaction = async (req, res, next) => {
  try {
    const updateTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: "true" }

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