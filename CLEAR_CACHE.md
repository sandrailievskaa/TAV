# Како да го исчистиш кешот и localStorage

## Метод 1: Користи копчето во Login страницата
1. Отвори ја Login страницата
2. Кликни на копчето "🔄 Reset Cache & Clear Storage"
3. Страницата ќе се рефрешира автоматски

## Метод 2: Преку Browser Console (F12)
1. Отвори Developer Tools (F12 или Right Click -> Inspect)
2. Оди на Console табот
3. Внеси ги следните команди:

```javascript
// Избриши localStorage
localStorage.clear();

// Рефреширај ја страницата
window.location.reload();
```

Или копирај и вметни:
```javascript
localStorage.clear(); window.location.reload();
```

## Метод 3: Преку Browser Settings
1. **Chrome/Edge**: 
   - Settings -> Privacy -> Clear browsing data
   - Избери "Cached images and files" и "Cookies and other site data"
   - Кликни "Clear data"

2. **Firefox**:
   - Settings -> Privacy & Security -> Cookies and Site Data
   - Кликни "Clear Data"

## Метод 4: Hard Refresh
- **Windows/Linux**: `Ctrl + Shift + R` или `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`

## Метод 5: Incognito/Private Mode
Отвори ја апликацијата во Incognito/Private режим за да избегнеш кеш проблеми.



