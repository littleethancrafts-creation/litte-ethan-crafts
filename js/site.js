(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const params = new URLSearchParams(location.search);
  const picked = params.get("package");
  const select = document.querySelector("#package");
  if (select && picked) {
    Array.from(select.options).forEach(function (option) {
      if (option.value === picked) select.value = picked;
    });
  }

  document.querySelectorAll("form[data-book]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const message = [
        "Hi Little Ethan Craft! I would like to book a souvenir booth.",
        "Name: " + data.get("name"),
        "Event: " + data.get("event"),
        "Date: " + data.get("date"),
        "City: " + data.get("city"),
        "Package: " + data.get("package"),
        "Guests: " + data.get("guests"),
        "Note: " + (data.get("note") || "None")
      ].join("\n");
      const messenger = "https://m.me/LittleEthanCrafts?text=" + encodeURIComponent(message);
      const page = "https://www.facebook.com/LittleEthanCrafts";
      const success = form.parentElement.querySelector(".success");
      const backup = success && success.querySelector("[data-messenger]");
      const pageLink = success && success.querySelector("[data-page]");
      if (backup) backup.href = messenger;
      if (pageLink) pageLink.href = page;
      form.hidden = true;
      if (success) success.classList.add("is-on");
      window.open(messenger, "_blank", "noopener");
    });
  });
})();
