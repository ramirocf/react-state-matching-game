import React, { Component } from 'react';
import OptionsPanel from '../OptionsPanel'
import Board from '../Board'
import {createTiles, indexOfSelected} from '../../misc/utils'

import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      numTiles: 36,
      playing: false,
      previousTileIndex: null,
      tiles: [],
      toBeCleared: null
    }
  }

  startGame()
  {
    this.setState(
      (state) => 
      (
        {
          playing: true,
          previousTileIndex: null,
          toBeCleared: null,
          tiles: createTiles(state.numTiles, this.handleTileClicked)
        }
      ))
  }

  handleTileClicked(id, color)
  {
    let toBeCleared = this.state.toBeCleared
    if(toBeCleared != null)
    {
      this.state.tiles[toBeCleared[0]].selected = false
      this.state.tiles[toBeCleared[1]].selected = false
      toBeCleared = null
    }
    const selectedTileIndex = indexOfSelected(this.state.tiles, id, color)
    this.state.tiles[selectedTileIndex].selected = true
    let previousTileIndex = this.state.previousTileIndex
    if (previousTileIndex != null)
    {
      let previousTile = this.state.tiles[previousTileIndex]
      let selectedTile = this.state.tiles[selectedTileIndex]
      if(previousTile.id != selectedTile.id && previousTile.color == selectedTile.color)
      {
        selectedTile.matched = true
        previousTile.matched = true
      }
      else
      {
        toBeCleared = [previousTileIndex, selectedTileIndex]
      }
      previousTileIndex = null
    }
    else
    {
      previousTileIndex = indexOfSelected(this.state.tiles, id, color)
    }
    this.setState((state) => (
      {
        tiles: state.tiles,
        toBeCleared: toBeCleared,
        previousTileIndex: previousTileIndex
      }
    ))
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        Turbo-Matcher
      </header>
        <OptionsPanel 
          playing={this.state.playing}
          numTiles={this.state.numTiles}
          startGame={this.startGame}
        />
        <Board
          numTiles={this.state.numTiles}
          tiles={this.state.tiles}
        />
    </div>
  );
  }
}

export default App;
