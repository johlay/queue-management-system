/**
 * Queue Model
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Declare Model Schema
const QueueSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // waitingList: [
  // 	{
  // 		type: Schema.Types.ObjectId,
  // 		ref: 'User',
  // 	}
  // ],
});

// Declare Model
const Queue = mongoose.model("Queue", QueueSchema);

// Export model
module.exports = Queue;
