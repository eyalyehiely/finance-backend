# Generated by Django 4.2.7 on 2024-07-08 20:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_alter_expenses_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='debts',
            name='type',
            field=models.CharField(choices=[('משכנתא', 'משכנתא'), ('ממשלתית', 'ממשלתית'), ('הלוואה', 'הלוואה'), ('עסק', 'עסק'), ('רפואי', 'רפואי'), ('משכון רכב', 'משכון רכב')], max_length=50),
        ),
        migrations.AlterField(
            model_name='savings',
            name='saving_type',
            field=models.CharField(choices=[('בריאות', 'בריאות'), ('עסקים', 'עסקים'), ('רגיל', 'רגיל'), ('השכלה', 'השכלה'), ('אחר', 'אחר')], max_length=50),
        ),
    ]
