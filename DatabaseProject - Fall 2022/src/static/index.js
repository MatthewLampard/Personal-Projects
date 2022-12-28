async function PopularMachines(){
    let ul = document.getElementById('pMachines');
    await fetch('/popularmachines').then(r => r.json()).then(e => {
        for (a in e)
        {
            let li = document.createElement('li');
            li.innerText = e[a].machine_name;
            ul.appendChild(li);
        }
    });
}

async function ValueMachine(){
    let ul = document.getElementById('vMachines');
    await fetch('/valuemachines').then(r => r.json()).then(e => {
        for(i in e)
        {
            let li = document.createElement('li');
            li.innerText = e[i];
            ul.appendChild(li);
        }
    });
}

async function CalcTime(){
    let t = document.getElementById('tworkoutID').value;
    let ul = document.getElementById('cTime');
    await fetch(`/time/calctime/${t}`).then(r => r.json()).then(e => {
        let li = document.createElement('li');
        li.innerText = `${e.time} mins`;
        ul.appendChild(li);
    });
}

async function MakeWorkout(){
    alert("Workout made");
    let t = document.getElementById('wuserID').value;
    let t2 = document.getElementById('muscleGroup').value;
    await fetch(`/make/workout/${t}-${t2}`);

}

async function RecomendEquipment(){
    let t = document.getElementById('ruserID').value;
    let t2 = document.getElementById('muscleName').value;
    let ul = document.getElementById('rec');
    await fetch(`/rec/equipment/${t}-${t2}`).then(r => r.json()).then(e => {
        for (a in e)
        {
            let li = document.createElement('li');
            li.innerText = e[a].machine_name;
            ul.appendChild(li);
        }
    });
}

async function GetCal(){
    let t = document.getElementById('cuserID').value;
    let t2 = document.getElementById('cworkoutID').value;
    let ul = document.getElementById('cal');
    await fetch(`/cal/calc/${t}-${t2}`).then(r => r.json()).then(e => {
        let li = document.createElement('li');
        li.innerText = `${e.calories} cals`;
        ul.appendChild(li);
    });
}

async function AddUser(){
    alert("New user added");
    let t = document.getElementById('Username').value;
    let t2 = document.getElementById('height').value;
    let t3 = document.getElementById('weight').value;
    let t4 = document.getElementById('Age').value;
    let t5 = document.getElementById('gender').value;
    let t6 = document.getElementById('goal').value;
    let t7 = document.getElementById('location').value;
    let t8 = document.getElementById('gymName').value;
    let t9 = document.getElementById('gymType').value;
    await fetch(`/make/user/${t}-${t2}-${t3}-${t4}-${t5}-${t6}-${t7}-${t8}-${t9}`);

}

async function EditUser(){
    alert("User edited");
    let t = document.getElementById('muserID').value;
    let t2 = document.getElementById('newGoal').value;
    let t3 = document.getElementById('newWeight').value;
    let t4 = document.getElementById('newAge').value;
    let t5 = document.getElementById('newGymName').value;
    let t6 = document.getElementById('newGymType').value;
    let t7 = document.getElementById('newLocation').value;
    await fetch(`/edit/user/${t}-${t2}-${t3}-${t4}-${t5}-${t6}-${t7}`);
}
