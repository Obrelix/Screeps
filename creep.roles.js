
require('Traveler');
module.exports = {

    farmer: function (creep) {
        if (creep.ticksToLive < 50) {
            creep.transferEnergyAndAbort();
            return;
        }
        if (creep.ifNotSafeGoHome()) return;
        else if (creep.goToTargetRoom()) return;
        creep.setWorkingState();
        if (creep.memory.working == true) {
            //console.log(';lalalal');
            creep.transferEnergy();
        }
        else {
            creep.findEnergy();
        }
    },
    
    miner: function (creep) {
        if (creep.ifNotSafeGoHome()) return;
        else if (creep.goToTargetRoom()) return;
        let source = Game.getObjectById(creep.memory.sourceId);
        if (source != undefined) {
            let container = source.pos.findInRange(FIND_STRUCTURES, 1, { filter: s => s.structureType == STRUCTURE_CONTAINER })[0];
            if (creep.pos.isEqualTo(container)) {
                creep.harvest(source);
            }
            else {
                creep.travelTo(container);
            }
        }
    },


    lorry: function (creep) {
        if (creep.ticksToLive < 20) {
            creep.transferEnergyAndAbort();
            return;
        }
        if (creep.ifNotSafeGoHome()) return;
        else if (creep.goToTargetRoom()) return;
        creep.setWorkingState();
        if (creep.memory.working == true)
            creep.transferEnergy();
        else
            creep.findEnergy();

    },

    /**
    @param {Creep} creep 
    */
    llorry: function (creep) {
        if (creep.ticksToLive < 20) {
            creep.transferEnergyAndAbort();
            return;
        }
        if (creep.ifNotSafeGoHome()) return;
        else if (creep.goToTargetRoom()) return;
        creep.setWorkingState();
        if (creep.memory.working == true)
            creep.transferResources();
        else
            creep.findResources();

    },

    /**
    @param {Creep} creep 
    */
    labLorry: function (creep) {
        if (creep.ticksToLive < 20) {
            creep.transferEnergyAndAbort();
            return;
        }
        creep.setWorkingState();
        //find if any reactor contains minerals
        let lab = creep.room.find(FIND_MY_STRUCTURES, {
            filter: s => s.structureType == STRUCTURE_LAB
                && s.memory.reactor && !s.memory.working && s.mineralAmount > 0
        })[0];

        if (lab != undefined) {
            if (creep.memory.working == true) creep.transferResources();
            else creep.emptyLab(lab);
        }
        else {
            //fill the empty labs with minerals
            lab = creep.room.find(FIND_MY_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_LAB
                    && s.memory.resource != undefined && !s.memory.working
                    && s.mineralAmount < s.mineralCapacity && s.room.terminal.store[s.memory.resource]> 0
            })[0];
            if (lab != undefined) {
                let resourceType = lab.memory.resource;
                if (creep.memory.working == true) creep.fillLab(lab, resourceType);
                else creep.findResource(resourceType);
            }
        }

    },

    extractor: function (creep) {
        if (creep.goToTargetRoom()) return;
        creep.setWorkingState();
        let source = Game.getObjectById(creep.memory.sourceId);
        if (creep.memory.working == true)creep.transferResources();
        else creep.harvestFromSource(source);
    },

    upgrader: function (creep) {
        if (creep.ticksToLive < 50) {
            creep.transferEnergyAndAbort();
            return;
        }
        if (creep.ifNotSafeGoHome()) return;
        else if (creep.goToTargetRoom()) return;
        creep.setWorkingState();
        if (creep.memory.working) creep.upgrade();
        else creep.findEnergy();
    },

    builder: function (creep) {

        if (creep.ticksToLive < 0) {
            creep.transferEnergyAndAbort(creep);
            return;
        }
        if (creep.ifNotSafeGoHome()) return;
        else if (creep.goToTargetRoom()) return;
        creep.setWorkingState();
        if (creep.memory.working) {
            if (!creep.findAndBuild()) creep.findAndRepair();
          
        }
        else {
            creep.findEnergy();
        }
    },

    repairer: function (creep) {
        if (creep.ticksToLive < 50) {
            creep.transferEnergyAndAbort();
            return;
        }
        if (creep.ifNotSafeGoHome()) return;
        else if (creep.goToTargetRoom()) return;
        creep.setWorkingState();

        if (creep.memory.working == true) {
            if (!creep.findAndRepair()) creep.findAndBuild();
        }
        else creep.findEnergy();
    },

    wallRepairer: function (creep) {
        if (creep.ticksToLive < 50) {
            creep.transferEnergyAndAbort();
            return;
        }
        if (creep.ifNotSafeGoHome()) return;
        else if (creep.goToTargetRoom()) return;
        creep.setWorkingState();
        if (creep.memory.working) {
            if (!creep.repairWalls()) creep.findAndBuild();
                
        }
        else {
            creep.findEnergy(creep);
        }
    },

    rampartRepairer: function (creep) {
        if (creep.ticksToLive < 50) {
            creep.transferEnergyAndAbort();
            return;
        }
        if (creep.ifNotSafeGoHome()) return;
        else if (creep.goToTargetRoom()) return;
        creep.setWorkingState();
        if (creep.memory.working) {
            if (!creep.repairRamarts()) creep.findAndBuild();

        }
        else {
            creep.findEnergy(creep);
        }
    },

    reserver: function (creep) {
        if (creep.ifNotSafeGoHome()) return;
        else if (creep.goToTargetRoom()) return;
        else creep.reserve();
    },

    LDFarmer: function (creep) {
        if (creep.ticksToLive < 50) {
            creep.transferEnergyAndAbort();
            return;
        }
        if (creep.ifNotSafeGoHome()) return;
        creep.setWorkingState();
        creep.memory.currentRole = 'LDFarmer';

        if (creep.memory.working == true) {
            if (creep.room.name == creep.memory.home)
                creep.transferEnergyToNearestAvailable();
            else if (creep.goToHomeRoom()) return;
        }
        else {
            if (creep.room.name == creep.memory.target)
                creep.findEnergy();
            else if (creep.goToTargetRoom()) return;
        }
    },

    LDLorry: function (creep) {
        if (creep.ticksToLive < 50) {
            creep.transferEnergyAndAbort();
            return;
        }
        if (creep.ifNotSafeGoHome()) return;
        creep.setWorkingState();
        creep.memory.currentRole = 'LDLorry';

        if (creep.memory.working == true) {
            if (creep.room.name == creep.memory.home)
                creep.transferEnergy();
            else if (creep.goToHomeRoom()) return;
        }
        else {
            if (creep.room.name == creep.memory.target)
                creep.findEnergy();
            else if (creep.goToTargetRoom()) return;
        }
    },

    claimer: function (creep) {
        if (creep.ifNotSafeGoHome()) return;
        else if (creep.goToTargetRoom()) return;
        else creep.claim();
    },

    hostileClaimer: function (creep) {
        //if (creep.ifNotSafeGoHome()) return;
        if (creep.goToTargetRoom()) return;
        else creep.attackHostileController();
    },

    bodyGuard: function (creep) {
        //creep.memory.target = 'W23N21';
        if (creep.goToTargetRoom()) return;
        if (creep.findCreepsAndAttack());
        //else if (creep.findStructuresAndAttack());
    },

    soldier: function (creep) {
        if (creep.goToTargetRoom()) return;
        if (creep.findStructuresAndAttack());
        else if (creep.findCreepsAndAttack());
        else {
            let exit = creep.room.pos.findClosestByPath(FIND_EXIT_TOP);
            if (exit != undefined) {
                creep.travelTo(exit);
            }
        }
    },
    lightSoldier: function (creep) {
        if (creep.goToTargetRoom()) return;
        if (creep.findCreepsAndAttack());
        else if (creep.findStructuresAndAttack());
        else {

        }
    },
    lorryLink: function (creep) {
        if (creep.goToTargetRoom()) return;
        if (creep.findCreepsAndAttack());
        else if (creep.findStructuresAndAttack());
    },
};
