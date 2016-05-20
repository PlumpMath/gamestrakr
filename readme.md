# GamesTrakr Web
## Dev Notes
### Run webpack dev server
webpack-dev-server --inline

### Example redux state map
```javascript
state = {
 ui: {
	currentPage: string,
	leftDrawerOpen: bool,
	selectedGamesType: string
 },
 user: {
 	token: String,
    name: String,
    isFetching: bool,
    games: {
    	isFetching: bool
		items: []
    }
  },
 gamesByType: {
	upcoming: {
		isFetching: bool
		items: []
	},
	recent: {
		isFetching: bool
		items: []
	},
	searchedFor: {
		isFetching: bool
		items: []
	}
 }
}
```


## TODOS
* fix user games is fetching
* Add pagination
* Add back loader animation
* render errors
* Add game detail component
* Enable users not logged in to save games then upload to server once signed in(show msg)
* Make fetching of games more customizeable(genre, search, platform, etc)
* Render recently viewed list and currently playing list of games in nav
* Enable users to rank games
