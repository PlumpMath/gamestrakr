# GamesTrakr Web
## Dev Notes
### Run webpack dev server
webpack-dev-server --inline

### Redux state map
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
    page: Integer,
		isFetching: bool
		items: []
	},
	recent: {
    page: Integer,
		isFetching: bool
		items: []
	},
	user: {
    page: Integer,
		isFetching: bool
		items: []
	},
	searchedFor: {
    page: Integer,
		isFetching: bool
		items: []
	}
 }
}
```


## TODOS
* Add pagination
* Add loader animation(min grid height, center loader)
* Add game detail component
* Add search
* Render recently viewed list and currently playing list of games in nav
* Make fetching of games more customizeable(genre, search, platform, etc)
* Enable users to rank games
* Enable persisting of games saved before signing in
* render errors
