

export default class Pos {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  relativeTo(dx, dy) {
    return new Pos(this.x + dx, this.y + dy)
  }
}
