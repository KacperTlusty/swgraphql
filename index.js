const { ApolloServer } = require('apollo-server')
const StarWarsAPI = require('./swapi')
const typeDefs = require('./types')

const getFilms = async (_source, _, { dataSources }) => {
  return await Promise.all(_source.films.map(async (url) => {
    return await dataSources.starWarsAPI.getByUrl(url)
  }))
}

const getPilots = async (_source, _, { dataSources }) => {
  return await Promise.all(_source.pilots.map(async (url) => {
    return await dataSources.starWarsAPI.getByUrl(url);
  }));
}

const getPeople = async (_source, _, { dataSources }) => {
  return await Promise.all(_source.people.map(async (url) => {
    return await dataSources.starWarsAPI.getByUrl(url);
  }));
}

const getSpecies = async (_source, _, { dataSources }) => {
  return await Promise.all(_source.species.map(async (url) => {
    return await dataSources.starWarsAPI.getByUrl(url)
  }))
}

const getVehicles = async (_source, _, { dataSources }) => {
  return await Promise.all(_source.vehicles.map(async (url) => {
    return await dataSources.starWarsAPI.getByUrl(url)
  }))
}

const getStarships = async (_source, _, { dataSources }) => {
  return await Promise.all(_source.starships.map(async (url) => {
    return await dataSources.starWarsAPI.getByUrl(url)
  }))
}

const resolvers = {
  Query: {
    planets: async (_source, d, { dataSources }) => {
      return dataSources.starWarsAPI.getPlanets();
    },
    planet: async(_source, { name }, { dataSources }) => {
      return dataSources.starWarsAPI.getPlanetByName(name)
    },
    characters: async(_source, { name = '' }, { dataSources }) => {
      return dataSources.starWarsAPI.getCharacters(name)
    },
    character: async(_source, { id }, { dataSources }) => {
      return dataSources.starWarsAPI.getCharacterById(id)
    }
  },
  Planet: {
    residents: async (_source, _, { dataSources }) => {
      return await Promise.all(_source.residents.map(async (url) => {
        return await dataSources.starWarsAPI.getByUrl(url)
      }))
    },
    films: getFilms
  },
  Character: {
    homeworld: async (_source, _, { dataSources }) => {
      return await dataSources.starWarsAPI.getByUrl(_source.homeworld)
    },
    films: getFilms,
    species: getSpecies,
    starships: async (_source, _, { dataSources }) => {
      return await Promise.all(_source.starships.map(async (url) => {
        return await dataSources.starWarsAPI.getByUrl(url)
      }))
    },
    vehicles: getVehicles
  },
  Film: {
    characters: async (_source, _, { dataSources }) => {
      return await Promise.all(_source.characters.map(async (url) => {
        return await dataSources.starWarsAPI.getByUrl(url)
      }))
    },
    planets: async (_source, _, { dataSources }) => {
      return await Promise.all(_source.planets.map(async (url) => {
        return await dataSources.starWarsAPI.getByUrl(url)
      }))
    },
    species: getSpecies,
    starships: getStarships,
    vehicles: getVehicles
  },
  Starship: {
    films: getFilms,
    pilots: getPilots
  },
  Vehicle: {
    films: getFilms,
    pilots: getPilots
  },
  Species: {
    films: getFilms,
    people: getPeople
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      starWarsAPI: new StarWarsAPI(),
    }
  },
})

server.listen().then((info) => {
  console.log(`Server listens on ${info.port}`)
})
