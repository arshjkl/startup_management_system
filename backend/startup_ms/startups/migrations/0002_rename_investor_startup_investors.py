# Generated by Django 5.1.3 on 2024-11-17 01:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('startups', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='startup',
            old_name='investor',
            new_name='investors',
        ),
    ]