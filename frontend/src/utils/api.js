class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
      this.deleteCard = this.deleteCard.bind(this);
      this.likeCard = this.likeCard.bind(this);
    }

    _checkResponse(res) {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
        credentials: 'include',
      })
        .then(res => {
          return this._checkResponse(res);
        });
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
        credentials: 'include',
      })
        .then(res => {
          return this._checkResponse(res);
        });
    }

    changeUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,

        body: JSON.stringify({
          name: name,
          about: about
        })
      })
        .then(res => {
          return this._checkResponse(res);
        });
    }

    addCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,

        body: JSON.stringify({
          name: name,
          link: link
        })
      })
        .then(res => {
          return this._checkResponse(res);
        });
    }

    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,

      })
        .then(res => {
          return this._checkResponse(res);
        });
    }

    likeCard(id, like = true) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: like ? 'PUT' : 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
        .then(res => {
          return this._checkResponse(res);
        });
    }

    changeAvatar({ avatar }) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({ avatar: avatar })
      })
        .then(res => {
          return this._checkResponse(res);
        });
    }

    registerUser(data) {
      return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,

        body: JSON.stringify(data)
      })

        .then(res => {
          return this._checkResponse(res);
        });
    }

    loginUser(data) {
      return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify(data)
      })

        .then(res => {
          return this._checkResponse(res);
        });
    }

    logout() {
      return fetch(`${this._baseUrl}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: this._headers
      })
        .then((res) => {
          return this._checkResponse(res);
        });
    }
  }

const api = new Api({
    baseUrl: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json'
    }
});

export default api;
