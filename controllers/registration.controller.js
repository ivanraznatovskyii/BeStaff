const moment = require('moment');
const app = require('../app');
const axios = require('axios');
const baseUrl = 'http://20.107.45.74/api/'
const positionsUrl = 'registration/positions';


module.exports.getPositions = async function(req, res){

  axios.get(baseUrl + positionsUrl).then(function(response) {
    return res.status(200).json(response.data);
  })
  .catch(function(err) {
    res.status(404).json(err)
  })
};

