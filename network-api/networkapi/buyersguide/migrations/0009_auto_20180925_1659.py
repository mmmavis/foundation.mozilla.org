# -*- coding: utf-8 -*-
# Generated by Django 1.11.14 on 2018-09-25 16:59
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('buyersguide', '0008_auto_20180925_1627'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='update',
        ),
        migrations.AddField(
            model_name='update',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='products', to='buyersguide.Product'),
        ),
    ]