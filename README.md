Concerns
===================
The project calls for an abstract data type that represents the grid, containing information on which squares are active. Based on this object, divs should be created and updated to accurately visualize the board. Then there should be ways in which the user can control the game (listeners, buttons). Each of these were separated into modules.

Modules
===================
I created an overall Board class, which contains a Grid object and an Interface object. This ties together the frontend and backend: Grid is a model of the board and Interface is the view. Board serves as the controller. I also had an Options class, which created the the preset patterns and buttons. The Board was also instantiated and initialized there. Some of the Interface functions depend on the Grid object. This is fine, because the view is meant to depend on the model.

Use of functionals
==================
I used filter to get a list of awake neighbors. I also used a function to create a closure that obtained the values (as opposed to reference) of coordinates for the squares' on click functions.

Design decisions
==================
One problem I ran into was adding the on click event handler for each square. It was difficult separating this into the model or view, because both need to be updated when the user clicks square. So instead, this was handled in the Board class. All other functionality was modularized into either the model or view. 