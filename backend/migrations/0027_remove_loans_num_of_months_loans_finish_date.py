# Generated by Django 5.0.4 on 2024-06-06 12:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0026_debts_finish_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='loans',
            name='num_of_months',
        ),
        migrations.AddField(
            model_name='loans',
            name='finish_date',
            field=models.DateField(default=datetime.date(2013, 1, 1)),
            preserve_default=False,
        ),
    ]