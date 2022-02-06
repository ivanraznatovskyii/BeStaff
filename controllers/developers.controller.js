const allUsers = require('../test_devs');
const allSkills = require('../test_skills');
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

module.exports.getAllSkills = async function(req, res){
  try {
    const skills = await allSkills;
    return res.status(200).json(skills);
  } catch (err) {
    throw new Error(err)
  }
};