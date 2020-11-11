from django.db import models

# Create your models here.
class EditorContent(models.Model):
    doc_id = models.CharField(max_length=30, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    created_by = models.CharField(max_length=20, blank=True)
    language = models.CharField(max_length=50, blank=True)
    content = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_by = models.CharField(max_length=20, blank=True)
    expire_time = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.doc_id