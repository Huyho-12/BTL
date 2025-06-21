// Smooth scrolling cho navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".section, .project-item").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "all 0.6s ease";
  observer.observe(section);
});

// Page loader
window.addEventListener("load", function () {
  const loader = document.getElementById("pageLoader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1000);
});

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}
const skillsSection = document.getElementById("skills");
const skillsObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
skillsObserver.observe(skillsSection);

// Edit info functions
let isEditMode = false;
let originalData = {};

function toggleEditMode() {
  isEditMode = !isEditMode;
  const editBtn = document.getElementById("editBtn");
  const editActions = document.getElementById("editActions");
  if (isEditMode) {
    saveOriginalData();
    document
      .querySelectorAll(".info-value")
      .forEach((el) => (el.style.display = "none"));
    document
      .querySelectorAll(".info-input")
      .forEach((el) => (el.style.display = "inline-block"));
    editBtn.innerHTML = '<i class="fas fa-times"></i>';
    editBtn.onclick = cancelEdit;
    editActions.style.display = "flex";
    document.getElementById("personalInfo").style.background =
      "linear-gradient(135deg, #667eea10, #764ba210)";
  } else {
    exitEditMode();
  }
}

function saveOriginalData() {
  originalData = {
    fullName: document.getElementById("fullName").textContent,
    birthDate: document.getElementById("birthDate").textContent,
    gender: document.getElementById("gender").textContent,
    address: document.getElementById("address").textContent,
    phone: document.getElementById("phone").textContent,
    email: document.getElementById("email").textContent,
    jobTitle: document.getElementById("jobTitle").textContent,
  };
}

function exitEditMode() {
  document
    .querySelectorAll(".info-value")
    .forEach((el) => (el.style.display = "inline"));
  document
    .querySelectorAll(".info-input")
    .forEach((el) => (el.style.display = "none"));
  const editBtn = document.getElementById("editBtn");
  const editActions = document.getElementById("editActions");
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.onclick = toggleEditMode;
  editActions.style.display = "none";
  document.getElementById("personalInfo").style.background = "transparent";
  isEditMode = false;
}

function saveChanges() {
  document.getElementById("fullName").textContent =
    document.getElementById("fullNameInput").value;
  // Format birth date
  const birthDate = new Date(document.getElementById("birthDateInput").value);
  document.getElementById("birthDate").textContent =
    birthDate.toLocaleDateString("vi-VN");
  document.getElementById("gender").textContent =
    document.getElementById("genderInput").value;
  document.getElementById("address").textContent =
    document.getElementById("addressInput").value;
  document.getElementById("phone").textContent =
    document.getElementById("phoneInput").value;
  document.getElementById("email").textContent =
    document.getElementById("emailInput").value;
  document.getElementById("jobTitle").textContent =
    document.getElementById("jobTitleInput").value;
  // Update profile section
  document.getElementById("profileName").textContent =
    document.getElementById("fullNameInput").value;
  document.getElementById("profileTitle").textContent =
    document.getElementById("jobTitleInput").value;
  // Update hero section
  document.getElementById("heroFullName").textContent =
    document.getElementById("fullNameInput").value;
  document.getElementById("heroTitle").innerHTML =
    document.getElementById("jobTitleInput").value +
    " | Đam mê công nghệ | Sáng tạo & Nhiệt huyết";
  exitEditMode();
  showSuccessMessage();
}

function cancelEdit() {
  document.getElementById("fullNameInput").value = originalData.fullName;
  document.getElementById("genderInput").value = originalData.gender;
  document.getElementById("addressInput").value = originalData.address;
  document.getElementById("phoneInput").value = originalData.phone;
  document.getElementById("emailInput").value = originalData.email;
  document.getElementById("jobTitleInput").value = originalData.jobTitle;
  exitEditMode();
}

function showSuccessMessage() {
  const message = document.createElement("div");
  message.className = "success-message";
  message.innerHTML =
    '<i class="fas fa-check-circle"></i> Thông tin đã được cập nhật thành công!';
  const personalInfo = document.getElementById("personalInfo");
  personalInfo.insertBefore(message, personalInfo.firstChild);
  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Profile Image Functions
function changeProfileImage() {
  document.getElementById("imageInput").click();
}
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profileImg").src = e.target.result;
      showImageSuccessMessage();
    };
    reader.readAsDataURL(file);
  }
}
function showImageSuccessMessage() {
  const message = document.createElement("div");
  message.className = "success-message";
  message.innerHTML =
    '<i class="fas fa-check-circle"></i> Ảnh đại diện đã được cập nhật!';
  message.style.position = "fixed";
  message.style.top = "100px";
  message.style.right = "20px";
  message.style.zIndex = "9999";
  document.body.appendChild(message);
  setTimeout(() => {
    message.remove();
  }, 3000);
}

// --- Initialize gender select ---
// Đặt giá trị mặc định cho select giới tính
document.getElementById("genderInput").value = "Nam";
