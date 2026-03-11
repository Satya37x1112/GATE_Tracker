"""
Django Admin registration for GATE Study Tracker models.
Provides list views with useful columns and filters for manual data editing.
Includes User admin enhancements to see registered users at a glance.
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import StudySession, DailyStats


# ── Enhance the built-in User admin ──────────
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'date_joined', 'last_login', 'is_active', 'is_staff')
    list_filter = ('is_active', 'is_staff', 'date_joined')
    ordering = ('-date_joined',)


admin.site.unregister(User)
admin.site.register(User, UserAdmin)


@admin.register(StudySession)
class StudySessionAdmin(admin.ModelAdmin):
    list_display = ('date', 'user', 'subject', 'study_type', 'duration_minutes',
                    'questions_solved', 'lecture_minutes', 'notes_created')
    list_filter = ('user', 'subject', 'study_type', 'date', 'notes_created')
    search_fields = ('subject', 'user__username')
    ordering = ('-created_at',)


@admin.register(DailyStats)
class DailyStatsAdmin(admin.ModelAdmin):
    list_display = ('date', 'user', 'total_study_time', 'total_questions', 'total_lectures')
    list_filter = ('user', 'date')
    ordering = ('-date',)


# Customize admin site header
admin.site.site_header = 'GateTracker Admin'
admin.site.site_title = 'GateTracker'
admin.site.index_title = 'Dashboard'
