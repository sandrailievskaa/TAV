# Водич за Тестирање - Што е Направено и Што Треба да се Промени

## ✅ Што Веќе е Имплементирано (НЕ ТРЕБА ДА СЕ ПРОМЕНИ)

### Frontend Код (Готово ✅):
- ✅ `src/types/api/employee.types.ts` - TypeScript interfaces
- ✅ `src/services/api/apiClient.ts` - API клиент со error handling
- ✅ `src/services/api/employeeApi.ts` - Employee API service
- ✅ `src/schemas/employee.schema.ts` - Zod validation schemas
- ✅ `src/components/employees/EmployeeListExample.tsx` - Пример компонента

**Овие фајлови се функционални и не треба да се менуваат!**

---

## 🔧 Што Треба да се Промени/Направи за Тестирање

### 1. Backend Setup (Прв Пат)

#### Чекор 1: Копирај Backend Код во ABP Проект

Фајловите од `backend-examples/` треба да се копираат во ABP проект структурата:

```
backend-examples/Employee.cs 
    → SecuritySystem.Domain/Employees/Employee.cs

backend-examples/EmployeeDto.cs
    → SecuritySystem.Application.Contracts/Employees/EmployeeDto.cs
    → SecuritySystem.Application.Contracts/Employees/CreateEmployeeDto.cs
    → SecuritySystem.Application.Contracts/Employees/UpdateEmployeeDto.cs
    → SecuritySystem.Application.Contracts/Employees/GetEmployeeListInput.cs

backend-examples/IEmployeeAppService.cs
    → SecuritySystem.Application.Contracts/Employees/IEmployeeAppService.cs

backend-examples/EmployeeAppService.cs
    → SecuritySystem.Application/Employees/EmployeeAppService.cs

backend-examples/EmployeesController.cs
    → SecuritySystem.HttpApi/Controllers/EmployeesController.cs
```

#### Чекор 2: Конфигурирај Entity Framework

Во `SecuritySystem.EntityFrameworkCore`:
- Додај `DbSet<Employee>` во `SecuritySystemDbContext.cs`
- Додај конфигурација во `SecuritySystemDbContextModelCreatingExtensions.cs`

#### Чекор 3: Стартувај Backend

```powershell
# Database Migration
cd C:\Users\Lenovo\Desktop\Intern\SecuritySystem
dotnet run --project src\SecuritySystem.DbMigrator

# Стартувај Backend
cd src\SecuritySystem.Web
dotnet run
```

Backend ќе работи на: `https://localhost:44300` (или друг порт)

---

### 2. Frontend Конфигурација (ЕДНОСТАВНО ✅)

#### Создади `.env` Фајл

Во root директориумот (`security-system-tav/.env`):

```env
VITE_API_BASE_URL=https://localhost:44300
```

**ЗАМЕНИ ГО ПОРТОТ** ако backend работи на различен порт!

---

### 3. Тестирање

#### Опција А: Тестирај преку Browser Console (Најбрзо)

1. Стартувај frontend:
```powershell
cd C:\Users\Lenovo\Desktop\Intern\security-system-tav
npm run dev
```

2. Отвори browser на `http://localhost:5173`

3. Отвори Developer Tools (F12) → Console таб

4. Копирај и изврши:

```javascript
// Тест 1: GET List
fetch('https://localhost:44300/api/app/employees')
  .then(r => r.json())
  .then(d => console.log('✅ GET List:', d))
  .catch(e => console.error('❌ Error:', e));

// Тест 2: POST Create
fetch('https://localhost:44300/api/app/employees', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    employeeId: 'TEST001',
    fullName: 'Test Employee',
    email: 'test@example.com',
    phone: '+389 70 123 456',
    position: 'Developer',
    department: 'IT',
    status: 1,
    riskLevel: 1,
    nationality: 'Macedonian'
  })
})
  .then(r => r.json())
  .then(d => console.log('✅ POST Create:', d))
  .catch(e => console.error('❌ Error:', e));
```

#### Опција Б: Тестирај преку Swagger (Backend)

1. Отвори: `https://localhost:44300/swagger`

2. Најди `/api/app/employees` endpoints

3. Тестирај ги сите операции (GET, POST, PUT, DELETE)

#### Опција В: Користи Пример Компонента

1. Додај `EmployeeListExample` во некоја страна за тестирање
2. Или тестирај директно преку `employeeApi` во постоечката `Employees.tsx` страна

---

## ⚠️ Што Може да Треба да се Промени (Зависи од Backend)

### 1. API URL (ЗАДОЛЖИТЕЛНО)
- Промени `.env` фајлот ако backend портот е различен

### 2. Authentication Token (Ако Backend Бара Auth)
- Ажурирај `getAuthToken()` во `src/services/api/apiClient.ts`
- Backend може да бара JWT token или друг authentication метод

### 3. CORS Configuration (Ако има CORS проблеми)
- Во backend `appsettings.json`, додај:
```json
{
  "CorsOrigins": "http://localhost:5173"
}
```

### 4. EmployeeDto Структура (Ако Backend DTOs се Различни)
- Ажурирај `src/types/api/employee.types.ts` ако backend враќа различни полиња
- Синхронизирај ги TypeScript interfaces со C# DTOs

---

## 📋 Чекор-по-Чекор Тестирање

### Тест 1: Провери дали Backend Работи
```powershell
# Стартувај backend
cd C:\Users\Lenovo\Desktop\Intern\SecuritySystem\src\SecuritySystem.Web
dotnet run
```
✅ Очекуван резултат: Backend стартува без грешки

### Тест 2: Провери Swagger
Отвори: `https://localhost:44300/swagger`
✅ Очекуван резултат: Swagger UI се отвора и покажува `/api/app/employees` endpoints

### Тест 3: Тест GET Endpoint преку Swagger
1. Кликни на `GET /api/app/employees`
2. Кликни "Try it out"
3. Кликни "Execute"
✅ Очекуван резултат: Враќа празна листа `{"totalCount": 0, "items": []}` или листа на employees

### Тест 4: Тест POST Endpoint преку Swagger
1. Кликни на `POST /api/app/employees`
2. Кликни "Try it out"
3. Замени го пример JSON со:
```json
{
  "employeeId": "TEST001",
  "fullName": "Test Employee",
  "email": "test@example.com",
  "phone": "+389 70 123 456",
  "position": "Developer",
  "department": "IT",
  "status": 1,
  "riskLevel": 1,
  "nationality": "Macedonian"
}
```
4. Кликни "Execute"
✅ Очекуван резултат: Враќа креиран employee со ID

### Тест 5: Тест Frontend API Client
```javascript
// Во browser console (F12)
import { employeeApi } from '/src/services/api/employeeApi.js';

employeeApi.getList({ maxResultCount: 10 })
  .then(result => console.log('✅ API Works!', result))
  .catch(err => console.error('❌ Error:', err));
```

---

## 🔍 Често Среќавани Проблеми

### Проблем 1: CORS Error
**Симптом:** `Access to fetch... has been blocked by CORS policy`

**Решение:**
- Во backend `appsettings.json`:
```json
{
  "CorsOrigins": "http://localhost:5173"
}
```
- Рестартирај backend

### Проблем 2: 401 Unauthorized
**Симптом:** Сите requests враќаат 401

**Решение:**
- Провери дали backend бара authentication
- Ажурирај `getAuthToken()` во `apiClient.ts`
- Или привремено отстрани `[Authorize]` атрибутот од `EmployeeAppService.cs`

### Проблем 3: 404 Not Found
**Симптом:** `GET /api/app/employees` враќа 404

**Решение:**
- Провери дали Controller е правилно регистриран
- Провери дали route е `/api/app/employees`
- Провери дали backend работи

### Проблем 4: Type Errors во TypeScript
**Симптом:** TypeScript грешки за EmployeeDto

**Решение:**
- Провери дали `employee.types.ts` одговара на backend DTOs
- Ажурирај ги interfaces ако backend враќа различни полиња

---

## ✅ Резюме - Што Треба да се Промени

### ЗАДОЛЖИТЕЛНО:
1. ❌ **Backend код** - Копирај од `backend-examples/` во ABP проект
2. ❌ **Database migrations** - Изврши migrations
3. ❌ **Frontend .env** - Создади `.env` со API URL

### ОПЦИОНАЛНО (Зависи од Backend):
4. ⚠️ **Authentication** - Ако backend бара auth, ажурирај `getAuthToken()`
5. ⚠️ **CORS** - Ако има CORS проблеми, конфигурирај во backend
6. ⚠️ **DTOs** - Ако backend DTOs се различни, ажурирај TypeScript interfaces

### НЕ ТРЕБА ДА СЕ ПРОМЕНИ:
- ✅ `src/types/api/employee.types.ts` (освен ако backend DTOs се различни)
- ✅ `src/services/api/apiClient.ts` (освен authentication)
- ✅ `src/services/api/employeeApi.ts`
- ✅ `src/schemas/employee.schema.ts`

---

## 🎯 Најбрз Тест (Без Backend)

Ако backend сè уште не е подготвен, можеш да тестираш frontend кодот:

```typescript
// Во browser console
// Симулирај API response
const mockResponse = {
  totalCount: 2,
  items: [
    {
      id: '1',
      employeeId: 'EMP001',
      fullName: 'Test Employee',
      email: 'test@example.com',
      phone: '+389 70 123 456',
      position: 'Developer',
      department: 'IT',
      status: 1
    }
  ]
};

console.log('Mock Response:', mockResponse);
```

Ова ќе ти покаже дали TypeScript interfaces се правилни.

