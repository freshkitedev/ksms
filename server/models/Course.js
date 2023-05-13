import mongoose from "mongoose";

const course = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
      },
    type: {
        type: String,
      },
})
 
export default mongoose.model("course",course);