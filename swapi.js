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

  async getPlanets() {
    const response = await this.get('planets/')
    return this.fetchNext(response, 'planets/?')
  }

  async getPlanetByName(name) {
    const response = await this.get(`planets/?search=${name}`)
    return response.results[0]
  }

  async getByUrl(url) {
    return await this.get(this.sliceUrl(url))
  }

  async getPeople() {
    const response = await this.get('people/')
    return fetchNext(response, 'people/?')
  }

  async getCharacterById(id) {
    return await this.get(`people/${id}`)
  }

  async getCharacters(name) {
    const response = await this.get(`people/?search=${name}`)
    const results = await fetchNext(this, response, `people/?search=${name}&`)
    return results
  }

  sliceUrl(url) {
    return url.replace(this.baseUrl, '')
  }
}

module.exports = StarWarsAPI
