const form = document.querySelector<HTMLFormElement>("#modal-form");
const overlay = document.querySelector<HTMLElement>(".start-project-overlay");

if (form && overlay) {
  form.addEventListener("submit", async function (event: Event) {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      // ИЗМЕНЕНИЕ: Добавлен слэш перед именем файла
      const response = await fetch("/sendform.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Улучшаем обработку ошибок: выводим статус ответа
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
      }

      const result = await response.text();

      form.reset();

      const successSpan = document.querySelector<HTMLSpanElement>(".success span");
      const successDiv = document.querySelector<HTMLElement>(".success");

      if (successSpan && successDiv) {
        successSpan.innerHTML = result;
        successDiv.classList.add("success-mail");
        successDiv.style.display = "flex";

        setTimeout(() => {
          successDiv.classList.remove("success-mail");
          successDiv.style.display = "none";

          setTimeout(() => {
            overlay.classList.remove("is-active");
          }, 1000);
        }, 4000);
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error); // Добавляем вывод в консоль для отладки
      alert(`Ошибка отправки формы: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
    }
  });
}
