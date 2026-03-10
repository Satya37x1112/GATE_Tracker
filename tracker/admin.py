"""
Django Admin registration for GATE Study Tracker models.
Provides list views with useful columns and filters for manual data editing.
"""

from django.contrib import admin
from .models import StudySession, DailyStats


@admin.register(StudySession)
class StudySessionAdmin(admin.ModelAdmin):
    list_display = ('date', 'subject', 'study_type', 'duration_minutes',
                    'questions_solved', 'lecture_minutes', 'notes_created')
    list_filter = ('subject', 'study_type', 'date', 'notes_created')
    search_fields = ('subject',)
    ordering = ('-created_at',)


@admin.register(DailyStats)
class DailyStatsAdmin(admin.ModelAdmin):
    list_display = ('date', 'total_study_time', 'total_questions', 'total_lectures')
    list_filter = ('date',)
    ordering = ('-date',)
