# GATE Study Intelligence Tracker

A full-stack web application for tracking and analyzing GATE (Graduate Aptitude Test in Engineering) CS/IT exam preparation. Built with a Django REST backend and a React + TypeScript frontend.

## Architecture

```
Frontend (Vercel)          Backend (Render)           Database (Neon)
React + TypeScript   --->  Django 6.x REST API  --->  PostgreSQL
Vite + TailwindCSS         Gunicorn + WhiteNoise      Managed cloud DB
```

The frontend communicates with the backend via JSON API endpoints. Authentication uses Django sessions with cross-origin cookie support (`SameSite=None; Secure`).

## Tech Stack

### Backend
- **Framework**: Django 6.x
- **Server**: Gunicorn
- **Database**: PostgreSQL (Neon) via `dj-database-url`
- **Static files**: WhiteNoise
- **CORS**: django-cors-headers
- **Environment**: python-dotenv

### Frontend
- **Framework**: React 18 with TypeScript
- **Build tool**: Vite 5
- **Styling**: TailwindCSS 3
- **Charts**: Chart.js + react-chartjs-2
- **Routing**: react-router-dom v6
- **Icons**: lucide-react

### Deployment
- **Backend**: Render (free tier)
- **Frontend**: Vercel
- **Database**: Neon PostgreSQL (serverless)

## Data Models

### StudySession
Records individual study sessions with the following fields:
- `user` — ForeignKey to Django's auth User
- `date` — auto-set on creation
- `subject` — one of: DSA, OS, COA, DBMS, DL, MATHS, CN, TOC, CD, SE, APT
- `study_type` — Theory, Practice, Lecture, or Revision
- `duration_minutes` — float, session length in minutes
- `questions_solved` — integer
- `lecture_minutes` — integer
- `notes_created` — boolean

### DailyStats
Aggregated per-user daily statistics, updated automatically when sessions are saved:
- `total_study_time` — total minutes studied that day
- `total_questions` — total questions solved
- `total_lectures` — total lecture minutes

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user (username, email, password) |
| POST | `/api/auth/login/` | Log in, returns session cookie |
| POST | `/api/auth/logout/` | Log out, clears session |
| GET | `/api/auth/check/` | Check authentication status |

### Data (all require authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/` | Today's stats: hours, questions, lectures, streak |
| GET | `/api/analytics/` | Subject breakdown, averages, totals |
| GET | `/api/chart-data/` | Time-series data for charts |
| GET | `/api/history/` | Paginated session history |
| GET | `/api/heatmap/` | Study activity heatmap data |
| GET | `/api/weekly-progress/` | Current week progress breakdown |
| GET | `/api/growth-tree/` | Gamified progress tree data |
| GET | `/api/progress/` | Multi-week progress comparison |
| POST | `/save-session/` | Save a new study session |
| GET | `/export/` | Export all sessions as CSV |

## Local Development Setup

### Prerequisites
- Python 3.12+
- Node.js 18+
- Git

### Backend

```bash
# Clone the repository
git clone https://github.com/Satya37x1112/GATE_Tracker.git
cd GATE_Tracker

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate      # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and set DATABASE_URL to your PostgreSQL connection string

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (proxies API calls to localhost:8000)
npm run dev
```

The frontend runs at `http://localhost:5173` and expects the backend at `http://localhost:8000`.

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/dbname?sslmode=require` |
| `SECRET_KEY` | Django secret key | auto-generated for production |
| `DEBUG` | Debug mode | `True` for dev, `False` for production |
| `ALLOWED_HOSTS` | Comma-separated hostnames | `localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | `https://gate-tracker.vercel.app` |
| `CSRF_TRUSTED_ORIGINS` | Trusted CSRF origins | `https://gate-tracker.vercel.app` |

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `https://gate-tracker-api.onrender.com` |

## Deployment

### Backend (Render)

The project includes `render.yaml` and `build.sh` for automated deployment. The build script:
1. Installs Python dependencies
2. Collects static files
3. Runs database migrations

Set `DATABASE_URL` in Render's environment variables pointing to your Neon PostgreSQL instance.

### Frontend (Vercel)

The frontend includes `vercel.json` for SPA routing configuration. Set `VITE_API_URL` in Vercel's environment variables to the Render backend URL.

## Project Structure

```
.
├── gate_tracker/          # Django project settings
│   ├── settings.py        # Configuration (DB, CORS, static files)
│   ├── urls.py            # Root URL routing
│   └── wsgi.py            # WSGI entry point
├── tracker/               # Main Django app
│   ├── models.py          # StudySession, DailyStats models
│   ├── views.py           # API endpoints and template views
│   ├── urls.py            # App URL patterns
│   └── migrations/        # Database migrations
├── frontend/              # React + TypeScript SPA
│   ├── src/
│   │   ├── api/api.ts     # API client with type definitions
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route-level page components
│   │   └── data/          # Static subject data (JSON)
│   ├── vite.config.ts     # Vite configuration
│   └── tailwind.config.js # TailwindCSS configuration
├── build.sh               # Render build script
├── render.yaml            # Render deployment config
├── requirements.txt       # Python dependencies
└── manage.py              # Django management CLI
```
## License

This project is licensed under a proprietary license.  
The code is available for viewing only and may not be copied, modified, or redistributed without permission.
