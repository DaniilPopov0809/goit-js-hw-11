# CRUD. Асинхронні функції goit-js-hw-11

## Критерії прийому

- Створено репозиторій `goit-js-hw-11`.
- При здачі домашньої роботи є два посилання: на вихідні файли та робочу сторінку на `GitHub Pages`.
- При відвідуванні живої сторінки завдання, в консолі немає помилок та попереджень.
- Проект зібраний за допомогою
   [parcel-project-template](https://github.com/goitacademy/parcel-project-template).
- Для HTTP запитів використано бібліотеку [axios](https://axios-http.com/).
- Використовується синтаксис async/await. Для повідомлень використано бібліотеку
   [notiflix](https://github.com/notiflix/Notiflix#readme).
- Код відформатовано `Prettier`.

### Завдання - пошук зображень

Створи фронтенд частину програми пошуку та перегляду зображень за ключовим словом. Додай
оформлення елементів інтерфейсу. Подивися демо відео роботи програми.

#### Форма пошуку

Форма спочатку є у HTML документі. Користувач буде вводити рядок для пошуку у текстове
поле, а при сабміті форми необхідно виконувати HTTP-запит.

````
<form class="search-form" id="search-form">
   <input
     type="text"
     name="searchQuery"
     autocomplete="off"
     placeholder="Search images..."
   />
   <button type="submit">Search</button>
</form>
````

#### HTTP-запити

Як бекенд використовуй публічний API сервісу [Pixabay](https://pixabay.com/api/docs/).
Зареєструйся, отримай свій унікальний ключ доступу та ознайомся з документацією.

Список параметрів рядка запиту, які тобі обов'язково необхідно вказати:

- `key` – твій унікальний ключ доступу до API.
- `q` – термін для пошуку. Те, що вводитиме користувач.
- `image_type` - тип зображення. Ми хочемо тільки фотографії, тому задай значення `photo`.
- `orientation` - орієнтація фотографії. Задай значення `horizontal`.
- `safesearch` - фільтр за віком. Задай значення `true`. У відповіді буде масив зображень
   параметрів запиту, що задовольнили критеріям. Кожне зображення описується об'єктом, з якого
   тобі цікаві лише такі властивості:

- `webformatURL` – посилання на маленьке зображення для списку карток.
- `largeImageURL` - посилання на велике зображення.
- `tags` - рядок із описом зображення. Підійде для атрибуту `alt`.
- `likes` – кількість лайків.
- `views` - кількість переглядів.
- `comments` - кількість коментарів.
- `downloads` - кількість завантажень.

Якщо бекенд повертає порожній масив, значить нічого придатного знайдено не було. В такому випадку
показуй повідомлення з текстом
` "Sorry, є не зображення зображення, які використовуються для пошуку. Please try again."`. Для повідомлень
використовуй бібліотеку [notiflix](https://github.com/notiflix/Notiflix#readme).

#### Галерея та картка зображення

Елемент `div.gallery` спочатку є у HTML документі, і в нього необхідно рендерувати розмітку
картки зображень. При пошуку нового ключового слова необхідно повністю очищати вміст
галереї, щоб не змішувати результати.

````
<div class="gallery">
   <!-- Картки зображень -->
</div>
````

Шаблон розмітки картки одного зображення для галереї.

````
<div class="photo-card">
   <img src="" alt="" loading="lazy" />
   <div class="info">
     <p class="info-item">
       <b>Likes</b>
     </p>
     <p class="info-item">
       <b>Views</b>
     </p>
     <p class="info-item">
       <b>Comments</b>
     </p>
     <p class="info-item">
       <b>Downloads</b>
     </p>
   </div>
</div>
````

#### Пагінація

Pixabay API підтримує пагінацію та надає параметри `page` та `per_page`. Зроби так, щоб
у кожній відповіді надходило 40 об'єктів (за замовчуванням 20).

- Спочатку значення параметра page має бути 1.
- При кожному наступному запиті його необхідно збільшити на 1.
- При пошуку за новим ключовим словом значення page треба повернути у вихідне, тому що буде
   пагінація за новою колекцією зображень.

У HTML документі вже є розмітка кнопки при натисканні на яку необхідно виконувати запит за
наступною групою зображень і додавати розмітку до існуючих елементів галереї.

````
<button type="button" class="load-more">Load more</button>
````

- Спочатку кнопка має бути прихована.
- Після першого запиту, кнопка з'являється в інтерфейсі під галереєю.
- При повторному сабміті форми кнопка спочатку ховається, а після запиту знову з'являється.

У відповіді бекенд повертає властивість `totalHits` - загальна кількість зображень, що підійшли під
критерій пошуку (для безкоштовного облікового запису). Якщо користувач дійшов до кінця колекції, ховайте кнопку
і виводь сповіщення з текстом ``We're sorry, але ви здогадаєтеся на завершення search results.''.

#### Додатково

> :warning: УВАГА Цей функціонал не обов'язковий при здачі завдання, але буде гарним
> Додатковою практикою.

#### Повідомлення

Після першого запиту при кожному новому пошуку виводити повідомлення, в якому буде написано скільки
всього знайшли зображень (властивість `totalHits`). Текст повідомлення
``Hooray! We found totalHits images."`

#### Бібліотека `SimpleLightbox`

Додати відображення великої версії зображення з бібліотекою
[SimpleLightbox](https://simplelightbox.com/) для повноцінної галереї.

- У розмітці необхідно буде обернути кожну картку зображення на посилання, як зазначено в
   документації.
- У бібліотеки є метод `refresh()` який обов'язково потрібно викликати щоразу після додавання
   нової групи карток зображень.

Для того, щоб підключити CSS код бібліотеки до проекту, необхідно додати ще один імпорт, крім
того, що описаний в документації.

````
// Описано в документації import SimpleLightbox from "simplelightbox"; // Додатковий імпорт
стилів import "simplelightbox/dist/simple-lightbox.min.css";
````

#### Прокручування сторінки

Зробити плавне прокручування сторінки після запиту та відтворення кожної наступної групи зображень.
Ось тобі код підказка, а розберися в ньому самостійно.

````
const { height: cardHeight } = document .querySelector(".gallery")
.firstElementChild.getBoundingClientRect();

window.scrollBy({ top: cardHeight \* 2, behavior: "smooth", });
````

#### Нескінченний скролл

Замість кнопки Load more можна зробити нескінченне завантаження зображень при прокручуванні сторінки. Ми
надамо тобі повну свободу дій у реалізації, можеш використати будь-які бібліотеки.
