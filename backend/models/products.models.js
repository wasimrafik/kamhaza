// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// const  productsSchema = new Schema({ 
//     name: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         required: true
//     },
//     condition: {
//         type: String,
//         required: true
//     },
//     startingBid: {
//         type: Number,
//         required: true
//     },
//     buyNow: {
//         type: Number,
//         required: true
//     },
//     currentBid: {
//         type: Number,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     seller: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     status: {
//         type: String,
//         required: true
//     },
//     bids: [
//         {
//             bidder: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "User",
//                 required: true
//             },
//             amount: {
//                 type: Number,
//                 required: true
//             },
//             bidAt: {
//                 type: Date,
//                 default: Date.now
//             }
//         }
//     ]
// }, { timestamps: true });

// models/Product.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Base Product Schema
const options = { discriminatorKey: "saleType", timestamps: true };

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, options);

const Product = mongoose.model("Product", productSchema);

// Fixed-Price Product Schema (discriminator)
const fixedProductSchema = new Schema({
  buyNow: {
    type: Number,
    required: true,
  },
});
const FixedProduct = Product.discriminator("fixed", fixedProductSchema);

// Auction Product Schema (discriminator)
const auctionProductSchema = new Schema({
  startingBid: {
    type: Number,
    required: true,
  },
  currentBid: {
    type: Number,
    required: true,
  },
  bids: [
    {
      bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      bidAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
const AuctionProduct = Product.discriminator("auction", auctionProductSchema);

export { Product, FixedProduct, AuctionProduct };
