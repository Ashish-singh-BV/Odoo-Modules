{
    'name': 'pos extend',
    'version': '1.0',
    'category': 'Apps',
    
    'author': 'Ashish singh',
    'depends': ['base','point_of_sale'],
    'data': [
        "security/ir.model.access.csv",
        "views/pos_order.xml",
        "views/location.xml",
        "views/pos_config_view.xml",
    ],
    'assets': {
        'point_of_sale.assets': [
            "pos_order/static/src/**/*",
        ],
        },
    "application": True,
    
    "sequence": 1
}