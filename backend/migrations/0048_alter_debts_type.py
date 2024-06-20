# Generated by Django 5.0.4 on 2024-06-11 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0047_alter_creditcard_name_alter_debts_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debts',
            name='type',
            field=models.CharField(choices=[('mortgage', 'משכנתא'), ('goverment', 'ממשלתית'), ('loan', 'הלוואה'), ('business', 'עסק'), ('medical', 'רפואי'), ('car', 'משכון רכב')], max_length=50),
        ),
    ]