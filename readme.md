#GamerLyfe Web
##Dev Notes
###Run webpack dev server
webpack-dev-server --inline

###Example redux state map
state = {
	app: {
		currentPage: string,
		leftDrawerOpen: bool,
		selectedGamesType: string
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

##TODOS
Make upcoming and recent release pages one page/component(toggleable)
Improve reducer caching
Create multiple reducers(one for each main section)
Create users
Enable users to add games to currently playing, completed, saved
Normalize giant bomb api data for use across sections
Disable Redux logger in prod
Render recently viewed list and currently playing list of games in nav
Make fetching of games more customizeable(ui options plug into actions and reducers)
Add QA ui for each game
Add platforms
Enable users to rank games

