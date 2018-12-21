
export default class {
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

  get resources() {

  }
}
