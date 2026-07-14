# DaySync

Schedule coworking sessions with your tech community.
Set your availability once. See who you overlap with. Start a meeting instantly.

---

## Local Development

### Prerequisites
- Node.js 18+
- Docker

### 1. Clone the repo
```bash
git clone https://github.com/adam-abundis/daysync.git
cd daysync
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Fill in the values in `.env`

### 4. Start local services
Docker runs your database, email catcher, and websocket server.
```bash
docker-compose up -d
```
Confirm all three are running:
```bash
docker ps
```
View caught emails locally: http://localhost:8025

### 5. Set up the database
```bash
npx prisma db push
```

### 6. Start the app
```bash
npm run dev
```
Open http://localhost:3000

---

## Local Services

| Service  | Port | Purpose                     |
|----------|----- |-----------------------------|
| Postgres | 5432 | Database                    |
| Mailpit  | 8025 | Catches emails locally      |
| Soketi   | 6001 | Websockets for live updates |

---

## Troubleshooting

**Port 5432 in use:**
```bash
sudo lsof -i :5432
```

**Docker permission denied:**
```bash
sudo usermod -aG docker $USER
```
Log out and back in.

**Database broken:**
```bash
docker-compose down -v
docker-compose up -d
npx prisma db push
```
