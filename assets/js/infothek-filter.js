// Filters the Infothek entries (shortcodes infothek and infothek-filter) by type, topic and free text.
// Within a row the choices combine with "or", between rows with "and". The selection is kept in the
// address (?art=hoeren&thema=genossenschaft&q=...), so filtered views can be shared.
// Without JavaScript the filter bar stays hidden and all entries are visible.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".infothek-filter");
  if (!form) return;
  const items = [...document.querySelectorAll(".infothek-item")];
  const sections = [...document.querySelectorAll(".infothek-section")];
  const buttons = [...form.querySelectorAll("button[data-filter]")];
  const search = form.querySelector("input[type=search]");
  const status = form.querySelector(".infothek-filter__status");
  const empty = form.querySelector(".infothek-filter__empty");

  // Everything between a section's heading and its entries (heading, intro text) is hidden with it.
  const sectionParts = new Map(
    sections.map((section) => {
      const parts = [];
      for (let el = section.previousElementSibling; el && !el.matches(".infothek-filter"); el = el.previousElementSibling) {
        parts.push(el);
        if (el.matches("h2")) break;
      }
      return [section, parts];
    })
  );

  const selected = (filter) =>
    buttons.filter((b) => b.dataset.filter === filter && b.getAttribute("aria-pressed") === "true").map((b) => b.dataset.value);

  const apply = () => {
    const art = selected("art");
    const thema = selected("thema");
    const words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const item of items) {
      const topics = item.dataset.topics.split(" ");
      const match =
        (!art.length || art.includes(item.dataset.section)) &&
        (!thema.length || thema.some((t) => topics.includes(t))) &&
        words.every((w) => item.dataset.search.includes(w));
      item.hidden = !match;
      if (match) shown++;
    }
    for (const section of sections) {
      const visible = section.querySelector(".infothek-item:not([hidden])") !== null;
      section.hidden = !visible;
      sectionParts.get(section).forEach((el) => (el.hidden = !visible));
    }
    const filtered = art.length || thema.length || words.length;
    status.textContent = filtered ? `${shown} von ${items.length} Einträgen` : "";
    empty.hidden = shown > 0;

    const params = new URLSearchParams();
    if (art.length) params.set("art", art.join(","));
    if (thema.length) params.set("thema", thema.join(","));
    if (search.value.trim()) params.set("q", search.value.trim());
    const query = params.toString();
    history.replaceState(null, "", location.pathname + (query ? "?" + query : "") + location.hash);
  };

  // Restore a shared selection from the address.
  const params = new URLSearchParams(location.search);
  for (const button of buttons) {
    const values = (params.get(button.dataset.filter) || "").split(",");
    button.setAttribute("aria-pressed", String(values.includes(button.dataset.value)));
  }
  search.value = params.get("q") || "";

  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
      apply();
    })
  );
  search.addEventListener("input", apply);
  form.addEventListener("submit", (event) => event.preventDefault());
  form.addEventListener("reset", () => {
    buttons.forEach((button) => button.setAttribute("aria-pressed", "false"));
    setTimeout(apply); // after the browser has cleared the search field
  });

  form.hidden = false;
  apply();
});
