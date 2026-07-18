(() => {
  const footerTemplate = document.createElement('template');

  footerTemplate.innerHTML = `
    <div class="shell footer-main">
      <div class="footer-identity">
        <a class="footer-brand" href="index.html">Liuchao Jin</a>
        <p>AI-driven design, intelligent manufacturing, adaptive materials, and bio-inspired robotics.</p>
        <a class="institution-link" href="https://www.cuhk.edu.hk/" target="_blank" rel="noopener noreferrer">
          <img src="images/cuhk-logo-white-horizontal.svg" width="320" height="59" loading="lazy" decoding="async" alt="香港中文大學 · The Chinese University of Hong Kong">
        </a>
      </div>

      <div class="footer-nav">
        <h2>Explore</h2>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="research.html">Research</a></li>
          <li><a href="publications.html">Publications</a></li>
          <li><a href="news.html">News</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>

      <div class="footer-contact">
        <h2>Contact</h2>
        <a href="mailto:liuchao.jin@link.cuhk.edu.hk">liuchao.jin@link.cuhk.edu.hk</a>
        <ul class="footer-social">
          <li><a href="https://scholar.google.com/citations?user=iYBWir4AAAAJ&amp;hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a></li>
          <li><a href="https://www.researchgate.net/profile/Liuchao-Jin" target="_blank" rel="noopener noreferrer">ResearchGate</a></li>
          <li><a href="https://www.linkedin.com/in/liuchaojin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="shell footer-bottom-inner">
        <p>&copy; <span data-current-year>2026</span> Liuchao Jin. All rights reserved.</p>
        <div class="visitor-counter" data-visitor-counter role="status" aria-live="polite">
          <span class="visitor-globe" aria-hidden="true">
            <span class="visitor-globe__meridian"></span>
            <span class="visitor-globe__signal"></span>
          </span>
          <span class="visitor-counter__text">
            <span class="visitor-counter__label">Global visits</span>
            <strong class="visitor-counter__value" data-visitor-count>82,456</strong>
          </span>
          <span class="visitor-counter__since">All-time</span>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('[data-site-footer]').forEach((footer) => {
    footer.replaceChildren(footerTemplate.content.cloneNode(true));
  });
})();
