/* Mobile Menu */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.onclick = function () {
        navLinks.classList.toggle("active");
    };

    document.addEventListener("click", function (e) {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove("active");
        }
    });

    const navItems = document.querySelectorAll(".nav-links a");

    for (let i = 0; i < navItems.length; i++) {
        navItems[i].onclick = function () {
            navLinks.classList.remove("active");
        };
    }
}

/* Search Function */
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

function goToSection(sectionId, linkText) {
    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }

    if (searchResult) {
        searchResult.innerHTML =
            'Found: <a href="#' + sectionId + '">' + linkText + '</a>';
    }
}

function searchWebsite() {
    if (!searchInput) {
        return;
    }

    let searchText = searchInput.value.toLowerCase().trim();

    if (searchText === "") {
        alert("Please type something to search.");
        return;
    }

    if (
        searchText.includes("company values") ||
        searchText.includes("values") ||
        searchText.includes("value") ||
        searchText.includes("integrity") ||
        searchText.includes("innovation") ||
        searchText.includes("inclusivity") ||
        searchText.includes("find company values") ||
        searchText.includes("show company values") ||
        searchText.includes("take me to company values") ||
        searchText.includes("find values") ||
        searchText.includes("show values") ||
        searchText.includes("take me to values")
    ) {
        goToSection("values", "Company Values");
        return;
    }

    if (
        searchText.includes("about the company") ||
        searchText.includes("about company") ||
        searchText.includes("about") ||
        searchText.includes("gelos") ||
        searchText.includes("home") ||
        searchText.includes("find about the company") ||
        searchText.includes("show about the company") ||
        searchText.includes("take me to about the company") ||
        searchText.includes("find about") ||
        searchText.includes("show about") ||
        searchText.includes("take me to about")
    ) {
        goToSection("home", "About the Company");
        return;
    }

    if (
        searchText.includes("offerings") ||
        searchText.includes("offering") ||
        searchText.includes("services") ||
        searchText.includes("service") ||
        searchText.includes("digital") ||
        searchText.includes("digital transformation") ||
        searchText.includes("cloud") ||
        searchText.includes("cloud services") ||
        searchText.includes("artificial intelligence") ||
        searchText.includes("artificial") ||
        searchText.includes("ai") ||
        searchText.includes("find offerings") ||
        searchText.includes("show offerings") ||
        searchText.includes("take me to offerings")
    ) {
        goToSection("offerings", "Company Offerings");
        return;
    }

    if (
        searchText.includes("contact us") ||
        searchText.includes("contact") ||
        searchText.includes("contact details") ||
        searchText.includes("phone") ||
        searchText.includes("phone number") ||
        searchText.includes("email") ||
        searchText.includes("address") ||
        searchText.includes("message") ||
        searchText.includes("enquiry") ||
        searchText.includes("form") ||
        searchText.includes("find contact") ||
        searchText.includes("show contact") ||
        searchText.includes("take me to contact")
    ) {
        goToSection("contact", "Contact Us");
        return;
    }

    if (
        searchText.includes("case study 1") ||
        searchText.includes("case study one") ||
        searchText.includes("improving operations") ||
        searchText.includes("gelos products") ||
        searchText.includes("products and services") ||
        searchText.includes("read more")
    ) {
        window.location.href = "case-study1.html";
        return;
    }

    if (
        searchText.includes("case study 2") ||
        searchText.includes("case study two") ||
        searchText.includes("solving business problems") ||
        searchText.includes("business problems") ||
        searchText.includes("know more")
    ) {
        window.location.href = "case-study2.html";
        return;
    }

    if (searchResult) {
        searchResult.innerHTML =
            'No match found. Try <a href="#home">About the Company</a>, <a href="#offerings">Offerings</a>, <a href="#values">Company Values</a>, or <a href="#contact">Contact Us</a>.';
    } else {
        alert("No matching section found.");
    }
}

if (searchBtn && searchInput) {
    searchBtn.onclick = function () {
        searchWebsite();
    };

    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            searchWebsite();
        }
    });
}

/* Voice Search */
const voiceBtn = document.getElementById("voiceBtn");
const voiceMessage = document.getElementById("voiceMessage");

if (voiceBtn && searchInput && voiceMessage) {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();

        recognition.lang = "en-AU";
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceBtn.onclick = function () {
            voiceMessage.textContent =
                "Listening... please speak now.";
            recognition.start();
        };

        recognition.onresult = function (event) {
            const spokenText = event.results[0][0].transcript;

            searchInput.value = spokenText;

            voiceMessage.textContent =
                "Voice search captured: " + spokenText;

            searchWebsite();
        };

        recognition.onerror = function () {
            voiceMessage.textContent =
                "Voice search was blocked. Please type your search instead.";

            searchInput.focus();
        };
    } else {
        voiceMessage.textContent =
            "Voice search is not supported in this browser. Please use Chrome or type your search.";
    }
}

/* Slider */
const slidesWrapper = document.getElementById("slidesWrapper");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sliderDots = document.getElementById("sliderDots");
const slides = document.querySelectorAll(".slide-box");

let currentSlide = 0;

function showSlide() {
    if (!slidesWrapper || !sliderDots || slides.length === 0) {
        return;
    }

    slidesWrapper.style.transform =
        "translateX(-" + currentSlide * 50 + "%)";

    if (currentSlide === 0) {
        sliderDots.textContent = "● ○";
    } else {
        sliderDots.textContent = "○ ●";
    }
}

if (prevBtn && nextBtn && slidesWrapper && slides.length > 0) {
    prevBtn.onclick = function () {
        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide();
    };

    nextBtn.onclick = function () {
        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide();
    };

    showSlide();
}

/* Accordion */
const accordionButtons = document.querySelectorAll(".accordion-btn");

for (let i = 0; i < accordionButtons.length; i++) {
    accordionButtons[i].onclick = function () {
        this.parentElement.classList.toggle("active");
    };
}

/* Contact Form */
const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");
const formError = document.getElementById("formError");

if (
    contactForm &&
    nameInput &&
    emailInput &&
    phoneInput &&
    messageInput &&
    nameError &&
    emailError &&
    phoneError &&
    messageError &&
    formError
) {
    contactForm.onsubmit = function (e) {
        e.preventDefault();

        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        messageError.textContent = "";
        formError.textContent = "";

        let valid = true;

        if (
            nameInput.value.trim() === "" ||
            emailInput.value.trim() === "" ||
            phoneInput.value.trim() === "" ||
            messageInput.value.trim() === ""
        ) {
            formError.textContent = "Enter the complete details";
            valid = false;
        }

        if (
            nameInput.value !== "" &&
            /^[A-Za-z.\s]+$/.test(nameInput.value) === false
        ) {
            nameError.textContent =
                "Only letters, space and dots allowed";
            valid = false;
        }

        if (
            phoneInput.value !== "" &&
            /^[0-9]+$/.test(phoneInput.value) === false
        ) {
            phoneError.textContent =
                "Only numbers allowed";
            valid = false;
        }

        if (valid === true) {
            alert("Form submitted successfully.");
            contactForm.reset();
        }
    };

    nameInput.oninput = function () {
        nameInput.value =
            nameInput.value.replace(/[^A-Za-z.\s]/g, "");
    };

    phoneInput.oninput = function () {
        phoneInput.value =
            phoneInput.value.replace(/[^0-9]/g, "");
    };
}

/* Newsletter Signup */
const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
    newsletterForm.onsubmit = function (e) {
        e.preventDefault();

        const newsletterName =
            document.getElementById("newsletterName");

        const newsletterEmail =
            document.getElementById("newsletterEmail");

        const category =
            document.getElementById("category");

        const newsletterMessage =
            document.getElementById("newsletterMessage");

        newsletterMessage.textContent = "";

        if (
            newsletterName.value.trim() === "" ||
            newsletterEmail.value.trim() === "" ||
            category.value === ""
        ) {
            newsletterMessage.textContent =
                "Please complete all fields.";
            return;
        }

        if (newsletterEmail.value.includes("@") === false) {
            newsletterMessage.textContent =
                "Please enter a valid email address.";
            return;
        }

        newsletterMessage.textContent =
            "Newsletter signup submitted successfully.";

        newsletterForm.reset();
    };
}
