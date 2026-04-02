const NAVBAR_HEIGHT = 64;

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;

  window.scrollTo({ top, behavior: "smooth" });
};

const navLinks = [
  { label: "Features", id: "features" },
  { label: "How it works", id: "how-it-works" },
  { label: "Nutrition", id: "recipes-showcase" },
  { label: "Meal Planning", id: "meal-planning" },
  { label: "Fitness", id: "fitness-showcase" },
  { label: "Community", id: "community" },
];

const LandingPageNavElements = () => {
  return (
    <div className="flex items-center gap-2 md:gap-6">
      <nav className="hidden items-center gap-1 md:flex">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className="rounded-lg px-3 py-2 text-sm font-light text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            {link.label}
          </button>
        ))}
      </nav>

      <a
        href="/login"
        className="bg-primary-green-400 hover:bg-primary-green-500 rounded-3xl px-6 py-1.5 text-sm text-white transition-colors md:px-8 md:text-base"
      >
        Login
      </a>
    </div>
  );
};

export default LandingPageNavElements;
