const { RESTDataSource } = require('apollo-datasource-rest')


class StarWarsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://swapi.co/api/'
  }

  async fetchNext(response, prefix) {
    let results = []

    if (response.next) {
      const res = await this.getByUrl(response.next)
      results = await this.fetchNext(res, prefix)
    }

    return [...response.results, ...results]  
  }

  async getPlanetsByName(name) {
    const response = await this.get(`planets/?search=${name}`)
    return this.fetchNext(response, 'planets/?')
  }

  async getByUrl(url) {
    return await this.get(this.sliceUrl(url))
  }

  async getPeople() {
    const response = await this.get('people/')
    return this.fetchNext(response, 'people/?')
  }

  async getCharacterById(id) {
    return await this.get(`people/${id}`)
  }

  async getSpeciesByName(name) {
    const response = await this.get(`species/?search=${name}`)
    return this.fetchNext(response, 'species/?')
  }

  async getStarshipsByName(name) {
    const response = await this.get(`starships/?search=${name}`)
    return this.fetchNext(response, 'starships/?')
  }

  async getVehiclesByName(name) {
    const response = await this.get(`vehicles/?search=${name}`)
    return this.fetchNext(response, 'vehicles/?')
  }

  async getFilmsByName(name) {
    const response = await this.get(`films/?search=${name}`)
    return this.fetchNext(response, 'films/?')
  }

  async getCharactersByName(name) {
    const response = await this.get(`people/?search=${name}`)
    return this.fetchNext(response, 'people/?')
  }

  sliceUrl(url) {
    return url.replace(this.baseUrl, '')
  }
}

module.exports = StarWarsAPI
