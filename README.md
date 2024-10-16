## Задача
1. Предлагается готовый проект, выполненный нашей командой, это игра. Нужно добавить второе оружие в игру - пулемёт. Он стреляет 5 пуль в секунду. Графика для него есть в архиве. Пули должны вылетать с некоторым разбросом. Разброс пуль и скорость стрельбы задаются параметрами внутри кода. Возможна и более быстрая стрельба, до 30 пуль в секунду.

2. Дать рецензию на код, предложить улучшения на свой вкус и взгляд.

## Предложения
### Код
1. Добавить TypeScript.

2. Вынести магические числа в константы.

3. Описать класс ```AbstractWeapon```, унаследовать от него ```AbstractAutoWeapon``` (автоматическое оружие) и ```AbstractSemiAutoWeapon``` (полуавтоматическое оружие) и, в конце концов, ```MachineGun``` и ```Pistol```. Использовать разную логику в зависимости от типа оружия.

4. Инкапсулировать классы.

4. Не передавать неиспользуемые аргументы ```start``` и ```forward```.
```javascript
// Player.js, строка 8

this.weapons[this.currentWeaponIndex].shoot(start, forward);
```

5. Разные кавычки в импортах (```Pistol.js```, ```Level.js```, ```Game.js```).
```javascript
// Pistol.js, строки 2-3

import { Bullet } from '../Bullet';
import { AdvancedDynamicTexture, Image, Control } from "@babylonjs/gui";
```

### Оптимизация

1. Использовать ```requestAnimationFrame``` вместо ```setInterval```. При высокой нагрузке ```setInterval``` выполняется слишком поздно и перестаёт стрелять, а анимация зависает (решил проблему для ```MachineGun```).

2. Использовать Instances для повторяющейся геометрии. Под уровнем расположены 7000 кубов, которые, видимо, нужны для имитации сложной сцены. В случае, если действительно необходимо отобразить нечто подобное, создавать 7000 новых ```Mesh``` не стоит. При возможности замораживать объекты (с помощью ```freezeWorldMatrix``` и ```freezeWorldMesh```) и не просчитывать лишние столкновения.

3. Не создавать новый материал для каждой новой декали, переиспользовать.

### Баги
1. Пули не исчезают после столкновения с объектом.

2. Управление клавиатурой не работает при русской раскладке.

3. Не работает ```Inspector```.