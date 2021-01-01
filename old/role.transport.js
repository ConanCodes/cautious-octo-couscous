var roleTransport = {

    run: function (creep, creepFree, creepUsed) {
        var droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

        var tombstones = creep.room.find(FIND_TOMBSTONES, {
            filter: (tombstones) => {
                return (tombstones)
                    && tombstones.store.getUsedCapacity() > 0;
            }
        });

        var ruins = creep.room.find(FIND_RUINS, {
            filter: (ruins) => {
                return (ruins)
                    && ruins.store.getUsedCapacity() > 0;
            }
        });

        var mainStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_STORAGE);
            }
        });

        var refillContainers = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN
                        || structure.structureType === STRUCTURE_TOWER
                        || structure.structureType === STRUCTURE_EXTENSION
                        // || structure.structureType === STRUCTURE_CONTAINER
                        // || structure.structureType === STRUCTURE_STORAGE
                    )
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        }));

        if (creepFree === 0) {
            creep.memory.working = false;
        }
        if (creepUsed === 0 && !creep.memory.working) {
            creep.memory.working = true;
        }

        if (creep.memory.working
            && (droppedResource !== null || ruins.length > 0 || tombstones.length > 0)
        ) {
            let fetch;
            if (droppedResource !== null) {
                fetch = droppedResource
            } else if (ruins.length > 0) {
                fetch = ruins[0]
            } else if (tombstones.length > 0) {
                fetch = tombstones[0]
            }

            if (creep.pickup(fetch, RESOURCES_ALL[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(fetch);
            }

        } else {
            if (creep.memory.working) {
                if (creep.withdraw(mainStorage[0], RESOURCES_ALL[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(mainStorage[0]);
                }
            } else {
                if (refillContainers) {
                    if (creep.transfer(refillContainers, RESOURCES_ALL[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(refillContainers);
                    }
                } else {
                    if (creep.transfer(mainStorage[0], RESOURCES_ALL[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(mainStorage[0]);
                    }
                }
            }
        }
    }
};

module.exports = roleTransport;