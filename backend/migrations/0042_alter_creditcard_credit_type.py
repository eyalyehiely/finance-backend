# Generated by Django 5.0.4 on 2024-06-10 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0041_alter_creditcard_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='creditcard',
            name='credit_type',
            field=models.TextField(choices=[('Debit', 'Debit'), ('Credit', 'Credit')], max_length=50),
        ),
    ]