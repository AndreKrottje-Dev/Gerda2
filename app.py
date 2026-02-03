import flet as ft
import sqlite3
import os

# --- DATABASE FUNCTIES (De Opslag) ---
DB_FILE = "mijn_gegevens.db"

def database_instellen():
    # Maakt een database bestand aan op je apparaat als die er nog niet is
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS items 
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, tekst TEXT)''')
    conn.commit()
    conn.close()

def data_opslaan(nieuwe_tekst):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("INSERT INTO items (tekst) VALUES (?)", (nieuwe_tekst,))
    conn.commit()
    conn.close()

def data_ophalen():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT tekst FROM items ORDER BY id DESC")
    resultaat = c.fetchall()
    conn.close()
    return resultaat

# --- APP INTERFACE (Het Scherm) ---
def main(page: ft.Page):
    page.title = "Mijn Persoonlijke App"
    page.theme_mode = ft.ThemeMode.LIGHT
    page.scroll = "adaptive"
    
    database_instellen()

    lijst_weergave = ft.Column()

    def ververs_lijst():
        lijst_weergave.controls.clear()
        voorraad = data_ophalen()
        for item in voorraad:
            lijst_weergave.controls.append(ft.ListTile(title=ft.Text(item[0])))
        page.update()

    def knop_klik(e):
        if invoerveld.value != "":
            data_opslaan(invoerveld.value)
            invoerveld.value = ""
            ververs_lijst()

    invoerveld = ft.TextField(label="Typ hier iets om op te slaan", expand=True)
    toevoeg_knop = ft.FloatingActionButton(icon=ft.icons.ADD, on_click=knop_klik)

    # Scherm indeling
    page.add(
        ft.Text("Mijn Opgeslagen Data", size=30, weight="bold"),
        ft.Row([invoerveld]),
        ft.Divider(),
        lijst_weergave
    )
    page.floating_action_button = toevoeg_knop
    
    ververs_lijst()

# Start de app
if __name__ == "__main__":
    ft.app(target=main)
