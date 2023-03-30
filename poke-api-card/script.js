let actualID;
function getId(max) {
  return Math.ceil(Math.random() * max);
};
const typeDiv = document.querySelector('.type');
const info = document.querySelector('.main__infoPkm');
const imgWrapper = document.querySelector('.main__imgPkm');
async function api(id){
  const reponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
  const pokemon = await reponse.json();
  actualID = id;
  let nomPokemon = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  let typePokemon = [];
  if(pokemon.types.length === 1){
    typePokemon = pokemon.types[0]['type']['name'] ;
    const type = document.querySelector(`.${typePokemon}`);
    console.log(typePokemon);
    type.classList.add("active");
    console.log(typePokemon);
  }else{
    typePokemon = [pokemon.types[0]['type']['name'] , pokemon.types[1]['type']['name']] ;
    const type = document.querySelector(`.${typePokemon[0]}`);
    const type2 = document.querySelector(`.${typePokemon[1]}`);
    console.log(typePokemon);
    type.classList.add("active");
    type2.classList.add("active"); 
  }
    let imgPokemon = pokemon.sprites['front_default']
  if (document.getElementById("shiny").checked == true) {
        imgPokemon = pokemon.sprites['front_shiny'];
    }
  const nom = document.createElement('h2');
  nom.innerText = nomPokemon ;
  const p = document.createElement('p');
  p.innerText = `Pokemon numéro #${id}`;
  info.insertBefore(nom, typeDiv);
  info.insertBefore(p, typeDiv);
  const img = document.createElement('img');
  img.src = imgPokemon;
  imgWrapper.appendChild(img);
}

api(getId(151));

const btnReload = document.querySelector('.btn');


btnReload.addEventListener("click", function () {
const img = imgWrapper.querySelector('img');
const h2 = info.querySelector('h2');
const p = info.querySelector('p');
const elements = document.querySelectorAll('.active');
for(let i = 0; i < elements.length; i++) {
elements[i].classList.remove('active')
};
p.remove();
h2.remove();
img.remove();
api(getId(151));
});
document.getElementById("shiny").addEventListener("input", async function(){
    const reponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + actualID);
    const pokemon = await reponse.json();
    const img = imgWrapper.querySelector('img');
    img.remove();
    let imgPokemon = pokemon.sprites['front_default']
    if (document.getElementById("shiny").checked == true) {
            imgPokemon = pokemon.sprites['front_shiny'];
            const img = document.createElement('img');
            img.src = imgPokemon;
            imgWrapper.appendChild(img);
      }else{
        imgPokemon = pokemon.sprites['front_default'];
        const img = document.createElement('img');
        img.src = imgPokemon;
        imgWrapper.appendChild(img);
      }
})