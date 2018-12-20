export const times = (laps, lap) => f => {
  lap = lap || 0
  if (lap < laps) {
    f(lap)
    times (laps, lap+1) (f)
  }
}

export const range = (to) => {
  return [...Array(to).keys()]
}

const shuffleInPlace = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const shuffle = (array) => shuffleInPlace(array.slice(0, array.length))
