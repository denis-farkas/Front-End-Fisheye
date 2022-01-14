
function headerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const main = document.querySelector("main");
    const picture = `assets/photographers/${portrait}`;

    function getUserHeaderDOM() {
      const header =document.createElement("div");
      header.className="photograph_header";
      main.appendChild(header);
      const headerLeft = document.createElement("div");
      headerLeft.className = "photograph_header_left";
      const title = document.createElement("h1");
      title.textContent = name;
      const origin = document.createElement("div");
      origin.className="origin";
      origin.textContent = `${city}, ${country}`;
      const subtitle = document.createElement("div");
      subtitle.className ="subtitle";
      subtitle.textContent = tagline;
      headerLeft.appendChild(title);
      headerLeft.appendChild(origin);
      headerLeft.appendChild(subtitle);
      const btn = document.createElement("button");
      btn.className = "contact-button";
      btn.setAttribute("onclick", "displayContactModal()")
      btn.textContent="Contactez-moi";
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", `${name}`);
      header.appendChild(headerLeft);
      header.appendChild(btn);
      header.appendChild(img);
      return header;
    }
    
    function getUserBodyDOM() {
        const body =document.createElement("div");
        body.className="photograph_body";
        main.appendChild(body);
        const badge=document.createElement("div");
        badge.className="badge";
        body.appendChild(badge);
        const badgeLeft=document.createElement("div");
        badgeLeft.className="badge-left";
        badge.appendChild(badgeLeft);
        const like = document.createElement("div");
        like.className="like";
        like.setAttribute("id", `total`);
        const i = document.createElement("i");
        i.className="fa fa-heart black";
        i.setAttribute("onclick", `Liked(total)`);
        badgeLeft.appendChild(like);
        badgeLeft.appendChild(i);
        const badgeRight=document.createElement("div");
        badgeRight.className="badge-right";
        badge.appendChild(badgeRight);
        const span = document.createElement("span");
        span.className="price";
        span.textContent = `${price}€ / jour`;
        badgeRight.appendChild(span);
        return body;
    }


    function getPortfolioSectionDOM(){
      const section = document.createElement("section");
      section.className="portfolio_section";
      const portfolio_header = document.createElement("div");
      portfolio_header.className="portfolio_header";
      const portfolio_body = document.createElement("div");
      portfolio_body.className="portfolio_body";
      section.appendChild(portfolio_header);
      section.appendChild(portfolio_body);
      main.appendChild(section);
      const label = document.createElement("label");
      label.textContent="Trier par";
      label.className="select-label";
      label.setAttribute("for", "select");
      portfolio_header.appendChild(label);

      const menu = document.createElement("div");
      menu.className="dropdown";
      menu.setAttribute("id", "dropdown");
      portfolio_header.appendChild(menu);
      const select = document.createElement("button");
      select.className = "dropdown-toggle";
      select.textContent ="Popularité"
      select.setAttribute("type", "button");
      select.setAttribute("aria-haspopup", true);
      menu.appendChild(select);
      const listbox = document.createElement("ul");
      listbox.className ="dropdown-menu";
      listbox.setAttribute("role", "listbox");
      listbox.setAttribute("aria-expanded", false);
      menu.appendChild(listbox);
      const filtrePopular = document.createElement("li");
      filtrePopular.setAttribute("role", "option");
      filtrePopular.setAttribute("tabindex", "0");
      filtrePopular.textContent = "Popularité";
      const filtreDate = document.createElement("li");
      filtreDate.setAttribute("role", "option");
      filtreDate.setAttribute("tabindex", "0");
      filtreDate.textContent = "Date";
      const filtreTitre = document.createElement("li");
      filtreTitre.setAttribute("role", "option");
      filtreTitre.setAttribute("tabindex", "0");
      filtreTitre.textContent = "Titre";
      listbox.appendChild(filtrePopular);
      listbox.appendChild(filtreDate);
      listbox.appendChild(filtreTitre);
      
      return section;
    }
    return{getUserHeaderDOM, getUserBodyDOM, getPortfolioSectionDOM};
  
  }