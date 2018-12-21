import * as _ from '../collections'
import Pos from './pos'

export class TileType {
  constructor(name, localModifier, adjecentModifier, settlable) {
      this.name = name
      this.localModifier = localModifier
      this.adjecentModifier = adjecentModifier
      this.settlable = settlable
  }
}

export const OCEAN_TILE_TYPE = new TileType("Ocean", {}, {trade: 0.5, room: 0.5}, false)
export const INTERIOR_TILE_TYPES = [
  new TileType("Meadow", {food: 0.5}, {}, true),
  new TileType("Hill", {production: 0.5, trade: -0.25}, {science: 0.25, room: 0.25}, true)
]

const allTiles = [OCEAN_TILE_TYPE, ...INTERIOR_TILE_TYPES]

export const TILES = new Map(allTiles.map(tile => [tile.name.toUpperCase(), tile]))

export class Tile {
  constructor(pos, type) {
    this.id = `tile-${pos.x}-${pos.y}`
    this.pos = pos
    this.type = type
    this.revealed = false
    this.improvement = null
    this.owner = null
  }

  improve(owner, improvement) {
    this.owner = owner
    this.improvement = improvement
    return this
  }

  reveal() {
    this.revealed = true
    return this
  }
}

export const newMap = (w, h) => {
  const res = new Array()
  _.times(h) (
    y => _.times(w) (x => res.push(new Tile(new Pos(x,y), INTERIOR_TILE_TYPES[0]))
  ))
  return res
}
