const mongoose = require('mongoose');



const CategorySchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
    },
    { timestamps: true }
  );

  var Category = mongoose.model("Categories",CategorySchema,'categories');

  exports.getCategories = async () => {

      const cats = Category.find();
      return cats;

  }

  exports.newCategory = async category => {
      const newCat = Category(category);
      const savedCat = await newCat.save();
      return savedCat;
  }
