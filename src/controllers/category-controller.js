const Category = require("../model/Category");

class CategoryController {
  // GET all categories
  getCategories = async (req, res) => {
    const categories = await Category.find();
    if (categories.length < 1) return res.status(404).json({ status: false });
    return res.status(200).json({ status: true, data: { categories } });
  };

  // POST create category
  postCategory = async (req, res) => {
    const category = new Category({
      title: req.body.title,
      image: req.body.image,
    });
    const savedCategory = await category.save();
    if (!savedCategory) return res.status(503).json({ status: false });
    return res
      .status(200)
      .json({ status: true, data: { category: savedCategory } });
  };

  putCategory = async (req, res) => {
    const cateId = req.params.id;
    const updatedCate = await Category.findOneAndUpdate(
      { _id: cateId },
      {
        title: req.body.title,
        image: req.body.image,
      }
    );
    if (!updatedCate) return res.status(503).json({ status: false });
    return res
      .status(200)
      .json({ status: true, data: { category: updatedCate } });
  };
}

module.exports = new CategoryController();
