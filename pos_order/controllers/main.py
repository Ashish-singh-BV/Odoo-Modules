from odoo import http
from odoo.http import request

class Hello(http.Controller):
    @http.route('/rohit/jha/',website = True, auth = 'public')
    def know_ledge(self,**kw):
        return "Hello, World"
        # return request.render("pos_order.new_page", {})