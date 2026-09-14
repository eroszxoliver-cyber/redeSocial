document.addEventListener("DOMContentLoaded", () => {
    let baseLikes = 0;
    let isLiked = false;

    const likeBtn = document.getElementById("like-btn");
    const likesCountSpan = document.getElementById("likes-count");
    const detailLikesCountSpan = document.getElementById("detail-likes-count");
    const postMedia = document.getElementById("post-media");
    const bookmarkBtn = document.getElementById("bookmark-btn");

    // Função para atualizar os contadores na tela
    function updateLikesDisplay() {
        if (likesCountSpan) likesCountSpan.textContent = baseLikes;
        if (detailLikesCountSpan) detailLikesCountSpan.textContent = baseLikes;
    }

    // Função para adicionar curtida e aplicar animação
    function addLike() {
        baseLikes += 1;
        isLiked = true;
        
        if (likeBtn) {
            likeBtn.classList.add("liked");
            
            // Efeito visual de animação (bounce) no coração
            const svg = likeBtn.querySelector("svg");
            if (svg) {
                svg.style.transform = "scale(1.4)";
                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }
        }
        
        updateLikesDisplay();
    }

    // Evento de clique no BOTÃO DE CORAÇÃO (Curte ou Descurte)
    if (likeBtn) {
        likeBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            if (isLiked) {
                // Se já estava curtido, descurte (-1)
                isLiked = false;
                baseLikes = Math.max(0, baseLikes - 1);
                likeBtn.classList.remove("liked");
                updateLikesDisplay();
            } else {
                // Se não estava curtido, adiciona curtida
                addLike();
            }
        });
    }

    // Evento de clique na IMAGEM PRINCIPAL (Sempre aumenta likes ao clicar)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            addLike();
        });
    }

    // Evento no botão de SALVAR (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

            const svg = bookmarkBtn.querySelector("svg");
            if (svg) {
                svg.style.transform = "scale(1.2)";
                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }
        });
    }

    // Inicializa a exibição zerada
    updateLikesDisplay();
});