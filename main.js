//Game.rooms['W23N22'].terminal.send(RESOURCE_ENERGY, 17100, 'W22N23','')
//Game.market.createOrder(ORDER_BUY, RESOURCE_GHODIUM, 0.99, 10000, "W22N23");
//Game.market.cancelOrder('5bf93a7ce13f9246df504035');
require('Traveler');
require('prototype.structure.memory');
require('prototype.spawn')();
require('prototype.creep')();
require('prototype.room')();
require('prototype.tower')();
require('prototype.link.memory');
require('prototype.link')();
require('prototype.lab')();
require('prototype.terminal')();
var links = [
{ id: '5be532ccaa576246420e35a0', from: true, home:  ''},
{ id: '5be537a5607f59232a7a1d03', from: true, home:  ''},
{ id: '5bd9d68dca8716751be6a34b', from: false, home: '' },
{ id: '5bd8adfe33070e7eacaaf204', from: false, home: '' },
{ id: '5bdd6925b340b003b1d6d78c', from: true, home:  ''},
{ id: '5bdd6df5a0760f7507de0850', from: true, home:  ''},
{ id: '5be1ff23f0034d2ff277e2ec', from: false, home: '' },
{ id: '5bf04dcae11183650677254b', from: true, home:  ''},
{ id: '5bf04a834cdfc041ae980a8d', from: true, home:  ''},
{ id: '5be0d080c4237b1cc41f91f6', from: false, home: '' },
{ id: '5be484b53e112d0e16ec1f6e', from: false, home: '' },
];
var labs = [
    [
        { id: '5bf5f2b23aa3776aac5aff29', resource: RESOURCE_OXYGEN, reactor: false, childIDs: undefined },
        { id: '5bf610962203cb17502ec6e0', resource: RESOURCE_HYDROGEN, reactor: false, childIDs: undefined },
        { id: '5bf600ed6ae45a469d1af0d9', resource: undefined, reactor: true, childIDs: ['5bf5f2b23aa3776aac5aff29', '5bf610962203cb17502ec6e0'] },
    ],
    [
        { id: '5bf5f9b22c9b1e46a32e573d', resource: RESOURCE_OXYGEN, reactor: false, childIDs: undefined },
        { id: '5bf62b217f98525518510c3a', resource: RESOURCE_HYDROGEN, reactor: false, childIDs: undefined },
        { id: '5bf5ec08e279c454f9239dd3', resource: undefined, reactor: true, childIDs: ['5bf5f9b22c9b1e46a32e573d', '5bf62b217f98525518510c3a'] },
    ],
    [
        { id: '5bf5e1442c9b1e46a32e4adb', resource: RESOURCE_OXYGEN, reactor: false, childIDs: undefined },
        { id: '5bf61d81749c3d725c9808e9', resource: RESOURCE_HYDROGEN, reactor: false, childIDs: undefined },
        { id: '5bf60db176d77a467734e375', resource: undefined, reactor: true, childIDs: ['5bf5e1442c9b1e46a32e4adb', '5bf61d81749c3d725c9808e9'] },
    ],
];
var roomsDefence = [
{ name: 'W22N23', maxWallHitPoints: 7500000.0, },
{ name: 'W23N22', maxWallHitPoints: 500000.0, },
{ name: 'W25N22', maxWallHitPoints: 500000.0, },
{ name: 'W25N23', maxWallHitPoints: 1000000.0, },
{ name: 'W26N23', maxWallHitPoints: 500000.0, },
{ name: 'W27N23', maxWallHitPoints: 1000000.0, },
];
var creepRoster = [
    //HOME
    { home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 2000, respawnTicks: 030, sourceId: '', role: 'lorry' },
    { home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 100, sourceId: '5bbcabae9099fc012e6341be', role: 'miner' },
    { home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 100, sourceId: '5bbcabae9099fc012e6341bd', role: 'miner' },
    //{ home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 100, sourceId: '5bbcb21640062e4259e9366c', role: 'miner' },
    //{ home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 1500, respawnTicks: 030, sourceId: '', role: 'labLorry' },
    { home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 0800, respawnTicks: 030, sourceId: '', role: 'llorry' },
    { home: 'W22N23', target: 'W21N24', minValue: 1, maxEnergyCost: 0600, respawnTicks: 250, sourceId: '5bbcabbf9099fc012e634342', role: 'miner' },
    { home: 'W22N23', target: 'W21N24', minValue: 1, maxEnergyCost: 0600, respawnTicks: 250, sourceId: '5bbcabbf9099fc012e634340', role: 'miner' },
    { home: 'W22N23', target: 'W22N24', minValue: 1, maxEnergyCost: 0600, respawnTicks: 250, sourceId: '5bbcabae9099fc012e6341b9', role: 'miner' },
    //{ home: 'W22N23', target: 'W21N24', minValue: 3, maxEnergyCost: 2400, respawnTicks: 110, sourceId: '', role: 'LDLorry' },
    { home: 'W22N23', target: 'W22N24', minValue: 1, maxEnergyCost: 2000, respawnTicks: 110, sourceId: '', role: 'LDLorry' },
    { home: 'W22N23', target: 'W22N23', minValue: 1, maxEnergyCost: 3200, respawnTicks: 000, sourceId: '', role: 'upgrader' },
    { home: 'W22N23', target: 'W22N24', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W22N23', target: 'W21N24', minValue: 1, maxEnergyCost: 3200, respawnTicks: 000, sourceId: '', role: 'upgrader' },
    { home: 'W22N23', target: 'W22N24', minValue: 1, maxEnergyCost: 0800, respawnTicks: 200, sourceId: '', role: 'builder' },
    { home: 'W22N23', target: 'W21N24', minValue: 1, maxEnergyCost: 3200, respawnTicks: 200, sourceId: '', role: 'builder' },
    //COLONY    1                                   
    { home: 'W23N22', target: 'W23N22', minValue: 2, maxEnergyCost: 2100, respawnTicks: 030, sourceId: '', role: 'lorry' },
    { home: 'W23N22', target: 'W23N22', minValue: 1, maxEnergyCost: 0600, respawnTicks: 100, sourceId: '5bbcaba29099fc012e634033', role: 'miner' },
    { home: 'W23N22', target: 'W23N22', minValue: 1, maxEnergyCost: 0600, respawnTicks: 200, sourceId: '5bbcaba29099fc012e634035', role: 'miner' },
    //{ home: 'W23N22', target: 'W23N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 200, sourceId: '5bbcaba19099fc012e634031', role: 'miner' },
    //{ home: 'W23N22', target: 'W23N22', minValue: 1, maxEnergyCost: 2100, respawnTicks: 030, sourceId: '', role: 'llorry' },
    { home: 'W23N22', target: 'W23N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 200, sourceId: '5bbcaba19099fc012e634030', role: 'miner' },
    { home: 'W23N22', target: 'W23N22', minValue: 1, maxEnergyCost: 1000, respawnTicks: 000, sourceId: '5bbcb20840062e4259e93601', role: 'extractor' },
    { home: 'W23N22', target: 'W24N23', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W23N22', target: 'W23N23', minValue: 1, maxEnergyCost: 2400, respawnTicks: 050, sourceId: '', role: 'LDLorry' },
    { home: 'W23N22', target: 'W23N23', minValue: 1, maxEnergyCost: 0800, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W23N22', target: 'W23N23', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W23N22', target: 'W24N23', minValue: 2, maxEnergyCost: 2000, respawnTicks: 070, sourceId: '', role: 'LDFarmer' },
    { home: 'W23N22', target: 'W23N21', minValue: 1, maxEnergyCost: 2400, respawnTicks: 070, sourceId: '', role: 'LDFarmer' },
    { home: 'W23N22', target: 'W23N22', minValue: 1, maxEnergyCost: 3200, respawnTicks: 000, sourceId: '', role: 'upgrader' },
    { home: 'W23N22', target: 'W24N23', minValue: 1, maxEnergyCost: 0800, respawnTicks: 200, sourceId: '', role: 'builder' },
    //COLONY    2            
    { home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab8a9099fc012e633bf4', role: 'miner' },
    { home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab8a9099fc012e633bf6', role: 'miner' },
    //{ home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcb1fa40062e4259e93565', role: 'miner' },
    { home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 1000, respawnTicks: 030, sourceId: '', role: 'lorry' },
    { home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 1500, respawnTicks: 030, sourceId: '', role: 'llorry' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab7c9099fc012e6339b1', role: 'miner' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab7c9099fc012e6339b2', role: 'miner' },
    { home: 'W25N22', target: 'W25N21', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab8a9099fc012e633bfa', role: 'miner' },
    { home: 'W25N22', target: 'W25N21', minValue: 1, maxEnergyCost: 0600, respawnTicks: 150, sourceId: '5bbcab8a9099fc012e633bf9', role: 'miner' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 0800, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W25N22', target: 'W25N21', minValue: 1, maxEnergyCost: 0800, respawnTicks: 000, sourceId: '', role: 'builder' },
    { home: 'W25N22', target: 'W27N23', minValue: 1, maxEnergyCost: 3200, respawnTicks: 200, sourceId: '', role: 'upgrader' },
    { home: 'W25N22', target: 'W25N23', minValue: 1, maxEnergyCost: 3200, respawnTicks: 150, sourceId: '', role: 'upgrader' },
    { home: 'W25N22', target: 'W25N22', minValue: 1, maxEnergyCost: 3200, respawnTicks: 000, sourceId: '', role: 'upgrader' },
    { home: 'W25N22', target: 'W26N23', minValue: 1, maxEnergyCost: 3200, respawnTicks: 000, sourceId: '', role: 'upgrader' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W25N22', target: 'W25N21', minValue: 1, maxEnergyCost: 1300, respawnTicks: 000, sourceId: '', role: 'reserver' },
    { home: 'W25N22', target: 'W26N22', minValue: 1, maxEnergyCost: 2000, respawnTicks: 050, sourceId: '', role: 'LDLorry' },
    { home: 'W25N22', target: 'W25N21', minValue: 2, maxEnergyCost: 2400, respawnTicks: 050, sourceId: '', role: 'LDLorry' },
    //COLONY    3            
    { home: 'W26N23', target: 'W26N23', minValue: 1, maxEnergyCost: 1000, respawnTicks: 110, sourceId: '', role: 'lorry' },
    { home: 'W26N23', target: 'W26N23', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab7b9099fc012e6339ae', role: 'miner' },
    { home: 'W26N23', target: 'W26N23', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab7b9099fc012e6339ad', role: 'miner' },
    //{ home: 'W26N23', target: 'W26N23', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcb1f440062e4259e9351c', role: 'miner' },
    { home: 'W26N23', target: 'W26N23', minValue: 1, maxEnergyCost: 0250, respawnTicks: 110, sourceId: '', role: 'llorry' },
    //COLONY    4            
    { home: 'W27N23', target: 'W27N23', minValue: 1, maxEnergyCost: 1000, respawnTicks: 080, sourceId: '', role: 'lorry' },
    { home: 'W27N23', target: 'W27N23', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab6d9099fc012e6337dd', role: 'miner' },
    { home: 'W27N23', target: 'W27N23', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab6d9099fc012e6337de', role: 'miner' },
    //{ home: 'W27N23', target: 'W27N23', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcb1eb40062e4259e934bc', role: 'miner' },
    { home: 'W27N23', target: 'W27N23', minValue: 1, maxEnergyCost: 0250, respawnTicks: 080, sourceId: '', role: 'llorry' },
    //COLONY    5            
    { home: 'W25N23', target: 'W25N23', minValue: 1, maxEnergyCost: 1000, respawnTicks: 080, sourceId: '', role: 'lorry' },
    { home: 'W25N23', target: 'W25N23', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab8a9099fc012e633bf1', role: 'miner' },
    { home: 'W25N23', target: 'W25N23', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcab8a9099fc012e633bf0', role: 'miner' },
    //{ home: 'W25N23', target: 'W25N23', minValue: 1, maxEnergyCost: 0550, respawnTicks: 050, sourceId: '5bbcb1fa40062e4259e93564', role: 'miner' },
    { home: 'W25N23', target: 'W25N23', minValue: 1, maxEnergyCost: 0600, respawnTicks: 080, sourceId: '', role: 'llorry' },
];
var cpuCounter = 0.0;
var tickCounter = 0;
module.exports.loop = function () {
    //ResetGameMemory
    tickCounter++;
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) { delete Memory.creeps[name]; }
    }
    //for (let linkObj of links) {
    //    let link = Game.getObjectById(linkObj.id);
    //    if (link != undefined) {
    //        link.memory.from = linkObj.from;
    //    }
    //    else {
    //        delete Memory.links[link];
    //    }
    //}

    for (let labCore of labs) {
        for(let labObj of labCore) {
            let lab = Game.getObjectById(labObj.id);
            if (lab != undefined) {
                lab.memory.resource = labObj.resource;
                lab.memory.reactor = labObj.reactor;
                lab.memory.childIDs = labObj.childIDs;
            }
            else {
                delete Memory.structures[lab];
            }
        }
    }
    //for (let roomObj of roomsDefence) {
    //    let room = Game.rooms[roomObj.name];
    //    if (room != undefined) {
    //        room.memory.maxWallHitPoints = roomObj.maxWallHitPoints;
    //    }
    //}
    let towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for (let tower of towers) {
        if (tower.defend());
        else if (tower.healCreeps());
        else tower.repairStructures();
    }

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.ticksToLive != undefined) creep.runRole();
    }

    for (let name in Game.rooms) {
        room = Game.rooms[name];
        //if (room.memory.maxWallHitPoints == undefined) {
        //    room.memory.maxWallHitPoints = 250000;
        //}
        room.memory.isUnsafe = room.isUnsafe();
        if (room.controller != undefined && room.controller.level > 0) {
            room.CreateRoster(creepRoster);
        }
        room.printSourcesInfo();
    }
    let gameLinks = _.filter(Game.structures, s => s.structureType == STRUCTURE_LINK);
    for(let link of gameLinks) {
        link.findAndTransfer();
    }
    let gameLabs = _.filter(Game.structures, s => s.structureType == STRUCTURE_LAB);
    for(let lab of gameLabs) {
        lab.CreateMinerals();
    }
    let terminals = _.filter(Game.structures, s => s.structureType == STRUCTURE_TERMINAL);
    for (let terminal of terminals) {
        terminal.SellResources();
    }


    cpuCounter += Game.cpu.getUsed()
    if (Game.time % 1500 == 0) {
        cpuCounter = 0;
        tickCounter = 0;
        console.log('************RESET*************')
    }
    else {
        let avg = Math.round((cpuCounter / tickCounter) * 1000) / 1000;
        let burst = Math.round(Game.cpu.getUsed() * 1000) / 1000;
        if(avg > 28 || burst > 35)console.log(Game.time + ': [CPU burst: ' + burst + ' ] avg: [ ' + avg + ' ] last: ' + tickCounter + ' ticks   CPU Bucket: [ ' + Game.cpu.bucket + ' ]');
    }
};
//1225695: 1013
//1225795
