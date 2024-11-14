document.addEventListener("DOMContentLoaded", () => {
    const whiteCar = document.getElementById("white");
    const redCar = document.getElementById("red");
    const brancoBtn = document.getElementById("branco");
    const vermelhoBtn = document.getElementById("vermelho");
    const resetBtn = document.getElementById("resetar");
    const acelerarBtn = document.getElementById("acelerar");
    const desacelerarBtn = document.getElementById("desacelerar");
    const resultDisplay = document.getElementById("result");
    const track = document.querySelector('.track');  // Estrada
    const headerText = document.querySelector('.text');  // Texto do cabeçalho

    let selectedCar = null;
    let whiteCarPosition = 60; // Posição inicial do carro branco (inicia mais baixo)
    let redCarPosition = 60; // Posição inicial do carro vermelho (inicia mais baixo)
    let whiteCarSpeed = 15; // Velocidade do carro branco (mais rápido)
    let redCarSpeed = 8;   // Velocidade do carro vermelho (mais lento)
    let moveStep = 10; // Quantidade de movimento por vez

    // Função para alterar a cor do carro selecionado e expandir a estrada
    function selectCar(carElement, colorName, bgColor, textColor, carSpeed) {
        selectedCar = carElement;
        resultDisplay.textContent = colorName;
        document.body.style.backgroundColor = bgColor;

        // Altera a cor do texto do cabeçalho
        headerText.style.color = textColor;

        // Aumenta o tamanho do carro escolhido (dá a sensação de velocidade)
        carElement.style.transform = "scale(1.5)"; // Aumenta o carro

        // Restante dos carros retorna ao tamanho normal
        if (carElement === whiteCar) {
            redCar.style.transform = "scale(1)";  // Reduz o outro carro ao tamanho normal
            whiteCarSpeed = carSpeed;
        } else {
            whiteCar.style.transform = "scale(1)"; // Reduz o outro carro ao tamanho normal
            redCarSpeed = carSpeed;
        }
    }

    // Seleção pelo clique nos carros
    whiteCar.addEventListener("click", () => selectCar(whiteCar, "Branco", "#D3D3D3", "black", 15));
    redCar.addEventListener("click", () => selectCar(redCar, "Vermelho", "#8B0000", "white", 12));

    // Seleção pelo clique nas cores do rodapé
    brancoBtn.addEventListener("click", () => selectCar(whiteCar, "Branco", "#D3D3D3", "black", 15));
    vermelhoBtn.addEventListener("click", () => selectCar(redCar, "Vermelho", "#8B0000", "white", 12));

    // Função para resetar o carro
    function resetCar() {
        // Resetando a posição dos carros
        whiteCarPosition = 60;
        redCarPosition = 60;
        whiteCar.style.top = `${whiteCarPosition}px`;
        redCar.style.top = `${redCarPosition}px`;

        // Resetando o tamanho dos carros
        whiteCar.style.transform = "scale(1)";
        redCar.style.transform = "scale(1)";

        // Resetando a cor do fundo
        resultDisplay.textContent = "?";
        document.body.style.backgroundColor = "black";
        headerText.style.color = "white";  // Resetar a cor do texto para branco
    }

    resetBtn.addEventListener("click", resetCar);

    // Função para mover o carro para frente (para cima)
    function moveCarForward() {
        if (selectedCar === whiteCar) {
            whiteCarPosition -= whiteCarSpeed; // Mover para cima (para o topo)

            // Diminuir o tamanho do carro branco à medida que ele se move para cima
            const scaleFactor = Math.max(0.2, 1 - (whiteCarPosition / 100)); // Não permite que o carro desapareça completamente até o topo
            whiteCar.style.transform = `scale(${scaleFactor})`;

            // Se o carro branco alcançar o topo
            if (whiteCarPosition <= 0) {
                whiteCarPosition = 0;
                resultDisplay.textContent = "Carro Branco Venceu!";
            }
            whiteCar.style.top = `${whiteCarPosition}px`;
        }
        if (selectedCar === redCar) {
            redCarPosition -= redCarSpeed; // Mover para cima (para o topo)

            // Se o carro vermelho alcançar o topo
            if (redCarPosition <= 0) {
                redCarPosition = 0;
                resultDisplay.textContent = "Carro Vermelho Venceu!";
            }
            redCar.style.top = `${redCarPosition}px`;
        }
    }

    // Função para mover o carro para trás (para baixo)
    function moveCarBackward() {
        if (selectedCar === whiteCar && whiteCarPosition < 60) { // Evitar que o carro suba demais
            whiteCarPosition += moveStep;
            whiteCar.style.top = `${whiteCarPosition}px`;
        }
        if (selectedCar === redCar && redCarPosition < 60) { // Evitar que o carro suba demais
            redCarPosition += moveStep;
            redCar.style.top = `${redCarPosition}px`;
        }
    }

    // Controle do carro com os botões
    acelerarBtn.addEventListener("click", moveCarForward);
    desacelerarBtn.addEventListener("click", moveCarBackward);

    // Controle do carro com o teclado (setas para cima e para baixo)
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
            moveCarBackward(); // Para cima move o carro para trás
            event.preventDefault(); // Evita o movimento contínuo ao segurar a tecla
        } else if (event.key === "ArrowDown") {
            moveCarForward(); // Para baixo move o carro para frente
            event.preventDefault(); // Evita o movimento contínuo ao segurar a tecla
        }
    });
});
