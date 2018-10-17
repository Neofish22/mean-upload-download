import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'

import { tap } from 'rxjs/operators'

import { Media } from '../../models/media.model'
import { MediaService } from '../../services/media.service'

//
@Component({
  selector: 'mud-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.sass']
})
export class MediaComponent implements OnInit {
  // List to render.
  medias: Media[]
  // List of dirty medias, null if clean.
  editingMedias: Media[]
  // Used to render files.
  renderMedias: string[]
  // Used to ask for a file.
  @ViewChild('fileInput')
  fileInput: ElementRef

  // Construct.
  constructor(
    private media: MediaService) { }

  // Init.
  ngOnInit() {
    this.media.getMedias().subscribe(medias => {
      console.log('Medias',medias)
      this.medias = medias
      this.editingMedias = []
      this.renderMedias = []
      for ( let media of medias ) {
        this.editingMedias.push(null)
        this.renderMedias.push(media.filename)
      }
    })
  }

  // Handles uploading a file to a media item.
  upload(index) {
    // Disable rendering.
    this.renderMedias[index] = null
    // The input.
    let fileInput: HTMLInputElement = this.fileInput.nativeElement
    // Setup callback so know when user has selected a file.
    fileInput.onchange = () => {
      // Remove callback.
      fileInput.onchange = undefined
      // Don't run if there was no selection.
      if ( fileInput.files.length == 0 ) {
        return
      }
      // Get the file we're going to upload.
      let file = fileInput.files[0]
      // Extra data.
      this.editingMedias[index].filename = file.name
      this.editingMedias[index].type = file.type
      // Save the filename/etc.
      this.save(index,() => {
        // Begin upload.
        let formData = new FormData()
        formData.append('data',file)
        this.media.saveData(this.medias[index],formData)
          .subscribe(() =>
            // Re-enable rendering.
            this.renderMedias[index] = this.medias[index].filename)
      })
    }
    // Open the file input window and start everything.
    fileInput.click()
  }

  // Adds a blank media to the list to start a new one.
  startNew() {
    this.medias.push(null)
    this.editingMedias.push(new Media())
    this.renderMedias.push(null)
  }

  // Starts editing of an media.
  edit(index: number) {
    // Making a copy with constructor intact.
    this.editingMedias[index] = {...new Media(),...this.medias[index]}
  }

  // Resets an media.
  reset(index: number) {
    // If the media is a new one, delete it.
    if ( this.medias[index] == null ) {
      this.delete(index)
    }
    // Otherwise, just reset the edit array.
    else {
      this.editingMedias[index] = null
    }
  }

  // Saves an media.
  save(index: number, callback?) {
    let media = this.editingMedias[index],
      endpoint = null
    // If the media is a new one, POST it.
    if ( this.medias[index] == null ) {
      endpoint = this.media.saveNew(media)
    }
    // Otherwise, PUT it.
    else {
      endpoint = this.media.saveExisting(media)
    }
    // Perform the request.
    endpoint.subscribe((returnedMedia: Media) => {
      console.log(returnedMedia)
      this.medias[index] = returnedMedia
      this.editingMedias[index] = null
      if ( callback ) {
        callback()
      } else {
        this.renderMedias[index] = this.medias[index].filename
      }
    })
  }

  // Deletes an media.
  delete(index: number) {
    // Function for removing items from both arrays.
    let removeItems = () => {
      this.medias.splice(index,1)
      this.editingMedias.splice(index,1)
      this.renderMedias.splice(index,1)
    }
    // If the media is a new one, delete it.
    if ( this.medias[index] == null ) {
      removeItems()
    }
    // Otherwise, request deletion from the service, then delete.
    else {
      this.media.delete(this.medias[index]).subscribe(() => {
        removeItems()
      })
    }
  }

  // Returns true if the given editing media has all the components it needs.
  isValid(index: number) {
    let media = this.editingMedias[index]
    // Check page properties.
    if ( !media.filename || media.filename.length == 0 ||
        !media.type || media.type.length == 0 ) {
      return false
    }
    // Ok. :)
    return true
  }
}
