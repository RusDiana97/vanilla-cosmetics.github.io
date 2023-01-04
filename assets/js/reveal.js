// Scroll Reveal Animation
const scrollRev = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 3000,
  reset: true,
});

scrollRev.reveal(
  `nav, .header-description, .info-about, .title-section, .services, .btn-visit-shop, .form-contact, .footer-links, .footer-subscribe, .icons-links`,
  {
    interval: 200,
  }
);
