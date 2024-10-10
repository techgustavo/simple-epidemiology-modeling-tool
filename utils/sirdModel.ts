export type sirdParams = {
  beta: number // infection rate
  gamma: number // recovery rate
  mu: number // death rate
  population: number
  infected: number
  recovered: number
  days: number // number of days to simulate
}

export const sirdModel = (params: sirdParams) => {
  const { beta, gamma, mu, population, infected, recovered, days } = params

  const susceptible = population - infected - recovered
  const s = [susceptible]
  const i = [infected]
  const r = [recovered]
  const d = [0]
  const p = [population]

  for (let day = 1; day <= days; day++) {
    const newInfected = (beta * s[day - 1] * i[day - 1]) / population
    const newRecovered = gamma * i[day - 1]
    const newDeaths = mu * i[day - 1]

    s[day] = s[day - 1] - newInfected
    i[day] = i[day - 1] + newInfected - newRecovered - newDeaths
    r[day] = r[day - 1] + newRecovered
    d[day] = d[day - 1] + newDeaths
    p[day] = s[day] + i[day] + r[day]
  }

  return { s, i, r, d, p }
}
