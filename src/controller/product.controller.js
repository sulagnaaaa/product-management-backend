const Product = require("../model/product.model");
const cloudinary = require("../config/cloudinary");
const getProductList = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, desc, category, price } = req.body;
    console.log(
      "data coming in create controller",
      name,
      desc,
      category,
      price,
    );
    console.log("comming image", req.file);
    const uploadImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "product-management/products",
    });
    console.log("uploadImage", uploadImage);
    const response = await Product.create({
      name,
      desc,
      price,
      category,
      image: {
        url: uploadImage.url,
        public_id: uploadImage.public_id,
      },
    });
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
    try {
    const { name, desc, category, price } = req.body;


    const product= await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        desc,
        category,
        price
      },
      {new: true}
    );
     res.status(200).json({
      success: true,
      message: "Product is updated successfully",
      data: product,
    });
    } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
 try{
  const product= await Product.findByIdAndDelete (
    req.params.id
  );
  res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
    } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
 }
};

module.exports = {
  getProductList,
  createProduct,
  updateProduct,
  deleteProduct,
};