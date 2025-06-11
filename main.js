const apiUrl = "https://rickandmortyapi.com/api/character";

function makeCard (character){
    const {name, status, image} = character;
    const cardsContainer = document.querySelector(".cards-container");

    const title = document.createElement("h5");
    title.textContent = name;

    const characterStatus = document.createElement("p");
    characterStatus.textContent= status;
    if(status == "Alive") characterStatus.style.color = "blue";
    else characterStatus.style.color = "red";

    const characterImage = document.createElement("img");
    characterImage.src = image;
    
    characterImage.style.width = "100%";
    characterImage.style.height = "auto";
    characterImage.style.borderRadius = "12px";
    characterImage.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    characterImage.style.marginBottom = "0.75rem";
    characterImage.style.transition = "transform 0.3s ease";

    characterImage.addEventListener("mouseover", () => {
        characterImage.style.transform = "scale(1.05)";
    });
    characterImage.addEventListener("mouseout", () => {
        characterImage.style.transform = "scale(1)";
    });
    

    const Card = document.createElement("div");
    Card.appendChild(title);
    Card.appendChild(characterImage);
    Card.appendChild(characterStatus);
    Card.style.backgroundColor = "";

    cardsContainer.appendChild(Card);
}


async function getCharacters () {
    try{
        const response = await fetch(apiUrl);
        const {results} = await response.json();

        for (let i = 0; i < results.length; i++){
            makeCard(results[i]);
        }
    
    console.log(results);   
    } catch (error){
        console.error(error);
    }
  

}

getCharacters();