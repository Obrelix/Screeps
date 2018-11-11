

module.exports = Object.defineProperty(Room.prototype, 'memory', {
    configurable: true,
    get: function () {
        if (_.isUndefined(Memory.rooms)) {
            Memory.rooms = {};
        }
        if (!_.isObject(Memory.rooms)) {
            return undefined;
        }
        return Memory.rooms[this.id] = Memory.rooms[this.id] || {};
    },
    set: function (value) {
        if (_.isUndefined(Memory.links)) {
            Memory.rooms = {};
        }
        if (!_.isObject(Memory.rooms)) {
            throw new Error('Could not set source memory');
        }
        Memory.rooms[this.id] = value;
    }
});