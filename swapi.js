const { RESTDataSource } = require('apollo-datasource-rest')

const fetchNext = async (caller, response, prefix) => {
  let results = []
  if (response.next) {
    const res = await caller.get(`${prefix}${response.next.slice(response.next.indexOf('?'))}`)
    results = await fetchNext(caller, res, prefix)
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
    return fetchNext(this, response, 'planets/?')
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
    return fetchNext(this, response, 'people/?')
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
