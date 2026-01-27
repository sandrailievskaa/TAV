# TAV System – Систем за безбедност, здравје и усогласеност

## Стартување

### Frontend
```bash
npm install
npm run dev
```
Frontend работи на `http://localhost:5173`

### Backend (ABP.NET)

**1. Конфигурирај база:**
- Отвори `backend-olgica/src/Test.DbMigrator/appsettings.json`
- Отвори `backend-olgica/src/Test.HttpApi.Host/appsettings.json`
- Ажурирај `ConnectionStrings:Default` со твојата SQL Server инстанца

**2. Креирај база (само прв пат):**
```powershell
cd backend-olgica\src\Test.DbMigrator
dotnet run
```

**3. Стартувај API:**
```powershell
cd backend-olgica\src\Test.HttpApi.Host
dotnet run
```

Backend работи на `http://localhost:5002` (или портата што ти ја покажува)

**Swagger:** `http://localhost:5002/swagger`

## Автентикација

**Default корисник:**
- Username: `admin`
- Password: `1q2w3E*`

**Добиј токен:**
```bash
POST http://localhost:5002/connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=password&username=admin&password=1q2w3E*&scope=Test&client_id=Test_Swagger
```

**Користи токен:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Тестирање

**Postman:**
- Импортирај `backend-olgica/TAV_Backend_Postman_Collection.json`
- Environment: `base_url = http://localhost:5002`

**Swagger:**
- Отвори `http://localhost:5002/swagger`
- Кликни "Authorize" → внеси `admin` / `1q2w3E*`

## Улоги

| Улога | Опис |
|-------|------|
| System Administrator | Целосен пристап |
| HSE Administrator | Управување со инциденти, БЗР |
| HR Manager | Управување со вработени |
| Medical Officer | Медицински прегледи, OCR |
| Training Coordinator | Обуки, сертификати |
| Safety Officer | Повреди, инциденти, анализи |
| Equipment Manager | ЗО, опрема |
| Management | Read-only пристап |
| Employee | Self-service |

**Тест корисници (frontend mock):**
- `admin.test`, `hse.test`, `hr.test`, `medic.test`, `training.test`, `safety.test`, `equipment.test`, `manager.test`, `employee.test`
- Секоја лозинка е валидна (mock автентикација)

## Модули

- **Административен:** Организации, позиции, опрема, ЗО, корисници, документи
- **Вработени:** Регистар, квалификации, медицински прегледи, обуки, ЗО, документи
- **Медицински прегледи:** Управување, валидност, OCR, упати
- **Обуки:** Управување, сертификати, read & sign
- **Повреди и инциденти:** Регистрација, анализа, корективни мерки, AFR/ASR
- **Извештаи:** Обуки, прегледи, ЗО, опрема, инциденти
- **Dashboard:** Аларми за истек, summary бројачи

## Структура

```
backend-olgica/          # ABP.NET backend
  src/
    Test.HttpApi.Host/   # API host
    Test.Application/    # Business logic
    Test.Domain/         # Domain entities
    Test.EntityFrameworkCore/  # Database

src/                     # React frontend
  services/api/          # API клиент
  pages/                 # Страници
  components/            # Компоненти
```

## Проблеми

**401 Unauthorized:**
- Провери дали токенот е валиден
- Добиј нов токен од `/connect/token`

**Connection error:**
- Провери connection string
- Провери дали SQL Server работи

**404 Not Found:**
- Провери URL (треба `/api/app/...`)

**Certificate error (production):**
```bash
dotnet dev-certs https -v -ep openiddict.pfx -p 50091a78-5e96-470e-8a04-44da0d014132
```

## Дополнително

- **Postman тестирање:** Види `backend-olgica/POSTMAN_TESTING.md`
- **API интеграција:** Види `docs/API_INTEGRATION.md`
