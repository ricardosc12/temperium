/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import { AuthProvider } from "./storage/Auth";

render(() => 
    <Router>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Router>, 
    document.getElementById("root")
);
