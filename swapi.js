const { RESTDataSource } = require('apollo-datasource-rest')

const fetchNext = async (caller, response) => {
  let results = []
  if (response.next) {
    const res = await caller.get(`people/?${response.next.slice(response.next.indexOf('?'))}`)
    results = await fetchNext(caller, res)
  }

  return [...response.results, ...results]
}

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://swapi.co/api/'
  }

  async getPlanets() {
    const response = await this.get('planets/')
    return response.results
  }

  async getPlanet(id) {
    return this.get(`planets/${id}/`)
  }

  async getPlanetByName(name) {
    const response = await this.get(`planets/?search=${name}`)
    return response.results[0]
  }

  async getPeople() {
    const response = await this.get('/people')
    return fetchNext(this, response)
  }
}

module.exports = StarWarsAPI
