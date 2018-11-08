
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
                creep.moveTo(container);
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
        if (creep.memory.working == true) creep.transferEnergy();
        else creep.findEnergy();

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
        else if (creep.findStructuresAndAttack());
    },

    soldier: function (creep) {
        if (creep.goToTargetRoom()) return;
        if (creep.findStructuresAndAttack());
        else if (creep.findCreepsAndAttack());
        else {
            console.log(creep.room.pos.findClosestByPath(FIND_EXIT_TOP));
            let exit = creep.room.pos.findClosestByPath(FIND_EXIT_TOP);
            if (exit != undefined) {
                creep.moveTo(exit);
            }
        }
    },
    lightSoldier: function (creep) {
        //creep.memory.target = 'W25N23';
        if (creep.goToTargetRoom()) return;
        if (creep.findCreepsAndAttack());
        else if (creep.findStructuresAndAttack());
        else {
            //creep.moveTo(34,4);
            //console.log(creep.room.pos.findClosestByPath(FIND_EXIT_TOP));
            //let exit = creep.room.pos.findClosestByPath(FIND_EXIT_TOP);

            //var exit = creep.room.findExitTo('W26N23');
            ////console.log(exit);
            //if (exit != undefined) {
            //    
            //}
        }
    },
    lorryLink: function (creep) {
        if (creep.goToTargetRoom()) return;
        if (creep.findCreepsAndAttack());
        else if (creep.findStructuresAndAttack());
    },

};
