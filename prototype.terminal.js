

module.exports = function () {
    StructureTerminal.prototype.SellResources = function () {
        const resourceStoreAmount = 60000;
        const energyStoreAmmount = 30000;
        if ((this.cooldown == 0)) {
            for (let resourceType in this.store) {
                //if (resourceType == RESOURCE_ENERGY) continue;
                if (this.store[RESOURCE_ENERGY] >= energyStoreAmmount && this.store[resourceType] >= resourceStoreAmount) {
                    var orders = Game.market.getAllOrders(
                        order => order.resourceType == resourceType
                            && order.type == ORDER_BUY
                            && Game.market.calcTransactionCost(1000, this.room.name, order.roomName) < 1000);
                    console.log(resourceType + ' buy orders found: ' + orders.length); orders.sort(function (a, b) { return b.price - a.price; });
                    if (orders.length > 0) {
                        console.log('Best price: ' + orders[0].price);
                        let acceptablePrice = (resourceType == RESOURCE_ENERGY) ? 0.026 : 0.7;
                        if (orders[0].price >= acceptablePrice) {
                            var result = Game.market.deal(orders[0].id, 1000, this.room.name);
                            if (result == 0) {
                                console.log('Order completed successfully');
                            }
                        }
                    }

                }
            }
        }
    };
};