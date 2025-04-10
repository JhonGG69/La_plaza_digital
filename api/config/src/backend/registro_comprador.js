import { createClient } from "https://esm.sh/@supabase/supabase-js"; 
import bcrypt from "https://esm.sh/bcryptjs";

// Conectar con Supabase
const SUPABASE_URL = "https://wszzuzsuciipkjggymmi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzenp1enN1Y2lpcGtqZ2d5bW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2OTUzODcsImV4cCI6MjA1OTI3MTM4N30.k0_WUwnfXqBon3h9Tpr6D1VEo1SNV1J0qJ2lE6jPUSU";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("comprador_form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); 

        // Obtener valores del formulario
        const name = document.getElementById("name").value; 
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;

        try {
            // 🔹 Hashear la contraseña antes de guardarla en la BD
            const hashedPassword = await bcrypt.hash(password, 10);

            // 🔹 Insertar el usuario en la tabla 'propietario'
            const { error: insertError } = await supabase
                .from("usuario_comprador")
                .insert([
                    {
                        nombre: name,
                        email: email,
                        password: hashedPassword,
                        telefono: phone
                    }
                ]);

            if (insertError) {
                throw new Error("Error guardando en la base de datos: " + insertError.message);
            }

            alert("Registro exitoso. Redirigiendo...");
            setTimeout(() => {
                window.location.href = "/api/config/login_form.html";
            }, 100);

        } catch (error) {
            console.error("Error:", error.message);
            alert(error.message);
        }
    });
});
