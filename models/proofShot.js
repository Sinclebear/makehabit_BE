const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const proofShotSchema = new mongoose.Schema(
  {
    challengeId: {
      type: ObjectId,
      required: true,
    },
    userId: {
      type: ObjectId,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required,
    },
  },
  { timestamps: true } // createdAt, updatedAt 으로 Date형 객체 입력)
);

// 버츄얼 필드
proofShotSchema.virtual("proofShotId").get(function () {
  return this._id.toHexString();
});
proofShotSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("ProofShot", proofShotSchema);