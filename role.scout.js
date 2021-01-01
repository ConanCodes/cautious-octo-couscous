var roleScout = {

    /** @param {Creep} creep **/
    run: function (creep) {

        const exits = Game.map.describeExits(creep.room.name);
        var spawnMemory = Game.getObjectById('5e75337013766c46c1f0274e'); //spawn

        var source = creep.room.find(FIND_SOURCES);
        var flag = creep.room.find(FIND_FLAGS);
        var anotherRoom = [];
        var flagsPlaced = [];

        for (i = 0; i < 15; i++) {
            if (exits[i] !== undefined) {
                anotherRoom.push(exits[i]);
            }
        }

        var leave = Game.map.findExit(creep.room.name, anotherRoom[2])
        if (leave === -2) {
            anotherRoom.splice(0, 1)
            leave = Game.map.findExit(creep.room.name, anotherRoom[0])
        }
        // creep.moveTo(creep.pos.findClosestByPath(leave));

        // console.log(delete spawnMemory[0])

       // delete spawnMemory
        // Create a flag if new source is found
        if (flag.length < source.length
            && creep.room.name !== 'W6S18'
        ) {
            for (i = 0; i < source.length; i++) {
                Game.rooms[creep.room.name].createFlag(source[i].pos);
                flagsPlaced.push(source[i].pos)

            }
            spawnMemory.memory.newSources = flagsPlaced;
        }
    }
};

module.exports = roleScout;
