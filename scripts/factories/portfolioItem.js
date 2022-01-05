function portfolioItemFactory(data) {
    const { index, id, title, image, video, likes} = data;
    function getPortfolioCardDOM() {
      const article = document.createElement("article");
      if (image) {
        const img = document.createElement('img');
        img.setAttribute("src", `assets/media/${image}`);
        img.setAttribute("onclick", `currentSlide(${index})`);
        article.appendChild(img);
      } else if (video) {
        const vid = document.createElement('video');
        vid.setAttribute("src", `assets/media/${video}`);
        vid.setAttribute("autoplay","metadata");
        vid.setAttribute("onclick", `currentSlide(${index})`);
        article.appendChild(vid);
      }
      const row = document.createElement('div');
      row.className="row";
      article.appendChild(row);
      const span = document.createElement("span");
      span.textContent = `${title}`;
      span.className="describe";
      span.setAttribute("onclick", `currentSlide(${index})`);
      row.appendChild(span);
      const rightSide = document.createElement('div');
      rightSide.className="right-side";
      row.appendChild(rightSide);
      const like = document.createElement("div");
      like.className="likes";
      like.textContent = `${likes}`;
      like.setAttribute("id", `${id}`);
      const i = document.createElement("i");
      i.className="fa fa-heart";
      i.setAttribute("onclick", `Liked(${id})`);
      rightSide.appendChild(like);
      rightSide.appendChild(i);
      return article;
    }
    return {getPortfolioCardDOM};
    
  }