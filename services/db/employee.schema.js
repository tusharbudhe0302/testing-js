var mongoose = require('./utils').mongoose;
let Schema = mongoose.Schema;
var employeeSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: "firstName is Required"
    },
    lastName: {
        type: String,
        trim: true,
        required: "lastName is Required"
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    }
}, { versionKey: false });
var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;