var roleTest = {

    run: function (creep) {

        var energyLevel = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType === STRUCTURE_CONTAINER && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 150)
                    || (structure.structureType === STRUCTURE_STORAGE && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 50000)
                    || (structure.structureType === STRUCTURE_SPAWN && structure.store.getUsedCapacity(RESOURCE_ENERGY) < 300));
            }
        });

        var storage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_STORAGE);
            }
        });
        var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);

        // let orgBuildCost = 0;
        //
        // for (i = 0; i < creep.body.length; i++) {
        //     orgBuildCost = orgBuildCost + BODYPART_COST[creep.body[i].type]
        // }
        //
        // let renewCost = Math.floor(600/creep.body.length) * Math.ceil(orgBuildCost/2.5/creep.body.length);
        //
        // if (renewCost < orgBuildCost){
        //
        // }else{
        //
        // }
        let ttl = creep.ticksToLive
        if (ttl < 20) {
            creep.memory.role = 'renew'
        }

        if (ttl >= 1400) {
            creep.memory.role = '';
        }

        if (creep.memory.role !== 'renew') {
            if (energyLevel.length > 0) {
                creep.memory.role = 'harvester';
                // console.log('Becoming a: harvester')
            } else if (constructionSites.length > 0) {
                creep.memory.role = 'builder';
                // console.log('Becoming a: builder')
            } else {
                creep.memory.role = 'upgrader';
                // console.log('Becoming a: upgrader')
            }
        } else {
            if (Game.spawns['Spawn1'].renewCreep(creep) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
};

module.exports = roleTest;