const header = document.querySelector<HTMLElement>("[data-site-header]");

function syncHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const menuToggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const mobileNav = document.querySelector<HTMLElement>("[data-mobile-nav]");

function setMenu(open: boolean) {
  if (!menuToggle || !mobileNav) return;

  menuToggle.setAttribute("aria-expanded", String(open));
  mobileNav.hidden = !open;
  document.body.classList.toggle("menu-open", open);

  const label = open
    ? menuToggle.dataset.labelClose
    : menuToggle.dataset.labelOpen;
  if (label) menuToggle.setAttribute("aria-label", label);
}

menuToggle?.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) setMenu(false);
});

async function writeClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  // @ts-ignore - fallback for contexts where the Clipboard API is unavailable.
  document.execCommand("copy");
  field.remove();
}

document.querySelectorAll<HTMLElement>("[data-copyable]").forEach((block) => {
  const button = block.querySelector<HTMLButtonElement>("[data-copy]");
  const code = block.querySelector<HTMLElement>("code");
  const label = block.querySelector<HTMLElement>("[data-copy-label]");
  const status = block.querySelector<HTMLElement>("[data-copy-status]");

  if (!button || !code) return;

  const original = button.dataset.labelCopy ?? "Copy";
  const copied = button.dataset.labelCopied ?? "Copied";
  const failed = button.dataset.labelFailed ?? "Copy failed";
  let resetTimer: number | undefined;

  button.addEventListener("click", async () => {
    try {
      await writeClipboard(code.textContent ?? "");
      button.dataset.copied = "true";
      button.setAttribute("aria-label", copied);
      if (label) label.textContent = copied;
      if (status) status.textContent = copied;

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        button.dataset.copied = "false";
        button.setAttribute("aria-label", original);
        if (label) label.textContent = original;
        if (status) status.textContent = "";
      }, 2200);
    } catch {
      button.setAttribute("aria-label", failed);
      if (status) status.textContent = failed;
    }
  });
});

const revealItems = Array.from(
  document.querySelectorAll<HTMLElement>("[data-reveal]"),
);

if (revealItems.length > 0) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));
  }
}
