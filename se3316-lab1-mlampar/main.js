const pokemon = [
    {"Name":"Bulbasaur", "Type1":"Grass", "Type2":"Poison", "BaseATK":118, "BaseDEF":118},
    {"Name":"Ivysaur", "Type1":"Grass", "Type2":"Poison", "BaseATK":151, "BaseDEF":151},
    {"Name":"Venusaur", "Type1":"Grass", "Type2":"Poison", "BaseATK":198, "BaseDEF":198},
    {"Name":"Charmander", "Type1":"Fire", "Type2":"None", "BaseATK":116, "BaseDEF":96},
    {"Name":"Charmeleon", "Type1":"Fire", "Type2":"None", "BaseATK":158, "BaseDEF":129},
    {"Name":"Charizard", "Type1":"Fire", "Type2":"Flying", "BaseATK":223, "BaseDEF":176},
    {"Name":"Squirtle", "Type1":"Water", "Type2":"None", "BaseATK":94, "BaseDEF":122},
    {"Name":"Wartortle", "Type1":"Water", "Type2":"None", "BaseATK":126, "BaseDEF":155},
    {"Name":"Blastoise", "Type1":"Fire", "Type2":"None", "BaseATK":171, "BaseDEF":210},
    {"Name":"Caterpie", "Type1":"Bug", "Type2":"None", "BaseATK":55, "BaseDEF":62},
    {"Name":"Metapod", "Type1":"Bug", "Type2":"None", "BaseATK":45, "BaseDEF":94},
    {"Name":"Butterfree", "Type1":"Bug", "Type2":"Flying", "BaseATK":167, "BaseDEF":151},
    {"Name":"Weedle", "Type1":"Bug", "Type2":"Poison", "BaseATK":63, "BaseDEF":55},
    {"Name":"Kakuna", "Type1":"Bug", "Type2":"Poison", "BaseATK":46, "BaseDEF":86},
    {"Name":"Beedrill", "Type1":"Bug", "Type2":"Poison", "BaseATK":169, "BaseDEF":150},
    {"Name":"Pidgy", "Type1":"Normal", "Type2":"Flying", "BaseATK":85, "BaseDEF":76},
    {"Name":"Pidgeotto", "Type1":"Normal", "Type2":"Flying", "BaseATK":117, "BaseDEF":108},
    {"Name":"Pidgeot", "Type1":"Normal", "Type2":"Flying", "BaseATK":166, "BaseDEF":157},
    {"Name":"Rattata", "Type1":"Normal", "Type2":"None", "BaseATK":103, "BaseDEF":70},
    {"Name":"Raticate", "Type1":"Normal", "Type2":"None", "BaseATK":161, "BaseDEF":144}
]
function name(){
    var input;
    var loop;
    var li;
    var ul;
    var text;
    input = document.getElementById('name');
    loop = input.value.toUpperCase();
    ul = document.getElementById('list')
    li = ul.getElementsByTagName('li');

    for(var i=0;i<li.length;i++){
        tag = li[i].getElementsByTagName("p")[0];
        text = tag.textContent || tag.innerText;
        if(text.toUpperCase().indexOf(loop)>-1){
            li[i].style.display="";
        }
        else{li[i].style.display = "no results";}
    }
}
function number(){
    var input;
    var loop;
    var li;
    var ul;
    var text;
    input = document.getElementById('numbersearch');
    loop = input.value.toUpperCase();
    ul = document.getElementById('list')
    li = ul.getElementsByTagName('li');
    if(input.value > 0 && input.value<=20 || input.value.length === 0){
        for(var i=0;i<li.length;i++){
            val = li[i].getElementsByClassName("number")[0];
            text = val.textContent || val.innerText;
            if(text.toUpperCase().indexOf(loop)>-1){
                li[i].style.display="";
            }
            else{li[i].style.display = "no results";}
        }
    }
}
function pokeInfo(id){
    alert("Type 1: "+pokemon[id-1]["Type1"]+"\nType 2: "+pokemon[id-1]["Type2"]
    +"\nBaseATK: "+pokemon[id-1]["BaseATK"]+"\nBaseDEF: "+pokemon[id-1]["BaseDEF"]);
}