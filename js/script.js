document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle, .navbar .menu');
  const navMenu = document.querySelector('#site-nav, .navbar .nav');
  const desktopQuery = window.matchMedia('(min-width: 821px)');

  const setMenuState = (open) => {
    if (!menuButton || !navMenu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuButton.classList.toggle('active', open);
    navMenu.classList.toggle('is-open', open);
    navMenu.classList.toggle('active', open);
    document.body.classList.toggle('nav-open', open);
  };

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    navMenu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
        menuButton.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (
        menuButton.getAttribute('aria-expanded') === 'true' &&
        !event.target.closest('.navbar')
      ) {
        setMenuState(false);
      }
    });

    desktopQuery.addEventListener('change', (event) => {
      if (event.matches) setMenuState(false);
    });
  }

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const visitorWidgets = document.querySelectorAll('[data-visitor-counter]');

  if (visitorWidgets.length) {
    const countNodes = document.querySelectorAll('[data-visitor-count]');
    const legacyClustrMapsCount = 82456;
    const productionHosts = new Set(['jin-liuchao.github.io', 'liuchao-jin.github.io']);
    const isProduction = location.protocol === 'https:' && productionHosts.has(location.hostname.toLowerCase());
    const respectsDoNotTrack = navigator.doNotTrack === '1' || window.doNotTrack === '1';
    const pageKey = (location.pathname || '/').replace(/\/+$/, '') || '/';
    const storageKey = `liuchao-jin-visit:${pageKey}`;
    let countedThisSession = false;

    try {
      countedThisSession = sessionStorage.getItem(storageKey) === '1';
    } catch (_error) {
      countedThisSession = false;
    }

    const shouldIncrement = isProduction && !respectsDoNotTrack && !countedThisSession;
    const action = shouldIncrement ? '/up' : '/';
    const endpoint = `https://api.counterapi.dev/v1/jin-liuchao-github-io/site-visits${action}`;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);

    const renderCount = (value) => {
      const liveCount = value === null || value === undefined ? 0 : Number(value);
      const totalCount = legacyClustrMapsCount + (Number.isFinite(liveCount) ? liveCount : 0);
      const formatted = new Intl.NumberFormat('en-US').format(totalCount);

      countNodes.forEach((node) => {
        node.textContent = formatted;
      });

      visitorWidgets.forEach((widget) => {
        widget.setAttribute('aria-label', `${formatted} all-time site visits, including the legacy ClustrMaps count`);
      });
    };

    fetch(endpoint, {
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      signal: controller.signal
    })
      .then((response) => {
        if ((response.status === 400 || response.status === 404) && !shouldIncrement) return { count: 0 };
        if (!response.ok) throw new Error(`Visitor counter returned ${response.status}`);
        return response.json();
      })
      .then((data) => {
        renderCount(data.count ?? data.value);

        if (shouldIncrement) {
          try {
            sessionStorage.setItem(storageKey, '1');
          } catch (_error) {
            // The counter still works when session storage is unavailable.
          }
        }
      })
      .catch(() => {
        renderCount(null);
      })
      .finally(() => {
        window.clearTimeout(timeout);
      });
  }
});
