## GoIT Node.js

### Phonebook API docs:

- GET `/api/contacts` &mdash; возвращает массив всех контактов

- GET `/api/contacts/:contactId` &mdash; возвращает контакт по id

- POST `/api/contacts` &mdash; создает новый контакт и возвращает его

```sh
{
  "name": "Thomas Lucas",
  "phone": "80673987993"
}

```

- PATCH `/api/contacts/:contactId` &mdash; обновляет контакт по id и возвращает его

```sh
{
  "name": "Thomas Lucas",
  "phone": "80673987993",
  "email": "nec@Lucas.com"
}
```

- DELETE `/api/contacts/:contactId` &mdash; удаляет контакт по id и возвращает его

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок
