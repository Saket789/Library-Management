'use strict';

const Book = require('../models/Library.model');

exports.findAll = async function(req, res) {
    try{
        const book = await Book.findAll(req.body);
        console.log('res', book);
        return res.send(book);
    }
    catch(err){
        return res.send(err);
    }
};


exports.create = async function(req, res) {
    const new_book = new Book(req.body);
    try{
        if(req.body.constructor === Object && Object.keys(req.body).length !== 3)
            return res.status(400).send({ error:true, message: 'Please provide all required field' });
        const book = await Book.create(new_book);
        return res.json({error:false,message:"Book added successfully!",data:new_book});
    }
    catch(err){
        return res.send(err);
    }
};


exports.search = async (req, res) => {
    try{
        const book = await Book.search(req.body);
        if(book[0])
            return res.json(book);
        else
        return res.status(404).send({ error:true, message: 'Search Query not Found.' });
    }
    catch(err){
        return res.send(err);
    }
};


exports.delete = async function(req, res) {
    try{
        const book = await Book.delete(req.body);
        return res.json({ error:false, message: 'Book successfully deleted' });
    }
    catch(err){
        return res.send(err);
    }
};