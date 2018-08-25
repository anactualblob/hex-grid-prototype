# Hex Grid Prototype

This is a prototype of an interactible hex grid made with JavaScript and PixiJs. Most of the logic is greatly inspired by [this great guide](https://www.redblobgames.com/grids/hexagons/), made by [Amit Patel](https://www.redblobgames.com/).

[Link to the playable prototype](https://bloblucas.github.io/hex-grid-prototype)

## User Stories
The user stories I want this prototype to fulfill (in order of descending priority)
- [x] A hex grid is diplayed.
- [x] Each hex has a property that I can change (e.g. its color).
- [x] A player sprite is diplayed on a hex.
- [x] The program knows the coordinates of a hex I click on.
- [x] Clicking on the player then on a hex makes the player sprite move to that hex.
- [ ] The player sprite has a limited range.
- [ ] The player range is diplayed on the grid when I click on the player.
- [x] To create the grid, I can pass a text file with the grid layout and the property for each hex.
- [ ] The player moves smoothly along the grid.
- [ ] The player can't walk on some hexes. The displayed range adapts to this constraint.
- [ ] Several enemy sprites are displayed on the grid.
- [ ] To place the enemy sprites, I can pass a text file with the grid alyout and whether a hex has an enemy on it.