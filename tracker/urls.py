"""URL patterns for the tracker app."""

from django.urls import path
from . import views

app_name = 'tracker'

urlpatterns = [
    # ── Auth API ──
    path('api/auth/register/', views.api_register, name='api_register'),
    path('api/auth/login/', views.api_login, name='api_login'),
    path('api/auth/logout/', views.api_logout, name='api_logout'),
    path('api/auth/check/', views.api_check_auth, name='api_check_auth'),

    # ── JSON API endpoints (for React frontend) ──
    path('api/dashboard/', views.api_dashboard, name='api_dashboard'),
    path('api/analytics/', views.api_analytics, name='api_analytics'),
    path('api/chart-data/', views.api_chart_data, name='api_chart_data'),
    path('api/history/', views.api_history, name='api_history'),
    path('api/heatmap/', views.api_heatmap, name='api_heatmap'),
    path('api/weekly-progress/', views.api_weekly_progress, name='api_weekly'),
    path('api/growth-tree/', views.api_growth_tree, name='api_growth_tree'),
    path('api/progress/', views.api_multi_week_progress, name='api_progress'),

    # ── POST endpoints ──
    path('save-session/', views.save_session, name='save_session'),

    # ── CSV Export ──
    path('export/', views.export_csv, name='export_csv'),

    # ── HTML template views ──
    path('', views.dashboard, name='dashboard'),
    path('start-study/', views.start_study, name='start_study'),
    path('analytics/', views.analytics, name='analytics_page'),
    path('history/', views.history, name='history_page'),
]
