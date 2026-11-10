
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-animes");
const modelo = document.querySelector("#modelo-anime");

const apiKey = "cv_RKblxHKttG5LzW8U_SsxfplVcRq1UImZr-AK86pU_ggKmAkEQqTQwU8D4QL-8xWv";
const apiUrl = "https://api-ds.codeverse.dev.br/api/animes";

async function buscaranimes() {

  resposta.textContent = "Carregando animes...";
  lista.innerHTML = "";

  try {
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!retorno.ok) {
      throw new Error("Não foi possível carregar os animes.");
    }

    const resultado = await retorno.json();

    for (const anime of resultado.data) {

      const card = modelo.content.cloneNode(true);

      card.querySelector(".nome").textContent = anime.title;
      card.querySelector(".genero").textContent = anime.genero;
      card.querySelector(".episodios").textContent = anime.episodios;
      card.querySelector(".lançamento").textContent = anime.lançamento;

      const imagem = card.querySelector(".imagem-anime");

      if (anime.imageUrl) {
        imagem.src = anime.imageUrl;
        imagem.alt = anime.title;
        imagem.onerror = () => imagem.remove();
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }

    resposta.textContent = "";

    if (resultado.data.length === 0) {
      resposta.textContent = "Nenhum anime cadastrado.";
    }

  } catch (error) {
    console.error(error);
    resposta.textContent =
      "Não foi possível carregar os animes. Tente novamente!";
  }
}

buscaranimes();
