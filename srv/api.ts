
import * as express from 'express'
import * as jwt from 'express-jwt'
import * as mongoose from 'mongoose'
import { spawn } from 'child_process'

import { config } from './config'
import { Media, MediaModel } from './models/media.model'

// Create an API.
export function api(app) {

  /************************************
   * IMPORTANT
   ************************************
    Note that in this file I have commented where Admin/LoggedIn checks
    would be made. You must restore these for security. The two functions
    immediately below are part of that but are left as duds for your
    completion.
    Check out https://auth0.com/blog/real-world-angular-series-part-1/ for
    more info.
  // Checks a user is logged in.
  const jwtCheck = jwt()
  // Checks the logged in user is admin.
  const adminCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next()
  }*/

  // Generic catch error function.
  function handleCaughtErrors(err: Error, res: express.Response, extras?: any) {
    // Handle the error.
    if ( err ) {
      return res.status(500).send({message: err.message})
    } else {
      return res.status(500).send({message: 'Unknown error.'})
    }
  }

  // PUBLIC STUFF
  // MEDIA
  // Returns a file with the correct mimetype etc.
  app.get('/api/media/:filename', (req: express.Request, res: express.Response) => {
    MediaModel.findOne({filename:req.params['filename']})
    .then((media: Media) => {
      res.contentType(media.type)
      res.send(media.data.buffer)
    })
    .catch((err: Error) => handleCaughtErrors(err,res))
  })


  // SEMI-PUBLIC (requires login)


  // PRIVATE (requires admin login)
  // MEDIA
  app.route('/api/admin/media')
  // Gets all media (if admin).
  .get(/*jwtCheck, adminCheck,*/ (req: express.Request, res: express.Response) => {
    MediaModel.find().select('-data').lean()
    .then((medias: Media[]) => res.send(medias))
    .catch((err: Error) => handleCaughtErrors(err,res))
  })
  // Adds a piece of media (if admin).
  .post(/*jwtCheck, adminCheck,*/ (req: express.Request, res: express.Response) => {
    MediaModel.create(req.body)
    .then((media: Media) => {
      res.send(media)
    })
    .catch((err: Error) => handleCaughtErrors(err,res))
  })

  app.route('/api/admin/media/:id')
  // Updates a piece of media (if admin).
  .put(/*jwtCheck, adminCheck,*/ (req: express.Request, res: express.Response) => {
    MediaModel.findByIdAndUpdate(req.params['id'],req.body,{new:true})
    .then((media: Media) => res.send(media))
    .catch((err: Error) => handleCaughtErrors(err,res))
  })
  // Deletes a piece of media (if admin).
  .delete(/*jwtCheck, adminCheck,*/ (req: express.Request, res: express.Response) => {
    MediaModel.findByIdAndRemove(req.params['id'])
    .then(() => res.send(true))
    .catch((err: Error) => handleCaughtErrors(err,res))
  })

  app.route('/api/admin/media/:id/data')
  // Updates a piece of media with data (if admin).
  .post(/*jwtCheck, adminCheck,*/ (req: express.Request, res: express.Response) => {
    MediaModel.findByIdAndUpdate(req.params['id'],{data:req.body},{new:true})
    .select('-data')
    .then(() => res.send(true))
    .catch((err: Error) => handleCaughtErrors(err,res))
  })
}
