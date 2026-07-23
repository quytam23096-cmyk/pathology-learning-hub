const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

function setMobileMenu(open) {
  if (!mobileMenuButton || !mobileMenu) return;
  mobileMenuButton.setAttribute("aria-expanded", String(open));
  mobileMenuButton.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  mobileMenu.classList.toggle("hidden", !open);
  document.body.classList.toggle("menu-open", open);
}

mobileMenuButton?.addEventListener("click", () => {
  setMobileMenu(mobileMenuButton.getAttribute("aria-expanded") !== "true");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMobileMenu(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) setMobileMenu(false);
});
