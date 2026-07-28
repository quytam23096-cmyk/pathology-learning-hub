(() => {
  const dialog = document.getElementById("hmmdSearchDialog");
  const closeButton = document.getElementById("closeHmmdSearch");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuButton = document.getElementById("mobileMenuButton");

  if (!dialog || typeof dialog.showModal !== "function") return;

  const openHmmd = (event) => {
    event.preventDefault();
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("hmmd-dialog-open");

    if (mobileMenu) mobileMenu.classList.add("hidden");
    if (mobileMenuButton) mobileMenuButton.setAttribute("aria-expanded", "false");
  };

  const closeHmmd = () => {
    if (dialog.open) dialog.close();
  };

  document.querySelectorAll("[data-open-hmmd]").forEach((trigger) => {
    trigger.addEventListener("click", openHmmd);
  });

  closeButton?.addEventListener("click", closeHmmd);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeHmmd();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("hmmd-dialog-open");
  });
})();
