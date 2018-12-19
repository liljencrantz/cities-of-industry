export class ExploreAction {
  constructor(game, pos) {
    this.game = game
    this.position = pos
    this.priority = 0
  }

  perform() {
    this.game.reveal(this.position)
  }
}

export class ImproveAction {
  constructor(game, pos, country, improvement) {
    this.country = country
    this.improvement = improvement
    this.game = game
    this.position = pos
    this.priority = improvement.priority
  }

  perform() {
    const pos = this.position
    const tile = this.game.getTile(pos)
    const owner = tile.owner
    if (owner != null && owner != country) {
      return
    }
    tile.improve(this.country, this.country.dropFromHand(this.improvement))
  }
}

export class NothingAction {
  constructor() {
    this.priority = 0
  }

  perform() {
  }
}

export class ReplaceAction {
  perform() {
  }
}

export class RecycleAction {
  perform() {
  }
}

export class DestroyAction {
  perform() {
  }
}
