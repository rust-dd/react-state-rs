use std::sync::{Arc, Mutex};

use ahash::HashMap;
use serde_json::Value;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

pub type TState = HashMap<String, Value>;

#[wasm_bindgen]
pub struct State {
    state: Arc<Mutex<HashMap<String, Value>>>,
}

#[wasm_bindgen]
impl State {
    #[wasm_bindgen(constructor)]
    pub fn new(state: JsValue) -> State {
        State {
            state: Arc::new(Mutex::new(
                serde_wasm_bindgen::from_value::<TState>(state).unwrap(),
            )),
        }
    }

    pub fn get(&self) -> JsValue {
        let state = self.state.lock().unwrap();
        serde_wasm_bindgen::to_value(&*state).unwrap()
    }

    pub fn get_key(&self, key: &str) -> JsValue {
        let state = self.state.lock().unwrap();
        serde_wasm_bindgen::to_value(&state.get(key).unwrap()).unwrap()
    }

    pub fn set(&self, state: JsValue) {
        let _ = std::mem::replace(
            &mut *self.state.lock().unwrap(),
            serde_wasm_bindgen::from_value::<TState>(state).unwrap(),
        );
    }

    pub fn insert(&self, key: String, value: JsValue) {
        self.state
            .lock()
            .unwrap()
            .insert(key, serde_wasm_bindgen::from_value(value).unwrap());
    }

    pub fn update(&self, key: String, value: JsValue) {
        self.state
            .lock()
            .unwrap()
            .entry(key)
            .and_modify(|v| *v = serde_wasm_bindgen::from_value(value).unwrap());
    }

    pub fn remove(&self, key: &str) {
        self.state.lock().unwrap().remove(key).unwrap();
    }

    pub fn clear(&self) {
        let _ = std::mem::replace(&mut *self.state.lock().unwrap(), HashMap::default());
    }
}
