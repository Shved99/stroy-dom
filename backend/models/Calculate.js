import mongoose from "mongoose";

const CalculationSchema = new mongoose.Schema({
    area: Number,
    floors: Number,
    foundationType: String,
    wallMaterial: String,
    roofType: String,
    additionalOptions: [String],
    totalCost: Number,
    email: String,
    createdAt: { type: Date, default: Date.now },
});

const Calculation = mongoose.model('Calculation', CalculationSchema);