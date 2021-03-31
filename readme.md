## GoIT Node.js

### Phonebook API docs:

- POST `/api/auth/register` &mdash; регистрация пользователя

```sh
Content-Type: application/json
{
  "name": "Thomas Lucas",
  "email": "example@example.com",
  "password": "examplepassword"
}

```

- POST `api/auth/login` &mdash; логинизация пользователя. Возвращает пользователя и токен

```sh
Content-Type: application/json
{
  "email": "example@example.com",
  "password": "examplepassword"
}

```

- POST `api/auth/logout` &mdash; логаут

```sh
Authorization: "Bearer token"

```

- GET `/api/users/current` &mdash; возвращает текущего пользователя

```sh
 Authorization: "Bearer token"
```

- PATCH `/api/users/update` &mdash; обновляет профиль пользователя. Подписка должна иметь одно из следующих значений ['free', 'pro', 'premium']

```sh
 Authorization: "Bearer token"
```

- GET `/api/contacts` &mdash; возвращает массив всех контактов. 
  -`/api/contacts?filter=name|phone` &mdash; возвращает указанные поля.
  -`/api/contacts?sortBy=name` &mdash; возвращает отсортированные контакты по указанному полю в порядке возрастания.
  -`/api/contacts?page=1&limit=15` &mdash; пагинация.
  -`/api/contacts?category=friends` &mdash; фильтрация контактов по категории(family,friends, work, others).

  ```sh
  Authorization: "Bearer token"
  ```

- GET `/api/contacts/:contactId` &mdash; возвращает контакт по id

```sh
 Authorization: "Bearer token"
```

- POST `/api/contacts` &mdash; создает новый контакт и возвращает его

```sh
Authorization: "Bearer token"
{
  "name": "Thomas Lucas",
  "phone": "80673987993"
}

```

- PATCH `/api/contacts/:contactId` &mdash; обновляет контакт по id и возвращает его

```sh
Authorization: "Bearer token"
{
  "name": "Thomas Lucas",
  "phone": "80673987993",
  "email": "nec@Lucas.com"
}
```

- DELETE `/api/contacts/:contactId` &mdash; удаляет контакт по id и возвращает его

```sh
 Authorization: "Bearer token"
```

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок
