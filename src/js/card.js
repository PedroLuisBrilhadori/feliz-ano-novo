function cardCreate(post, i) {
  let card = document.getElementsByTagName("template")[0];
  let clone = card.content.cloneNode(true);
  document.getElementById("cards").appendChild(clone);
  post.message = setBreakLine(post.message);

  cardContent = {
    title: post.title,
    message: post.message,
    author: post.author,
    to: post.to,
  };

  setCardContent(i, cardContent);

  colorCards(i, i % 2 == 0);
}

function setCardContent(i, cardContent) {
  let card = {
    title: document.getElementsByClassName("card-title-text")[i],
    message: document.getElementsByClassName("card-content")[i],
    author: document.getElementsByClassName("author")[i],
    to: document.getElementsByClassName("to")[i],
    footer: document.getElementsByClassName("card-footer")[i],
  };

  card.title.innerHTML = cardContent.title;
  card.message.innerHTML = cardContent.message;

  if (cardContent.author) {
    card.author.innerHTML = `Autor(a): ${cardContent.author}`;
  }

  if (!cardContent.to) {
    card.footer.className = "card-footer center";
    return;
  }

  card.to.innerHTML = `Para: ${cardContent.to}`;
  card.to.removeAttribute("hidden");
  card.author.innerHTML = `De: ${cardContent.author}`;
}

function setBreakLine(string) {
  while (string.indexOf("\n") > -1) {
    string = string.replace("\n", "<br>");
  }
  return string;
}

function colorCards(i, yellow) {
  if (!yellow) {
    document.getElementsByClassName("card-title")[i].className += " title-red";
    return;
  }

  document.getElementsByClassName("card-title")[i].className += " title-yellow";
}

function cardFilter() {
  if (!getSearch()) {
    return;
  }

  let search = getSearch();
  let indexForColors = [];
  let cards = document.getElementsByClassName("card-conteiner");

  for (let i = 0; i < cards.length; i++) {
    let footerShow = getFooterString(i).indexOf(search);

    footerShow < 0 ? (cards[i].style.display = "none") : indexForColors.push(i);
  }

  for (let i = 0; i < indexForColors.length; i++) {
    colorCards(indexForColors[i], i % 2 === 0);
  }
}

function getFooterString(i) {
  let cards = document.getElementsByClassName("card-conteiner");
  let footer = cards[i].lastElementChild.innerText;
  footer = footer.toUpperCase();
  footer = footer.replace(" ", "");
  footer = footer.replace(" ", "");
  footer = footer.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return footer;
}

function getSearch() {
  if (!location.search.includes("search")) {
    return undefined;
  }

  let search = "";
  let index = location.search.indexOf("=") + 1;
  let pageIndex = location.search.indexOf("page") - 1;

  for (index; index < pageIndex; i++) {
    search += location.search[index];
  }

  search = decodeURI(search);
  search = search.toUpperCase();
  search = search.replace("+", "");
  search = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return search;
}

function cardPage() {
  if (!document.location.search.includes("page")) {
    return null;
  }

  let page = "";
  let index = location.search.indexOf("page") + 5;

  for (index; index < location.search.length; i++) {
    page += location.search[index];
  }

  return page;
}

module.exports = {
  cardCreate,
  cardFilter,
  cardPage,
  setCardContent,
};
