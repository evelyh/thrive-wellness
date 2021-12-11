# Generated by Django 3.2.8 on 2021-12-11 05:04

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('journeys', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestFeedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.TextField()),
                ('quest_rating', models.IntegerField(validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(1)])),
                ('feeling_rating', models.IntegerField(validators=[django.core.validators.MaxValueValidator(10), django.core.validators.MinValueValidator(1)])),
                ('survey_answer', models.TextField(blank=True, null=True)),
                ('submit_time', models.DateTimeField(auto_now=True)),
                ('quest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='journeys.quest')),
            ],
        ),
    ]
