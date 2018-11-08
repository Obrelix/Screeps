﻿

module.exports = Object.defineProperty(StructureLink.prototype, 'memory', {
    configurable: true,
    get: function () {
        if (_.isUndefined(Memory.myStructuresMemory)) {
            Memory.myStructuresMemory = {};
        }
        if (!_.isObject(Memory.myStructuresMemory)) {
            return undefined;
        }
        return Memory.myStructuresMemory[this.id] = Memory.myStructuresMemory[this.id] || {};
    },
    set: function (value) {
        if (_.isUndefined(Memory.myStructuresMemory)) {
            Memory.myStructuresMemory = {};
        }
        if (!_.isObject(Memory.myStructuresMemory)) {
            throw new Error('Could not set source memory');
        }
        Memory.myStructuresMemory[this.id] = value;
    }
});