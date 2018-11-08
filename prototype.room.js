
module.exports = function () {
    Room.prototype.CreateRoster = function (basicRoles) {
        let rosterMax = 0;
        let rosterCount = 0;
        let creeps = [];
        for (let i = 0; i < basicRoles.length; i++) {
            if (this.name == basicRoles[i].home) {
                let count = 0;
                if (basicRoles[i].role == 'miner') {
                    count = _.sum(Game.creeps, (c) =>
                        c.memory.role == basicRoles[i].role
                        && c.memory.target == basicRoles[i].target
                        && c.memory.home == basicRoles[i].home
                        && c.memory.sourceId == basicRoles[i].sourceId
                        && (c.ticksToLive > basicRoles[i].respawnTicks || c.ticksToLive == undefined));
                }
                else {
                    count = _.sum(Game.creeps, (c) =>
                        c.memory.role == basicRoles[i].role
                        && c.memory.target == basicRoles[i].target
                        && c.memory.home == basicRoles[i].home
                        && (c.ticksToLive > basicRoles[i].respawnTicks || c.ticksToLive == undefined));
                }
                creeps.push({
                    role: basicRoles[i].role,
                    home: basicRoles[i].home,
                    target: basicRoles[i].target,
                    sourceId: basicRoles[i].sourceId,
                    maxEnergyCost: (basicRoles[i].maxEnergyCost == 0)
                                    ? this.energyCapacityAvailable - (this.energyCapacityAvailable % 200)
                                    : basicRoles[i].maxEnergyCost,
                    respawnTicks: basicRoles[i].respawnTicks,
                    minValue: basicRoles[i].minValue,
                    count: count,
                    alertFlag: false,
                    alertTicks: 0
                });
                rosterMax += basicRoles[i].minValue;
                rosterCount += count;
            }
        }

        let targetRooms = [...new Set(creeps.map(item => item.target))];
        let hostilesNum = 0;
        for (let name of targetRooms) {
            let alertFlag = Game.rooms[name] != undefined && Game.rooms[name].find(FIND_HOSTILE_CREEPS).length > 0;
            let alertTicks = 0;
            if (alertFlag) {
                alertTicks = Game.rooms[name].find(FIND_HOSTILE_CREEPS)[0].ticksToLive;
                for (let i = 0; i < creeps.length; i++) {
                    if (creeps[i].target == name && creeps[i].role != 'soldier' && creeps[i].role != 'lightSoldier' && creeps[i].role != 'bodyGuard') {
                        creeps[i].alertFlag = true;
                        creeps[i].alertTicks = alertTicks;
                        creeps[i].minValue = 0;
                    }
                }
            }
        }
        let attackedRooms = [...new Set(creeps.filter(c => c.alertFlag == true).map(c => c.target))];
        for (let name of attackedRooms) {
            for (let i = 0; i < creeps.length; i++) {
                if (creeps[i].target == name) {
                    creeps.splice(0, 0, {
                        role: 'bodyGuard',
                        home: creeps[i].home,
                        target: creeps[i].target,
                        sourceId: '',
                        maxEnergyCost: 1500,
                        respawnTicks: 0,
                        minValue: 1,
                        count: _.sum(Game.creeps, (c) =>
                            (c.memory.role == 'bodyGuard' || c.memory.role == 'soldier' || c.memory.role == 'lightSoldier')
                            && c.memory.target == creeps[i].target
                            && (c.ticksToLive > 0 || c.ticksToLive == undefined)),
                        alertFlag: false,
                        alertTicks: 0
                    });
                    break;
                }
            }
        }

        let spawns = this.find(FIND_MY_STRUCTURES, { filter: s => s.structureType == STRUCTURE_SPAWN });
        let roomInfo = {
            spawns: spawns,
            energyMax: this.energyCapacityAvailable,
            energyNow: this.energyAvailable,
            creeps: creeps,
            rosterMax: rosterMax,
            rosterCount: rosterCount
        };

        for(let spawn of spawns) {
            spawn.printSpawnInfo();
            for (let i = 0; i < creeps.length; i++) {
                var creep = creeps[i];
                if (creep.count < creep.minValue){
                    if(roomInfo.energyNow >= creep.maxEnergyCost)spawn.spawnNextCreep(creep);
                    break;
                }
            }
        }
        this.printRoomInfo(roomInfo);
        if(Game.time%5 == 0)this.logRoomState(creeps);
    };

    Room.prototype.printRoomInfo = function (roomInfo) {
            let oi = roomInfo;
            this.visual.text(
                '👪 ' + oi.rosterCount + " / " + oi.rosterMax,
                this.controller.pos.x,
                this.controller.pos.y+1,
                { align: 'left', opacity: 0.6 });

            this.visual.text(
                '⚡ ' + oi.energyNow + " / " + oi.energyMax,
                this.controller.pos.x,
                this.controller.pos.y -1,
                { align: 'left', opacity: 0.6 });
        };
    
    Room.prototype.printSourcesInfo = function () {
        //let sources = this.find(FIND_SOURCES);
        //for (let source of sources) {
        //    this.visual.text(
        //        source.energy + ' - ' + source.ticksToRegeneration,
        //       Game.getObjectById(source.id).pos.x,
        //       Game.getObjectById(source.id).pos.y - 1,
        //       { align: 'left', opacity: 0.6 });
        //}

        let containers = this.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE });
        for (let container of containers) {
            let obj = Game.getObjectById(container.id);
            this.visual.text(
                obj.store[RESOURCE_ENERGY],
                obj.pos.x,
                obj.pos.y + 1,
                { align: 'left', opacity: 0.6 });
        }
    };

    Room.prototype.logRoomState = function (creeps) {
        let strMsg = '';
        /** @type: {Room}*/
        let storageEnergy = this.find(FIND_STRUCTURES, { filter: (s) =>  s.structureType == STRUCTURE_STORAGE })[0];
        strMsg = this;
        if (storageEnergy != undefined) strMsg += '   ⚡' + storageEnergy.store[RESOURCE_ENERGY];
        for (let i = 0; i < creeps.length; i++) {
            var creep = creeps[i];
            if (creep.count != creep.minValue) {
                strMsg += '\n' + creep.role + '_' + creep.target + ' :  ' + creep.count + ' / ' + creep.minValue;
                if (creep.alertFlag) strMsg += ' ⛔ ' + creep.alertTicks;
            }
        }
        console.log(strMsg);
    };
};