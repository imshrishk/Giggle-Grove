const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
    {
        dName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100, // Assuming a reasonable max length for dish name
        },
        rName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100, // Assuming a reasonable max length for restaurant name
        },
        dPrice: {
            type: Number,
            required: true,
            min: 0, // Ensure prices are non-negative
        },
        dImgUrl: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (url) => {
                    const urlRegexp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
                    return urlRegexp.test(url);
                },
                message: 'Invalid URL format for ImgUrl',
            },
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
        collection: 'Dishes',
    }
);

module.exports = mongoose.model("Dish", dishSchema);