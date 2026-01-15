# ASP.NET Backend Integration Guide

## Преглед

Овој проект е подготвен за интеграција со ASP.NET backend користејќи **OpenAPI/Swagger schema** за автоматска генерација на TypeScript типови.

## Структура

### 1. API Client (`src/services/api/client.ts`)
Центарлизиран HTTP клиент со:
- Автоматско додавање на Authorization headers
- Глобално error handling
- Toast notifications за грешки
- Унифициран ApiError формат

### 2. Error Handling (`src/services/api/errorHandler.ts`)
Utility функции за:
- Форматирање на validation errors
- Проверка на специфични статус кодови
- Кастом error handling

### 3. Service Pattern (`src/services/api/exampleService.ts`)
Пример за како да креирате service за ентитет:
- API функции (get, post, put, delete)
- React Query hooks
- Query key factory за cache management

## Setup Инструкции

### 1. Инсталирање на Dependencies

```bash
npm install
```

Dependencies кои се додадени:
- `axios` - HTTP client
- `openapi-typescript` - Автоматска генерација на TypeScript типови од OpenAPI schema

### 2. Конфигурирање на ASP.NET Backend

Во вашиот ASP.NET проект, осигурајте дека Swagger/OpenAPI е овозможен:

```csharp
// Program.cs или Startup.cs
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ...

app.UseSwagger();
app.UseSwaggerUI();
```

### 3. Генерирање на TypeScript Типови

#### Опција A: Од Swagger JSON URL
```bash
npm run generate:api-types
```
Ова користи `https://localhost:7000/swagger/v1/swagger.json`

#### Опција B: Локален Development
```bash
npm run generate:api-types:local
```
Ова користи `http://localhost:5001/swagger/v1/swagger.json`

#### Опција C: Custom URL
Можете да го измените скриптот во `package.json` за да користи ваш URL:
```json
"generate:api-types": "openapi-typescript YOUR_URL -o src/types/api/schema.d.ts"
```

### 4. Environment Variables

Копирајте `.env.example` во `.env` и поставете го вашиот API URL:
```
VITE_API_BASE_URL=http://localhost:5001/api
```

## Користење

### Пример: Креирање на Service за Нов Ентитет

1. **Генерирајте ги типовите од OpenAPI schema**

2. **Креирајте service фајл** (на пр. `employeeService.ts`):
```typescript
import { apiClient } from './client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { paths, components } from '@/types/api/schema';

// Користете ги генерираните типови
type Employee = components['schemas']['Employee'];
type CreateEmployeeDto = components['schemas']['CreateEmployeeDto'];

export const getEmployees = async () => {
  return apiClient.get<Employee[]>('/employees');
};

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });
};
```

3. **Користете го во компонента**:
```typescript
import { useEmployees } from '@/services/api/employeeService';

function EmployeeList() {
  const { data, isLoading, error } = useEmployees();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading employees</div>;
  
  return (
    <div>
      {data?.map(employee => (
        <div key={employee.id}>{employee.name}</div>
      ))}
    </div>
  );
}
```

## Error Handling

### Автоматско Error Handling
API клиентот автоматски:
- Прикажува toast notification за грешки
- Логира errors во console
- Трансформира errors во унифициран формат

### Кастом Error Handling
```typescript
import { handleApiError, isErrorCode, formatValidationErrors } from '@/services/api/errorHandler';

try {
  await createEmployee(data);
} catch (error) {
  if (isErrorCode(error, 401)) {
    // Redirect to login
    navigate('/login');
  } else if (isErrorCode(error, 400)) {
    // Validation errors
    const formattedErrors = formatValidationErrors(error);
    // Use with react-hook-form setError
    Object.entries(formattedErrors).forEach(([field, error]) => {
      setError(field, error);
    });
  }
  
  handleApiError(error, {
    showToast: false, // Disable default toast
    onError: (apiError) => {
      // Custom error handling
    },
  });
}
```

## Препораки за ASP.NET Backend

### 1. Стандардизирани Error Responses
Користете унифициран формат за грешки:
```csharp
public class ApiErrorResponse
{
    public string Message { get; set; }
    public Dictionary<string, string[]> Errors { get; set; }
    public int StatusCode { get; set; }
}
```

### 2. CORS Конфигурација
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:8080")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});
```

### 3. Authentication
API клиентот автоматски додава `Authorization: Bearer {token}` header.
Зачувувајте го токенот во localStorage:
```typescript
localStorage.setItem('auth_token', token);
```

## Workflow за Development

1. **Backend промени:**
   - Правете промени во ASP.NET контролери/DTOs
   - Swagger автоматски се ажурира

2. **Frontend синхронизација:**
   ```bash
   npm run generate:api-types
   ```
   - TypeScript типовите се ажурираат автоматски
   - TypeScript ќе пријави грешки ако API промените не се компатибилни

3. **Development:**
   - Користете ги новите типови во вашите services
   - TypeScript compiler ќе ви пријави грешки ако правите невалидни API calls

## Production Build

Во production, осигурајте дека:
1. `VITE_API_BASE_URL` е поставен на production URL
2. CORS е правилно конфигуриран на backend
3. Authentication токените се правилно управувани

## Дополнителни Resources

- [OpenAPI TypeScript Documentation](https://github.com/drwpow/openapi-typescript)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)

