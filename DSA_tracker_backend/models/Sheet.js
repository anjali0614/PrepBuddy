const mongoose = require('mongoose');


const sheetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  steps: [
    {
      name: String,
      progress: { type: Number, default: 0 },
      substeps: [
        {
          name: String,
          progress: { type: Number, default: 0 },
          questions: [
            {
              title: String,
              linkLeetCode: String,
              linkGFG: String,
              linkYouTube: String,
              difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
              isStarred: { type: Boolean, default: false },
              isSolved: { type: Boolean, default: false },
              notes: String,
            },
          ],
        },
      ],
      questions: [ 
        {
          title: String,
          linkLeetCode: String,
          linkGFG: String,
          linkYouTube: String,
          difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
          isStarred: { type: Boolean, default: false },
          isSolved: { type: Boolean, default: false },
          notes: String,
        },
      ],
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Sheet", sheetSchema);