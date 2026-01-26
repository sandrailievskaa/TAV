# тестирање со Postman

## 1. Стартувај Backend

```powershell
# Терминал 1: Креирај база (само прв пат)
cd backend-olgica\src\Test.DbMigrator
dotnet run

# Терминал 2: Стартувај API
cd backend-olgica\src\Test.HttpApi.Host
dotnet run
```

Backend работи на: **https://localhost:44375**

## 2. Импортирај Postman колекција

1. Отвори Postman
2. File → Import → Избери `TAV_Backend_Postman_Collection.json`
3. Креирај Environment:
   - `base_url`: `https://localhost:44375`
   - `access_token`: (празно за сега)

## 3. Тестирај Автентикација и Авторизација

### 3.1 Добиј Access Token

**Request:** `Authentication → Get Access Token (Password Grant)`

- Кликни **Send**
- Токенот автоматски се зачувува во environment
- Провери Response: треба да има `access_token`, `token_type: "Bearer"`, `expires_in`

**Default корисник:**
- Username: `admin`
- Password: `1q2w3E*`

**Успешен Response:**
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### 3.2 Тестирај без токен (треба да врати 401)

**Request:** `Test API → Get All Tests (List)`

1. **Отстрани Authorization header** (или избриши го токенот)
2. Кликни **Send**
3. **Очекуван резултат:** `401 Unauthorized`

### 3.3 Тестирај со невалиден токен

1. Во Authorization header, стави: `Bearer invalid_token_12345`
2. Кликни **Send**
3. **Очекуван резултат:** `401 Unauthorized`

### 3.4 Тестирај со валиден токен

1. **Добиј токен** (чекор 3.1)
2. **Користи го токенот** во Authorization header: `Bearer {{access_token}}`
3. Кликни **Send** на било кој endpoint
4. **Очекуван резултат:** `200 OK` или `201 Created`

### 3.5 Провери содржина на токен (Claims)

**Декодирај JWT токен:**

1. Копирај го `access_token` од response
2. Отвори: https://jwt.io
3. Внеси го токенот во "Encoded" полето
3. Провери claims:
   - `sub` - User ID
   - `name` - Username
   - `scope` - Дозволени scopes
   - `exp` - Истек на токенот

### 3.6 Тестирај истек на токен

1. Почекај додека токенот истече (или стави стар токен)
2. Обиди се да направиш request
3. **Очекуван резултат:** `401 Unauthorized`
4. **Решение:** Добиј нов токен (чекор 3.1)

### 3.7 Тестирај со различни корисници (ако постојат)

**Креирај нов request за друг корисник:**

```
POST {{base_url}}/connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=password&username=ДРУГ_КОРИСНИК&password=ДРУГА_ЛОЗИНКА&scope=Test&client_id=Test_Swagger
```

**Провери:**
- Дали се добива токен за различни корисници
- Дали различните корисници имаат различни дозволи (ако е имплементирано)

## 4. Тестирај API Endpoints (со валиден токен)

### GET - Листа на сите записи
```
GET {{base_url}}/api/app/test?MaxResultCount=10
Authorization: Bearer {{access_token}}
```

### POST - Креирај нов запис
```
POST {{base_url}}/api/app/test
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "name": "Test Item",
  "age": 25
}
```
**Запамти го `id` од response-от!**

### GET - Добиј еден запис
```
GET {{base_url}}/api/app/test/{{test_id}}
Authorization: Bearer {{access_token}}
```

### PUT - Ажурирај запис
```
PUT {{base_url}}/api/app/test/{{test_id}}
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "name": "Updated Name",
  "age": 30
}
```

### DELETE - Избриши запис
```
DELETE {{base_url}}/api/app/test/{{test_id}}
Authorization: Bearer {{access_token}}
```

## 5. Алтернатива: Користи Swagger UI

Отвори: **https://localhost:44375/swagger**

1. Кликни **Authorize**
2. Најави се со `admin` / `1q2w3E*`
3. Тестирај endpoints директно од Swagger

## Често проблеми

- **"Invalid client"**: Провери дали `client_id` е `Test_Swagger`
- **Certificate error**: Во Postman Settings → SSL, оневозможи verification за localhost
- **404 Not Found**: Провери дали URL е `/api/app/test` (не `/api/test`)

