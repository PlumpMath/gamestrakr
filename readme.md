# GamerLyfe Web
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
    isFetching: bool
  },
	gamesByType: {
		userSaved: {
			isFetching: bool
			items: []
		},
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
* Make upcoming and recent release pages one page/component(toggleable)
* Add pagination
* Add game detail component
* Make fetching of games more customizeable(genre, search, platform, etc)
* Dasable Redux logger in prod
* Render recently viewed list and currently playing list of games in nav
* Enable users to rank games
