import * as mongoose from 'mongoose'
import { Typegoose, prop } from 'typegoose'

// Defines an article author.
export class Media extends Typegoose {
  // The filename. Accessed by this and used for downloads.
  @prop({ required: true, unique: true })
  filename: string
  // The type of the file, used to send the correct header.
  @prop({ required: true })
  type: string
  // The actual data.
  @prop()
  data?: mongoose.Types.Buffer
}

export const MediaModel = new Media().getModelForClass(Media)
