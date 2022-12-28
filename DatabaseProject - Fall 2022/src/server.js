const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/', express.static('static'));

//setting up mysql connection
let conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'admin', //use the password you made when setting up mysql
    database: 'Swole'
});

conn.connect(function(err) {
    if (err){
        return console.error('error: ' + err.message);
    }
    console.log('Connected to MySQL Swole');
});

app.get('/make/user/:userInfo', async (req, res) => {
    let temp = req.params.userInfo.split('-');
    let name = temp[0];
    let height = temp[1];
    let weight = temp[2];
    let age = temp[3];
    let gender = temp[4];
    let goal = temp[5];
    let location = temp[6];
    let gymName = temp[7];
    let gymType = temp[8];
    var lastUiD = [];
    let spli1 = [];
    let spli2 = [];
    var newID;
    conn.query("select `user_id` from `user` order by `user_id` desc limit 1", function(err, results, fields){
        if(err) throw err;
        lastUiD = JSON.stringify(results); 
        console.log(results);
        spli1 = lastUiD.split(":");
        spli2 = spli1[1].split("}");
        console.log("lastUiD: "+ lastUiD);
        console.log("split: "+ spli1[1]);
        console.log("split2: "+ spli2[0]);
        newID = parseInt(spli2[0])+1;
        console.log("newID: "+newID);


        // lastUiD.forEach((v) => console.log(v));
        var stmt = "insert into `user` values(" + newID + ",'"+ name +"',"+ height+","+weight+","+age+",'"+gender+"','"+goal+"','"+location+"','"+gymName+"','"+gymType+"')";
        conn.query(stmt, function(err, result) {
            if(err) throw err;
            console.log("user added");
        });
        
    });
    
    console.log("lastUiD: "+ lastUiD);


    console.log("newID: "+newID);
    let i = 1006;

});

// AddUser('Jhameson',188,95,34,'M','Lose Weight', '70 road st, city province country', 'jimgym','Commercial');

app.get('/cal/calc/:user_workout', async (req, res) => {
    let temp = req.params.user_workout.split('-');
    let user_id = temp[0];
    let workout_id = temp[1];
    var incrementing = 1;
    var nexer;
    var weight;
    let met = [];
    var cals = 0;

    var stmt1 = "select `exercise_name` from `containing` where `workout_id` = " + workout_id;
    conn.query(stmt1, function(err, exercises, fields){
        if(err) throw err;
        console.log('==========');
        console.log(exercises);
        nexer = exercises.length;


        for(i = 0 ; i < exercises.length ; i++){
            console.log('==========');
            console.log(exercises[i].exercise_name);

            var stmt2 = "select `met_value` from `exercise` where `exercise_name` = '" + exercises[i].exercise_name + "'";
            conn.query(stmt2, function(err, metValues, fields){
                if(err) throw err;
                console.log(metValues);
                met.push(metValues[0].met_value);
                console.log(met);
                calcCals();
            });


        }


    });
    console.log(met);
    var stmt3 = "select `weight` from `user` where `user_id` = " + user_id;
    conn.query(stmt3, function(err, usrWeight, feilds){
        if(err) throw err;
        console.log(usrWeight);
        weight = usrWeight[0].weight;
        console.log("weight: " + weight);
        
    });
    function calcCals(){
        if(incrementing == nexer){
            for(i = 0; i < met.length; i++){
                cals += ((met[i] * 3.5 * weight) / 200) * 0.75 * 4; //the 0.75 is an assumption that they did the exercise for 45 seconds
                console.log("cals 1: " + cals);

            }
            res.send({calories: cals});
        }
        incrementing++;
    }
});

app.get('/edit/user/:userInfo', async (req, res) => {
    let temp = req.params.userInfo.split('-');
    let user_id = temp[0];
    let newGoal = temp[1];
    let newWeight = temp[2];
    let newAge = temp[3];
    let newGymName = temp[4];
    let newGymType = temp[5];
    let newLocation = temp[6];
    var stmt1 = "select goal, weight, age, gym_name, gym_type, location from `user` where user_id = "+user_id;
    conn.query(stmt1, function(err, oldVal, feilds){
        if(err) throw err;
        
        console.log(oldVal);

        if(newGoal == ""){
            newGoal = oldVal[0].goal;
        }
        if(newWeight == ""){
            newWeight = oldVal[0].weight;
        }
        if(newAge == ""){
            newAge = oldVal[0].age;
        }
        if(newGymName == ""){
            newGymName = oldVal[0].gym_name;
        }
        if(newGymType == ""){
            newGymType = oldVal[0].gym_type;
        }
        if(newLocation == ""){
            newLocation = oldVal[0].location;
        }
        console.log('newGoal: '+ newGoal);

        var stmt2 = "update `user` set goal = '" + newGoal + "' , weight = " + newWeight + ", age = "+ newAge + ", gym_type = '"+newGymType+"' , gym_name = '"+ newGymName + "' , location = '"+ newLocation+"' where `user_id` = "+ user_id;
        conn.query(stmt2, function(err, result){
            if(err) throw err;

            console.log(result.affectedRows);
        });
    });
});
// EditUser(1002, 'gain weight', 98, 21, 'home Style', 'home',);

app.get('/rec/equipment/:user_muscle', async (req, res) => {
    let temp = req.params.user_muscle.split('-');
    let user_id = temp[0];
    let muscleName = temp[1];
    var stmt1 = "select machine_name from uses where user_id = "+ user_id;
    conn.query(stmt1, function(err, machines){
        if(err) throw err;
        var machinesOwned = machines[0].machine_name+ "'";
        for (j = 1 ; j<machines.length;j++){
            machinesOwned += " and machine_name != '" + machines[j].machine_name + "'"
        }
        console.log(machinesOwned);

        var stmt2 ="select exercise_name from exercise where muscle_name = '"+muscleName+"'";
        conn.query(stmt2, function(err, exercises){
            if(err) throw err;
            var exercisesString = exercises[0].exercise_name + "'";
            for( i = 1 ; i < exercises.length; i++){
                exercisesString += " or exercise_name = '" + exercises[i].exercise_name + "'";
            }
            console.log("exercisesString: "+exercisesString);

            var stmt3 = "select machine_name from `allows` where exercise_name = '" +exercisesString; 
            conn.query(stmt3, function(err, result){
                if(err) throw err;
                console.log(result);
                var possibleMachines = result[0].machine_name + "'";
                for(k = 1 ; k < result.length; k++){
                    possibleMachines += " or machine_name = '" + result[k].machine_name + "'";
                }

                var stmt4 = "select machine_name, cost from machine where machine_name != '"+ machinesOwned + " and (machine_name = '" + possibleMachines+ ") order by cost asc";
                conn.query(stmt4, function(err, endMachines){
                    if(err) throw err;
                    console.log("============================");
                    res.send(endMachines);

                });
            });
        }); 
    });
});
// RecomendEquipment(1002, 'undefined');

app.get('/make/workout/:user_workout', async (req, res) => {
    let temp = req.params.user_workout.split('-');
    let user_id = temp[0];
    let muscleGroup = temp[1];
    var possibleExercises = [];
    var counter = 1;
    var length;
    var stmt1 = "select muscle_name from muscle where `group` = '" + muscleGroup + "'";
    conn.query(stmt1, function(err, muscles){
        if (err) throw err;
        length = muscles.length;
        console.log(muscles);

        counter = muscles.length;
        for(i = 0; i<muscles.length; i++ ){
            var stmt2 = "select exercise_name from exercise where muscle_name = '"+muscles[i].muscleName+"' order by RAND() limit 1";
            conn.query(stmt2, function(err, exercises){
                if(err) throw err;
                console.log(exercises);

                possibleExercises.push(exercises[0].exercise_name);
                CreateWorkout();
            });
        }
    });

    function CreateWorkout(){
        if(counter == length){
            var stmt3 = "select workout_id from `workout` order by workout_id desc limit 1";
            conn.query(stmt3, function(err, lastID){
                if(err) throw err;
                console.log(lastID);
                newID = parseInt(lastID[0].workout_id) +1;
                console.log("newID: "+ newID);

                var stmt4 = "insert into workout values("+newID+",'"+muscleGroup+" workout', 30, 100.0,'"+muscleGroup+"')";
                conn.query(stmt4, function(err, result){
                    if(err) throw err;
                    console.log(result);
                    var stmt5 = "insert into works values("+user_id+","+newID+")";
                    conn.query(stmt5, function(err, res){
                        if(err) throw err;
                        console.log(res);
                    })
                });
            });
        }
    }
});

app.get('/time/calctime/:workout_id', async (req, res) => {
    let workout_id = req.params.workout_id;
    var counter = 1;
    var totReps = [];
    var endTimeS = 0;
    var timesToRun;
    var stmt1 = "select exercise_name from `containing` where workout_id = "+workout_id;
    conn.query(stmt1, function(err, exercises){
        if (err) throw err;
        timesToRun = exercises.length;
        console.log(exercises);
        for(i = 0; i< exercises.length; i++){
            var stmt2 = "select rep_count from exercise where exercise_name = '"+exercises[i].exercise_name+"'";
            conn.query(stmt2, function(err, repCount){
                if(err) throw err;
                console.log(repCount);
                totReps.push(repCount[0].rep_count);
                TimeFromReps();
            });
        }
    });
    function TimeFromReps(){
        if(counter == timesToRun){
            for(j=0; j<totReps.length;j++){
                endTimeS += (totReps[j] * 4 + 120)*4;
            }
            res.send({time: endTimeS / 60});
        }
        counter++;
    }
});

app.get('/valuemachines', async (req, res) => {
    var machineName = [];
    var machineCost = [];
    var exercisesPerMachine = [];
    var costPerExercise = [];
    var dolperex;
    let r = [];
    var stmt1 = "select machine_name, cost from machine";
    conn.query(stmt1, function(err, machines){
        if(err) throw err;
        console.log(machines);
        for( i = 0 ; i<machines.length ; i++){
            machineName.push(machines[i].machine_name);
            machineCost.push(machines[i].cost);
            var stmt2 = "select count(machine_name) as machine_count from `allows` where `machine_name` = '" + machines[i].machine_name + "'";
            conn.query(stmt2, function(err, perMachine){
                if(err) throw err;
                console.log(perMachine);
                exercisesPerMachine.push(perMachine[0].machine_count);
                if (exercisesPerMachine.length == machines.length){
                    for(j = 0 ; j<machines.length ; j++){
                        dolperex = machineCost[j]/exercisesPerMachine[j];
                        costPerExercise.push(dolperex);
                        r.push("machine name:" + machineName[j] + "machine cost: "+ machineCost[j] + "cost per exercise: "+ costPerExercise[j]);
                    }
                    res.send(r);
                }
            });
        }
    });
});

app.get('/popularmachines', async (req, res) => {
    var stmt1 = "select count(machine_name) as counter, machine_name from `uses` group by machine_name  order by counter desc limit 10";
    conn.query(stmt1, function(err, popMachines){
        if (err) throw err;
        res.send(popMachines);
    });
});

app.listen(port, () => console.log(`Running on port: ${port}`));