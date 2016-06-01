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


## TODOS
* use redux-api-middleware
* make libTypes part of app state(configurable), test
* show games type in app bar
* give giant bomb credit
* render improved/more info detail component
* Add search
* Render recently viewed list and currently playing list of games in nav
* Make fetching of games more customizeable(genre, search, platform, etc)
* Enable users to rank games
* improve loader
