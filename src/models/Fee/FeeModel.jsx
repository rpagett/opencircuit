import Mongoose from 'mongoose';
import Moment from 'moment';
import _ from 'lodash';

const ObjectId = Mongoose.Schema.Types.ObjectId;

const PaymentSchema = new Mongoose.Schema({
  amount: Number,
  method: String
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

const FeeSchema = new Mongoose.Schema({
  unit: {
    type: ObjectId,
    ref: 'Unit'
  },
  category: {
    type: ObjectId,
    ref: 'FeeCategory'
  },
  payments: [PaymentSchema],

  amount: Number,
  assessed_date: Date,
  due_date: Date,
  paid_date: Date,
  paypal_id: String
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

FeeSchema.statics.NON_MEMBER_FEE = () => {
  return 175;
}

FeeSchema.statics.PLUS_PASS_FEE = () => {
  return 100;
}

FeeSchema.statics.DUE_DATE = () => {
  return Date.parse('Dec 31, 2016');
}

FeeSchema.virtual('formattedAssessedDate').get(function() {
  return Moment(this.created_at).format('MMM. Do, YYYY');
});

FeeSchema.virtual('formattedPaidDate').get(function() {
  return Moment(this.paid_date).format('MMM. Do, YYYY');
});

FeeSchema.virtual('formattedDueDate').get(function() {
  return Moment(this.due_date).format('MMM. Do, YYYY');
});

FeeSchema.virtual('amountRemaining').get(function() {
  return this.amount - _.sumBy(this.payments, 'amount');
})

export default Mongoose.model('Fee', FeeSchema);