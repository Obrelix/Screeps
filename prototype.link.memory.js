

module.exports = Object.defineProperty(StructureLink.prototype, 'memory', {
    configurable: true,
    get: function () {
        if (_.isUndefined(Memory.links)) {
            Memory.links = {};
        }
        if (!_.isObject(Memory.links)) {
            return undefined;
        }
        return Memory.links[this.id] = Memory.links[this.id] || {};
    },
    set: function (value) {
        if (_.isUndefined(Memory.links)) {
            Memory.links = {};
        }
        if (!_.isObject(Memory.links)) {
            throw new Error('Could not set source memory');
        }
        Memory.links[this.id] = value;
    }
});