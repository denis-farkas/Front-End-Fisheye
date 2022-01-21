/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const { name, id, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;
  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("role", "article");
    article.setAttribute("tabindex", "0");
    article.setAttribute("aria-label", `Fiche du photographe ${name}`);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${name}`);
    img.setAttribute("role", "status");
    img.setAttribute("aria-label", `portrait ${name}`);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.setAttribute("role", "status");
    h2.setAttribute("aria-label", `${name}`);
    const h6 = document.createElement("h6");
    h6.setAttribute("role", "status");
    h6.setAttribute("aria-label", `localisation ${city}, ${country}`);
    h6.textContent = `${city}, ${country}`;
    const p = document.createElement("p");
    p.setAttribute("role", "status");
    p.className ="subTitle";
    p.textContent = tagline;
    const spanOther = document.createElement("span");
    spanOther.className="price";
    spanOther.setAttribute("role", "status");
    spanOther.textContent = `${price}€/jour`;
    spanOther.setAttribute("aria-label", `${price}€/jour`);
    const a = document.createElement("a");
    a.setAttribute("role", "link");
    a.setAttribute("href", `photographer.html?id=${id}`);
    a.setAttribute("aria-label", `visiter la page de ${name}` );
    
    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(h6);
    article.appendChild(p);
    article.appendChild(spanOther);
    
    return article;
  }
  return { name, picture, getUserCardDOM };
}






