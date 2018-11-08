require('prototype.spawn')();
require('prototype.creep')();
require('prototype.room')();
require('prototype.tower')();
require('prototype.link.memory');
require('prototype.link')();
var links = [
{ id: '5bd9c6b1ba305861aa8f694b', from: true, home:  ''},
{ id: '5bd8a9c6b296347eab32dfe2', from: true, home:  ''},
{ id: '5bd9d68dca8716751be6a34b', from: false, home: '' },
{ id: '5bd8adfe33070e7eacaaf204', from: false, home: '' },
{ id: '5bdd6925b340b003b1d6d78c', from: true, home:  ''},
{ id: '5bdd6df5a0760f7507de0850', from: true, home:  ''},
{ id: '5be1ff23f0034d2ff277e2ec', from: false, home: '' },
{ id: '5be0e5ae7c93616a3734fdbc', from: true, home:  ''},
{ id: '5be0e73b7c93616a3734fe91', from: true, home:  ''},
{ id: '5be0d080c4237b1cc41f91f6', from: false, home: '' },
];
var creepRoster = [
    //HOME
    { home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 100, sourceId: '5bbcabae9099fc012e6341be', role: 'miner' },
    { home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 100, sourceId: '5bbcabae9099fc012e6341bd', role: 'miner' },
    { home: 'W22N23', target: 'W22N23', minValue: 2, maxEnergyCost: 0900, respawnTicks: 030, sourceId: '', role: 'lorry' },
    { home: 'W22N23', target: 'W21N24', minValue: 1, maxEnergyCost: 0600, respawnTicks: 250, sourceId: '5bbcabbf9099fc012e634342', role: 'miner' },
    { home: 'W22N23', target: 'W21N24', minValue: 1, maxEnergyCost: 0600, respawnTicks: 250, sourceId: '5bbcabbf9099fc012e634340', role: 'miner' },
    { home: 'W22N23', target: 'W22N24', minValue: 1, maxEnergyCost: 0600, respawnTicks: 250, sourceId: '5bbcabae9099fc012e6341b9', role: 'miner' },
    { home: 'W22N23', target: 'W21N24', minValue: 2, maxEnergyCost: 2400, respawnTicks: 110, sourceId: '', role: 'LDLorry' },
    { home: 'W22N23', target: 'W22N24', minValue: 1, maxEnergyCost: 2400, respawnTicks: 110, sourceId: '', role: 'LDLorry' },
    { home: 'W22N23', target: 'W22N24', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W22N23', target: 'W21N24', minValue: 1, maxEnergyCost: 1300, respawnTicks: 080, sourceId: '', role: 'reserver' },
    { home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 3200, respawnTicks: 000, sourceId: '', role: 'upgrader' },
    { home: 'W22N23', target: 'W22N24', minValue: 1, maxEnergyCost: 0800, respawnTicks: 200, sourceId: '', role: 'builder' },
    { home: 'W22N23', target: 'W21N24', minValue: 1, maxEnergyCost: 0800, respawnTicks: 200, sourceId: '', role: 'builder' },
    //COLONY    1                                   
    { home: 'W23N22', target: 'W23N22', minValue: 1, maxEnergyCost: 0600, respawnTicks: 100, sourceId: '5bbcaba29099fc012e634033', role: 'miner' },
    { home: 'W23N22', target: 'W23N22', minValue: 1, maxEnergyCost: 0600, respawnTicks: 200, sourceId: '5bbcaba29099fc012e634035', role: 'miner' },
    { home: 'W23N22', target: 'W23N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 200, sourceId: '5bbcaba19099fc012e634031', role: 'miner' },
    { home: 'W23N22', target: 'W23N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 200, sourceId: '5bbcaba19099fc012e634030', role: 'miner' },
    { home: 'W23N22', target: 'W23N22', minValue: 4, maxEnergyCost: 0900, respawnTicks: 030, sourceId: '', role: 'lorry' },
    { home: 'W23N22', target: 'W24N23', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W23N22', target: 'W23N23', minValue: 2, maxEnergyCost: 2100, respawnTicks: 050, sourceId: '', role: 'LDLorry' },
    { home: 'W23N22', target: 'W23N23', minValue: 1, maxEnergyCost: 1200, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W23N22', target: 'W23N23', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W23N22', target: 'W23N21', minValue: 1, maxEnergyCost: 2400, respawnTicks: 050, sourceId: '', role: 'LDFarmer' },
    { home: 'W23N22', target: 'W24N23', minValue: 2, maxEnergyCost: 2000, respawnTicks: 070, sourceId: '', role: 'LDFarmer' },
    { home: 'W23N22', target: 'W23N22', minValue: 1, maxEnergyCost: 3200, respawnTicks: 000, sourceId: '', role: 'upgrader' },
    { home: 'W23N22', target: 'W24N23', minValue: 1, maxEnergyCost: 0800, respawnTicks: 200, sourceId: '', role: 'builder' },
    //COLONY    2            
    { home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab8a9099fc012e633bf4', role: 'miner' },
    { home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab8a9099fc012e633bf6', role: 'miner' },
    { home: 'W25N22', target: 'W25N22', minValue: 2, maxEnergyCost: 0800, respawnTicks: 030, sourceId: '', role: 'lorry' },
    { home: 'W25N22', target: 'W25N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab8a9099fc012e633bf0', role: 'miner' },
    { home: 'W25N22', target: 'W25N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab8a9099fc012e633bf1', role: 'miner' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab7c9099fc012e6339b1', role: 'miner' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab7c9099fc012e6339b2', role: 'miner' },
    //{ home: 'W25N22', target: 'W26N23', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W25N22', target: 'W25N23', minValue: 1, maxEnergyCost: 1500, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 1500, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 3200, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W25N22', target: 'W25N22', minValue: 2, maxEnergyCost: 2300, respawnTicks: 000, sourceId: '', role: 'upgrader' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W25N22', target: 'W25N23', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W25N22', target: 'W25N23', minValue: 2, maxEnergyCost: 2300, respawnTicks: 120, sourceId: '', role: 'LDLorry' },
    { home: 'W25N22', target: 'W26N22', minValue: 2, maxEnergyCost: 2000, respawnTicks: 050, sourceId: '', role: 'LDLorry' },
];

module.exports.loop = function () {
    //ResetGameMemory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) { delete Memory.creeps[name]; }
    }
    for (let link of links) {
        Game.getObjectById(link.id).memory.from = link.from;
    }

    let towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for (let tower of towers) {
        if (tower.defend());
        else if (tower.healCreeps());
        else tower.repairStructures();
    }

    for (let name in Game.creeps) {
        Game.creeps[name].runRole();
    }

    
    for (let name in Game.rooms) {
        room = Game.rooms[name];
        if (room.controller.level > 0) {
            room.CreateRoster(creepRoster);
        }
        room.printSourcesInfo();
    }
    let gameLinks = _.filter(Game.structures, s => s.structureType == STRUCTURE_LINK);
    for(let link of gameLinks) {
        link.findAndTransfer();
    }

};

