import StaticSchema from "../models/StaticSchema.js";
import { createError } from "../error.js";


export const createTransactionType = async (req, res, next) => {
    try {
      const staticCnt = await StaticSchema.countDocuments({ transactionType: req.body.transactionType });
      console.log(staticCnt);
      if(staticCnt < 1) {
        const newStaticSchema = new StaticSchema({
            transactionType: req.body.transactionType
        })
        console.log(newStaticSchema);
        await newStaticSchema.save();
        res.status(200).send("Transaction Type data created");
      }
      else {
        next(createError(500, "Transaction type already exists"))
      }
    } catch (err) {
      next(err)
    }
  };

  export const createPaymentMode = async (req, res, next) => {
    try {
      const staticCnt = await StaticSchema.countDocuments({ paymentMode: req.body.paymentMode });
      console.log(staticCnt);
      if(staticCnt < 1) {
        const newStaticSchema = new StaticSchema({
            paymentMode: req.body.paymentMode
        })
        console.log(newStaticSchema);
        await newStaticSchema.save();
        res.status(200).send("PaymentMode data created");
      }
      else {
        next(createError(500, "paymentMode already exists"))
      }
    } catch (err) {
      next(err)
    }
  };
export const getAllTransactionType = async (req, res, next) => {
    try {
      const schemadata = await StaticSchema.find({transactionType: { $exists: true }});
      if(schemadata != "") {
      //const result = schemadata.transactionType;
      //console.log(result)
    res.status(201).json(
      {
        status: "success",
        result: schemadata
      });
      //res.status(201).send(schemadata);
      } else {
        return next(createError(500, "empty data received"))
      }
    } catch (err) {
      next(err)
    }
  };

  export const getAllPaymentMode = async (req, res, next) => {
    try {
      const schemadata = await StaticSchema.find({paymentMode: { $exists: true }});
      if(schemadata != "") {
      //res.status(201).send(schemadata);
      res.status(201).json(
        {
          status: "success",
          result: schemadata
        });
      } else {
        return next(createError(500, "empty data received"))
      }
    } catch (err) {
      next(err)
    }
  };