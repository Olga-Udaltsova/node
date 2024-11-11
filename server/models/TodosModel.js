const { Schema, model } = require("mongoose");

const TodosShema = new Schema({
  title: { type: String, required: true },
});

module.exports = model('Todos', TodosShema)