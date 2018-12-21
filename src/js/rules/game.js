import {newImprovementQueue, startingHand, startingImprovement} from './improvement'
import Player from './player'
import * as _ from '../collections'
import {Tile, TileType, newMap} from './tile'
import Pos from './pos'

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
    this.players = [
      new Player("Player", this, startingHand()),
      new Player("AI1", this, startingHand()),
      new Player("AI2", this, startingHand()),
      new Player("AI3", this, startingHand())
    ]
    this.turn = 1

    _.times(4) (
      (idx) => this.getTile(this.STARTING_POS[idx])
        .improve(
          this.players[idx],
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
