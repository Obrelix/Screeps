

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
};