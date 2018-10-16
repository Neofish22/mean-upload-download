
// Defines an item of media (photo/video/file).
export class Media {
  // Mongo internal ID.
  _id: string
  // The filename. Accessed by this and used for downloads.
  filename: string
  // The type of the file, used to send the correct header.
  type: string
}
