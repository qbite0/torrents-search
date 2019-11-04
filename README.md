# torrents-search
Поиск торрентов на русских торрент трекерах.

## Поддерживаемые торрент трекеры
- NNM-Club (nnmclub)
- Rutor org (rutor)
- TFile me (tfile)

##  Пример использования
```js
const TSearch = require('./torrents-search')

const Client = new TSearch.Client(["rutor", "nnmclub", "tfile"])

async function main() {
  const results = await Client.search('Minecraft') // ;D
  console.log(results)
}

main()
```

## Примеры ответов
### NNM-Club
```
{
  Forum: 'Native Nix Games',
  Topic: 'Linux) Minecraft (2011) [Ru/Multi] (1.12.2, 1.14.4) Repack Kron',
  Author: 'Kron4ek',
  DL: '[ DL ]',
  Size: '460950113 440 MB',
  S: '44',
  L: '3',
  R: '110',
  Added: '1564999952 0508-201913:12'
}
```
### Rutor org
```
{
  'Добавлен': '23Ноя 11',
  'Название': 'Minecraft (2011) MAC',
  'Комментарии': '4',
  'Размер': '758 MB',
  'Пиры': '1  0'
}
```

## Изменения
### 0.0.2
- Переписан код
- Добавлен tfile.me
### 0.0.1
- Основной код
- Добавлены трекеры:
  - NNM-Club
  - Rutor org
