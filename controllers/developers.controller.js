const allUsers = require('../test_data');
const moment = require('moment');
const { request } = require('express');

module.exports.getAllDevelopers = async function(req, res){
  console.log(req)
  try {
    console.log(allUsers)
    const allDevs = await allUsers;
    return res.status(200).json(allDevs);
  } catch (err) {
    throw new Error(err)
  }
};