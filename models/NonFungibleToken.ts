import mongoose from 'mongoose'

/* NonFungibleTokenSchema will correspond to a collection in your MongoDB database. */
export const NonFungibleTokenSchema = new mongoose.Schema({
  name: {
    /* The name of this  NonFungibleToken*/

    type: String,
    required: [true, 'Please provide a name for this NonFungibleToken.'],
  },
  image: {
    /* The owner of this NonFungibleToken */

    type: String,
    required: [true, "Please provide an image url for this NonFungibleToken."],
  },
  elo: {
    /* The owner of this NonFungibleToken */

    type: Number,
    required: [true, "An NonFungibleToken must have an elo rating"]
  },
  type: {
    /* The owner of this NonFungibleToken */

    type: String,
    required: [true, "Please provide a type this NonFungibleToken belongs to."],
  },
  votes: {
    /* The owner of this NonFungibleToken */
    type: Number,
    default: 0
  }
})

export default mongoose.models.NonFungibleToken || mongoose.model('NonFungibleToken', NonFungibleTokenSchema)
