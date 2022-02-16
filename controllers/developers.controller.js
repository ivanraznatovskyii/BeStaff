const allUsers = require('../test_devs');
const allSkills = require('../test_skills');
const moment = require('moment');
const { request } = require('express');
/* let allUsers;

сonst http = require('http');
let url = "http://20.107.45.74/api/developers/available";
http.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            allUsers = json;
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
}); */


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

module.exports.getDevById = async function(req, res){
  let developerId = null;
  let result;
  if(req.query.developerId) developerId = req.query.developerId;
  try {
    const allDevs = await allUsers;
    if(allDevs && developerId) {
      result = allDevs.find(dev => dev.developerId = developerId);
      return res.status(200).json(result);
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

