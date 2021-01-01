var roleDistributor = {

    run: function (creep) {

        var targets = creep.room.find(FIND_CREEPS, {
            filter: (creep) => {
                return (creep.memory.primaryRole === 'distributor');
            }
        });

        var assignedContainer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_CONTAINER);
            }
        });

        var extension = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION
                        || structure.structureType === STRUCTURE_TOWER
                        || structure.structureType === STRUCTURE_STORAGE
                    )
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        var links = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_LINK);
            }
        });

        for (i = 0; i < targets.length; i++) {
            targets[i].memory.assignedContainer = i;
        }

        creep.moveTo(assignedContainer[creep.memory.assignedContainer]);
        creep.withdraw(links[2], RESOURCE_ENERGY);

        for (i = 0; i < extension.length; i++) {
            creep.transfer(extension[i], RESOURCE_ENERGY)
            if (creep.store.getUsedCapacity() === 0) {
                break;
            }
            if (links[0].store.getUsedCapacity() > 0){
                creep.withdraw(links[0], RESOURCE_ENERGY);
            }
        }
    }
};

module.exports = roleDistributor;