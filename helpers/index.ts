export const parseCollection = (collection) => collection.map((record: any) => ({
  ...record.toObject(),
  _id: record._id.toString()
}))