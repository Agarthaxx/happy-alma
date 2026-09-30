document.addEventListener('DOMContentLoaded', function () {
    if (!('IntersectionObserver' in window)) return;

    var navLinks = document.querySelectorAll('.nav a');
    var sections = [];

    navLinks.forEach(function (link) {
        var section = document.querySelector(link.getAttribute('href'));
        if (section) sections.push({ link: link, section: section });
    });

    var navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            sections.forEach(function (item) {
                if (item.section === entry.target) {
                    item.link.setAttribute('aria-current', 'location');
                } else {
                    item.link.removeAttribute('aria-current');
                }
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (item) { navObserver.observe(item.section); });

    var hero = document.querySelector('#accueil');
    if (hero) navObserver.observe(hero);

    var stickyCta = document.querySelector('.sticky-cta');
    var zones = document.querySelectorAll('#reserver, #contact, .footer');
    var visibleZones = new Set();

    if (stickyCta && zones.length) {
        var ctaObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) visibleZones.add(entry.target);
                else visibleZones.delete(entry.target);
            });
            stickyCta.hidden = visibleZones.size > 0;
        });
        zones.forEach(function (zone) { ctaObserver.observe(zone); });
    }
});
