import * as _ from '../collections'
import {} from './tile'

class ImprovementType {
  constructor(name, level, yields, bonuses, restrictions) {
    this.name = name
    this.yields = yields
    this.bonuses = bonuses
    this.restrictions = restrictions
  }
}

const STARTING_IMPROVEMENT_TYPE =
  new ImprovementType("Village square", 1, {food: 4, gold: 2, ore: 1, space: 2}, {}, {})

var id = 0

const STARTING_HAND_IMPROVEMENT_TYPES = [
  new ImprovementType("Mine", 1, {ore: 4}, {}, {}),
  new ImprovementType("Market", 1, {gold: 4}),
  new ImprovementType("Country fair", 1, {gold: 4}),
  new ImprovementType("Inn", 1, {food: 4}),
  new ImprovementType("Cottage", 1, {space: 4}),
  new ImprovementType("Workshop", 1, {ore: 4}, {}, {}),
  new ImprovementType("Fishing boat", 1, {food: 4}, {}, {}),
  new ImprovementType("Meeting place", 1, {}, {}, {}),
  new ImprovementType("School", 1, {knowledge: 4}, {}, {}),
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
