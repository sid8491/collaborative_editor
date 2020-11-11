from django.core.management.base import BaseCommand
from django.utils import timezone
from Editor.models import EditorContent


class Command(BaseCommand):
    help = 'Deletes expired rows'

    def handle(self, *args, **options):
        now = timezone.now()
        EditorContent.objects.filter(expire_time__lt=now).delete()
        EditorContent.objects.filter(expire_time=None).delete()