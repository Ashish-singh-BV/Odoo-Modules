odoo.define("pos_order.PopUp", function (require) {
    "use strict";
    const AbstractAwaitablePopup = require("point_of_sale.AbstractAwaitablePopup");
    const { useState, useRef } = owl;
    const Registries = require("point_of_sale.Registries");
    const { _lt } = require('@web/core/l10n/translation');
    const {Order} = require("point_of_sale.models");
    
    class PopUp extends AbstractAwaitablePopup{
        setup(){
            super.setup()
            this.state = useState({order_note : this.props.initialNumber})
        }
        
        getPayload(){
            return this.state.order_note
        }

    }
    PopUp.template = "popup_template"
    PopUp.defaultProps={
        title: _lt("Order Note"),
        save: _lt("Save"),
        cancelText: _lt("Discard"),

    }
    Registries.Component.add(PopUp)

    const OrderExtend = (Order) => class OrderExtend extends Order {

      

        export_as_JSON() {
            const json = super.export_as_JSON(...arguments);
            json.order_note = this.order_note;
            return json;
        }

        init_from_JSON(json) {
            super.init_from_JSON(...arguments);
            this.set_order_note(json.order_note)
        }

        set_order_note(order_note) {
            this.order_note = order_note
        }

        get_order_note() {
            return this.order_note;
        }

        export_for_printing() {
            const result = super.export_for_printing(...arguments);
            if (this.get_order_note()) {
                result.order_note = this.get_order_note();
            }
            return result;
        }
    }

    Registries.Model.extend(Order, OrderExtend)

});