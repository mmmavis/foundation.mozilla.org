# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2019-01-25 22:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buyersguide', '0018_product_is_draft'),
    ]

    operations = [
        migrations.AddField(
            model_name='buyersguideproductcategory',
            name='featured',
            field=models.BooleanField(default=False),
        ),
    ]
