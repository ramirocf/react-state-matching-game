import React from 'react'

import './Tile.css'

const Tile = (props) => {
  return (
    <div 
      className='Tile'
      style={(props.selected || props.matched)? {backgroundColor: props.color}: null}>
      {(props.selected || props.matched)? <props.svg />: null}
    </div>
  )
}

export default Tile
