const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser:true});

const fruitSchema=new mongoose.Schema({
  name: {
    type:String,
    required:[true,"Include name"],
  rating: {
    type: Number,
    min: 1,
    max:10
  },
  review: String
}
})

const Fruit=mongoose.model("Fruit", fruitSchema);

const fruit=new Fruit({
  name:"Lemon",
  rating:34,
  review:"Good red fruit"
})

const personSchema=new mongoose.Schema({
  name:String,
  age:Number,
  favouriteFruit: fruitSchema
})

const Person=mongoose.model("Person", personSchema)
const person=new Person({
  name:"John",
  age:37,
  favouriteFruit: fruit
})

person.save()

 // fruit.save();

Fruit.deleteMany({name:"Apple"},function(err){
  if(!err){
    console.log("Deleted")
  }
})
