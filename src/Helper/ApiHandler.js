export default class ApiHandler {
  constructor(options) {
    this.baseUrl = options.baseUrl
  }

  post(endpoint, params, headers = null) {
    return this.requestHttp('POST', this.baseUrl + endpoint, params, headers)
  }

  get(endpoint, headers = null) {
    return this.requestHttp('GET', this.baseUrl + endpoint, null, headers)
  }

  put(endpoint, params, headers = null) {
    return this.requestHttp('PUT', this.baseUrl + endpoint, params, headers)
  }

  patch(endpoint, params, headers = null) {
    return this.requestHttp('PATCH', this.baseUrl + endpoint, params, headers)
  }

  delete(endpoint, params, headers = null) {
    return this.requestHttp('DELETE', this.baseUrl + endpoint, params, headers)
  }

  requestHttp(method, url, params, headers) {
    return new Promise((resolve, reject) => {
      const options = {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }

      if (params) {
        options.body = JSON.stringify(params)
      }
      if (headers) {
        options.headers.Authorization = `Bearer ${headers}`
      }
      fetch(url, options)
        .then((response) => {
          response
            .json()
            .then((body) => {
              resolve({ statusCode: response.status, body })
            })
            .catch((error) => {
              reject('Can not connect to server.')
            })
        })
        .catch((error) => {
          reject('Can not connect to server.')
        })
    })
  }
}