

module.exports = function () {
    StructureLab.prototype.CreateMinerals = function () {
        if (this.cooldown == 0 && this.memory.reactor && this.memory.childIDs) {
            let lab0 = Game.getObjectById(this.memory.childIDs[0]);
            let lab1 = Game.getObjectById(this.memory.childIDs[1]);
            let blnLab0Ready = lab0.mineralAmount > 0;
            let blnLab1Ready = lab1.mineralAmount > 0;
            let blnSameAmount = lab1.mineralAmount == lab0.mineralAmount;
            let blnThisReady = this.mineralAmount < this.mineralCapacity;
            if (blnLab0Ready && blnLab1Ready && blnThisReady && blnSameAmount) {
                this.memory.working = true;
                lab0.memory.working = true;
                lab1.memory.working = true;
                this.runReaction(lab0, lab1);
            }
            else {
                this.memory.working = false;
                lab0.memory.working = false;
                lab1.memory.working = false;
            }

        }
    };
};