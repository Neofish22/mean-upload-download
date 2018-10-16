MEAN Upload/Download demo
===
Repository to go along with article here: https://gmaemoo.se/mean-upload-download
Demonstration of a simple and stripped-back upload/download system based around Angular 6 front-end, Node/Express middleware, and Mongod backend.

Setup mongod
---
- https://docs.mongodb.com/manual/installation/
- https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04
- Check that `Gruntfile.js` method of running mongod is correct for you. E.g. `mongod --config /usr/local/etc/mongod.conf`
- (Create admin user for you to do stuff with)
- Create `mean-upload-download` database.
- Create user with:
```
name: mean-upload-download
pass: (given between : and @ in srv/config.ts)
authenticationDatabase: mean-upload-download
```
- Exact commands:
```
use mean-upload-download
db.createUser({
  user: "mean-upload-download",
  pwd: "a1uOY7B4fLV6QUj06yjk",
  roles: [{"role":"readWrite","db":"mean-upload-download"}]
  })
```

Import data into mongod
---
Insert contents of `mongo-data-with-comments.json` into their respective collections in the `mean-upload-download` database.

Install global requirements
---
`npm install -g nodemon @angular watch concurrently`
- Not 100% sure this is right. Might need `@angular/angular-cli`. See Angular 6 quickstart guide to check.
- *TODO*: Get this right.

Install local requirements
---
`npm install`

Folder structure
---
- `src` Angular front-end. Highly organised and stuff, so create stuff with commands such as `ng g service services/taco` to make a `TacoService` in `services`, or `ng g component components/taco` to make a `TacoComponent` in `components/taco`.
- `srv` Typescript middleware using Express. Models use Mongoose and Typegoose to provide Typescript bindings.
- `build` Target for dev and release builds. Uses split folder style (`middle` for middleware and `front` for frontend). This is due to Angular requiring to either have empty folder or delete it, and separation of concerns. More fiddly for serving though.

Misc commands
---
- `grunt` or `grunt watch` Runs mongod, node[mon], and watch tasks for building/running the middle/front. Target is `build` folder.
- `grunt build` Builds a release version into `build` folder.
- Above commands have varying versions for just building front/middle or dev/prod. Shouldn't need anything more than `grunt` for now though.
- `grunt lint` and `grunt lint-fix` does lint stuff.
- `grunt cloc` for SLOC. :)

License
---
There are a whole bunch of external licenses for the code used here. For stuff that is actually in this repository, feel free to use the code how you see fit, but please credit me (link to this repo or the article) if using it as-is or close to. Otherwise a credit would still be nice. :)

(I think I credited every resource I used but may have missed it. If you notice this please contact me).

Contribution
---
Please feel free to submit pull requests or issues, but note that I will only want to make changes where there are issues as is (e.g. no version upgrades, at least for the foreseeable future). I will, of course, give credit for such input.

Particularly where I'm interested in input: unit/e2e testing, extension to allow for use of GridFS, and correcting the POST request in MediaService that does not use Angular's HttpClient. In these cases I would also update the article to include it.
