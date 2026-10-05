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
  const styleParam = params.get("style");
  const select = document.querySelector("#package");
  const boothField = document.querySelector("#booth-package-field");
  const boothSelect = document.querySelector("#booth-package");
  const boothStyles = [
    "Loop Keychain",
    "Paracord Keychain",
    "Leather Keychain",
    "Loop + Paracord",
    "Paracord + Leather",
    "Leather + Loop",
    "Clickers"
  ];

  function matchStyle(value) {
    if (!value) return "";
    const found = boothStyles.find(function (style) {
      return style.toLowerCase() === value.toLowerCase();
    });
    return found || "";
  }

  function syncBoothPackage() {
    if (!select || !boothField || !boothSelect) return;
    const onsite = select.value.toLowerCase() === "onsite charm booth";
    boothField.hidden = !onsite;
    boothSelect.required = onsite;
    if (!onsite) boothSelect.value = "";
  }

  if (select && picked) {
    const styleFromPackage = matchStyle(picked);
    if (picked.toLowerCase() === "onsite charm booth" || styleFromPackage) {
      select.value = "Onsite Charm Booth";
      if (styleFromPackage) boothSelect.value = styleFromPackage;
    } else {
      Array.from(select.options).forEach(function (option) {
        if (option.value === picked) select.value = picked;
      });
    }
  }

  if (select && boothSelect) {
    const stylePick = matchStyle(styleParam);
    if (stylePick) {
      select.value = "Onsite Charm Booth";
      boothSelect.value = stylePick;
    }
    syncBoothPackage();
    select.addEventListener("change", syncBoothPackage);
  }

  document.querySelectorAll("form[data-book]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const packageLine = data.get("boothPackage")
        ? data.get("package") + " — " + data.get("boothPackage")
        : data.get("package");
      const message = [
        "Hi Little Ethan Craft! I would like to book a souvenir booth.",
        "Name: " + data.get("name"),
        "Event: " + data.get("event"),
        "Date: " + data.get("date"),
        "Location: " + data.get("location"),
        "Package: " + packageLine,
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
