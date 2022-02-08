const allUsers = require('../test_devs');
const allSkills = require('../test_skills');
const moment = require('moment');
const { request } = require('express');

module.exports.getAllDevelopers = async function(req, res){
  let limit = null;
  const result = [];
  if(req.query.limit) limit = req.query.limit;
  try {
    // console.log(allUsers)
    const allDevs = await allUsers;
    if(allDevs && limit) {
      for(let i = 0; i < limit; i++) {
        result.push(allDevs[i]);
        
      }
      return res.status(200).json(result);
    } else if(allDevs) {
        return res.status(200).json(allDevs); 
    }
    
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