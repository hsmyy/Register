/**
 * Created by fc on 14-11-16.
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RegisterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
});

mongoose.model('Register', RegisterSchema);