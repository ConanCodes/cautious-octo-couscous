var roleMiner = {

        /** @param {Creep} creep **/

        run: function (creep) {
            var miner = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner');
            var sources = creep.room.find(FIND_SOURCES);
            var links = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK);
                }
            });

            for (i = 0; i < miner.length; i++) {
                miner[i].memory.sourceAssigned = i;
            }

            if (creep.harvest(sources[creep.memory.sourceAssigned], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceAssigned]);
            } else {
                if (creep.transfer(creep.pos.findClosestByPath(links), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.pos.findClosestByPath(links))
                }
            }

            for (i = 0; i < miner.length;
                 i++
            ) {
                if (links[i].store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                    links[i].transferEnergy(links[2], links[2].store.getFreeCapacity(RESOURCE_ENERGY))
                }
            }
        }
    }

;
module.exports = roleMiner;