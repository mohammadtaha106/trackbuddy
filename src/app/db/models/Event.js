import mongoose from 'mongoose';
const { Schema } = mongoose;


const eventSchema = new Schema({
title : String,
description : String,
startDate : String,
endDate : String,
startTime : String,
endTime : String,
location : {
    lat:Number,
    long : Number,
},
createdBy: {type: mongoose.Types.ObjectId , ref : 'Users'} ,
address : String,
going : [{type: mongoose.Types.ObjectId , ref : 'Users'}]

});

export const EventModal = mongoose.model('Events',eventSchema)