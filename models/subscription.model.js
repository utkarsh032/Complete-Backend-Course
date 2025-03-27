import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minLength: 2,
    maxLength: 100
  },
  price: {
    type: Number,
    required: [true, 'Subscription price is required'],
    min: [0, 'Price must be greater than 0']
  },
  currency: {
    type: String,
    enum: ['USD', 'INR', 'EUR', 'GBP'],
    default: 'INR'
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    required: true
  },
  category: {
    type: String,
    enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value <= new Date(),
      message: 'Start date must be in the past'
    }
  },
  renewalDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return value > this.startDate
      },
      message: 'Renewal date must be after start date'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
}, { timestamps: true })


subscriptionSchema.pre('save', function (next) {
  const renewalPeriods = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365
  }

  if (!this.renewalDate) {
    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = 'expired'
  }
  next()
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)
export default Subscription;



/*
{
  "success": true,
  "data": {
    "subscription": {
      "name": "Adobe Creative Cloud",
      "price": 2999,
      "currency": "INR",
      "frequency": "yearly",
      "category": "technology",
      "paymentMethod": "Credit Card",
      "status": "active",
      "startDate": "2025-01-01T10:00:00.000Z",
      "user": "67e54af6b4b187a0f52e2b29",
      "_id": "67e54b9db4b187a0f52e2b2c",
      "createdAt": "2025-03-27T12:59:09.151Z",
      "updatedAt": "2025-03-27T12:59:09.151Z",
      "renewalDate": "2026-01-01T10:00:00.000Z",
      "__v": 0
    },
    "workflowRunId": "wfr_Oz3-O6bpi1SYlqAHmpZHX"
  }
}
*/