import "../styles/style.scss";
const url = "https://app-mural.herokuapp.com/mural";
const card = require("./card");

card.cardCreate(
  {
    title: "Menssagens Para Vocês",
    message:
      "Você pode deixar sua menssagem clicando no icone de mais a esquerda! \n\n A mensagem deve ter um titulo e pode ter até 300 caracteres (mais que o tt). \n\n Na lupinha, você pode pesquisar nome de pessoas e filtrar menssagem enviadas ou recebidas por ela.",
    author: "Pedro",
    to: "Todos",
  },
  0
);

card.cardFilter();

let data = fetch(url, {
  headers: {
    "Content-Application": "application/json",
  },
})
  .then((response) => {
    return response.json();
  })
  .then();

data
  .then((posts) => {
    document.getElementById("add-icon").removeAttribute("hidden");
    document
      .getElementById("loader")
      .parentNode.removeChild(document.getElementById("loader"));

    if (posts.id == 0 && posts.title == "" && posts.message == "") {
      return;
    }

    Object.keys(posts).forEach((i, index) => {
      const post = {
        id: posts[i].id,
        title: posts[i].title,
        message: posts[i].message,
        author: posts[i].author,
        to: posts[i].to,
      };
      card.cardCreate(post, index + 1);
    });
    card.cardPage();
    card.cardFilter();
  })
  .catch((err) => {
    document
      .getElementById("loader")
      .parentNode.removeChild(document.getElementById("loader"));
    document.getElementById("add-icon").removeAttribute("hidden");
  });
