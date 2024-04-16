# TicTacToeApp
A Tic Tac Toe game you can play in your browser!

Planning the Tic Tac Toe Game
Structure Overview

HTML: A simple structure with a game board, player input forms, and a game status display.
CSS: Styling for the game board and interface elements.
JavaScript:
Gameboard Module: Handles the internal game board state.
Player Factory: Generates player objects with names and markers.
Game Controller Module: Manages game flow, including turn taking and win/tie checking.
Display Controller Module: Manages DOM interactions, updates the UI based on game state.
Detailed JavaScript Components

Gameboard Module (IIFE): Stores the game board as an array, provides functions to manipulate and query the state of the board.
Player Factory: Factory function to create players with specific names and symbols.
Game Controller Module (IIFE): Manages game logic, including initializing the game, handling player turns, and checking for game over conditions.
Display Controller Module (IIFE): Connects the JavaScript logic to the DOM, handles rendering of the game board, and processes player interactions through the UI.
Game Flow

Initialize the game with player names and assign symbols.
Render the initial game board.
Manage player interactions and check for win/tie conditions after each move.
Update the UI based on game state changes.
Allow restarting the game.