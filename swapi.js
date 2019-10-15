const { RESTDataSource } = require('apollo-datasource-rest')

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://swapi.co/api/'
  }

  async getPlanets() {
    console.log(await this.get('/planets'))
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
}

module.exports = StarWarsAPI
