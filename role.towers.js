var roleTower = {

    run: function () {

        var towers = Game.rooms['W6S18'].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_TOWER)
            }
        });

        for (i = 0; i < towers.length; i++) {
            var closestHostile = towers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var closestDamagedStructure = towers[i].pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType !== STRUCTURE_WALL
                        && structure.structureType !== STRUCTURE_RAMPART
                        )
                        && structure.hits < structure.hitsMax;
                }
            });
            if (closestHostile) {
                towers[i].attack(closestHostile)
            } else if (towers[i].store.getUsedCapacity(RESOURCE_ENERGY) > 250) {
                towers[i].repair(closestDamagedStructure)
            }
        }

    }

};

module.exports = roleTower;