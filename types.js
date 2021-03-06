const { gql } = require('apollo-server')

const typeDefs = gql`
type Character {
  birth_year: String,
  eye_color: String,
  films: [Film],
  gender: String,
  hair_color: String,
  height: String,
  homeworld: Planet,
  mass: String,
  name: String,
  skin_color: String,
  created: String,
  edited: String,
  species: [Species],
  starships: [Starship],
  url: String,
  vehicles: [Vehicle]
}

type Film {
  characters: [Character],
  created: String,
  director: String,
  edited: String,
  episode_id: Int,
  opening_crawl: String,
  planets: [Planet],
  producer: String,
  release_date: String,
  species: [Species],
  starships: [Starship],
  title: String,
  url: String,
  vehicles: [Vehicle]
}

type Starship {
  MGLT: String,
  cargo_capacity: String,
  cost_in_credits: String,
  created: String,
  crew: String,
  edited: String,
  hyperdrive_rating: String,
  length: String,
  manufacturer: String,
  max_athosphering_speed: String,
  model: String,
  name: String,
  passengers: String,
  films: [Film],
  pilots: [Character],
  starship_class: String,
  url: String
}

type Vehicle {
  cargo_capacity: String,
  consumables: String,
  cost_in_credits: String,
  created: String,
  crew: String,
  edited: String,
  length: String,
  manufacturer: String,
  max_athosphering_speed: String,
  model: String,
  name: String,
  passengers: String,
  pilots: [Character],
  films: [Film],
  url: String,
  vehicle_class: String,
}

type Species {
  average_height: String,
  average_lifespan: String,
  classification: String,
  created: String,
  designation: String,
  edited: String,
  eye_colors: String,
  hair_colors: String,
  homeworld: Planet,
  language: String,
  name: String,
  people: [Character],
  films: [Film],
  skin_colors: String,
  url: String
}

type Planet {
  climate: String,
  created: String,
  diameter: String,
  edited: String,
  films: [Film],
  gravity: String,
  name: String,
  orbital_period: String,
  population: String,
  residents: [Character],
  rotation_period: String,
  surface_water: String,
  terrain: String,
  url: String
}

type Query {
  planets(name: String): [Planet],
  planet(url: String!): Planet,
  character(url: String): Character,
  characters(name: String): [Character],
  species(name: String): [Species],
  vehicles(name: String): [Vehicle],
  films(name: String): [Film],
  starships(name: String): [Starship]
}
`

module.exports = typeDefs
