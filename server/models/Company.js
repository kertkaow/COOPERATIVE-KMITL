const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let companySchema = new Schema({
    n1: {
        type: String
    },
    n2: {
        type: String
    },
    n3: {
        type: String
    },
    n4: {
        type: String
    },
    n5: {
        type: String
    },
    n6: {
        type: String
    },
    n7: {
        type: String
    },
    n8: {
        type: String
    },
    n9: {
        type: String
    },
    n10: {
        type: String
    },
    n11: {
        type: String
    },
    n12: {
        type: String
    },
    n13: {
        type: String
    },
    n14: {
        type: String
    },
    n15: {
        type: String
    },
    n16: {
        type: String
    },
    n17: {
        type: String
    },
    n18: {
        type: String
    },
    n19: {
        type: String
    },
    n20: {
        type: String
    },
    n21: {
        type: String
    },
    n22: {
        type: String
    },
    n23: {
        type: String
    },
    n24:{
        type: String
    },
    n25:{
        type: String
    },
    selectedFile:{
        type: String
    },
}, {
    collection: 'companys'
})

module.exports = mongoose.model('Company', companySchema);uid