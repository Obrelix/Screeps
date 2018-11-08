
module.exports = function () {
    
    StructureSpawn.prototype.spawnACreep =
        function (energy, cr) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) body.push(WORK);
            for (let i = 0; i < numberOfParts; i++) body.push(CARRY);
            for (let i = 0; i < numberOfParts; i++) body.push(MOVE);
            return this.spawnCreep(body, cr.role + '_' + cr.target + '_' + Game.time, {
                memory: {
                    role: cr.role,
                    currentRole: cr.role,
                    target: cr.target,
                    home: cr.home,
                    sourceId: cr.sourceId,
                    working: false
                }
            });
        };

    StructureSpawn.prototype.spawnLDFarmer =
        function (energy, cr, sourceIndex) {

            let workPartNum = Math.floor(Math.floor(energy / 200) / 1.5);
            if(workPartNum > 6) workPartNum = 6
            let body = [];
            for (let i = 0; i < workPartNum; i++)body.push(WORK);
            energy -= 150 * workPartNum;
            let numberOfParts = Math.floor(energy / 100);
            for (let i = 0; i < numberOfParts; i++) body.push(CARRY);
            for (let i = 0; i < numberOfParts + workPartNum; i++) body.push(MOVE);

            return this.spawnCreep(body, cr.role + '_' + cr.target + '_' + Game.time, {
                memory: {
                    role: cr.role,
                    currentRole: cr.role,
                    home: cr.home,
                    target: cr.target,
                    sourceId: cr.sourceId,
                    working: false
                }
            });
        };

    StructureSpawn.prototype.spawnClaimer =
        function (cr) {
            return this.spawnCreep(
                [CLAIM, MOVE],
                cr.role + '_' + cr.target + '_' + Game.time,
                {
                    memory: {
                        home: cr.home,
                        role: cr.role,
                        target: cr.target,
                        sourceId: cr.sourceId
                    }
                });
        };

    StructureSpawn.prototype.spawnReserver=
        function (cr) {
            return this.spawnCreep(
                [CLAIM, CLAIM, MOVE, MOVE],
                cr.role + '_' + cr.target + '_' + Game.time,
                {
                    memory: {
                        home: cr.home,
                        role: cr.role,
                        target: cr.target,
                        sourceId: cr.sourceId
                    }
                });
        };

    StructureSpawn.prototype.spawnHostileClaimer =
        function (cr) {
            return this.spawnCreep(
                [CLAIM, CLAIM, MOVE, MOVE, MOVE, MOVE],
                cr.role + '_' + cr.target + '_' + Game.time,
                {
                    memory: {
                        home: cr.home,
                        role: cr.role,
                        target: cr.target,
                        sourceId: cr.sourceId
                    }
                });
        };

    StructureSpawn.prototype.spawnMiner =
        function (energy,cr) {
            let body = [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE];
            return this.spawnCreep(
                body,
                cr.role + '_' + cr.target + '_' + Game.time,
                {
                    memory: {
                        home: cr.home,
                        role: cr.role,
                        target: cr.target,
                        sourceId: cr.sourceId
                    }
                });
        };

    StructureSpawn.prototype.spawnLorry =
        function (energy, cr) {
            var numberOfParts = Math.floor(energy / 150);
            var body = [];
            for (let i = 0; i < numberOfParts * 2; i++) body.push(CARRY);
            for (let i = 0; i < numberOfParts; i++) body.push(MOVE);
            return this.spawnCreep(body, cr.role + '_' + cr.target + '_' + Game.time, {
                memory: {
                    role: cr.role,
                    currentRole: cr.role,
                    target: cr.target,
                    home: cr.home,
                    working: false
                }
            });
        };

    StructureSpawn.prototype.spawnLDLorry =
        function (energy, cr) {

            let workPartNum = 0;
            // create a body with the specified number of WORK parts and one MOVE part per non-MOVE part
            let body = [];
            let numberOfParts = Math.floor(energy / 100);
            for (let i = 0; i < numberOfParts*2; i++) body.push(CARRY);
            for (let i = 0; i < numberOfParts; i++) body.push(MOVE);

            // create cr with the created body
            return this.spawnCreep(body, cr.role + '_' + cr.target + '_' + Game.time, {
                memory: {
                    role: cr.role,
                    currentRole: cr.role,
                    home: cr.home,
                    target: cr.target,
                    sourceId: cr.sourceId,
                    working: false
                }
            });
        };

    StructureSpawn.prototype.spawnBodyGuard =
        function (energy, cr) {
            var numberOfParts = Math.floor(energy / 155);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) body.push(TOUGH);
            for (let i = 0; i < numberOfParts; i++) body.push(ATTACK);
            for (let i = 0; i < numberOfParts * 1.5; i++) body.push(MOVE);
            return this.spawnCreep(body, cr.role + '_' + cr.target + '_' + Game.time, {
                memory: {
                    role: cr.role,
                    currentRole: cr.role,
                    target: cr.target,
                    home: cr.home,
                    working: false
                }
            });
        };
    StructureSpawn.prototype.spawnLightSoldier =
        function (energy, cr) {
            var numberOfParts = Math.floor(energy / 180);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) body.push(ATTACK);
            for (let i = 0; i < numberOfParts * 2; i++) body.push(MOVE);
            return this.spawnCreep(body, cr.role + '_' + cr.target + '_' + Game.time, {
                memory: {
                    role: cr.role,
                    currentRole: cr.role,
                    target: cr.target,
                    home: cr.home,
                    working: false
                }
            });
        };

    StructureSpawn.prototype.spawnNextCreep =
         function (creep) {
             if (this.spawining == undefined) {
                 //console.log(creep.role);
                 switch (creep.role) {
                     case 'LDFarmer': this.spawnLDFarmer(creep.maxEnergyCost, creep, 0); break;
                     case 'claimer': this.spawnClaimer(creep); break;
                     case 'LDLorry': this.spawnLorry(creep.maxEnergyCost, creep); break;
                     case 'lorry': this.spawnLorry(creep.maxEnergyCost, creep); break;
                     case 'reserver': this.spawnReserver(creep); break;
                     case 'miner': this.spawnMiner(creep.maxEnergyCost, creep); break;
                     case 'bodyGuard': this.spawnBodyGuard(creep.maxEnergyCost, creep); break;
                     case 'soldier': this.spawnBodyGuard(creep.maxEnergyCost, creep); break;
                     case 'lightSoldier': this.spawnLightSoldier(creep.maxEnergyCost, creep); break;
                     case 'hostileClaimer': this.spawnHostileClaimer(creep.maxEnergyCost, creep); break;
                     default: this.spawnACreep(creep.maxEnergyCost, creep); break;
                 }
                 return true;
             }
             else return false;
         };

    StructureSpawn.prototype.printSpawnInfo =
        function () {
        if (this.spawning) {
            var spawningCreep = Game.creeps[this.spawning.name];
            this.room.visual.text(
                '🛠️ ' + spawningCreep.memory.role +'_'+spawningCreep.memory.target + ' ' +this.spawning.remainingTime,
                this.pos.x + 1,
                this.pos.y,
                { align: 'left', opacity: 0.6 });
        }

    }
};
