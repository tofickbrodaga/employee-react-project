# EmployeeProd Project
EmployeeProd Project — это приложение, разработанное для управления данными сотрудников. Проект построен на React и предоставляет удобный интерфейс для работы с информацией об услугах компании.
### Структура проекта
    employee-react-project/
        public/              # публичная часть
        src/                 # рабочая часть
            components/      # компоненты React
                    app/     # компоненты приложения
            layouts/         # компоненты шаблонов
            pages/           # компоненты страниц проекта
            store/           # модули для работы с состоянием
        package.json         # зависимости и скрипты проекта
        README.md            # документация проекта

### Установка
1. Клонируйте репозиторий:
```
git clone https://github.com/tofickbrodaga/employee-react-project
```
2. Перейдите в директорию проекта:
```
cd employee-react-project
```
3. Установите зависимости:
```
npm install
```
### Запуск проекта
Для запуска приложения используйте следующую команду:
```
npm start
```
Приложение будет доступно по адресу из консоли
### Конвенция разработки
#### Общие правила
	•	Все компоненты именуются с заглавной буквы.
	•	Каждый компонент размещается в директории, название которой совпадает с именем компонента.
### Описание компонентов
	•	Компоненты приложения: Основные функциональные блоки, формирующие интерфейс.
	•	Шаблоны: Компоненты, отвечающие за общий вид страниц и их структуру.
	•	Страницы: Специфические компоненты, представляющие отдельные разделы приложения.
	•	Модули состояния: Управляют состоянием приложения, обеспечивая его согласованность и предсказуемость.