odoo.define("pos_order.OrderExtendLoc", function (require) {
    "use strict";
    
    const Registries = require("point_of_sale.Registries");
    const { Order } = require("point_of_sale.models");


    const OrderExtendLoc = (Order) => class OrderExtendLoc extends Order {

        export_as_JSON() {
            const json = super.export_as_JSON(...arguments);
            json.selected_location = this.selected_location;
            return json;
        }

        init_from_JSON(json) {
            super.init_from_JSON(...arguments);
            this.set_location(json.selected_location)
        }

        set_location(selected_location) {
            this.selected_location = selected_location
        }

        get_location() {
            if (this.selected_location) {
                return this.selected_location;
            }
        }


    }

    Registries.Model.extend(Order, OrderExtendLoc)

});