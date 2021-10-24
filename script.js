           const d = document,
            $shows = d.querySelector("#show"),
            $template = d.querySelector("#template").content,
            $fragment = d.createDocumentFragment();
           



            d.addEventListener("keypress", async e => {
                if(e.target.matches("#search")){
                    if (e.key ==="Enter"){
                        try{
                            $shows.innerHTML = `<img class = "loader src = "../assets/
                            loader.svg" alt="Carregando...">`;
                            let query = e.target.value.toLowerCase(),//deixa as letras minuscula
                            api = `https://api.tvmaze.com/search/shows?q=${query}`,
                            res = await fetch(api),//o featch me fonece dados fornecidos pelo servidor
                            json = await res.json();

                            console.log(api, res, json)

                            if(!res.ok)throw{status: res.status, statusText: res.statusText}

                            if(json.length === 0){
                                $shows.innerHTML =`<h2> Não existe resultados de show para essa busca: <mark>${query}</mark> </h2>`
                            }else{
                            json.forEach(el => {
                                $template.querySelector("h4").textContent = el.show.name;
                                $template.querySelector("img").src = el.show.image ? el.show.image.
                                medium: "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
                                $template.querySelector("img").alt = el.show.name;
                                $template.querySelector("img").style.maxWidth = "100%";
                                $template.querySelector("a").href = el.show.url ? el.show.url: "#"
                                $template.querySelector("a").target = el.show.url ? "_blank": "_self"
                                $template.querySelector("a").target = el.show.url ? "_blank": "_self"
                                $template.querySelector("a").textContent = el.show.url ? "Acessar Escolha": ""

                                let $clone = d.importNode($template, true);
                                $fragment.appendChild($clone)
                                });
                                $shows.innerHTML ="";
                                $shows.appendChild($fragment);
                                }
                            }catch(err){
                            console.log(err);
                            let message = err.statusText || "Ocorreu um erro";
                        $shows.innerHTML = `<p> Error ${err.status}: ${message}</p>`;
                    }
                }
            }
        });
        