// === КНОПКА "НАВЕРХ" ===
const scrollBtn = document.createElement("button");
scrollBtn.textContent = "↑ Наверх";
scrollBtn.id = "scrollTopBtn";
document.body.appendChild(scrollBtn);

// Стили кнопки
scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "30px";
scrollBtn.style.right = "30px";
scrollBtn.style.padding = "10px 15px";
scrollBtn.style.fontSize = "16px";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "8px";
scrollBtn.style.background = "#4a90e2";
scrollBtn.style.color = "white";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.boxShadow = "0 3px 8px rgba(0,0,0,0.3)";
scrollBtn.style.display = "none";
scrollBtn.style.zIndex = "1000";

// Появление кнопки при прокрутке
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Плавная прокрутка вверх
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// === АККОРДЕОН ===
const accordionData = [
  { title: "О компании", text: "Мы создаем сайты с применением Flex и Grid технологий." },
  { title: "Наш подход", text: "Мы объединяем дизайн, функциональность и удобство." },
  { title: "Почему мы?", text: "Опыт, качество и индивидуальный подход к каждому проекту." }
];

const accordionContainer = document.createElement("section");
accordionContainer.className = "accordion";
accordionContainer.innerHTML = "<h2>Информация</h2>";
document.querySelector("main").after(accordionContainer);

// Генерация аккордеона
accordionData.forEach(item => {
  const accItem = document.createElement("div");
  accItem.className = "accordion-item";

  accItem.innerHTML = `
    <div class="accordion-header">${item.title}</div>
    <div class="accordion-content">${item.text}</div>
  `;
  accordionContainer.appendChild(accItem);
});

// Стили аккордеона
const style = document.createElement("style");
style.textContent = `
.accordion h2 {
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}
.accordion-item {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  margin: 10px auto;
  max-width: 800px;
  overflow: hidden;
  transition: 0.3s;
}
.accordion-header {
  padding: 15px 20px;
  background: #4a90e2;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}
.accordion-content {
  padding: 15px 20px;
  display: none;
  background: #f9f9f9;
}
.accordion-item.active .accordion-content {
  display: block;
}
`;
document.head.appendChild(style);

// Обработчик кликов для аккордеона
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const parent = header.parentElement;
    const allItems = document.querySelectorAll(".accordion-item");

    // Сначала закрываем все
    allItems.forEach(item => {
      if (item !== parent) item.classList.remove("active");
    });

    // Затем переключаем текущий
    parent.classList.toggle("active");
  });
});


// === ГАЛЕРЕЯ С ФИЛЬТРАЦИЕЙ И МОДАЛЬНЫМ ОКНОМ ===
const gallerySection = document.querySelector(".gallery");
const galleryGrid = document.querySelector(".gallery-grid");

// Добавляем фильтры
const filterContainer = document.createElement("div");
filterContainer.className = "gallery-filters";
filterContainer.innerHTML = `
  <button data-category="all" class="active">Все</button>
  <button data-category="nature">Природа</button>
  <button data-category="city">Город</button>
  <button data-category="people">Люди</button>
`;
gallerySection.insertBefore(filterContainer, galleryGrid);

// Добавляем категории к изображениям
const images = galleryGrid.querySelectorAll("img");
images[0].dataset.category = "nature";
images[1].dataset.category = "nature";
images[2].dataset.category = "people";
images[3].dataset.category = "city";

// Обработка фильтров
const filterButtons = document.querySelectorAll(".gallery-filters button");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.dataset.category;

    images.forEach(img => {
      img.style.display = category === "all" || img.dataset.category === category ? "block" : "none";
    });
  });
});

// Стили фильтров
const filterStyle = document.createElement("style");
filterStyle.textContent = `
.gallery-filters {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.gallery-filters button {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: #e0e0e0;
  cursor: pointer;
  transition: 0.3s;
}
.gallery-filters button.active {
  background: #4a90e2;
  color: white;
}
  .gallery-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.gallery-grid img {
  width: 300px;
  height: 200px;
  object-fit: cover;      /* сохраняет пропорции, красиво обрезает */
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.gallery-grid img:hover {
  transform: scale(1.05);
}
`;
document.head.appendChild(filterStyle);


// === МОДАЛЬНОЕ ОКНО ===
const modal = document.createElement("div");
modal.id = "modal";
modal.innerHTML = `<span class="close">&times;</span><img id="modalImg" src="">`;
document.body.appendChild(modal);

const modalStyle = document.createElement("style");
modalStyle.textContent = `
#modal {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
#modal img {
  max-width: 90%;
  max-height: 80%;
  border-radius: 10px;
}
#modal .close {
  position: absolute;
  top: 20px;
  right: 35px;
  color: white;
  font-size: 40px;
  cursor: pointer;
}
`;
document.head.appendChild(modalStyle);

// Открытие модального окна
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector("#modal .close");

images.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

// Закрытие модального окна
closeModal.addEventListener("click", () => (modal.style.display = "none"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
