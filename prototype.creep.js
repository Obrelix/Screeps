
var creepRoles = require('creep.roles');
//require('prototype.creep.role');
module.exports = function () {
    Creep.prototype.runRole = function () {
        if (this.memory.role == undefined) this.memory.role = 'farmer';
        creepRoles[this.memory.role](this);
        //this.role[this.memory.role]();
    };

    Creep.prototype.setWorkingState = function () {

        if (this.memory.working == true && this.carry.energy == 0) {
            this.memory.working = false;
        }
        else if (this.memory.working == false && _.sum(this.carry)== this.carryCapacity) {
            this.memory.working = true;
        }
    };

    Creep.prototype.goToTargetRoom = function () {
        if (this.room.name != this.memory.target) {
            var exit = this.room.findExitTo(this.memory.target);
            this.moveTo(this.pos.findClosestByPath(exit));
            this.memory.job = 'goToTargetRoom';
            return true;
        }
    };

    Creep.prototype.goToHomeRoom = function () {
        if (this.room.name != this.memory.home) {
            var exit = this.room.findExitTo(this.memory.home);
            this.moveTo(this.pos.findClosestByRange(exit));
            this.memory.job = 'goToHomeRoom';
            return true;
        }
    };

    Creep.prototype.ifNotSafeGoHome = function () {
        if (this.room.name != this.memory.home && this.room.find(FIND_HOSTILE_CREEPS).length > 0
            && this.room.find(FIND_MY_CREEPS, { filter: c=> (c.memory.role == 'bodyGuard' || c.memory.role == 'soldier' || c.memory.role == 'lightSoldier') }).length == 0) {
            var exit = this.room.findExitTo(this.memory.home);
            this.moveTo(this.pos.findClosestByRange(exit));
            this.memory.job = 'NotSafeGoHome';
            return true;
        }
    };

    Creep.prototype.findEnergy = function () {

        let container = undefined;
        const target = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if (target != undefined && this.memory.role != 'lorry') {
            if (this.pickup(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
                return;
            }
        }
        let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
            filter: (s) => s.energy > 0
        });

        if (this.memory.role == 'lorry' || this.memory.role == 'LDLorry') {
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
        }
        else {
            container = this.pos.findClosestByPath(FIND_STRUCTURES,
                                                    {
                                                        filter: s => ((s.structureType == STRUCTURE_LINK && s.energy >= this.carryCapacity * 0.7 && !s.memory.from)
                                                                        || ((s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE)
                                                                            && s.store[RESOURCE_ENERGY] >= this.carryCapacity ))
                                                    });
        }

        if (container != undefined) {
            //if(this.memory.role == 'builder') console.log(this.withdraw(container, RESOURCE_ENERGY));
            if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(container);
            }
        }
        else if (this.memory.role != 'lorry' && this.memory.role != 'LDLorry') {
            if (this.harvest(source) == ERR_NOT_IN_RANGE) {
                this.moveTo(source);
            }
        }

        this.memory.job = 'findEnergy';
    };

    Creep.prototype.upgrade = function () {

        let blockedCreep = this.room.find(FIND_MY_CREEPS, {
            filter: (s) => s != this &&
                           this.pos.getRangeTo(s) < 2 &&
                           s.pos.getRangeTo(s.room.controller) > this.pos.getRangeTo(this.room.controller)
        });
        let targetPos = this.room.controller.pos;
        if (this.upgradeController(this.room.controller) == OK && blockedCreep != undefined) {
            //moveTo(this, targetPos);
            this.moveTo(this.room.controller);
        }
        else if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
            //moveTo(this, targetPos);
            this.moveTo(this.room.controller);
        }

        this.memory.job = 'upgrade';
    };

    Creep.prototype.findAndBuild = function () {
        let constructionSite = this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (constructionSite != undefined) {
            if (this.build(constructionSite) == ERR_NOT_IN_RANGE) {
                this.moveTo(constructionSite);
            }
            this.memory.job = 'build';
            return true;
        }
        else return false;

    };

    Creep.prototype.findCreepsAndAttack = function () {
        let hostile = this.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (hostile != undefined) {
            if (this.attack(hostile) == ERR_NOT_IN_RANGE) {
                this.moveTo(hostile);

            }
            this.memory.job = 'attacking: ' + hostile;
            return true;
        }
        else return false;

    };

    Creep.prototype.findStructuresAndAttack = function () {
        let hostile = this.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: s => s.structureType == STRUCTURE_TOWER });
        if (hostile == undefined) hostile = this.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: s => s.structureType == STRUCTURE_SPAWN });
        if (hostile == undefined) hostile = this.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: s => s.structureType != STRUCTURE_CONTROLLER && s.structureType != STRUCTURE_STORAGE });
        if (hostile == undefined) hostile = this.pos.findClosestByPath(FIND_STRUCTURES, { filter: s => s.structureType == STRUCTURE_WALL && s.hits < 10000 });
        if (hostile != undefined) {
            if (this.attack(hostile) == ERR_NOT_IN_RANGE) {
                this.moveTo(hostile);

            }
            this.memory.job = 'attacking: ' + hostile;
            return true;
        }
        else return false;

    };

    Creep.prototype.findAndRepair = function () {
        let structure = this.pos.findClosestByPath(FIND_STRUCTURES,
                                                    {
                                                        filter: (s) => s.hits < 100000
                                                                       && s.hits < s.hitsMax
                                                    });
        if (structure != undefined) {
            if (this.repair(structure) == ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
            }
            this.memory.job = 'repair';
            return true;
        }
        else return false;
    };

    Creep.prototype.repairWalls = function () {
        let walls = this.room.find(FIND_STRUCTURES,
                                    {
                                        filter: (s) => s.structureType == STRUCTURE_WALL
                                            || s.structureType == STRUCTURE_RAMPART
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
                this.moveTo(target);
            }
            this.memory.job = 'repairWalls';
            return true;
        }
        else return false;
    };

    Creep.prototype.transferEnergy = function () {
        let structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES,{
        filter: (s) => ((s.structureType == STRUCTURE_SPAWN
                            || s.structureType == STRUCTURE_EXTENSION
                            || (s.structureType == STRUCTURE_LINK && s.memory.from && this.memory.role != 'lorry'))
                            && s.energy < s.energyCapacity )});
        if (structure == undefined) {
            structure = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity * 0.7)});
        }
        if (structure == undefined) {
            structure = this.pos.findClosestByPath(FIND_STRUCTURES,{filter: (s) => (s.structureType == STRUCTURE_STORAGE)});
       
        }
        if (structure != undefined) {
            if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
            }
        }
        this.memory.job = 'transferEnergy';
    };

    Creep.prototype.transferEnergyToNearestAvailable = function () {

        let freeCreep = this.pos.findClosestByPath(FIND_MY_CREEPS,
               {
                   filter: (s) => (s.carryCapacity * 0.8 > s.carry.energy
                                    && s != this
                                    && s.memory.role != this.memory.role
                                    && s.memory.role != 'miner'
                                    && s.memory.role != 'lorry'
                                    && s.memory.role != 'LDLorry'
                                    && s.memory.role != 'LDFarmer'
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
                this.moveTo(structure);
            }
        }
        else if (freeCreep != undefined) {

            if (this.transfer(freeCreep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(freeCreep);
                freeCreep.moveTo(this);
                //console.log(this + "  👉 " + freeCreep);
            }
            else {
                freeCreep.memory.working = true;
                //console.log(this + " ⇒ " + freeCreep);
            }
        }
        else {

            if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                this.moveTo(this.room.controller);
            }
        }
        this.memory.job = 'transferEnergyToNearestAvailable';
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
            && this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.moveTo(structure);
        else if (freeCreep != undefined && (this.transfer(freeCreep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
            this.moveTo(freeCreep);
            freeCreep.moveTo(this);
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

            this.moveTo(controller);
        }
        this.memory.job = 'attackHostileController';
    };

    Creep.prototype.claim = function () {
        var controller = this.room.controller;
        if (this.claimController(controller) == ERR_NOT_IN_RANGE) {
            this.moveTo(controller);
        }
        this.memory.job = 'claim';
    };

    Creep.prototype.reserve = function () {
        this.memory.job = 'reserve';
        var controller = this.room.controller;
        if (this.reserveController(controller) == ERR_NOT_IN_RANGE) {
            this.moveTo(controller);
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
