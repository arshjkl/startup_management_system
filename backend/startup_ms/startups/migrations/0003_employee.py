# Generated by Django 5.1.3 on 2024-11-17 02:51

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('startups', '0002_rename_investor_startup_investors'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('static_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=40)),
                ('joining_date', models.DateField()),
                ('designation', models.CharField(max_length=40)),
                ('salary', models.DecimalField(decimal_places=2, max_digits=10)),
                ('startup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='startups.startup')),
            ],
            options={
                'verbose_name_plural': 'Employees',
            },
        ),
    ]
