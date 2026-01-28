// Inputs
const nameInput = document.querySelector("#nameInput");
const phoneInput = document.querySelector("#phoneInput");
const messageInput = document.querySelector("#messageInput");
const sendBtn = document.querySelector("#SendBtn");
const successMsg = document.querySelector("#successMsg");
const leadsList = document.querySelector("#leadsList");

// LocalStorage
const STORAGE_KEY = "moto_leads";

// Traer datos guardados o array vacío
let leads = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editingIndex = null;

// Guardar en localStorage
function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

// Renderizar lista
function render() {
    leadsList.innerHTML = "";

    leads.forEach((lead, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-start";

        li.innerHTML = `
            <div>
                <strong>${lead.name}</strong><br>
                📞 ${lead.phone}<br>
                💬 ${lead.message || "Sin mensaje"}
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary">Editar</button>
                <button class="btn btn-sm btn-outline-danger">Eliminar</button>
            </div>
        `;

        // EDITAR
        li.querySelector(".btn-outline-primary").addEventListener("click", () => {
            editingIndex = index;
            nameInput.value = lead.name;
            phoneInput.value = lead.phone;
            messageInput.value = lead.message;
            sendBtn.textContent = "Actualizar Interés";
        });

        // ELIMINAR
        li.querySelector(".btn-outline-danger").addEventListener("click", () => {
            leads.splice(index, 1);
            saveToStorage();
            render();
        });

        leadsList.appendChild(li);
    });
}

// Click en enviar
sendBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !phone) return;

    const leadData = { name, phone, message };

    if (editingIndex === null) {
        leads.push(leadData);
    } else {
        leads[editingIndex] = leadData;
        editingIndex = null;
        sendBtn.textContent = "Enviar Interés";
    }

    saveToStorage();
    render();

    // Limpiar formulario
    nameInput.value = "";
    phoneInput.value = "";
    messageInput.value = "";

    // Mensaje de éxito
    successMsg.classList.remove("d-none");
    setTimeout(() => successMsg.classList.add("d-none"), 2000);
});

// Mostrar datos al cargar
render();
