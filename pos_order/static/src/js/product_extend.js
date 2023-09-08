odoo.define("pos_order.inherit", function (require) {
    "use strict";
    const ProductScreen = require("point_of_sale.ProductScreen");
    const PosComponent = require('point_of_sale.PosComponent');
    const { useListener } = require("@web/core/utils/hooks");
    const Registries = require("point_of_sale.Registries");

    const ProductExtend = (ProductScreen) => class ProductExtend extends ProductScreen {

        async _onClickPay() {
            if (this.env.pos.get_order().partner == null) {
                this.showNotification('Select Customer')
            }
            else if (!this.env.pos.get_order().selected_location) {
                this.showNotification('Please Select location')
            }
            else {
                super._onClickPay()
            }
        }

    }


    class OrderNoteButton extends PosComponent {
        setup() {
            super.setup();
            useListener('click', this.onClick);
        }
        async onClick() {
            const order = this.env.pos.get_order()
            const { confirmed, payload: order_note_payload } = await this.showPopup("PopUp", {
                initialNumber: order.get_order_note()
            });
            if (confirmed) {
                order.set_order_note(order_note_payload)
            }
        }
    }

    ProductScreen.addControlButton({
        component: OrderNoteButton,
    })


    OrderNoteButton.template = 'OrderNoteButton';
    Registries.Component.add(OrderNoteButton);

    Registries.Component.extend(ProductScreen, ProductExtend)
    // return OrderNoteButton

});