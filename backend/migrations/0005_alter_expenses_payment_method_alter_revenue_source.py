# Generated by Django 5.0.4 on 2024-04-30 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_alter_creditcard_day_of_charge_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expenses',
            name='payment_method',
            field=models.CharField(choices=[('credit_card', 'כרטיס אשראי'), ('direct_debit', 'הוראת קבע'), ('transaction', 'העברה בנקאית'), ('cash', 'מזומן'), ('check', 'צ׳ק')], max_length=50),
        ),
        migrations.AlterField(
            model_name='revenue',
            name='source',
            field=models.CharField(choices=[('type1', 'משכורת'), ('type2', 'קצבה'), ('type3', 'Other')], max_length=50),
        ),
    ]