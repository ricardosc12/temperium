#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs::File;
use std::io::prelude::*;
use std::path::PathBuf;
use tauri::Manager;
use window_shadows::set_shadow;



// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn save(name: &str) -> bool {

    let mut path = std::env::var("APPDATA").unwrap_or_else(|_| ".".to_string());
    path.push_str("\\Temperium");

    if !PathBuf::from(&path).exists() {
        if let Err(_) = std::fs::create_dir(&path) {
            return false;
        }
    }

    let mut file = match File::create(PathBuf::from(&path).join("data.txt")) {
        Ok(file) => file,
        Err(_) => return false,
    };
    if let Err(_) = file.write_all(name.as_bytes()) {
        return false;
    }

    true
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, save])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
