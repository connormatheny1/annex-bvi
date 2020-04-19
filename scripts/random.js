const arr = [
    'Brady',
    'Pirkle',
    'Blakers',
    'Chud',
    'Chris D',
    'Connor',
    'Sam B',
    'Wehr',
    'Duff',
    'Kenny',
    'Kev',
    'Mashy',
    'Max',
    'Steckle',
    'Spanko',
    'Tim'
]
let pairs = [];
function assign(){
    
    const usedNums = [];
    for(let i = 0; pairs.length < 8; i++){
        let rand1 = random();
        let rand2 = random();
        if(!usedNums.includes(rand1) && !usedNums.includes(rand2) && rand1 !== rand2){
            usedNums.push(rand1);
            usedNums.push(rand2);
            pairs.push([arr[rand1], arr[rand2]])
        }    
    }
    console.log(usedNums);
    console.log(pairs);
    document.getElementById("assign").style.display = "none";
    document.getElementById("populate").style.display = "block";

}

function populate(){
    for(let j = 0; j < pairs.length; j++){
        const table = document.querySelector('#room-table >tbody')
        let row = document.createElement('tr');
        row.setAttribute('class', 'room-row');
        let td1 = document.createElement('td');
        td1.setAttribute('class', 'room-num');
        let td2 = document.createElement('td');
        td2.setAttribute('class', 'person1')
        let td3 = document.createElement('td');
        td3.setAttribute('class', 'person2')
        let td4 = document.createElement('td');
        td4.setAttribute('class', 'rats');
        td1.innerHTML=(j+1).toString();
        td2.innerHTML=pairs[j][0];
        td3.innerHTML=pairs[j][1];
        td4.innerHTML="Yes";
        row.append(td1, td2, td3, td4);
        table.append(row);
    }
    document.getElementById("assign").style.display = "block";
    document.getElementById("populate").style.display = "none";
    document.getElementById("reset-list").style.display = "block";
}

function resetList(){
    pairs = [];
    let rows = document.getElementsByClassName('room-row');
    while(rows.length > 0){
      rows[0].parentNode.removeChild(rows[0]);
    }
    document.getElementById("reset-list").style.display = "none";
}



function random() {
    min = Math.ceil(0);
    max = Math.floor(15);
    return Math.floor(Math.random() * (15 - 0 + 1)) + 0;
}

function rats(){
    document.getElementById("rats-yes").innerHTML = "You're a rat";
    alert("You're a rat");
    alert("You're an idiot");
    
}