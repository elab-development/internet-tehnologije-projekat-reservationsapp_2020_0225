# REST API ZA 📝RESERVATION📝 APLIKACIJU

Dati API ima 4 modela: User, Objekat, Recenzija i TipObjekta. Kardinalnosti između ovih modela su sledeće:

1. **User** može da rezervise vise **Objekat**-a, dok jedan **Objekat** može biti rezervisan od strane samo jednog **User**-a.

2. Jedan **User** može ostaviti više **Recenzija**, dok jedna **Recenzija** može biti ostavljena od strane jednog **User**-a.

3. Jedan **Objekat** može imati više **Recenzija**, dok jedna **Recenzija** može biti vezana za samo jedan **Objekat**.

4. Jedan **Objekat** može pripadati samo jednom **Tipu Objekta**, dok jedan **Tip Objekta** može imati vise **Objekata**.

PMOV(Prosireni Model Objekti-Veze) datog Rest API-ja na kome se vide modeli i Eloquent veze između njih prikazan je na slici ispod:
![Opis slike](https://i.postimg.cc/7PSWF6N0/RESERVATIONS-APP.png)






[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/1IMeAlJr)
