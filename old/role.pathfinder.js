var rolePathfinder = {

        /** @param {Creep} creep **/
        run: function (creep, creepFree, creepUsed) {
            var spawnMemory = Game.getObjectById('5e75337013766c46c1f0274e').memory.newSources; //spawn

            if (spawnMemory[0] !== null) {
                var allContainers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER)
                            && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                var closestContainer = creep.pos.findClosestByRange(allContainers);
                var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_ROAD);
                    }
                });
                var builtRoads = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_ROAD);
                    }
                });
                var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                var pfRoute = new RoomPosition(spawnMemory[0].x, spawnMemory[0].y, spawnMemory[0].roomName);

                // console.log(creep.room.name);

                if (creep.pos.findPathTo(pfRoute).length <= 1 && creep.room.name !== 'W6S18') {
                    creep.memory.building = true;
                }

                if (creepFree === 0) {
                    // Is FULL going to empty @ container
                    creep.memory.working = false;
                }
                if (creepUsed === 0 && !creep.memory.working) {
                    // Is EMPTY going to Harvest
                    creep.memory.working = true;
                }
                //2034w6s19

                if (creep.memory.building) {
                    if (creep.memory.working) {
                        if (closestSource === null) {
                            if (creep.withdraw(closestContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(closestContainer);
                            }
                        } else {
                            if (creep.harvest(closestSource, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(closestSource);
                            }
                        }
                    } else {
                        if (creep.build(creep.pos.findClosestByRange(constructionSites)) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.pos.findClosestByRange(constructionSites));
                        }
                    }
                } else {
                    var a = 0;
                    for (i = 0; i < builtRoads.length; i++) {
                        if (builtRoads[i].pos.isEqualTo(creep.pos)) {
                            a = i;
                            break;
                        }
                    }
                    if (builtRoads[a] === undefined || !builtRoads[a].pos.isEqualTo(creep.pos)) {
                        Game.rooms[creep.room.name].createConstructionSite(creep.pos, STRUCTURE_ROAD);
                        creep.pos.findClosestByPath(creep.moveTo(pfRoute));
                    } else {
                        creep.pos.findClosestByPath(creep.moveTo(pfRoute));
                    }
                }
            } else {
                creep.moveTo(13,38,'W6S18')
            }

            // if (spawnMemory[0] === null && constructionSites.length < 0){
            //             //     console.log('returning Home')
            //             //     creep.moveTo(13,38,'W6S18')
            //             // }
        }
    }
;

module.exports = rolePathfinder;
