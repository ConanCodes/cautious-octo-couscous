var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSpawner = require('spawn.creeps');
var roleTower = require('role.towers');
var roleMiner = require('role.miner');
var roleScout = require('role.scout');
var roleDistributor = require('role.distributor');
var roleTransport = require('role.transport');
var rolePathfinder = require('role.pathfinder');
var timeToRenew = require('spawn.renew');


var roleTest = require('spawn.test');

/** todo
 *  Make harvester to find and get resources when another creep dies
 *  Make creep to sit on top of containers and distribute to extentions by spawn
 *  Going to bed with it @ 103,495
 * */

module.exports.loop = function () {

    roleSpawner.run();
    roleTower.run();

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for (var name in Game.creeps) {

        var creep = Game.creeps[name];
        var creepFree = creep.store.getFreeCapacity();
        var creepUsed = creep.store.getUsedCapacity();

        if (creep.memory.primaryRole !== undefined) {
            timeToRenew.run(creep)
        }

        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep, creepFree, creepUsed);
        }
        if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role === 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role === 'distributor') {
            roleDistributor.run(creep);
        }
        if (creep.memory.role === 'transport') {
            roleTransport.run(creep, creepFree, creepUsed);
        }
        // if (creep.memory.role === 'scout') {
        //     roleScout.run(creep);
        // }
        // if (creep.memory.role === 'pathfinder') {
        //     rolePathfinder.run(creep, creepFree, creepUsed);
        // }
    }

};

