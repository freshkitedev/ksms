import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment"
mongoose.set('useFindAndModify', false);
const enrollmentSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
      },
    enrollmentId: {
        type: Number
    },
    courseName: {
        type: String
    },
    courseId: {
        type: Number,
        required: true
    },
    year: {
        type: String
    },
    status: {
        type: Boolean
    },
    dateEnrolled: {
        type: Date
    },
    dateDeEnrolled: {
        type: Date
    },
    feeStatus: {
        type: String
    },
    totalCharges: {
        type: Number
    },
    totalPaid: {
        type: Number
    },
    termPaid: {
        type: Array
    },
    totalDues: {
        type: Number
    },
    feesCategory: {
        type: String
    },
    balance: {
        type: Number
    },
    concession: {
        type: Number
    }

});
autoIncrement.initialize(mongoose.connection);
enrollmentSchema.plugin(autoIncrement.plugin, {
  model: "enrollment", 
  field: "enrollmentId", 
  startAt: 100001, 
  incrementBy: 1, 
});
export default mongoose.model("enrollment",enrollmentSchema);