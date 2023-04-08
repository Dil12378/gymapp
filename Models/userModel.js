const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
       name: { type: String, required: true, minlength: 3, maxlength: 30 },

        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
            unique: true,
        },
        occupation:{ type: String, required: true, minlength: 3, maxlength: 30 },
        Physical_Actives: { type: String, required: true, minlength: 3, maxlength: 30 },
        age: { type: String, required: true, minlength: 1, maxlength: 30 },
        food_intake:{ type: String, required: true, minlength: 3, maxlength: 30 },
        sleeping_hours:{ type: String, required: true, minlength: 1, maxlength: 30 },

    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;