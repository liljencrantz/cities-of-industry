import {newImprovementQueue, startingHand, startingImprovement} from './improvement'
import * as _ from '../collections'

class TileType {
  constructor(name, localModifier, adjecentModifier, settlable) {
      this.name = name
      this.localModifier = localModifier
      this.adjecentModifier = adjecentModifier
      this.settlable = settlable
  }
}

const OCEAN_TILE_TYPE = new TileType("Ocean", {}, {trade: 0.5, room: 0.5}, false)
const INTERIOR_TILE_TYPES = [
  new TileType("Meadow", {food: 0.5}, {}, true),
  new TileType("Hill", {production: 0.5, trade: -0.25}, {science: 0.25, room: 0.25}, true)
]

const newMap = (w, h) => {

  const res = new Array()
  _.times(h) (
    y => _.times(w) (x => res.push(new Tile(new Pos(x,y), INTERIOR_TILE_TYPES[0]))
  ))
  return res
}

class Pos {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  relativeTo(dx, dy) {
    return new Pos(this.x + dx, this.y + dy)
  }
}

class Country {
  constructor(startingHand) {
    this.hand = startingHand
  }
}

class Tile {
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

export default class {
  constructor(doc) {
    this.WIDTH = 21
    this.HEIGHT = 21
    this.STARTING_POS = [
      new Pos(10, 2),
      new Pos(18, 10),
      new Pos(10, 18),
      new Pos(2, 10)]
    this.tiles = newMap(this.WIDTH, this.HEIGHT)
    this.improvementHeap = new Array()
    this.improvementQueue = newImprovementQueue((this.WIDTH*this.HEIGHT)/4)
    this.countries = [
      new Country(startingHand()),
      new Country(startingHand()),
      new Country(startingHand()),
      new Country(startingHand())
    ];
    this.turn = 1

    _.times(4) (
      (idx) => this.getTile(this.STARTING_POS[idx])
        .improve(
          this.countries[idx],
          startingImprovement())
        .reveal()
    )
  }

  getTile(pos) {
    return this.tiles[pos.x + this.WIDTH * pos.y]
  }

  reveal(pos) {
    this.getTile(pos).revealed = true
  }

  getRows() {
    console.log("GGG", _.range(this.HEIGHT))
    return _.range(this.HEIGHT).map(idx => this.getRow(idx))
  }

  getRow(idx) {
    return this.tiles.slice(idx*this.WIDTH, (idx+1)*this.WIDTH)
  }

  getAdjecent(tile) {
    const res = []
    const pos = tile.pos

    if (pos.x > 0) {
      res.push(this.getTile(pos.relativeTo(-1, 0)))
    }
    if (pos.y > 0) {
      res.push(this.getTile(pos.relativeTo(0, -1)))
    }
    if (pos.x < (this.WIDTH-1)) {
      res.push(this.getTile(pos.relativeTo(1, 0)))
    }
    if (pos.y < (this.HEIGHT-1)) {
      res.push(this.getTile(pos.relativeTo(0, 1)))
    }
    return res
  }

  perform(actions) {
    actions
      .sort((a,b) => a.priority - b.priority)
      .forEach((action) => action.perform())
      this.turn++
  }
}
