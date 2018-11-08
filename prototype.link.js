

module.exports = function () {
    StructureLink.prototype.findAndTransfer = function () {
        if (this.memory.from) {
            const linkTo = this.pos.findClosestByRange(FIND_MY_STRUCTURES,
                    { filter: s => s.structureType == STRUCTURE_LINK && !s.memory.from && s.energy < s.energyCapacity* 0.8 });
            if (linkTo != undefined ) {
                if (this.energy <= linkTo.energyCapacity - linkTo.energy)
                    this.transferEnergy(linkTo, this.energy);
                else this.transferEnergy(linkTo, linkTo.energyCapacity - linkTo.energy);
            }

        }
    };

    //StructureLink.prototype.repairStructures = function () {
    //    let structure = this.pos.findClosestByRange(FIND_STRUCTURES,
    //                                                {
    //                                                    filter: (s) => s.hits < 100000
    //                                                                   && s.hits < s.hitsMax
    //                                                });
    //    if (structure != undefined) this.repair(structure)
    //    return (structure != undefined);
    //};

    //StructureLink.prototype.healCreeps = function () {
    //    let creep = this.pos.findClosestByRange(FIND_MY_CREEPS, { filter: (s) =>  s.hits < s.hitsMax });
    //    if (creep != undefined) this.heal(creep)
    //    return (creep != undefined);
    //};

};