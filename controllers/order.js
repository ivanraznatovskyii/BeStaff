const { query } = require('express');
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

// get query to localhost:5000/api/order/?offset=2&limit=5
module.exports.getAll = async function(request, response){
  const query = {
    user: request.user.id
  };

  //date of start
  if(request.query.start){
    query.date = {
      //spec symbolse of mongoose
      $gte: request.query.start//greater or equal (>=)
    }
  }

  if(request.query.end){
    if(!query.date){
      query.date = {}
    }
    query.date['$lte'] = request.query.end;
  }

  if(request.query.order){
    query.order = +request.query.order;
  }

  try {
    const orders = await Order
    .find(query)
    .sort({date: -1})
    .skip(+request.query.offset)
    .limit(+request.query.limit);
    response.status(200).json(orders);
  } catch (error) {
    errorHandler(response, error);
  }
}

module.exports.create = async function(request, response){
  try {
    const lastOrder = await Order
    .findOne({user: request.user.id})
    .sort({date: -1});
    const maxOrder = lastOrder ? lastOrder.order : 0;

    const order = await new Order({
      list: request.body.list,
      user: request.user.id,
      order: maxOrder + 1
    }).save(order);
    response.status(201).json(order);
  } catch (error) {
    errorHandler(response, error);
  }
}