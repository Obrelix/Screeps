module.exports = function () {
    Structure.prototype.needsEnergy = function () {
        try {
            switch (this.structureType) {
                case STRUCTURE_SPAWN: if(this.energy < this.energyCapacity)
                    break;
                case STRUCTURE_EXTENSION:
                    break;
                case STRUCTURE_LINK:
                    break;
                case STRUCTURE_STORAGE:
                    break;
                case STRUCTURE_CONTAINER:
                    break;
                case STRUCTURE_LAB:
                    break;
                default:
                    break;
            }
            if (s.structureType == STRUCTURE_LINK && s.memory.from && s.energy < s.energyCapacity * 0.8) return true;
        } catch (e) {
            console.log(this.name + ' needsEnergy ' + e);
        }
        if (this.memory.from) {
            const linkTo = this.pos.findClosestByRange(FIND_MY_STRUCTURES,
                    { filter: s => s.structureType == STRUCTURE_LINK && !s.memory.from && s.energy < s.energyCapacity * 0.8 });
            if (linkTo != undefined) {
                if (this.energy <= linkTo.energyCapacity - linkTo.energy)
                    this.transferEnergy(linkTo, this.energy);
                else this.transferEnergy(linkTo, linkTo.energyCapacity - linkTo.energy);
            }
        }
    };
};