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
    "name": "Spotify Family",
    "price": 12.99,
    "currency": "USD",
    "frequency": "monthly",
    "category": "entertainment",
    "paymentMethod": "paypal",
    "status": "active",
    "startDate": "2025-03-24T10:00:00.000Z",
    "user": "67e37e12726c6add8333a276",
    "_id": "67e37ec752cdf25ef97e430b",
    "createdAt": "2025-03-26T04:12:55.210Z",
    "updatedAt": "2025-03-26T04:12:55.210Z",
    "renewalDate": "2025-04-23T10:00:00.000Z",
    "__v": 0
  }
}
*/