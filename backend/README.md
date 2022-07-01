# FT_Transcendance backend
## Par tbelhomm

### Installation

Permets d'allumer la base de donnée:
```
sudo docker compose up -d
```

Permets d'installer les dépendances:
```bash
npm install
```

Copier-coller le `.env.example` en `.env` et modifier son contenu.
Par défaut, la base de donnée `postgresql://transcendance:strong-password@localhost:5432/transcendance?schema=public`

Permets de mettre la base de donnée à jour:
```bash
npx prisma generate
npx prisma db push
```

Permets de démarrer le serveur:
```
npm run start:dev
```

Permets de voir le contenu de la base de donnée:
```
npx prisma studio
```
