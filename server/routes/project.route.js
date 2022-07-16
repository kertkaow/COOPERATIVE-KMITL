const express = require('express');
const projectRoute = express.Router();


// Company model
let CompanyModel = require('../models/Company');

// Get all data รับข้อมูลมาทั้งหมด
projectRoute.route('/').get((req, res, next) => {
    //รับพารามิเตอร์มา2ตัว
    CompanyModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create student data เรียกใช้เมธอดpost
projectRoute.route('/create-company').post((req, res, next) => {
    //รับข้อมูลreqมา.body
    CompanyModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Edit student data ใช้เมธอดgetเเละรับพารามิเตอร์มา
projectRoute.route('/edit-company/:id').get((req, res, next) => {
    //findByidหาข้อมูลที่มันตรงกัน
    CompanyModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

// Update student data ใช้เมธอดput
projectRoute.route('/update-company/:id').put((req, res, next) => {
    //หาไอดีให้เจอเเล้วทำการอัพเดธ
    CompanyModel.findByIdAndUpdate(req.params.id, {
        //$setเป็นการเซ็ตข้อมูลตัวใหม่
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('successfully updated');
        }
    })
})

// Delete student data
projectRoute.route('/delete-company/:id').delete((req, res, next) => {
    CompanyModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})



module.exports = projectRoute;