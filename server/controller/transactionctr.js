import Transaction from "../models/Transaction.js";
import enrollments from "../models/Enrollment.js";
import ledgers from "../models/Ledger.js"
import { createError } from "../error.js";
// Create Transaction
export const createTransaction = async (req, res, next) => {
  try {
    const paymentMode = req.body.paymentMode;
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
    if(paymentMode == "cash") {
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
        if(termEnrollment != "") {
        console.log(termEnrollment)
        } else {
          return next(createError(500, "empty data received"))
        }
        var totalcharges = termEnrollment.totalCharges;
        var termPaid = termEnrollment.termPaid
        const term = termEnrollment.term
        console.log(termPaid)
        console.log(term)
        var paymentAmount = req.body.txnAmount;
        if(paymentAmount > totalcharges) {
          return next(createError(405,"Amount is higher"))
        }
        console.log(paymentAmount);
        var checkfilled = false
        var i = 0;
        var l1 = term.length;
        var l2 = termPaid.length;
        console.log(l1, l2);
        while( i < l1) {
          console.log("inside first while loop");
          if(term[i] == termPaid[i]) {
            console.log("inside if of term");
            if(i == l1) {
              console.log("inside checkfilled of term");
              checkfilled = true
              break;
            }
           i++;
          }
          else {
            console.log("inside else of term");
            break;
          }
        }
        if(checkfilled == true) {
          return next(createError(500, "Term fee already paid"))
        }
        var termNo = i;
        console.log(termNo);
        var bal = paymentAmount;
        while(bal !=0 && termNo <= l2) {
          console.log("inside second while loop")
          if(bal > term[termNo]) {
            console.log("inside if ")
            termPaid[termNo] = term[termNo];
            bal = bal - term[termNo];
            console.log(bal);
            termNo++;
          } else {
            console.log(bal);
            termPaid[termNo] = bal;
            break;
          }
        }
        var paid = termEnrollment.totalPaid + req.body.txnAmount
        var balanceamt = termEnrollment.balance - req.body.txnAmount
        console.log("final data", termPaid);
        const enrollmentdata = await enrollments.findOneAndUpdate(
          query,
          { $set: { totalPaid: paid, balance: balanceamt, termPaid: termPaid } },
          { new: "true" }
        )
        console.log(enrollmentdata)
        await enrollmentdata.save();
        var response = [enrollmentdata, newTransaction] 
        res.status(200).send(response);
      } else if(category == "admissionFees") {
        console.log("inside admission fees")
        console.log(category)
        const query = {
          userId: req.body.rollNumber,
          feesCategory: category, 
          year: req.body.year
        };
        const admissionFeeEnrollment = await enrollments.findOne(query)
        if(admissionFeeEnrollment != "") {
        console.log(admissionFeeEnrollment)
        } else {
          return next(createError(500, "empty data received"))
        }
        //var balance = admissionFeeEnrollment.totalCharges - admissionFeeEnrollment.totalPaid
        if(req.body.transactionAmt > admissionFeeEnrollment.totalCharges) {
          return next(createError(500, "Transaction amt is higher for admission Fees"))
        } else {
          var actualPaid = admissionFeeEnrollment.totalPaid
          var paid = actualPaid + req.body.transactionAmt
          //console.log("inside else", paid)
          var balanceamt = admissionFeeEnrollment.totalCharges - paid;
          const enrollmentdata = await enrollments.findOneAndUpdate(
            query,
            { $set: { totalPaid: paid, balance: balanceamt } },
            { new: "true" }
          )
          console.log(enrollmentdata)
          await enrollmentdata.save();
          var response = [enrollmentdata, newTransaction] 
          res.status(200).send(response);
        }
      } else if(category == "vanFees") {
        console.log("inside van fees")
        console.log(category)
        const query = {
          userId: req.body.rollNumber,
          feesCategory: category, 
          year: req.body.year
        };
        const vanFeeEnrollment = await enrollments.findOne(query)
        if(vanFeeEnrollment != "") {
        console.log(vanFeeEnrollment)
        } else {
          return next(createError(500, "empty data received"))
        }
        //var balance = vanFeeEnrollment.totalCharges - vanFeeEnrollment.totalPaid
        if(req.body.transactionAmt > vanFeeEnrollment.totalCharges) {
          return next(createError(500, "Transaction amt is higher for van Fees"))
        } else {
          var actualPaid = vanFeeEnrollment.totalPaid
          var paid = actualPaid + req.body.transactionAmt
          //console.log("inside else", paid)
          var balanceamt = vanFeeEnrollment.totalCharges - paid;
          const enrollmentdata = await enrollments.findOneAndUpdate(
            query,
            { $set: { totalPaid: paid, balance: balanceamt } },
            { new: "true" }
          )
          console.log(enrollmentdata)
          await enrollmentdata.save();
          var response = [enrollmentdata, newTransaction] 
          res.status(200).send(response);
      }
    }
  }
    /*else if (type == "debit") {
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
    }*/
    else {
      console.log("inside else")
      return next(createError(500, "no txn category mentioned"))
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

//Revert Transaction
export const revertTransaction =async(req,res, next)=>{
  try {
      var revertTransaction = await Transaction.findById(req.params.id)
      const category = revertTransaction.txnCategory
      console.log(category)
      //var studentEnrollment = await enrollments.findOne({ rollNumber: revertTransaction.rollNumber})
      //var paid = studentEnrollment.totalPaid - revertTransaction.txnAmount
      if (category == "termFees") {
        console.log("inside term fees")
        const query = {
          userId: revertTransaction.rollNumber,
          feesCategory: revertTransaction.txnCategory,
          year: revertTransaction.year
        };
        const termEnrollment = await enrollments.findOne(query)
        console.log(termEnrollment)
        var totalcharges = termEnrollment.totalCharges;
        var termPaid = termEnrollment.termPaid
        const term = termEnrollment.term
        console.log("before changing", termPaid)
        termPaid = termPaid.fill(0);
        console.log("after changing", termPaid)
        console.log(term)
        var paymentAmount = termEnrollment.totalPaid - revertTransaction.txnAmount
        var revertAmount = revertTransaction.txnAmount;
        if(revertAmount > totalcharges) {
          return next(createError(405,"Amount is higher"))
        }
        console.log(revertAmount);
        var checkfilled = false
        var i = 0;
        var l1 = term.length;
        var l2 = termPaid.length;
        console.log(l1, l2);
        while( i < l1) {
          console.log("inside first while loop");
          if(term[i] == termPaid[i]) {
            console.log("inside if of term");
            if(i == l1) {
              console.log("inside checkfilled of term");
              checkfilled = true
              break;
            }
           i++;
          }
          else {
            console.log("inside else of term");
            break;
          }
        }
        if(checkfilled == true) {
          return next(createError(500, "Term fee already paid"))
        }
        var termNo = i;
        console.log(termNo);
        var bal = paymentAmount;
        while(bal !=0 && termNo <= l2) {
          console.log("inside second while loop")
          if(bal > term[termNo]) {
            console.log("inside if ")
            termPaid[termNo] = term[termNo];
            bal = bal - term[termNo];
            console.log(bal);
            termNo++;
          } else {
            console.log(bal);
            termPaid[termNo] = bal;
            break;
          }
        }
        var balanceamt = termEnrollment.balance +  revertTransaction.txnAmount
        console.log("final data", termPaid);
        const enrollmentdata = await enrollments.findOneAndUpdate(
          query,
          { $set: { totalPaid: paymentAmount, balance: balanceamt, termPaid: termPaid } },
          { new: "true" }
        )
        console.log(enrollmentdata)
        await enrollmentdata.save();
        res.status(200).send("Transaction of student/staff Created SuccessFully");
      } else if (category == "vanFees") {
        console.log("inside van fees")
        const query = {
          userId: revertTransaction.rollNumber,
          feesCategory: revertTransaction.txnCategory,
          year: revertTransaction.year
        };
        const vanEnrollment = await enrollments.findOne(query)
        console.log(vanEnrollment)
        const paid = vanEnrollment.totalPaid - revertTransaction.txnAmount
        const balanceamt = vanEnrollment.vanFeesBalance + revertTransaction.txnAmount
        const enrollmentdata = await enrollments.findOneAndUpdate(
          query,
          { $set: { vanFeesPaid: paid, totalPaid: paid,  vanFeesBalance: balanceamt } },
          { new: "true" }

        )
        console.log(enrollmentdata)
        await enrollmentdata.save();
        res.status(200).send("revert Transaction of student/staff Created SuccessFully");

      } else if (category == "bookFees") {
        console.log("inside book fees")
        const query = {
          userId: revertTransaction.rollNumber,
          feesCategory: "termFees",
          year: revertTransaction.year
        };
        const bookEnrollment = await enrollments.findOne(query)
        console.log(bookEnrollment)
        const paid = bookEnrollment.totalPaid - revertTransaction.txnAmount
        const balanceamt = bookEnrollment.bookFeesBalance - revertTransaction.txnAmount 
        const enrollmentdata = await enrollments.findOneAndUpdate(
          query,
          { $set: { bookFeesPaid: paid, bookFeesBalance: balanceamt } },
          { new: "true" }

        )
        console.log(enrollmentdata)
        await enrollmentdata.save();
        res.status(200).send("revert Transaction of student/staff Created SuccessFully");

      } else {
        console.log("inside admission fees")
        const query = {
          userId: revertTransaction.rollNumber,
          feesCategory: "termFees",
          year: revertTransaction.year
        };
        const studentEnrollment = await enrollments.findOne(query)
        console.log(studentEnrollment)
        const paid = studentEnrollment.totalPaid - revertTransaction.txnAmount
        const balanceamt = studentEnrollment.admissionFeesBalance + revertTransaction.txnAmount
        const enrollmentdata = await enrollments.findOneAndUpdate(
          query,
          { $set: { admissionFeesPaid: paid, admissionFeesBalance: balanceamt } },
          { new: "true" }

        )
        console.log(enrollmentdata)
        await enrollmentdata.save();
        res.status(200).send("Transaction of student/staff Created SuccessFully");
      }
      //const enrollmentdata = await enrollment.findByIdAndUpdate(
       // req.params.id,
        //{ $set: { totalPaid: paid }  },
      //  { new: "true"}
      //)*/
    } catch (err) {
        next(err)
    }
  
  };

/*Delete Transaction
export const deleteTransaction = async(req,res,next)=>{
  
  try{
      await transaction.findByIdAndDelete(req.params.id);
      res.status(204).send("Transaction has been deleted" );
  }catch(err){
      next(err)
  }
};*/

export const commonsearch = async (req, res, next) => {
  try{
    const query = req.body.query;
  const results = await Transaction.find(query).toArray();
  // Return the search results
  if(results != "") {
    console.log("check");
   // const results = await cursor.toArray();
    // Return the search results
    return res.status(201).send(results);
    }else {
      console.log("error")
      return next(createError(500, "cannot retrieve data"))
    }
  } catch(err) {
    nexr(err)
  }
};