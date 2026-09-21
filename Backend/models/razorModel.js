import mongoose from 'mongoose';
const razorOrderSchema = mongoose.Schema(
    {
        razorpay_payment_id: {
            type: String,
            required: true,
        },
        razorpay_order_id: {
            type: String,
            required: true,
        },
        razorpay_signature: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

const RazorOrder = mongoose.model('RazorOrder', razorOrderSchema);
export default RazorOrder;
