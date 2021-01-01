var roleUpgrader = {

    /** @param {Creep} creep *
     */

    run: function (creep) {
        var closestSource = creep.pos.findClosestByPath(FIND_SOURCES);
        var links = _.filter(Game.structures, function (structure) {
            return (structure.structureType === STRUCTURE_LINK);
        });

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.upgrading = false;
            // creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
            creep.memory.upgrading = true;
            // creep.say('⚡ upgrade');
        }
        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            let a = creep.pos.findClosestByPath(links)
            if (a.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                if (creep.withdraw(a, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(a);
                }
            } else {
                if (creep.harvest(closestSource, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestSource);
                }
            }

        }
    }
};

module.exports = roleUpgrader;
