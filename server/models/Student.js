import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment"
mongoose.set('useFindAndModify', false);
const studentSchema = new mongoose.Schema({

  rollNumber: {
    type: Number
  },
  Name: {
    fName: {
      type: String
    },
    mName: {
      type: String
    },
    lName: {
      type: String
    }
  },
  dateOfBirth: {
    type: Date
  },
  fatherName: {
    type: String
  },
  motherName: {
    type: String,
  },
  homeAddress: {
    type: String
  },
  enrollmentDate: {
    type: String,
  },
  emailID: {
    type: String
  },
  mobileNo: {
    type: Number
  },
  lastDate: {
    type: Date
  },
  activeIndicator: {
    type: Boolean
  },
  userGroup: {
    type: Array,
  },
  grade: {
    type: String,
  },
  section: {
    type: String
  },
  group: {
    type: String,
  },
  emisNumber: {
    type: Number
  },
  admissionNo: {
    type: Number,
  },
  category: {
    type: String,
  },
  academicYear: {
    type: String,
  },
  concessionApplicable: {
    type: Boolean,
  },
  vanApplicable: {
    type: Boolean,
  },
  vanStop: {
    type: String
  },
  newStudent: {
    type: Boolean
  },
  admissionnFeeCategory: {
    type: String
  }
});
autoIncrement.initialize(mongoose.connection);
studentSchema.plugin(autoIncrement.plugin, {
  model: "Student",
  field: "rollNumber",
  startAt: 1001,
  incrementBy: 1,
})

export default mongoose.model("Student", studentSchema)
