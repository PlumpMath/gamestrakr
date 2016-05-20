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
* Add pagination
* Add loader animation
* Add game detail component
* Add search
* Make fetching of games more customizeable(genre, search, platform, etc)
* Render recently viewed list and currently playing list of games in nav
* Enable users to rank games
* render errors
