# gitjournal
Génération de journal de travail à partir d’un log git

## Version GUI HTML/JS

- Dans le dossier `htmljs`
- Renommer `.config.js.example` en `.config.js`
- Générer un "Personal Access Token" sur [Github](https://github.com/settings/tokens)
- Coller votre token dans `.config.js`
- Définir un repo par défaut (ou pas)
- Ouvrir `gitjournal.html`

## Version CLI
[Télécharger la dernière release](https://github.com/ETML-INF/gitjournal/releases)

### Génération basique
```shell
# Pour générer le journal du dépôt https://github.com/ETML-INF/gitjournal
gitjournal ETML-INF gitjournal
```

### Avec PAT (pour les repos privés ou alors si dépassement de quota pour l’api)
```shell
gitjournal ETML-INF gitjournal -p ghp_XXXXXXX
```

#### Avec PAT dans une variable d’environnement GITHUB_PAT
```shell
#export GITHUB_PAT=ghp_XXXXXXX OU configurer le PATH
gitjournal ETML-INF gitjournal
```

### Aide et détails
```shell
gitjournal --help
```
## Version GUI Electron
[GitJournal par Thomas Nardou](https://github.com/ThomNardou/GitJournal)