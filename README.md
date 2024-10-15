# [Simple Epidemiology Modeling Tool](https://epidemiologytool.vercel.app/)

This project uses the SIRD model (Susceptible, Infected, Recovered, Deceased) to simulate the spread of a disease through a population and returns a graphical representation of the results.

## Features

- SIRD Model Simulation: Simulate disease outbreaks and observe the progression of susceptible, infected, recovered, and deceased populations over time.
- Customizable Parameters: Adjust infection rates, recovery rates, death rates, population size, days to simulate and others.
- Interactive Visualizations: The graphical representation is created using [Chart.js](https://www.chartjs.org/).

## SIRD Model ([`sirdModel.ts`](https://github.com/techgustavo/simple-epidemiology-modeling-tool/blob/main/utils/sirdModel.ts))

### Basic Formulas

- $\text{newInfected} = \frac{\beta \cdot S \cdot I}{\text{Population}}$
  
- $\text{newRecovered} = \gamma \cdot I$

- $\text{newDeaths} = \mu \cdot I$

### Daily Updates

- Susceptible ($S$) decreases by the number of new infections:

  $S_{\text{new}} = S_{\text{old}} - \text{newInfected}$

- Infected ($I$) increases by new infections and decreases by recoveries and deaths:

  $I_{\text{new}} = I_{\text{old}} + \text{newInfected} - \text{newRecovered} - \text{newDeaths}$

- Recovered ($R$) increases by the number of new recoveries:

  $R_{\text{new}} = R_{\text{old}} + \text{newRecovered}$

- Deceased ($D$) increases by the number of new deaths:

  $D_{\text{new}} = D_{\text{old}} + \text{newDeaths}$

This cycle continues for each day of the simulation to track the disease progression.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue for suggestions and improvements.
