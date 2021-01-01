var roleSpawner = {

    run: function () {
        var roomSpawn = _.filter(Game.spawns);
        var opts = [

            {
                name: 'distributor',
                amount: 1,
                maxParts: 6,
                body: {'carry': 5, 'move': 1},
                memory: {role: 'distributor', primaryRole: 'distributor', homeRoom: roomSpawn[0].name},
            },
            {
                name: 'harvester',
                amount: 0,
                maxParts: 50,
                body: {'work': 2, 'carry': 2, 'move': 1},
                memory: {role: 'harvester', primaryRole: 'harvester', homeRoom: roomSpawn[0].name},
            },
            {
                name: 'upgrader',
                amount: 1,
                maxParts: 16,
                body: {'work': 2, 'carry': 1, 'move': 1},
                memory: {role: 'upgrader', primaryRole: 'upgrader', homeRoom: roomSpawn[0].name},
            },
            {
                name: 'builder',
                amount: 1,
                maxParts: 16,
                body: {'work': 2, 'carry': 1, 'move': 1},
                memory: {role: 'builder', primaryRole: 'builder', homeRoom: roomSpawn[0].name},
            },
            {
                name: 'transport',
                amount: 2,
                maxParts: 30,
                body: {'carry': 1, 'move': 1},
                memory: {role: 'transport', primaryRole: 'transport',homeRoom: roomSpawn[0].name},
            },
            {
                name: 'miner',
                amount: 2,
                maxParts: 36,
                body: {'work': 10, 'carry': 1, 'move': 1},
                memory: {role: 'miner', primaryRole: 'miner',homeRoom: roomSpawn[0].name},
            },
        ];

        if (roomSpawn[0].spawning === null) {
            for (i = 0; i < opts.length; i++) {
                let a = _.filter(Game.creeps, (creeps) => creeps.memory.primaryRole === opts[i].name);
                let count = a.length

                if (count < opts[i].amount) {
                    // let opts = option;

                    let body = [];
                    let spawnResult;

                    //Rooms can only spawn creeps with a max of 50, so this is our upper limit
                    let maxBodyParts = 50;

                    //Pull the maximum possible energy to be spent
                    let maxEnergy = roomSpawn[0].room.energyAvailable;

                    //ratioCost will tell us how much each iteration of the ratio will cost
                    let ratioCost = 0;

                    for (let bodyPart in opts[i].body) {
                        for (j = 0; j < opts[i].body[bodyPart]; j++) {
                            ratioCost += BODYPART_COST[bodyPart];
                        }
                    }

                    //With our ratio cost, we now figure out the maximum amount of the ratio we can make. We
                    //test three things, whether we run into the maximum energy for the room, the maximum
                    //bodyparts allowed, or the specified bodypart limit we put into the options
                    let maxUnits = Math.min(
                        Math.floor(maxEnergy / ratioCost),
                        Math.floor((opts[i].maxParts || 50) / _.sum(opts[i].body)),
                        Math.floor(maxBodyParts / _.sum(opts[i].body))
                    );
                    //Now we know how many of each bodypart we will make, we cycle through the order given to
                    //create the body
                    for (let bodyPart in opts[i].body) {
                        for (let j = 0; j < maxUnits * opts[i].body[bodyPart]; j++)
                            body.push(bodyPart);
                    }

                    var creepName = opts[i].name + Game.time;
                    // Spawn the creep with Body, Role + gametime, memory form opts
                    roomSpawn[0].spawnCreep(body, creepName, {memory: opts[i].memory})
                }


                //If we don't get an error code, pull the creep out of the spawnQueue so other spawns don't
                //spawn it as well
                // if (!spawnResult) _.pullAt(this.room.spawnQueue, [0]);
            }
        }

        // Energy transfer for Link
        // links[0] - FROM
        // links[1] - TO Upgraders
        // var links = _.filter(Game.structures, function (structure) {
        //     return (structure.structureType === STRUCTURE_LINK);
        // });

        // if (links[1].store.getUsedCapacity(RESOURCE_ENERGY) < 100
        //     && links[0].store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
        //     // console.log(links[1].store.getFreeCapacity(RESOURCE_ENERGY))
        //     links[0].transferEnergy(links[1], links[1].store.getFreeCapacity(RESOURCE_ENERGY))
        // }
    }
};

module.exports = roleSpawner;