import * as _ from '../collections'

class ImprovementType {
  constructor(name) {
    this.name = name
  }
}

const STARTING_IMPROVEMENT_TYPE =
  new ImprovementType("Village square")

var id = 0

const STARTING_HAND_IMPROVEMENT_TYPES = [
  new ImprovementType("Mine"),
  new ImprovementType("Market"),
  new ImprovementType("Country fair"),
  new ImprovementType("Inn"),
  new ImprovementType("Cottage"),
  new ImprovementType("Workshop"),
  new ImprovementType("Mine"),
  new ImprovementType("Fishing boat"),
  new ImprovementType("Meeting place"),
  new ImprovementType("School"),
]

class Improvement {
  constructor(improvementType) {
    this.type = improvementType
    this.id = `improvement-${id++}`
  }
}

export const newImprovementQueue = (eraSize) => {
  return _.shuffle(STARTING_HAND_IMPROVEMENT_TYPES)
    .map(type => new Improvement(type))
}

export const startingHand = () => {
  return _.shuffle(STARTING_HAND_IMPROVEMENT_TYPES)
  .slice(0, 7)
  .map(type => new Improvement(type))
}

export const startingImprovement = () => {
  return new Improvement(STARTING_IMPROVEMENT_TYPE)
}
