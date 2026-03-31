import csv

from django.core.management import BaseCommand
from users.models import Challenges


class Command(BaseCommand):
    help = 'Load challenges from csv file'

    def handle(self, *args, **kwargs):
        with open('data/challenges.csv', 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                challenge_title = row['title']
                print(f"Title found: {challenge_title}")
                Challenges.objects.create(title=challenge_title)
        self.stdout.write(self.style.SUCCESS('Successfully loaded challenges'))


