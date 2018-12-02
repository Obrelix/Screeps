
require('prototype.room')();
var creepRoles = require('creep.roles');
//require('prototype.creep.role');
module.exports = function () {
    Creep.prototype.runRole = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            if (this.memory.role === undefined) {
                this.suicide();
                return;
            }
            creepRoles[this.memory.role](this);
        } catch (e) {
            console.log(this.name + ' runRole ' + this.memory.role +'   '+ e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //if(elapsed > 1)console.log(this.name + ' runRole has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.setWorkingState = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let blnCarryMinerals = (this.memory.role == 'llorry' || this.memory.role == 'extractor' || this.memory.role == 'labLorry');
            let carryAmount = (blnCarryMinerals) ? _.sum(this.carry) : this.carry.energy;
            if (this.memory.working == true && carryAmount == 0) {
                this.memory.working = false;
            }
            else if (this.memory.working == false && _.sum(this.carry) == this.carryCapacity) {
                this.memory.working = true;
            }
        } catch (e) {
            console.log(this.name + ' setWorkingState ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' runRole has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.goToTargetRoom = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let targetRoom = Game.rooms[this.memory.target];
            if (this.room.name != this.memory.target) {
                if (targetRoom != undefined
                    && targetRoom.memory.isUnsafe
                    && this.memory.attack == false) return;
                var exit = this.room.findExitTo(this.memory.target);
                this.travelTo(this.pos.findClosestByPath(exit));
                this.memory.job = 'goToTargetRoom';
                return true;
            }
        } catch (e) {
            console.log(this.name + ' goToTargetRoom ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' goToTargetRoom has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.goToHomeRoom = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            if (this.room.name != this.memory.home) {
                let exit = this.pos.findClosestByPath(this.room.findExitTo(this.memory.home));
                this.travelTo(exit);
                this.memory.job = 'goToHomeRoom';
                return true;
            }
            else return false;
        } catch (e) {
            console.log(this.name + ' goToTargetRoom ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' goToHomeRoom has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.ifNotSafeGoHome = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let targetRoom = Game.rooms[this.memory.target];

            if (targetRoom != undefined && targetRoom.memory.isUnsafe && targetRoom.controller != undefined && targetRoom.controller.level == 0) {

                //console.log(this.name + ' NotSafeGoHome ');
                if (this.goToHomeRoom());
                this.memory.job = 'NotSafeGoHome';

                return true;
            }
            else return false;
        } catch (e) {
            console.log(this.name + ' NotSafeGoHome ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' ifNotSafeGoHome has used ' + elapsed + ' CPU time');
        }

    };

    Creep.prototype.findEnergy = function () {
        //const startCpu = Game.cpu.getUsed();
        try {

            let container = undefined;
            const target = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (target != undefined) {
                if (this.pickup(target) == ERR_NOT_IN_RANGE) {
                    this.travelTo(target);
                    return;
                }
            }
            let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
                filter: (s) => s.energy > 0
            });

            if (this.memory.role == 'lorry') {
                container = this.pos.findClosestByPath(FIND_STRUCTURES,
                                                        {
                                                            filter: s => (s.structureType == STRUCTURE_CONTAINER 
                                                                            && s.store[RESOURCE_ENERGY] >= this.carryCapacity )
                                                        });
                if (container == undefined) {
                    container = this.pos.findClosestByPath(FIND_STRUCTURES,
                                                        {
                                                            filter: s => (s.structureType == STRUCTURE_STORAGE
                                                                            && s.store[RESOURCE_ENERGY] >= this.carryCapacity)
                                                        });
                }
                if (container == undefined) {
                    container = this.pos.findClosestByPath(FIND_STRUCTURES,
                                                        {
                                                            filter: s => (s.structureType == STRUCTURE_TERMINAL
                                                                            && s.store[RESOURCE_ENERGY] >= 150000)
                                                        });
                }
            }
            else {
                container = this.pos.findClosestByPath(FIND_STRUCTURES,
                                                        {
                                                            filter: s => ((s.structureType == STRUCTURE_LINK && s.energy >= this.carryCapacity * 0.7 && !s.memory.from)
                                                                            || ((s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_TERMINAL)
                                                                                && s.store[RESOURCE_ENERGY] >= this.carryCapacity ))
                                                        });
            }

            if (container != undefined) {
                if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    if (_.sum(this.carry) > this.carryCapacity * 0.75) {
                        this.memory.working = true;
                        return;
                    }
                    this.travelTo(container);
                }
            }
            else if (this.memory.role != 'lorry' && this.memory.role != 'LDLorry') {
                if (this.harvest(source) == ERR_NOT_IN_RANGE) {
                    if (_.sum(this.carry) > this.carryCapacity * 0.75) {
                        this.memory.working = true;
                        return;
                    }
                    this.travelTo(source);
                }
            }

            this.memory.job = 'findEnergy';
        } catch (e) {
            console.log(this.name + ' findEnergy ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' findEnergy has used ' + elapsed + ' CPU time');
        }

    };
   
    Creep.prototype.harvestFromSource = function (source) {
        //const startCpu = Game.cpu.getUsed();
        try {
            if (source != undefined) {
                if (this.harvest(source) == ERR_NOT_IN_RANGE) {
                    this.travelTo(source);
                }
            }
            this.memory.job = 'harvestFromSource' + source;
        } catch (e) {
            console.log(this.name + ' harvestFromSource ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' harvestFromSource has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.upgrade = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let controller = this.room.controller;
            if (this.pos.getRangeTo(controller) > 2 || this.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                this.travelTo(controller);
            }

            this.memory.job = 'upgrade';
        } catch (e) {
            console.log(this.name + ' goToTargetRoom ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' upgrade has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.findAndBuild = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let constructionSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite != undefined) {
                if (this.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    this.travelTo(constructionSite);
                }
                this.memory.job = 'build';
                return true;
            }
        else return false;
        } catch (e) {
            console.log(this.name + ' goToTargetRoom ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' findAndBuild has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.findCreepsAndAttack = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let hostile = this.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            if (hostile != undefined) {
                if (this.attack(hostile) == ERR_NOT_IN_RANGE) {
                    this.travelTo(hostile);

                }
                this.memory.job = 'attacking: ' + hostile;
                return true;
            }
            else return false;
        } catch (e) {
            console.log(this.name + ' goToTargetRoom ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' findCreepsAndAttack has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.findStructuresAndAttack = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let hostile = this.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: s => s.structureType == STRUCTURE_TOWER });
            if (hostile == undefined) hostile = this.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: s => s.structureType == STRUCTURE_SPAWN });
            if (hostile == undefined) hostile = this.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: s => s.structureType != STRUCTURE_CONTROLLER && s.structureType != STRUCTURE_STORAGE });
            if (hostile == undefined) hostile = this.pos.findClosestByPath(FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_WALL && s.hits < 10000 });
            if (hostile != undefined) {
                if (this.attack(hostile) == ERR_NOT_IN_RANGE) {
                    this.travelTo(hostile);

                }
                this.memory.job = 'attacking: ' + hostile;
                return true;
            }
        else return false;
        } catch (e) {
            console.log(this.name + ' goToTargetRoom ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' findStructuresAndAttack has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.findAndRepair = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let maxHitPoints = this.room.memory.maxWallHitPoints;
            let structure = this.pos.findClosestByRange(FIND_STRUCTURES,
                                                        {
                                                            filter: (s) => s.hits < maxHitPoints
                                                                           && s.hits < s.hitsMax
                                                        });
            if (structure != undefined) {
                if (this.repair(structure) == ERR_NOT_IN_RANGE) {
                    this.travelTo(structure);
                }
                this.memory.job = 'repair ' + structure.structureType;
                return true;
            }
            else return false;
        } catch (e) {
            console.log(this.name + ' goToTargetRoom ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' findAndRepair has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.repairWalls = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let walls = this.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
                    && s.hits < 2000000
                });

            let target = undefined;

            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                for (let wall of walls) {
                    if (wall.hits / wall.hitsMax < percentage) {
                        target = wall;
                        break;
                    }
                }

                if (target != undefined) {
                    break;
                }
            }

            if (target != undefined) {
                if (this.repair(target) == ERR_NOT_IN_RANGE) {
                    this.travelTo(target);
                }
                this.memory.job = 'repairWalls';
                return true;
            }
            else return false;
        } catch (e) {
            console.log(this.name + ' goToTargetRoom ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' repairWalls has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.repairRamarts = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let walls = this.room.find(FIND_STRUCTURES,{
                filter: (s) =>  s.structureType == STRUCTURE_RAMPART
                    //&& s.hits < 2000000
                });

            let target = undefined;

            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001) {
                for (let wall of walls) {
                    if (wall.hits / wall.hitsMax < percentage) {
                        target = wall;
                        break;
                    }
                }

                if (target != undefined) {
                    break;
                }
            }

            if (target != undefined) {
                if (this.repair(target) == ERR_NOT_IN_RANGE) {
                    this.travelTo(target);
                }
                this.memory.job = 'repairWalls';
                return true;
            }
            else return false;
        } catch (e) {
            console.log(this.name + ' goToTargetRoom ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' repairRamarts has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.transferEnergy = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let structure ;
            if (this.memory.role == 'lorry') {
                structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_LINK
                                    && this.pos.inRangeTo(s, 6) && s.energy < s.energyCapacity)
                });
                if (structure == undefined) {
                    structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => ((s.structureType == STRUCTURE_SPAWN
                                            || s.structureType == STRUCTURE_EXTENSION)
                                            && s.energy < s.energyCapacity)
                                            || (s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity * 0.7)
                    });
                }
            }
            else {
                structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => ((s.structureType == STRUCTURE_SPAWN
                                        || s.structureType == STRUCTURE_EXTENSION)
                                        && s.energy < s.energyCapacity)
                                        || (s.structureType == STRUCTURE_LINK && s.memory.from && s.energy < s.energyCapacity)
                                        || (s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity * 0.7)
                                        || (s.structureType == STRUCTURE_STORAGE && _.sum(s.store) < 1000000)

                });
            }
            if (structure == undefined) {
                structure = this.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_LAB && s.energy < s.energyCapacity) });
       
            }
            if (structure == undefined) {
                structure = this.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_NUKER && s.energy < s.energyCapacity) });

            }
            if (structure == undefined) {
                structure = this.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_STORAGE && _.sum(s.store) < s.storeCapacity) });

            }

            if (structure == undefined) {
                structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_TERMINAL && _.sum(s.store) < s.storeCapacity)
                });
            }

            if ( _.sum(this.carry) > this.carry.energy){
                structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => ((s.structureType == STRUCTURE_TERMINAL||s.structureType == STRUCTURE_STORAGE) && _.sum(s.store) < s.storeCapacity)
                });
            }
            if (structure != undefined) {
                if (structure.structureType == STRUCTURE_LAB || structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_TERMINAL) {
                    if (this.pos.getRangeTo(structure) > 1) {
                        this.travelTo(structure);
                    }
                    else {
                        for (let resourceType in this.carry) {
                            this.transfer(structure, resourceType);
                        }
                    }
                }
                else{
                    if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.travelTo(structure);
                    }
                }
                }
            this.memory.job = 'transferEnergy';
        }
        catch (e) {
            console.log(this.name + ' transferEnergy ' + e);
        }
        finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' transferEnergy has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.transferResources = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let structure;
            structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TERMINAL && _.sum(s.store) < s.storeCapacity});
            if (structure == undefined) {
                structure = this.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_STORAGE && _.sum(s.store) < s.storeCapacity)});
            }
            if (structure != undefined) {
                if (this.pos.getRangeTo(structure) > 1) {
                    this.travelTo(structure);
                }
                else {
                    for (let resourceType in this.carry) {
                        this.transfer(structure, resourceType);
                    }
                }
            }
            this.memory.job = 'transfer Resources to' + structure;
        } catch (e) {
            console.log(this.name + ' transferResources ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' transferResources has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.findResources = function () {
        //const startCpu = Game.cpu.getUsed();
        try {

            let structure = undefined;
            const target = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (target != undefined) {
                if (this.pickup(target) == ERR_NOT_IN_RANGE) {
                    this.travelTo(target);
                    return;
                }
            }

            structure = this.pos.findClosestByPath(FIND_STRUCTURES,
                                                    {
                                                        filter: s => (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] != _.sum(s.store)
                                                                        && _.sum(s.store) >= this.carryCapacity)
                                                    });
            if (structure == undefined) {
                structure = this.pos.findClosestByPath(FIND_STRUCTURES,
                                                    {
                                                        filter: s => (s.structureType == STRUCTURE_STORAGE
                                                                        && _.sum(s.store) >= this.carryCapacity)
                                                    });
            }

            let blnTerminalFullOFEnergy = (this.room.terminal && this.room.terminal.store[RESOURCE_ENERGY] > 100000);
            let blnStorageIsNearEmpty = (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] < 400000);
            if (structure != undefined) {
                if (this.pos.getRangeTo(structure) > 1) {
                    this.travelTo(structure);
                }
                else {
                    for (let resourceType in structure.store) {
                        if (resourceType == RESOURCE_ENERGY && (blnTerminalFullOFEnergy || blnStorageIsNearEmpty) )continue;
                       this.withdraw(structure, resourceType);
                    }
                }
            }

            this.memory.job = 'findResources ' + structure;
        } catch (e) {
            console.log(this.name + ' findResources ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' findResources has used ' + elapsed + ' CPU time');
        }

    };

    Creep.prototype.findResource = function (resourceType) {
        //const startCpu = Game.cpu.getUsed();
        try {

            let structure = undefined;

            structure = this.pos.findClosestByPath(FIND_STRUCTURES,{filter: s => (s.structureType == STRUCTURE_TERMINAL)});

            if (structure != undefined) {
                if (this.withdraw(structure, resourceType) == ERR_NOT_IN_RANGE) {
                    this.travelTo(structure);
                }
            }

            this.memory.job = 'findResource ' + resourceType;
        } catch (e) {
            console.log(this.name + ' findEnergy ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' findResource has used ' + elapsed + ' CPU time');
        }

    };

    Creep.prototype.fillLab = function (lab, resourceType) {
        //const startCpu = Game.cpu.getUsed();
        try {
            if (this.carry[resourceType] == undefined && _.sum(this.carry) > 0) {
                this.transferResources();
                return;
            }
            if (lab != undefined) {
                if (this.transfer(lab, resourceType) == ERR_NOT_IN_RANGE) {
                    this.travelTo(lab);
                }
            }

            this.memory.job = 'fillLab ' +lab + ' ' + resourceType;
        } catch (e) {
            console.log(this.name + ' fillLab ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' fillLab has used ' + elapsed + ' CPU time');
        }

    };

    Creep.prototype.emptyLab = function (lab) {
        //const startCpu = Game.cpu.getUsed();
        try {

            if (lab != undefined) {
                if (this.pos.getRangeTo(lab) > 1) {
                    this.travelTo(lab);
                }
                else {
                    this.withdraw(lab, lab.mineralType);
                }
            }
            this.memory.job = 'emptyLab ' + lab;
        } catch (e) {
            console.log(this.name + ' emptyLab ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' emptyLab has used ' + elapsed + ' CPU time');
        }

    };

    Creep.prototype.transferEnergyToNearestAvailable = function () {
        //const startCpu = Game.cpu.getUsed();
        try {
            let freeCreep = this.pos.findClosestByPath(FIND_MY_CREEPS,
                   {
                       filter: (s) => (s.carryCapacity * 0.8 > s.carry.energy
                                        && s != this
                                        && s.memory.role != this.memory.role
                                        && s.memory.role != 'miner'
                                        && s.memory.role != 'lorry'
                                        && s.memory.role != 'LDLorry'
                                        && s.memory.role != 'LDFarmer'
                                        && s.memory.role != 'extractor'
                                        && this.pos.getRangeTo(s) < 7)
                   });
            let structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => ((s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity * 0.8)
                             || (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_LINK)
                             && s.energy < s.energyCapacity)
            });

            if (structure == undefined) {
                structure = this.pos.findClosestByPath(FIND_STRUCTURES,
                {
                    filter: (s) => (s.structureType == STRUCTURE_STORAGE)
                });
            }
            let creepDistance = 0;
            let structureDistance = 0;
            if (freeCreep != undefined && structure != undefined) {
                creepDistance = this.pos.getRangeTo(freeCreep);
                structureDistance = this.pos.getRangeTo(structure);
            }

            if (freeCreep == undefined && structure != undefined || creepDistance > structureDistance) {
                if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.travelTo(structure);
                }
            }
            else if (freeCreep != undefined) {

                if (this.transfer(freeCreep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.travelTo(freeCreep);
                    freeCreep.travelTo(this);
                    //console.log(this + "  👉 " + freeCreep);
                }
                else {
                    freeCreep.memory.working = true;
                    //console.log(this + " ⇒ " + freeCreep);
                }
            }
            else {

                if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                    this.travelTo(this.room.controller);
                }
            }
            this.memory.job = 'transferEnergyToNearestAvailable';
        } catch (e) {
            console.log(this.name + ' goToTargetRoom ' + e);
        } finally {
            //const elapsed = Game.cpu.getUsed() - startCpu;
            //console.log(this.name + ' goToTargetRoom has used ' + elapsed + ' CPU time');
        }
    };

    Creep.prototype.transferEnergyAndAbort = function () {

        if (this.carry.energy == 0) this.suicide();
        let freeCreep = this.pos.findClosestByPath(FIND_MY_CREEPS,
               {
                   filter: (s) => (s!= this && s.carryCapacity > s.carry.energy)
               });
        let structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (
                         (s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity * 0.8)
                         || (s.structureType == STRUCTURE_SPAWN
                         || s.structureType == STRUCTURE_EXTENSION
                         || s.structureType == STRUCTURE_LINK)
                         && s.energy < s.energyCapacity)
        });

        if (structure == undefined) {
            structure = this.pos.findClosestByPath(FIND_STRUCTURES,
            {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE)
            });
        }
        let creepDistance = 0;
        let structureDistance = 0;
        if (freeCreep != undefined && structure != undefined) {
            creepDistance = this.pos.getRangeTo(freeCreep);
            structureDistance = this.pos.getRangeTo(structure);
        }

        if (freeCreep == undefined && structure != undefined || creepDistance > structureDistance 
            && this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.travelTo(structure);
        else if (freeCreep != undefined && (this.transfer(freeCreep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
            this.travelTo(freeCreep);
            freeCreep.travelTo(this);
        }
        this.memory.job = 'transferEnergyAndAbort';
    };

    //Creep.prototype.moveTo = function () {
    //    let path = this.room.findPath(this.pos, targetPos, { maxOps: 200 });
    //    if (!path.length || !targetPos.isEqualTo(path[path.length - 1])) {
    //        path = this.room.findPath(this.pos, targetPos, {
    //            maxOps: 1000, ignoreDestructibleStructures: true
    //        });
    //    }
    //    if (path.length) {
    //        this.move(path[0].direction);
    //    }
    //    this.memory.job = 'moveTo';
    //};
    Creep.prototype.attackHostileController = function () {
        var controller = this.room.controller;
        if (this.attackController(controller) == ERR_NOT_IN_RANGE) {

            this.travelTo(controller);
        }
        this.memory.job = 'attackHostileController';
    };

    Creep.prototype.claim = function () {
        var controller = this.room.controller;
        if (this.claimController(controller) == ERR_NOT_IN_RANGE) {
            this.travelTo(controller);
        }
        this.memory.job = 'claim';
    };

    Creep.prototype.reserve = function () {
        this.memory.job = 'reserve';
        var controller = this.room.controller;
        if (this.reserveController(controller) == ERR_NOT_IN_RANGE) {
            this.travelTo(controller);
        }
    };

    Creep.prototype.printCreepsInfo = function () {
        if (this.ticksToLive < 200) {
            room.visual.text(
               '☠ ' + this.ticksToLive,
               this.pos.x + 1,
               this.pos.y,
               { align: 'left', opacity: 0.5 });
        }
    };
        
};
