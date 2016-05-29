# GamesTrakr Web
## Dev Notes
### Run webpack dev server
webpack-dev-server --inline

### Redux state map
```javascript
app: {
  currentPage: String,
  leftDrawerOpen: Boolean,
  selectedGamesType: String,
  errorMessage: String
},
user: {
  token: String,
  name: String,
},
entities: {
  games: Array
},
paginate:{
  gamesByType: {
    type: {
      isFetching: Boolean
      nexPageUrl: String,
      pageCount: Number,
      ids: Array
    }
  }
}
```


u## TODOS
* render info in detail component
* make sure all components arent importing unused libs
* use webpack uglify plugin
* show games type in app bar
* give giant bomb credit
* Add search
* Render recently viewed list and currently playing list of games in nav
* Make fetching of games more customizeable(genre, search, platform, etc)
* Enable users to rank games
* improve loader
