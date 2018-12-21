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
  constructor(name, game, startingHand) {
    this.name = name
    this.game = game
    this.hand = startingHand
  }

  dropFromHand(improvement) {
    this.hand = this.hand.filter(i => i != improvement)
    while(this.hand.length < this.game.handSize) {
      const imp = this.game.drawImprovement()
      if(imp === undefined) {
        break
      }
      this.hand.push(imp)
    }
    return improvement
  }

  getPlayable() {
    return this.hand.slice(0,3)
  }

  getLegalTiles(improvement) {
    return new Set(this.game.tiles
        .filter(tile => tile.revealed && tile.improvement == null)
        .filter(tile => this.game.getAdjecent(tile)
          .filter(tile => tile.improvement != null && tile.owner === this).length > 0)
        .map(tile => tile.id))
  }

  get legalImprovements() {
    return new Set(this.getPlayable().map(i => i.id))
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
      new Country("Player", this, startingHand()),
      new Country("AI1", this, startingHand()),
      new Country("AI2", this, startingHand()),
      new Country("AI3", this, startingHand())
    ]
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

  get rows() {
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

  drawImprovement() {
    return this.improvementQueue.pop()
  }

  perform(actions) {
    actions
      .sort((a,b) => a.priority - b.priority)
      .forEach((action) => action.perform())
      this.turn++
  }

  get explorable() {
    return new Set(this.tiles
      .filter(tile => !tile.revealed)
      .filter(tile => this.getAdjecent(tile).filter(tile => tile.revealed).length > 0)
      .map(tile => tile.id))
  }
}
