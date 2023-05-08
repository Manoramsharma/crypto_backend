const l = require('../common/logger');

const { cloudinary } = require('../configs/cloudinary');

const productModel = require('../models/product');

class ProductService {
  async uploadProduct(body, user) {
    try {
      const { productName, price, productDescription, image, imageHash } = body;

      productModel.create({
        productName,
        price,
        productDescription,
        image,
        imageHash
      });
    } catch (error) {
      throw error;
    }
  }
  // async uploadImages(files) {
  //   var links = [];
  //   for (var i = 0; i < files.length; i++) {
  //     try {
  //       const fileStr = files[i];
  //       const uploadResponse = await cloudinary.uploader.upload(fileStr, {
  //         upload_preset: 'ml_default',
  //       });
  //       links.push(uploadResponse.secure_url);
  //     } catch (err) {
  //       l.error['Image Upload'];
  //       throw err;
  //     }
  //   }
  //   return links;
  // }
  async deleteProduct(id) {
    try {
      const product = await productModel.findById(id);
      this.deleteImages(product.images).then((_) => {
        productModel.deleteOne({ _id: id }, function (err, __) {
          if (err) {
            throw err;
          }
        });
      });
    } catch (error) {
      l.error('[DELETE PRODUCT SERVICE]', id);
      throw error;
    }
  }
  async deleteImages(images) {
    try {
      for (var i = 0; i < images.length; i++) {
        await cloudinary.uploader.destroy(images[i].split('/')[7].split('.')[0], function (result) {
          if (result) return;
        });
      }
    } catch (error) {
      l.error('[CLOUDINARY DELETE IMAGE]', error);
      throw error;
    }
  }
}
module.exports = new ProductService();
