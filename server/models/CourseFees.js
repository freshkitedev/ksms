import mongoose from "mongoose";

const courseFees = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
      },
    courseId: {
        type: Number,
      },
    year: {
        type: Number,
      },
    frequency: {
        type: Number,
      },
    totalCharges: {
        type: Number,
    },
    status: {
        type: Boolean,
    },
    category: {
        type: String,
    },
    Description: {
        type: String,
    }

})
 
export default mongoose.model("course",courseFees);