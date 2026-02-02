const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },

    description: String,

    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },

    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
