require('prototype.spawn')();
require('prototype.creep')();
require('prototype.room')();
require('prototype.tower')();
require('prototype.link.memory');
require('prototype.link')();
var links = [
{ id: '5be532ccaa576246420e35a0', from: true, home:  ''},
{ id: '5be537a5607f59232a7a1d03', from: true, home:  ''},
{ id: '5bd9d68dca8716751be6a34b', from: false, home: '' },
{ id: '5bd8adfe33070e7eacaaf204', from: false, home: '' },
{ id: '5bdd6925b340b003b1d6d78c', from: true, home:  ''},
{ id: '5bdd6df5a0760f7507de0850', from: true, home:  ''},
{ id: '5be1ff23f0034d2ff277e2ec', from: false, home: '' },
{ id: '5be0e5ae7c93616a3734fdbc', from: true, home:  ''},
{ id: '5be0e73b7c93616a3734fe91', from: true, home:  ''},
{ id: '5be0d080c4237b1cc41f91f6', from: false, home: '' },
{ id: '5be484b53e112d0e16ec1f6e', from: false, home: '' },
];
var creepRoster = [
    //HOME
    { home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 100, sourceId: '5bbcabae9099fc012e6341be', role: 'miner' },
    { home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 100, sourceId: '5bbcabae9099fc012e6341bd', role: 'miner' },
    { home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 1000, respawnTicks: 030, sourceId: '', role: 'lorry' },
    { home: 'W22N23', target: 'W21N24', minValue: 1, maxEnergyCost: 0600, respawnTicks: 250, sourceId: '5bbcabbf9099fc012e634342', role: 'miner' },
    { home: 'W22N23', target: 'W21N24', minValue: 1, maxEnergyCost: 0600, respawnTicks: 250, sourceId: '5bbcabbf9099fc012e634340', role: 'miner' },
    { home: 'W22N23', target: 'W22N24', minValue: 1, maxEnergyCost: 0600, respawnTicks: 250, sourceId: '5bbcabae9099fc012e6341b9', role: 'miner' },
    { home: 'W22N23', target: 'W21N24', minValue: 3, maxEnergyCost: 2400, respawnTicks: 110, sourceId: '', role: 'LDLorry' },
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
    { home: 'W23N22', target: 'W23N22', minValue: 3, maxEnergyCost: 1000, respawnTicks: 030, sourceId: '', role: 'lorry' },
    { home: 'W23N22', target: 'W24N23', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W23N22', target: 'W23N23', minValue: 2, maxEnergyCost: 2100, respawnTicks: 050, sourceId: '', role: 'LDLorry' },
    { home: 'W23N22', target: 'W23N22', minValue: 0, maxEnergyCost: 3200, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W23N22', target: 'W23N23', minValue: 1, maxEnergyCost: 0800, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W23N22', target: 'W23N23', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W23N22', target: 'W23N21', minValue: 1, maxEnergyCost: 2400, respawnTicks: 050, sourceId: '', role: 'LDFarmer' },
    { home: 'W23N22', target: 'W24N23', minValue: 2, maxEnergyCost: 2000, respawnTicks: 070, sourceId: '', role: 'LDFarmer' },
    { home: 'W23N22', target: 'W23N22', minValue: 1, maxEnergyCost: 3200, respawnTicks: 000, sourceId: '', role: 'upgrader' },
    { home: 'W23N22', target: 'W24N23', minValue: 1, maxEnergyCost: 0800, respawnTicks: 200, sourceId: '', role: 'builder' },
    //COLONY    2            
    { home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab8a9099fc012e633bf4', role: 'miner' },
    { home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab8a9099fc012e633bf6', role: 'miner' },
    { home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 1000, respawnTicks: 030, sourceId: '', role: 'lorry' },
    { home: 'W25N22', target: 'W25N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab8a9099fc012e633bf0', role: 'miner' },
    { home: 'W25N22', target: 'W25N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab8a9099fc012e633bf1', role: 'miner' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab7c9099fc012e6339b1', role: 'miner' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab7c9099fc012e6339b2', role: 'miner' },
    { home: 'W25N22', target: 'W25N21', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab8a9099fc012e633bfa', role: 'miner' },
    { home: 'W25N22', target: 'W25N21', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab8a9099fc012e633bf9', role: 'miner' },
    { home: 'W25N22', target: 'W25N21', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W25N22', target: 'W27N23', minValue: 1, maxEnergyCost: 2400, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W25N22', target: 'W26N23', minValue: 1, maxEnergyCost: 2400, respawnTicks: 000, sourceId: '', role: 'upgrader' },
    { home: 'W25N22', target: 'W25N23', minValue: 1, maxEnergyCost: 0800, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 0800, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W25N22', target: 'W25N21', minValue: 1, maxEnergyCost: 0800, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W25N22', target: 'W25N22', minValue: 2, maxEnergyCost: 3200, respawnTicks: 000, sourceId: '', role: 'upgrader' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W25N22', target: 'W25N23', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W25N22', target: 'W25N23', minValue: 2, maxEnergyCost: 2300, respawnTicks: 120, sourceId: '', role: 'LDLorry' },
    { home: 'W25N22', target: 'W26N22', minValue: 2, maxEnergyCost: 2000, respawnTicks: 050, sourceId: '', role: 'LDLorry' },
    { home: 'W25N22', target: 'W25N21', minValue: 2, maxEnergyCost: 2400, respawnTicks: 050, sourceId: '', role: 'LDLorry' },
    //COLONY    3            
    { home: 'W26N23', target: 'W26N23', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab7b9099fc012e6339ae', role: 'miner' },
    { home: 'W26N23', target: 'W26N23', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab7b9099fc012e6339ad', role: 'miner' },
    { home: 'W26N23', target: 'W26N23', minValue: 1, maxEnergyCost: 0800, respawnTicks: 030, sourceId: '', role: 'lorry' },
    { home: 'W26N23', target: 'W26N23', minValue: 1, maxEnergyCost: 0000, respawnTicks: 000, sourceId: '', role: 'builder' },
    //{ home: 'W26N23', target: 'W26N23', minValue: 2, maxEnergyCost: 0000, respawnTicks: 030, sourceId: '', role: 'upgrader' },
];
var cpuCounter = 0.0;
var tickCounter = 0;
module.exports.loop = function () {
    //ResetGameMemory
    tickCounter++;
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
        //const startCpu = Game.cpu.getUsed();
        let creep = Game.creeps[name];
        if (creep.ticksToLive != undefined) creep.runRole();
        //const elapsed = Game.cpu.getUsed() - startCpu;
        //if (elapsed> 0.5) console.log('Creep ' + name + ' has used ' + elapsed + ' CPU time');
    }

    
    for (let name in Game.rooms) {
        room = Game.rooms[name];
        room.memory.isUnsafe = room.isUnsafe();
        if (room.controller.level > 0) {
            room.CreateRoster(creepRoster);
        }
        room.printSourcesInfo();
    }
    let gameLinks = _.filter(Game.structures, s => s.structureType == STRUCTURE_LINK);
    for(let link of gameLinks) {
        link.findAndTransfer();
    }
    //console.log(Game.time + ': ' + Game.cpu.bucket + '  ' + Game.cpu.tickLimit + '  ' + Game.cpu.getUsed());
    //let heap = Game.cpu.getHeapStatistics();
    //console.log(`Used ${heap.total_heap_size} / ${heap.heap_size_limit}`);
    cpuCounter += Game.cpu.getUsed()
    if (Game.time % 1500 == 0) {
        cpuCounter = 0;
        tickCounter = 0;
        console.log('************RESET*************')
    }
    else {
        let avg = Math.round((cpuCounter / tickCounter) * 1000) / 1000;
        let burst = Math.round(Game.cpu.getUsed() * 1000) / 1000;
        console.log(Game.time + ': [CPU burst: ' + burst + ' ] avg: [ ' + avg + ' ] CPU Bucket: [ ' + Game.cpu.bucket + ' ]');
    }
};
//1225695: 1013
//1225795
