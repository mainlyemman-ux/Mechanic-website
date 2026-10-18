(function () {
  var S = window.SITE;
  if (!S) return;

  function waLink(message) {
    return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(message || S.whatsappMessage);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Page title and description
  document.title = S.name + " | Car repair in " + S.address.split(",").pop().trim();
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", S.subtext);

  // Text fields: <element data-bind="key">
  document.querySelectorAll("[data-bind]").forEach(function (node) {
    var value = S[node.getAttribute("data-bind")];
    if (typeof value === "string") node.textContent = value;
  });

  // Links
  document.querySelectorAll("[data-wa]").forEach(function (node) {
    node.setAttribute("href", waLink());
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener");
  });
  document.querySelectorAll("[data-tel]").forEach(function (node) {
    node.setAttribute("href", "tel:" + S.phoneTel);
  });
  document.querySelectorAll("[data-maps]").forEach(function (node) {
    node.setAttribute("href", "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.mapsQuery));
  });

  // Hero badges
  var badges = document.getElementById("badges");
  if (badges) {
    S.badges.forEach(function (b) {
      badges.appendChild(el("li", "", b));
    });
  }

  // Stats
  var stats = document.getElementById("stats-items");
  if (stats) {
    S.stats.forEach(function (s) {
      var box = el("div", "stat");
      box.appendChild(el("div", "stat-value", s.value));
      box.appendChild(el("div", "stat-label", s.label));
      stats.appendChild(box);
    });
  }

  // Services
  var services = document.getElementById("service-items");
  if (services) {
    S.services.forEach(function (s, i) {
      var card = el("article", "service");
      card.appendChild(el("span", "service-num", String(i + 1).padStart(2, "0")));
      card.appendChild(el("h3", "", s.title));
      card.appendChild(el("p", "", s.text));
      var ask = el("a", "service-link", "Ask about this →");
      ask.setAttribute("href", waLink("Hello, I need help with " + s.title.toLowerCase() + "."));
      ask.setAttribute("target", "_blank");
      ask.setAttribute("rel", "noopener");
      card.appendChild(ask);
      services.appendChild(card);
    });
  }

  // Packages
  var packages = document.getElementById("package-items");
  if (packages) {
    S.packages.forEach(function (p) {
      var card = el("article", "package" + (p.featured ? " package-featured" : ""));
      if (p.featured) card.appendChild(el("span", "package-tag", "Most popular"));
      card.appendChild(el("h3", "", p.name));
      card.appendChild(el("p", "package-price", p.price));
      var list = el("ul", "package-list");
      p.items.forEach(function (item) {
        list.appendChild(el("li", "", item));
      });
      card.appendChild(list);
      var book = el("a", "btn btn-small " + (p.featured ? "btn-orange" : "btn-dark"), "Book this package");
      book.setAttribute("href", waLink("Hello, I'd like to book the " + p.name + " (" + p.price + ")."));
      book.setAttribute("target", "_blank");
      book.setAttribute("rel", "noopener");
      card.appendChild(book);
      packages.appendChild(card);
    });
  }

  // Why us
  var reasons = document.getElementById("reasons");
  if (reasons) {
    S.reasons.forEach(function (r) {
      reasons.appendChild(el("li", "", r));
    });
  }

  // Team
  var team = document.getElementById("team-items");
  if (team) {
    S.team.forEach(function (m) {
      var card = el("div", "member");
      card.appendChild(el("div", "member-img"));
      var body = el("div", "member-body");
      body.appendChild(el("h3", "", m.name));
      body.appendChild(el("p", "", m.role));
      card.appendChild(body);
      team.appendChild(card);
    });
  }
})();
