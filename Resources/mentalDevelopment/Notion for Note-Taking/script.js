document.addEventListener("DOMContentLoaded", function () {
    // Initialize Quill Editor
    var quill = new Quill("#editor", {
        theme: "snow"
    });

    // Save Note
    document.getElementById("saveNote").addEventListener("click", function () {
        let note = quill.root.innerHTML;
        localStorage.setItem("savedNote", note);
        alert("Note Saved!");
    });

    // Load Saved Note
    if (localStorage.getItem("savedNote")) {
        quill.root.innerHTML = localStorage.getItem("savedNote");
    }

    // Clear Note
    document.getElementById("clearNote").addEventListener("click", function () {
        quill.root.innerHTML = "";
        localStorage.removeItem("savedNote");
    });

    // 🌙 Dark Mode Toggle
    document.getElementById("toggleDarkMode").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        this.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    // 📄 Download as PDF
    document.getElementById("downloadPDF").addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        let doc = new jsPDF();
        let content = quill.root.innerText;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.text(content, 15, 20);
        doc.save("Notepad.pdf");
    });
});
