# GamesTrakr Web
## Dev Notes
### Run webpack dev server
webpack-dev-server --inline

### Example redux state map
```javascript
state = {
 app: {
	currentPage: string,
	leftDrawerOpen: bool,
	selectedGamesType: string
 },
 user: {
   token: String,
   name: String,
 },
 gamesByType: {
	upcoming: {
    page: 0,
		isFetching: bool
		items: []
	},
	recent: {
		isFetching: bool
		items: []
	},
	user: {
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
* Enable persisting of games saved before signing in
* Add pagination
* Add loader animation
* Add game detail component
* Add search
* Render recently viewed list and currently playing list of games in nav
* Make fetching of games more customizeable(genre, search, platform, etc)
* Enable users to rank games
* render errors
