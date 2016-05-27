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
* fix loader animation
* show games type in app bar
* fix save game button and dropdown menu
* improve show more button
* fix css
* MERGE TO MASTER

* render info in detail component
* Add message when no games underneath user games tab
* Add search
* Render recently viewed list and currently playing list of games in nav
* Make fetching of games more customizeable(genre, search, platform, etc)
* Enable users to rank games
* Enable persisting of games saved before signing in
* render errors
