# Runner
Create environment configuration file (.env )
```bash
cp -r .docker/compose/local/.env.example .docker/compose/local/.env
```

Start the app
```bash
./runner.sh -a=start -e=local
```

# Database
if database not automatically created, execute command below
```bash
docker exec -it mrms_nsfr_mssql /opt/mssql-tools/bin/sqlcmd -U sa -P Passw0rdSALT -S localhost -i /usr/config/setup.sql
```