const moment = require('moment');
const http = require('http');
const app = require('../app');
const request = require('request');
const axios = require('axios');
const baseUrl = 'http://20.107.45.74/api/'
const devUrl = 'developers/available';
const stacksUrl = 'developers/stacks';
const skillsUrl = 'registration/skills';
const FormData = require('form-data');

const devByIdUrl = 'developer/';
const searchByQueryUrl = 'developers/search';


module.exports.getAllDevelopers = async function(req, res){
  const limit = req.query.limit;

  axios.get(baseUrl + devUrl).then(function(response) {
    if(limit) {
      const limitedList = []
      for(let i = 0; i < limit; i++) {
        limitedList.push(response.data[i]);
      }
      return res.status(200).json(limitedList);
    } else {
      return res.status(200).json(response.data);
    }
  })
  .catch(function(err) {
    res.status(404).json(err)
  })

};

module.exports.requestCVDevById = async function(req, res){

  let developerId = null;
  let body = null;
  if(req.query.developerId) developerId = req.query.developerId;
  if(req.body) console.log('body', req.body);
  axios.post(baseUrl + devByIdUrl + developerId + '/cv', body).then(function(response) {
    return res.status(200).json(response.data);
  })
  .catch(function(err) {
    res.status(404).json(err)
  })

};

module.exports.getDevById = async function(req, res){

  let developerId = null;
  if(req.query.developerId) developerId = req.query.developerId;
  axios.get(baseUrl + devByIdUrl + developerId).then(function(response) {
    return res.status(200).json(response.data);
  })
  .catch(function(err) {
    res.status(404).json(err)
  })

};

module.exports.getAllStacks = async function(req, res){

  axios.get(baseUrl + stacksUrl).then(function(response) {
    return res.status(200).json(response.data);
  })
  .catch(function(err) {
    res.status(404).json(err)
  })
};

module.exports.getAllSkills = async function(req, res){
  console.log(baseUrl + skillsUrl)
  axios.get(baseUrl + skillsUrl).then(function(response) {
    return res.status(200).json(response.data);
  })
  .catch(function(err) {
    res.status(404).json(err)
  })
};


module.exports.searchByQuery = async function(req, res){
  // console.log(req.params)
  // console.log(req.params)
  // console.log(req.query)
  // console.log(req.body)
  let body = null;
  if(req.body) body = req.body; // like { SearchString: 'argewrgqwerewr' }
  axios.post(baseUrl + searchByQueryUrl, body).then(function(response) {
    return res.status(200).json(response.data);
  })
  .catch(function(err) {
    res.status(404).json(err)
  })

};

module.exports.searchByAllParams = async function(req, res){
  // console.log('Params', req.params)
  // console.log('Query', req.query)
  // console.log('Body', req.body)
  // console.log('Request', req)
  let body = null;
  let bodyOptions = {};
  if(req.body) {
    body = req.body;
    for(let key in body) {
      // console.log(key, body[key]);
      bodyOptions[key] = body[key];
    }
    options = new URLSearchParams(bodyOptions);
  }

  // console.log(options);

  axios.post(baseUrl + searchByQueryUrl, options).then(function(response) {
    // console.log(response)
    return res.status(200).json(response.data);
  })
  .catch(function(err) {
    res.status(404).json(err)
  })
};
