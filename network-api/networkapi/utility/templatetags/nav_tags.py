from django import template

register = template.Library()


# Instantiate a horizontal nav based on the current page's relation to other pages
@register.inclusion_tag('tags/horizontal_nav.html', takes_context=True)
def horizontal_nav(context, current_page, menu_pages, classname=""):
    return {
        'current': current_page,
        'menu_pages': menu_pages,
        'classname': classname,
    }


# Instantiate a Buyer's Guide nav based on the current page's relation to other pages
@register.inclusion_tag('tags/buyers_guide_nav.html', takes_context=True)
def buyers_guide_nav(context, categories, category, current_path, classname=""):
    return {
        'categories': categories,
        'category': category,
        'classname': classname,
        'current_path': current_path
    }
