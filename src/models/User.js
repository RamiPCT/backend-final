import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    age: { type: Number, min: 18 },
    password: { type: String, required: true },
    role: { type: String, default: "user" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);