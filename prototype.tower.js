

module.exports = function () {
    StructureTower.prototype.defend = function () {
        let target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            this.attack(target);
           
        }
        return (target != undefined);
    };
    
    StructureTower.prototype.repairStructures = function () {
        let maxHitPoints = this.room.memory.maxWallHitPoints;
        let structure = this.pos.findClosestByRange(FIND_STRUCTURES,
                                                    {
                                                        filter: (s) => s.hits <= maxHitPoints
                                                                       && s.hits < s.hitsMax
                                                                       && s.structureType != STRUCTURE_WALL
                                                                       //&& s.structureType != STRUCTURE_RAMPART
                                                    });
        if (structure != undefined) this.repair(structure) 
        return (structure != undefined);
    };

    StructureTower.prototype.healCreeps = function () {
        let creep = this.pos.findClosestByRange(FIND_MY_CREEPS,{filter: (s) =>  s.hits < s.hitsMax});
        if (creep != undefined) this.heal(creep)
        return (creep != undefined);
    };

};