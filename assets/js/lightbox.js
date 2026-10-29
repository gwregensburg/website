// Shows the large version of an image (links with data-lightbox, see partials/image.html) in a native <dialog>.
// Without JavaScript the link simply opens the large image.
document.addEventListener("DOMContentLoaded", () => {
  const links = [...document.querySelectorAll("a[data-lightbox]")];
  if (!links.length || !window.HTMLDialogElement) return;

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.innerHTML = '<img alt=""><button type="button" class="lightbox-close" aria-label="Schließen">×</button>';
  document.body.append(dialog);
  const image = dialog.querySelector("img");
  let current = 0;

  const show = (index) => {
    current = (index + links.length) % links.length;
    image.src = links[current].href;
    image.alt = links[current].querySelector("img")?.alt ?? "";
  };

  links.forEach((link, index) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      show(index);
      dialog.showModal();
    })
  );
  // Escape closes the dialog natively; any click closes it, arrow keys page through the images.
  dialog.addEventListener("click", () => dialog.close());
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") show(current + 1);
    if (event.key === "ArrowLeft") show(current - 1);
  });
  dialog.addEventListener("close", () => image.removeAttribute("src"));
});
