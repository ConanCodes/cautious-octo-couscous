var roleBuilder = {

    /** @param {Creep} creep *
     * @param source
     * @param closestSource
     * @param allContainers
     * @param emptyContainer
     * @param constructionSites
     */
    run: function (creep) {

        // If No extensions/spawns > builder, is no construction > become harvester

        var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);

        var allContainers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_CONTAINER
                        || structure.structureType === STRUCTURE_STORAGE
                        || structure.structureType === STRUCTURE_EXTENSION
                    )
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        var closestContainer = creep.pos.findClosestByRange(allContainers);

        var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        var ruins = creep.room.find(FIND_RUINS, {
            filter: (ruins) => {
                return (ruins)
                    && ruins.store.getUsedCapacity() > 0;
            }
        });

        // Walls to Repair if no constructions
        var repair = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType === STRUCTURE_RAMPART && structure.hits < (structure.hitsMax / 5))
                    || (structure.structureType === STRUCTURE_WALL && structure.hits < (structure.hitsMax / 50))
                );
            }
        }));

        // Remove ALL construction sites
        // for (i = 0; i < constructionSites.length; i++) {
        //     let site = constructionSites[i];
        //     if (site.progress === 0){
        //         site.remove();
        //
        //     }
        // }

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            // creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true;
            // creep.say('🚧 build');
        }

        if (creep.memory.building) {
            if (constructionSites.length > 0) {
                if (creep.build(constructionSites[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSites[0]);
                }
            } else {
                if (creep.repair(repair) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(repair);
                }
            }
        } else {
            if (creep.withdraw(closestContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestContainer);
            }
        }
    }
};

module.exports = roleBuilder;
