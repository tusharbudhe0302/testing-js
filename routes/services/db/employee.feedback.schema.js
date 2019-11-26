var mongoose = require('./utils').mongoose;
let Schema = mongoose.Schema;
var employeeFeedbackSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    published: {
        type: Date,
        default: Date.now
    },
    employee: {
        type: Schema.Types.ObjectId,
        index: true,
        required: true,
        ref: 'Employee'
    }
});
var EmployeeFeedback = mongoose.model('EmployeeFeedback', employeeFeedbackSchema);

module.exports = EmployeeFeedback;