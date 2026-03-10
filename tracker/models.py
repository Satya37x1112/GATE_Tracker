"""
Models for the GATE Study Intelligence Tracker.

StudySession: Records each individual study session with subject, type, duration, etc.
DailyStats:  Aggregated daily statistics, auto-updated when sessions are saved.
"""

from django.db import models


class StudySession(models.Model):
    """Represents a single study session recorded by the timer."""

    # ── Subject choices (GATE CS/IT syllabus) ──
    SUBJECT_CHOICES = [
        ('DSA', 'Data Structures & Algorithms'),
        ('OS', 'Operating Systems'),
        ('COA', 'Computer Organization & Architecture'),
        ('DBMS', 'Database Management Systems'),
        ('DL', 'Digital Logic'),
        ('MATHS', 'Engineering Mathematics'),
        ('CN', 'Computer Networks'),
        ('TOC', 'Theory of Computation'),
        ('CD', 'Compiler Design'),
        ('SE', 'Software Engineering'),
        ('APT', 'Aptitude'),
    ]

    # ── Study type choices ──
    TYPE_CHOICES = [
        ('Theory', 'Theory'),
        ('Practice', 'Practice'),
        ('Lecture', 'Lecture'),
        ('Revision', 'Revision'),
    ]

    date = models.DateField(auto_now_add=True, help_text="Date of the study session")
    subject = models.CharField(max_length=10, choices=SUBJECT_CHOICES)
    study_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    duration_minutes = models.FloatField(default=0, help_text="Duration in minutes (decimal)")
    questions_solved = models.IntegerField(default=0)
    lecture_minutes = models.IntegerField(default=0)
    notes_created = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.date} | {self.get_subject_display()} | {self.study_type} | {self.duration_minutes:.0f} min"


class DailyStats(models.Model):
    """
    Aggregated statistics for a single day.
    Updated automatically whenever a StudySession is saved via the save_session view.
    """
    date = models.DateField(unique=True)
    total_study_time = models.FloatField(default=0, help_text="Total minutes studied")
    total_questions = models.IntegerField(default=0)
    total_lectures = models.IntegerField(default=0, help_text="Total lecture minutes")

    class Meta:
        ordering = ['-date']
        verbose_name_plural = "Daily Stats"

    def __str__(self):
        return f"{self.date} — {self.total_study_time:.0f} min studied"
