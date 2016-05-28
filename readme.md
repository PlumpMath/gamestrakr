# GamesTrakr Web
## Dev Notes
### Run webpack dev server
webpack-dev-server --inline

### Redux state map
```javascript
app: {
  currentPage: String,
  leftDrawerOpen: Boolean,
  selectedGamesType: String
},
user: {
  token: String,
  name: String,
},
entities: {
  games: Array
},
errorMessage: String,
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
* fix save game button and dropdown menu
* make sure game is removed from previous section when saved
* improve show more button
* MERGE TO MASTER

* render info in detail component
* have library container use games container
* make grid cmp more pure
* show games type in app bar
* Add search
* Render recently viewed list and currently playing list of games in nav
* Make fetching of games more customizeable(genre, search, platform, etc)
* Enable users to rank games
* Enable persisting of games saved before signing in
* render errors
* improve loader
