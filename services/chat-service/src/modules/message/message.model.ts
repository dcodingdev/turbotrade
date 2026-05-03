import { mongoose, Schema, Document, AggregatePaginateModel } from "@repo/database";

export interface IMessage extends Omit<Document, '_id'> {
  _id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    _id: { type: String, required: true },
    conversationId: { 
      type: String, 
      required: true, 
      index: true 
    },
    senderId: { 
      type: String, 
      required: true,
      index: true 
    },
    body: { 
      type: String, 
      required: true 
    },
  },
  { 
    timestamps: true,
    _id: false, // We are providing our own string _id
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for conversation message history retrieval
messageSchema.index({ conversationId: 1, createdAt: 1 });

export const MessageModel = mongoose.model<
  IMessage,
  AggregatePaginateModel<IMessage>
>("Message", messageSchema);
