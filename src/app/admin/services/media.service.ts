import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, of, from } from 'rxjs'
import { tap, map } from 'rxjs/operators'

import { Media } from '../models/media.model'

// Service for fetching and caching medias, and updating them.
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  // Construct.
  constructor(
    private http: HttpClient) {
  }

  // Get all medias.
  getMedias(): Observable<Media[]> {
    return this.http.get<any>('/api/admin/media')
  }

  // Requests to save a new media.
  saveNew(media: Media): Observable<Media> {
    return this.http.post<any>('/api/admin/media',media)
  }

  // Requests to save an existing media.
  saveExisting(media: Media): Observable<Media> {
    let id = media._id
    return this.http.put<any>('/api/admin/media/'+id,media)
  }

  // Requests to save an existing media.
  saveData(media: Media, formData: FormData): Observable<any> {
    return from(new Promise((resolve, reject) => {
      let req = new XMLHttpRequest()
      req.open('POST','/api/admin/media/'+media._id+'/data')
      req.setRequestHeader('Content-Type','application/octet-stream')
      req.send(formData.get('data'))
      req.onreadystatechange = () => {
        if ( req.readyState == 4 ) {
          if ( req.status == 200 ) {
            resolve(JSON.parse(req.response))
          } else {
            reject(req.response)
          }
        }
      }
    }))
  }

  // Requests to delete an media.
  delete(media: Media): Observable<any> {
    let id = media._id
    return this.http.delete<any>('/api/admin/media/'+id)
  }
}
