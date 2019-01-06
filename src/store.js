
class Store {

  constructor() {
    this.urls = {
      '123': 'http://www.google.com',
      'abc': 'http://www.youtube.com',
    };
  }

  add(url, hash) {
    this.urls[hash] = url;
  }

  find(hash) {

    if (this.urls[hash]) {
      return {
        error: null,
        value: this.urls[hash]
      };
    }

    return { error: 'Hash not found', value: null };
  }
};

module.exports = new Store();
