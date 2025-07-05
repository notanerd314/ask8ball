// Safari WebKit polyfills
export function initPolyfills() {
  // Polyfill for CSS.supports if not available
  if (typeof CSS === 'undefined' || !CSS.supports) {
    (window as any).CSS = {
      supports: () => false
    };
  }

  // Polyfill for backdrop-filter support detection
  if (!CSS.supports('backdrop-filter', 'blur(10px)')) {
    document.documentElement.classList.add('no-backdrop-filter');
  }

  // Polyfill for ResizeObserver
  if (!window.ResizeObserver) {
    import('resize-observer-polyfill').then(({ default: ResizeObserver }) => {
      window.ResizeObserver = ResizeObserver;
    });
  }

  // Polyfill for IntersectionObserver
  if (!window.IntersectionObserver) {
    import('intersection-observer');
  }

  // Safari dialog polyfill
  if (!HTMLDialogElement.prototype.showModal) {
    import('dialog-polyfill').then(({ default: dialogPolyfill }) => {
      const dialogs = document.querySelectorAll('dialog');
      dialogs.forEach(dialog => dialogPolyfill.registerDialog(dialog));
    });
  }

  // Safari smooth scroll polyfill
  if (!CSS.supports('scroll-behavior', 'smooth')) {
    import('smoothscroll-polyfill').then(({ default: smoothscroll }) => {
      smoothscroll.polyfill();
    });
  }
}