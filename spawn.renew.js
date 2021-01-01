var timeToRenew = {

    run: function (creep) {

        var energyLevel = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    // structure.structureType === STRUCTURE_STORAGE
                        structure.structureType === STRUCTURE_SPAWN
                    // || structure.structureType === STRUCTURE_EXTENSION
                    )
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);


        let ttl = creep.ticksToLive
        if (ttl < 20) {
            creep.memory.role = 'renew'
        }

        if (ttl >= 1400) {
            creep.memory.role = '';
        }

        if (creep.memory.role !== 'renew') {
            if (creep.memory.primaryRole === 'transport') {
                creep.memory.role = 'transport';
            }
            else if (creep.memory.primaryRole === 'upgrader') {
                creep.memory.role = 'upgrader';
            }
            else if (creep.memory.primaryRole === 'miner') {
                creep.memory.role = 'miner';
            }
            else if (creep.memory.primaryRole === 'distributor') {
                creep.memory.role = 'distributor';
            }
            else if (energyLevel.length > 0) {
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

module.exports = timeToRenew;