import Exp from "../models/Expeses.js";
export const createexpenses = async (req, res, next) => {
  try {
    console.log(req.body.Date);
    const newexpenses = new Exp({
      Date: req.body.Date,
      Reason: req.body.Reason,
      Amount: req.body.Amount,
    });
    console.log(newexpenses);
    await newexpenses.save();
    res.status(200).send("expenses Created SuccessFully");
  } catch (err) {
    next(err);
  }
};
export const getexpenses = async (req, res, next) => {
  try {
    const allexpenses = await Exp.find();
    res.status(201).send(allexpenses);
  } catch (err) {
    next(err);
  }
};

export const delexpenses = async (req, res, next) => {
  try {
    console.log(req.params.id);
    await Exp.findByIdAndDelete(req.params.id);
    res.status(201).send("Successfully Deleted");
  } catch (err) {
    next(err);
  }
};

export const UpdateExpenses = async (req, res, next) => {
  try {
    await Exp.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          Date: req.body.Date,
          Reason: req.body.Reason,
          Amount: req.body.Amount,
        },
      },
      { new: true }
    );
    
    res.status(200).send("expenses Created SuccessFully");
  } catch (err) {
    next(err);
  }
};
