const fs = require('fs');

// Generate muscle values
let muscleNames = [];
let indexmu = 0;
while (indexmu < 50){
    let name = Math.random().toString(36).substring(2,12);
    let group = Math.random().toString(36).substring(2,12);
    let location = Math.random().toString(36).substring(2,12);

    if (!muscleNames.some(item => item == name)){
        muscleNames.push(name);
        indexmu += 1;
        fs.appendFile('muscle.csv', `${name},${group},${location}\r\n`, (err) => {
            if (err) throw err;});
    }
}

// Generate user and workout values
for (i = 0; i < 1000; i++)
{
    // User
    let name = Math.random().toString(36).substring(2,12);
    let height = Math.floor(Math.random() * 50) + 150;
    let weight = Math.floor(Math.random() * 160) + 40;
    let age = Math.floor(Math.random() * 70) + 15;
    let gender = Math.floor(Math.random() * 2) == 0 ? 'M' : 'F';
    let goal = selectGoal(Math.floor(Math.random() * 5));
    let location = Math.random().toString(36).substring(2,12);
    let gymName = Math.random().toString(36).substring(2,12);
    let gymType = Math.floor(Math.random() * 2) == 0 ? 'Commercial' : 'Home';

    fs.appendFile('users.csv', `${i},${name},${height},${weight},${age},${gender},${goal},${location},${gymName},${gymType}\r\n`, (err) => {
        if (err) throw err;});

    // Workout
    let workoutName = Math.random().toString(36).substring(2,12);
    let duration = Math.floor(Math.random() * 90) + 30;
    let calories = ((Math.random() * 1500) + 150).toString(10).substring(0,7);
    let targetMuscle = selectMuscle(Math.floor(Math.random() * 5));
        
    fs.appendFile('workout.csv', `${i},${workoutName},${duration},${calories},${targetMuscle}\r\n`, (err) => {
        if (err) throw err;});
}

// Generate exercise values
let exerciseNames = [];
let indexe = 0;
while (indexe < 1000){
    let exerciseName = Math.random().toString(36).substring(2,12);
    let durationE = Math.floor(Math.random() * 15) + 5;
    let description = Math.random().toString(36).substring(2,20);
    let repCount = Math.floor(Math.random() * 4) + 8;
    let METValue = ((Math.random() * 19) + 1).toString(10).substring(0,4);
    let MuscleName = muscleNames[Math.floor(Math.random() * 51)];

    if (!exerciseNames.some(item => item == exerciseName)){
        exerciseNames.push(exerciseName);
        indexe += 1;
        fs.appendFile('exercise.csv', `${exerciseName},${durationE},${description},${repCount},${METValue},${MuscleName}\r\n`, (err) => {
            if (err) throw err;});
    }
}

// Generate containing table
let arrc = [];
let indexc = 0;
while (indexc < 1000){
    let workoutID = Math.floor(Math.random() * 1000);
    let exerciseName = exerciseNames[Math.floor(Math.random() * 999)];
    let obj = {
        wID: workoutID,
        eN: exerciseName
    }

    if (!arrc.some(item => item.wID == obj.wID && item.eN == obj.eN)){
        arrc.push(obj);
        indexc += 1;
        fs.appendFile('containing.csv', `${workoutID},${exerciseName}\r\n`, (err) => {
            if (err) throw err;});
    }
}

// Generate works table data
let arr = [];
let index = 0;
while (index < 1000){
    let userID = Math.floor(Math.random() * 1000);
    let workoutID = Math.floor(Math.random() * 1000);
    let obj = {
        uID: userID,
        wID: workoutID
    }

    if (!arr.some(item => item.uID == obj.uID && item.wID == obj.wID)){
        arr.push(obj);
        index += 1;
        fs.appendFile('works.csv', `${userID},${workoutID}\r\n`, (err) => {
            if (err) throw err;});
    }
}

// Generate machine values
let machineNames = [];
let indexm = 0;
while (indexm < 100){
    let machineName = Math.random().toString(36).substring(2,12);
    let description = Math.random().toString(36).substring(2,20);
    let cost = Math.floor(Math.random() * 4800) + 200;

    if (!machineNames.some(item => item == machineName)){
        machineNames.push(machineName);
        indexm += 1;
        fs.appendFile('machine.csv', `${machineName},${description},${cost}\r\n`, (err) => {
            if (err) throw err;});
    }
}

// Generate uses values
let arru = [];
let indexu = 0;
while (indexu < 1000){
    let machineName = machineNames[Math.floor(Math.random() * 99)];
    let userID = Math.floor(Math.random() * 1000);
    let obj = {
        mN: machineName,
        uID: userID
    }

    if (!arru.some(item => item.mN == obj.mN && item.uID == obj.uID)){
        arru.push(obj);
        indexu += 1;
        fs.appendFile('uses.csv', `${machineName},${userID}\r\n`, (err) => {
            if (err) throw err;});
    }
}

// Generate allows values
let arra = [];
let indexa = 0;
while (indexa < 1000){
    let exerciseName = exerciseNames[Math.floor(Math.random() * 999)];
    let machineName = machineNames[Math.floor(Math.random() * 99)];
    let obj = {
        eN: exerciseName,
        mN: machineName,
    }

    if (!arra.some(item => item.eN == obj.eN && item.mN == obj.mN)){
        arra.push(obj);
        indexa += 1;
        fs.appendFile('allows.csv', `${exerciseName},${machineName}\r\n`, (err) => {
            if (err) throw err;});
    }
}

function selectGoal(num)
{
    switch(num)
    {
        case 0: return 'Lose Fat';

        case 1: return 'Grow Arms';

        case 2: return 'Grow Legs';

        case 3: return 'Grow Chest';

        case 4: return 'Grow Back';
    }
}

function selectMuscle(num)
{
    switch(num)
    {
        case 0: return 'Leg';

        case 1: return 'Arm';

        case 2: return 'Chest';

        case 3: return 'Foot';

        case 4: return 'Hand';
    }
}
