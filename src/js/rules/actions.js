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
  constructor(game, pos, country, idx) {
    this.country = country
    this.handIdx = idx
    this.game = game
    this.position = pos
    this.priority = country.getHand(idx).priority
  }

  perform() {
    const pos = this.position
    const tile = game.getTile(pos)
    const owner = tile.owner
    if (owner != null && owner != country) {
      return
    }
    tile.improve(this.country, this.country.dropFromHand(this.handIdx))
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
