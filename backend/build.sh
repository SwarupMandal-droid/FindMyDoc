#!/usr/bin/env bash
# ─── Render.com build script ─────────────────────────────────────────────────
# This runs every time Render deploys the backend service.
# It installs dependencies, collects static files, and runs DB migrations.
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
