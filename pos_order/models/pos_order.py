from odoo import fields, models, api


class PosOrder(models.Model):
    _inherit = "pos.order"

    order_note = fields.Char()

    @api.model
    def _order_fields(self, ui_order):
        res = super(PosOrder, self)._order_fields(ui_order)
        res['order_note'] = ui_order.get('order_note')
        return res


class CustomerPhone(models.Model):
    _inherit = ['res.partner']

    phone_number = fields.Char(string="Mobile Number")


class CustomerMobilePosSession(models.Model):
    _inherit = ['pos.session']

    def _loader_params_res_partner(self):
        result = super()._loader_params_res_partner()
        result.get('search_params').get('fields').append('phone_number')
        return result
