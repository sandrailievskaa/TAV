/**
 * OpenAPI Schema Types
 * 
 * Овај фајл ќе се генерира автоматски од ASP.NET OpenAPI/Swagger schema
 * 
 * За да го генерирате:
 * 1. Стартувајте го ASP.NET проектот
 * 2. Отворете Swagger UI (обично на http://localhost:5000/swagger)
 * 3. Извадете го JSON schema URL (на пр. http://localhost:5000/swagger/v1/swagger.json)
 * 4. Стартувајте: npm run generate:api-types
 * 
 * Или за локален development:
 * npm run generate:api-types:local
 * 
 * ==========================================
 * 
 * Привремена структура додека не се генерира schema:
 */

export interface paths {}

export interface components {
  schemas: {};
}

// Ова ќе се пополни автоматски кога ќе се генерира schema
// Примери за структура што ASP.NET обично генерира:

// export interface components {
//   schemas: {
//     ExampleEntity: {
//       id: string;
//       name: string;
//       description?: string;
//       createdAt: string;
//     };
//     CreateExampleEntityDto: {
//       name: string;
//       description?: string;
//     };
//     // ... други типови
//   };
// }

