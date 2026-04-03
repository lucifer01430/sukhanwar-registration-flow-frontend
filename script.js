(function () {
  const STORAGE_KEY = "aviyaanSukhanwarFlow";
  const sections = {
    landing: document.getElementById("section-landing"),
    registration: document.getElementById("section-registration"),
    payment: document.getElementById("section-payment"),
    success: document.getElementById("section-success"),
    ticket: document.getElementById("section-ticket")
  };

  const form = document.getElementById("registrationForm");
  const summaryList = document.getElementById("summaryList");
  const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
  const referenceIdEl = document.getElementById("referenceId");
  const ticketSerialEl = document.getElementById("ticketSerial");
  const ticketNumberEl = document.getElementById("ticketNumber");
  const ticketNameEl = document.getElementById("ticketName");
  const ticketContactEl = document.getElementById("ticketContact");
  const ticketEmailEl = document.getElementById("ticketEmail");
  const ticketPerformanceEl = document.getElementById("ticketPerformance");
  const printTicketBtn = document.getElementById("printTicketBtn");
  const downloadTicketBtn = document.getElementById("downloadTicketBtn");
  const eventTicketEl = document.getElementById("eventTicket");

  const state = {
    currentStep: "landing",
    amount: 399,
    event: {
      name: "Sukhanwar Open Mic",
      date: "20 April 2026",
      time: "6:00 PM onwards",
      venue: "Lucknow"
    },
    user: null,
    ticket: {
      serialNumber: "",
      ticketNumber: ""
    },
    transactionRef: ""
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
    } catch (error) {
      console.warn("Could not parse saved state", error);
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function toSection(step) {
    Object.values(sections).forEach((section) => section.classList.remove("active-section"));
    const active = sections[step] || sections.landing;
    active.classList.add("active-section");
    state.currentStep = step;
    saveState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function randomDigits(count) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 10)).join("");
  }

  function makeTicketNumbers() {
    if (!state.ticket.serialNumber) {
      state.ticket.serialNumber = `SV-${new Date().getFullYear()}-${randomDigits(5)}`;
    }
    if (!state.ticket.ticketNumber) {
      state.ticket.ticketNumber = `TKT-${randomDigits(8)}`;
    }
  }

  function makeReference() {
    state.transactionRef = `AVP-${Date.now().toString().slice(-8)}-${randomDigits(4)}`;
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isPhone(value) {
    return /^\d{10}$/.test(value);
  }

  function validateField(field) {
    const value = field.value.trim();
    let valid = true;

    if (field.hasAttribute("required") && !value) {
      valid = false;
    }

    if (field.name === "email" && value && !isEmail(value)) {
      valid = false;
    }

    if (field.name === "contactNumber" && value && !isPhone(value)) {
      valid = false;
    }

    if (field.name === "age" && value) {
      const age = Number(value);
      if (!Number.isInteger(age) || age < 10 || age > 100) {
        valid = false;
      }
    }

    field.classList.toggle("is-invalid", !valid);
    return valid;
  }

  function readFormData() {
    const data = Object.fromEntries(new FormData(form).entries());
    Object.keys(data).forEach((key) => {
      data[key] = data[key].trim();
    });
    return data;
  }

  function fillForm(data) {
    if (!data) return;
    Object.entries(data).forEach(([key, value]) => {
      const input = form.elements.namedItem(key);
      if (input) input.value = value;
    });
  }

  function renderPaymentSummary() {
    if (!state.user) return;

    const summaryRows = [
      ["Full Name", state.user.fullName],
      ["Age", state.user.age],
      ["Gender", state.user.gender],
      ["Email", state.user.email],
      ["Social ID", state.user.socialId],
      ["Contact", state.user.contactNumber],
      ["Address", state.user.address],
      ["Performance", state.user.performanceArea],
      ["Heard From", state.user.heardFrom]
    ];

    summaryList.innerHTML = summaryRows
      .map(([label, value]) => `<li><span>${label}</span><span>${value || "-"}</span></li>`)
      .join("");
  }

  function renderSuccess() {
    referenceIdEl.textContent = state.transactionRef || "-";
  }

  function renderTicket() {
    makeTicketNumbers();
    ticketSerialEl.textContent = state.ticket.serialNumber;
    ticketNumberEl.textContent = state.ticket.ticketNumber;
    ticketNameEl.textContent = state.user?.fullName || "-";
    ticketContactEl.textContent = state.user?.contactNumber || "-";
    ticketEmailEl.textContent = state.user?.email || "-";
    ticketPerformanceEl.textContent = state.user?.performanceArea || "-";
    saveState();
  }

  function canOpen(step) {
    if (step === "landing" || step === "registration") return true;
    if (step === "payment") return !!state.user;
    if (step === "success") return !!state.user && !!state.transactionRef;
    if (step === "ticket") return !!state.user && !!state.transactionRef;
    return false;
  }

  function guardedNavigate(step) {
    if (!canOpen(step)) {
      toSection("landing");
      return;
    }

    if (step === "payment") renderPaymentSummary();
    if (step === "success") renderSuccess();
    if (step === "ticket") renderTicket();

    toSection(step);
  }

  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const target = this.getAttribute("data-go");
      guardedNavigate(target);
    });
  });

  Array.from(form.elements).forEach((field) => {
    if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
      field.addEventListener("input", () => validateField(field));
      field.addEventListener("change", () => validateField(field));
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const allFields = Array.from(form.querySelectorAll("input, select, textarea"));
    const formValid = allFields.every(validateField);

    if (!formValid) {
      Swal.fire({
        icon: "warning",
        title: "Please check the form",
        text: "Some fields are missing or invalid.",
        confirmButtonColor: "#663300"
      });
      return;
    }

    state.user = readFormData();
    makeTicketNumbers();
    saveState();
    renderPaymentSummary();
    toSection("payment");
  });

  confirmPaymentBtn.addEventListener("click", async function () {
    const response = await Swal.fire({
      title: "Have you completed the payment?",
      text: `This is a frontend simulation for INR ${state.amount}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Completed",
      cancelButtonText: "Not Yet",
      confirmButtonColor: "#663300",
      cancelButtonColor: "#945E28"
    });

    if (!response.isConfirmed) return;

    await Swal.fire({
      title: "Verifying payment request",
      html: "Please wait while we process your confirmation...",
      timer: 1700,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    makeReference();
    saveState();
    renderSuccess();

    await Swal.fire({
      icon: "success",
      title: "Payment marked as completed",
      text: "Your confirmation request has been recorded.",
      confirmButtonColor: "#663300"
    });

    toSection("success");
  });

  function waitForTicketAssets() {
    const images = Array.from(eventTicketEl.querySelectorAll("img"));
    if (!images.length) return Promise.resolve();

    return Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        });
      })
    );
  }

  function triggerTicketPrint() {
    document.body.classList.add("print-ticket-mode");
    const cleanup = () => {
      document.body.classList.remove("print-ticket-mode");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
    setTimeout(cleanup, 1000);
  }

  printTicketBtn.addEventListener("click", function () {
    triggerTicketPrint();
  });

  downloadTicketBtn.addEventListener("click", async function () {
    if (!window.html2canvas || !window.jspdf || !window.jspdf.jsPDF) {
      Swal.fire({
        icon: "error",
        title: "Download unavailable",
        text: "PDF libraries are not loaded. Please refresh and try again.",
        confirmButtonColor: "#663300"
      });
      return;
    }

    const { jsPDF } = window.jspdf;
    const previousText = downloadTicketBtn.textContent;
    downloadTicketBtn.disabled = true;
    downloadTicketBtn.textContent = "Preparing PDF...";

    try {
      await waitForTicketAssets();
      eventTicketEl.classList.add("pdf-exporting");

      const canvas = await window.html2canvas(eventTicketEl, {
        scale: Math.min(3, window.devicePixelRatio + 1),
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#fffdf6",
        logging: false,
        imageTimeout: 15000,
        windowWidth: eventTicketEl.scrollWidth,
        windowHeight: eventTicketEl.scrollHeight
      });

      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4"
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;

      const imgProps = pdf.getImageProperties(imageData);
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      let renderWidth = maxWidth;
      let renderHeight = (imgProps.height * renderWidth) / imgProps.width;

      if (renderHeight > maxHeight) {
        renderHeight = maxHeight;
        renderWidth = (imgProps.width * renderHeight) / imgProps.height;
      }

      const x = (pageWidth - renderWidth) / 2;
      const y = (pageHeight - renderHeight) / 2;

      pdf.addImage(imageData, "PNG", x, y, renderWidth, renderHeight, undefined, "FAST");
      pdf.save("Sukhanwar-Open-Mic-Ticket.pdf");

      await Swal.fire({
        icon: "success",
        title: "Ticket downloaded",
        text: "Your ticket PDF has been generated successfully.",
        confirmButtonColor: "#663300"
      });
    } catch (error) {
      console.error("Ticket PDF export failed:", error);
      await Swal.fire({
        icon: "error",
        title: "Download failed",
        text: "Could not generate ticket PDF. Please try again.",
        confirmButtonColor: "#663300"
      });
    } finally {
      eventTicketEl.classList.remove("pdf-exporting");
      downloadTicketBtn.disabled = false;
      downloadTicketBtn.textContent = previousText;
    }
  });

  function initialize() {
    loadState();
    fillForm(state.user);

    if (state.user) {
      renderPaymentSummary();
      renderTicket();
    }

    if (state.transactionRef) {
      renderSuccess();
    }

    if (canOpen(state.currentStep)) {
      guardedNavigate(state.currentStep);
    } else {
      toSection("landing");
    }
  }

  initialize();
})();
