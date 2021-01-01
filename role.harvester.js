var roleHarvester = {

    /** @param {Creep} creep *
     * @param creepFree
     * @param creepUsed
     * @param source
     * @param closestSource
     * @param minersSource
     * @param targets
     * @param closetTargets
     * @param allContainers
     * @param emptyContainer
     * @param closestContainer
     * @param tower
     * @param droppedResource
     * @param constructionSites
     */

    run: function (creep, creepFree, creepUsed) {
        var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        var refillStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                        structure.structureType === STRUCTURE_SPAWN
                        // || structure.structureType === STRUCTURE_CONTAINER
                        || structure.structureType === STRUCTURE_EXTENSION
                        || structure.structureType === STRUCTURE_STORAGE
                    )
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        var droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        var largeStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_STORAGE);
            }
        });


        var ruins = creep.room.find(FIND_RUINS, {
            filter: (ruins) => {
                return (ruins)
                    && ruins.store.getUsedCapacity() > 0;
            }
        });
        var closestRuin = creep.pos.findClosestByPath(ruins);

        if (creepFree === 0) {
            // Is FULL going to empty @ container
            creep.memory.working = false;
        }
        if (creepUsed === 0 && !creep.memory.working) {
            // Is EMPTY going to Harvest
            creep.memory.working = true;
        }


        if (creep.memory.working) {
            if (ruins.length > 0 || droppedResource !== null) {
                if (ruins.length > 0) {
                    if (creep.withdraw(closestRuin, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestRuin);
                    }
                } else {
                    if (creep.pickup(droppedResource, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedResource);
                    }
                }


            } else {
                if (creep.harvest(closestSource, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestSource);
                }
            }

        } else {
            let cStorage = creep.pos.findClosestByPath(refillStorage)
            if (cStorage !== null) {
                if (creep.transfer(cStorage, RESOURCES_ALL[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(cStorage);
                }
            } else {
                creep.moveTo(largeStorage[0])
                if (creep.transfer(cStorage, RESOURCES_ALL[0]) !== ERR_NOT_IN_RANGE) {
                    for (i = 0; i < RESOURCES_ALL.length; i++) {
                        creep.transfer(largeStorage[0], RESOURCES_ALL[i])
                    }
                }
            }

        }
    }


};

module.exports = roleHarvester;