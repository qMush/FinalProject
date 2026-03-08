import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://gateway.scan-interfax.ru/api/v1',
  timeout: 15000,
})

// Здесь можно будет навесить интерцепторы для авторизации,
// когда появится реальный бэк и токен из контекста


