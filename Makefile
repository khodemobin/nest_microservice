up:
	docker compose up -d
down:
	docker compose down
log_reserve:
	docker compose logs -f nest_reservation
log_auth:
	docker compose logs -f nest_auth
log_payment:
	docker compose logs -f nest_payment