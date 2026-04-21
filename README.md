# Explory - Intro to SWE Group 7 Project
For our solution, we want to encourage groups of friends to try new things. Most friend groups live disconnected lives until they hang out in person once in a blue moon. We wish to fill the gap to help people find new conversation and community together. Every day, you can spin for a random challenge based on your personality and what your interests are. The app gives you the chance to share pictures and descriptions of the challenge you completed, view other friends' completions on your homepage, like instagram, and even have a challenge leaderboard to compete with one another with a point system. The app will give you custom challenges based on preferences you set in your account, which can encourage participation by not straying you away with things you do not like to do. And there will be two different account types, one admin account who can add new challenges to the list as well as potentially moderate content, and members whose sole job is to have fun.

**INSTALLATION GUIDE**
1) Run `pip install -r requirements.txt`
2) Go to the backend directory and add a .env file with
   ```
   DB_PASSWORD=[your database password]
   DATABASE_URL=postgresql://postgres.(your link here).pooler.supabase.com:5432/postgres
   ```
3) Go to the frontend directory and add a .env file with
   ```
   VITE_SUPABASE_URL="https://(your link here).supabase.co"
   VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_(your key here)"
   ```
 4) In the terminal run\
     mac/linux: `source .venv/bin/activate`\
     windows: `.venv\Scripts\activate` or `.venv\Scripts\Activate.ps`
5) cd to the frontend and run
   `npm install`
6) cd to the backend and start the server with
   mac/linux: `python manage.py runserver`\
   windows: `py manage.py runserver`
7) cd to the frontend and start the server with
   `npm run dev`
