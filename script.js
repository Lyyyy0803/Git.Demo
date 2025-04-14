// 头像上传预览
document
  .getElementById("avatarUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profileAvatar").src = e.target.result;
        document.getElementById("profileAvatar").style.display = "block";
        document.getElementById("avatarPlaceholder").style.display = "none";

        // 更新顶部的头像
        document.querySelector(".user-avatar img").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// 点击占位符触发文件选择
document
  .getElementById("avatarPlaceholder")
  .addEventListener("click", function () {
    document.getElementById("avatarUpload").click();
  });

// 显示修改用户名页面
function showChangeUsernamePage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "block";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Edit Profile";
}

// 显示修改密码页面
function showChangePasswordPage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "block";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Edit Profile";
}

// 显示阅读历史页面
function showReadingHistoryPage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "block";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Reading History";
}

// 返回用户资料页面
function showProfilePage() {
  document.getElementById("profilePage").style.display = "block";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Edit Profile";
}

// 显示 My Book 页面
function showMyBookPage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "block";
  document.getElementById("pageTitle").textContent = "My Book";
}

// 更新用户名
function updateUsername() {
  const newUsername = document.getElementById("newUsername").value;
  if (newUsername) {
    alert("用户名已成功更新为: " + newUsername);
    document.getElementById("usernameDisplay").textContent =
      "User Name: " + newUsername;
    showProfilePage();
  } else {
    alert("请输入新用户名");
  }
  document.getElementById("greetingUser").textContent = "Hi, " + newUsername;
}

// 更新密码
function updatePassword() {
  const verificationCode = document.getElementById("verificationCode").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!verificationCode) {
    alert("请输入验证码");
    return;
  }

  if (!newPassword || newPassword.length < 6) {
    alert("密码长度至少为6位");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("两次输入的密码不一致");
    return;
  }

  alert("密码已成功更新");
  showProfilePage();
}

// 导航栏点击事件
document.querySelectorAll(".nav-links li").forEach((item) => {
  item.addEventListener("click", function () {
    hideAllPages(); // 隐藏所有页面
    // 移除所有导航项的激活状态
    document.querySelectorAll(".nav-links li").forEach((navItem) => {
      navItem.classList.remove("active");
    });

    // 添加当前导航项的激活状态
    this.classList.add("active");

    // 获取对应页面的ID
    const pageId = this.getAttribute("data-page");

    // 统一在非 admin 页面时移除深色主题
    if (pageId !== "admin") {
      document.body.classList.remove("dark-theme");
    }

    // 隐藏所有页面
    document.getElementById("profilePage").style.display = "none";
    document.getElementById("changeUsernamePage").style.display = "none";
    document.getElementById("changePasswordPage").style.display = "none";
    document.getElementById("readingHistoryPage").style.display = "none";
    document.getElementById("myBookPage").style.display = "none";

    // document.body.classList.remove("dark-theme"); // 关闭深色主题

    // 显示对应页面并更新页面标题
    switch (pageId) {
      case "home":
        hideAllPages();
        document.getElementById("homePage").style.display = "block";
        document.getElementById("pageTitle").textContent = "Home";
        break;
      case "user-profile":
        showProfilePage();
        break;
      case "my-book":
        showMyBookPage();
        document.getElementById("pageTitle").textContent = "My Book";
        break;
      case "goal-setting":
        hideAllPages();
        document.getElementById("goalSettingPage").style.display = "block";
        document.getElementById("pageTitle").textContent = "Goal Setting";
        break;
      case "reading-history":
        showReadingHistoryPage();
        document.getElementById("pageTitle").textContent = "Reading History";
        break;

      case "admin":
        hideAllPages(); // 隐藏所有页面
        document.getElementById("adminUserManagement").style.display = "block";
        document.getElementById("pageTitle").textContent = "User Management";
        document.body.classList.add("dark-theme"); // 切换到深色主题
        break;

      case "settings":
        // hideAllPages();
        showSettingsPage();
        document.getElementById("pageTitle").textContent = "Settings";
        break;
      default:
        document.body.classList.remove("dark-theme");
        break;
    }
  });
});

// 为“Log out”项添加点击事件监听器
document
  .getElementById("logoutItem")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "signin.html";
  });

document.addEventListener("DOMContentLoaded", function () {
  // 获取历史记录容器
  const historyContainer = document.getElementById("history");

  // 渲染历史记录
  function renderHistory(data) {
    historyContainer.innerHTML = ""; // 清空历史记录容器

    if (data.length === 0) {
      // 如果没有历史记录，显示提示信息
      const noHistoryMessage = document.createElement("div");
      noHistoryMessage.classList.add("no-history-message");
      noHistoryMessage.textContent =
        "There is no historical record for the time being.";
      historyContainer.appendChild(noHistoryMessage);
    } else {
      // 如果有历史记录，正常渲染
      data.forEach((item) => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item");

        const dateHeader = document.createElement("h2");
        dateHeader.textContent = item.date;
        historyItem.appendChild(dateHeader);

        const bookList = document.createElement("div");
        bookList.classList.add("book-list");

        item.books.forEach((book) => {
          const bookElement = document.createElement("div");
          bookElement.classList.add("book");

          const bookImage = document.createElement("img");
          bookImage.src = book.cover;
          bookImage.alt = "Book Cover";
          bookElement.appendChild(bookImage);

          const bookTitle = document.createElement("span");
          bookTitle.textContent = book.title;
          bookElement.appendChild(bookTitle);

          bookList.appendChild(bookElement);
        });

        historyItem.appendChild(bookList);
        historyContainer.appendChild(historyItem);
      });
    }
  }

  // 从服务器获取历史记录
  function fetchHistory() {
    fetch("/api/history") // 假设您的API端点是'/api/history'
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        renderHistory(data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
        const noHistoryMessage = document.createElement("div");
        noHistoryMessage.classList.add("no-history-message");
        noHistoryMessage.textContent = "Failed to load history.";
        historyContainer.appendChild(noHistoryMessage);
      });
  }

  // 筛选历史记录
  function filterHistory() {
    const filterValue = document.getElementById("filter-select").value;
    let filteredData = historyData;

    switch (filterValue) {
      case "week":
        filteredData = historyData.filter((item) => {
          const date = new Date(item.date);
          return date >= new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);
        });
        break;
      case "month":
        filteredData = historyData.filter((item) => {
          const date = new Date(item.date);
          return date >= new Date(new Date().getTime() - 30 * 24 * 3600 * 1000);
        });
        break;
      case "year":
        filteredData = historyData.filter((item) => {
          const date = new Date(item.date);
          return (
            date >= new Date(new Date().getTime() - 365 * 24 * 3600 * 1000)
          );
        });
        break;
      default:
        filteredData = historyData;
    }

    // 按时间顺序排序
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 渲染筛选后的数据
    renderHistory(filteredData);
  }

  // 监听筛选器的变化
  document
    .getElementById("filter-select")
    .addEventListener("change", filterHistory);

  // 初始化渲染全部历史记录
  fetchHistory();

  // 监听搜索按钮的点击事件
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      const searchInput = document
        .getElementById("searchInput")
        .value.toLowerCase();
      const historyItems = document.querySelectorAll(".history-item");

      // 默认显示所有历史记录
      historyItems.forEach((item) => {
        item.style.display = "block";
      });

      // 如果搜索框有内容，则进一步筛选
      if (searchInput) {
        historyItems.forEach((item) => {
          const bookTitles = Array.from(item.querySelectorAll("span")).map(
            (el) => el.textContent.toLowerCase()
          );
          if (bookTitles.some((title) => title.includes(searchInput))) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      }
    });
});

// 显示创建阅读日志表单
function showReadingLogForm() {
  document.getElementById("readingLogForm").style.display = "flex";
}

// 隐藏创建阅读日志表单
function hideReadingLogForm() {
  document.getElementById("readingLogForm").style.display = "none";
}

// 创建阅读日志
function createReadingLog() {
  const bookTitle = document.getElementById("bookTitle").value;
  const bookAuthor = document.getElementById("bookAuthor").value;
  const readingDate = document.getElementById("readingDate").value;
  const bookReview = document.getElementById("bookReview").value;
  const bookCover = document.getElementById("bookCoverPreview").src;

  if (!bookTitle || !bookAuthor || !readingDate) {
    alert("请填写书名、作者和阅读日期");
    return;
  }

  // 创建书籍卡片
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.dataset.title = bookTitle;
  bookCard.dataset.author = bookAuthor;
  bookCard.dataset.date = readingDate;
  bookCard.dataset.review = bookReview;
  bookCard.dataset.cover = bookCover;
  bookCard.innerHTML = `
    <img src="${
      bookCover || "https://via.placeholder.com/200"
    }" alt="${bookTitle}">
    <div class="book-info">
      <div class="book-title">${bookTitle}</div>
      <div class="book-author">${bookAuthor}</div>
    </div>
  `;

  // 添加点击事件
  bookCard.addEventListener("click", function () {
    showBookDetails();
    // 同时更新详情页内容
    document.getElementById("bookTitle").textContent = this.dataset.title;
    document.getElementById("bookAuthor").textContent = this.dataset.author;
    document.getElementById("bookDate").textContent = this.dataset.date;
    document.getElementById("bookReview").textContent = this.dataset.review;
    document.getElementById("bookCover").src = this.dataset.cover;
  });

  // 获取书籍网格
  const favouriteBooks = document.getElementById("favouriteBooks");

  // 将按钮移到最后
  const addBookBtn = document.querySelector(".add-book-btn");
  if (addBookBtn) {
    favouriteBooks.appendChild(addBookBtn);
  }

  // 添加书籍卡片
  favouriteBooks.insertBefore(bookCard, addBookBtn);

  // 将数据存储到 localStorage
  const bookData = {
    title: bookTitle,
    author: bookAuthor,
    date: readingDate,
    review: bookReview,
    cover: bookCover,
  };
  const books = JSON.parse(localStorage.getItem("books") || "[]");
  books.push(bookData);
  localStorage.setItem("books", JSON.stringify(books));

  // 隐藏表单并重置输入
  hideReadingLogForm();
  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("readingDate").value = "";
  document.getElementById("bookReview").value = "";
  document.getElementById("bookCoverPreview").style.display = "none";
  document.getElementById("uploadPlaceholder").style.display = "flex";
}

// 显示阅读记录详情
function showReadingDetails(title, author, date, review) {
  document.getElementById("detailTitle").textContent = title;
  document.getElementById("detailAuthor").textContent = `Author: ${author}`;
  document.getElementById("detailDate").textContent = `Reading Date: ${date}`;
  document.getElementById("detailReview").textContent = `Review: ${review}`;
  document.getElementById("readingDetails").style.display = "flex";
}

// 关闭阅读记录详情
function closeReadingDetails() {
  document.getElementById("readingDetails").style.display = "none";
}

// 上传书籍封面
document
  .getElementById("bookCoverUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("bookCoverPreview").src = e.target.result;
        document.getElementById("bookCoverPreview").style.display = "block";
        document.getElementById("uploadPlaceholder").style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });

// 点击加号按钮触发文件选择
document
  .getElementById("uploadPlaceholder")
  .addEventListener("click", function () {
    document.getElementById("bookCoverUpload").click();
  });

//目标选择更新
// 目标管理功能
let currentGoalId = null;
let goals = JSON.parse(localStorage.getItem("goals")) || [];

// 初始化测量单位选择
document.querySelectorAll(".measurement-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".measurement-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  });
});

// 创建新目标
function createNewGoal() {
  const goal = {
    id: Date.now(),
    name: document.getElementById("goalName").value,
    unit: document.querySelector(".measurement-btn.active").dataset.unit,
    target: parseInt(document.getElementById("targetValue").value),
    start: document.getElementById("startDate").value,
    end: document.getElementById("endDate").value,
    cover:
      document.getElementById("goalCoverPreview").style.backgroundImage || "",
    progress: 0,
    completed: false,
  };

  if (!validateGoal(goal)) return;

  goals.push(goal);
  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
  clearGoalForm();
}

function validateGoal(goal) {
  if (!goal.name || !goal.target || !goal.start || !goal.end) {
    alert("Please fill all required fields");
    return false;
  }
  if (new Date(goal.start) > new Date(goal.end)) {
    alert("End date cannot be earlier than start date");
    return false;
  }
  return true;
}

// 渲染目标看板
function renderGoals() {
  const grid = document.getElementById("goalGrid");
  grid.innerHTML = "";

  goals.forEach((goal) => {
    const progressPercent = Math.min(
      Math.round((goal.progress / goal.target) * 100),
      100
    );
    const card = document.createElement("div");
    card.className = `goal-card ${goal.completed ? "completed" : ""}`;
    card.innerHTML = `
      <button class="delete-goal" onclick="deleteGoal(${
        goal.id
      })"><i class="fas fa-times"></i></button>
      <div class="goal-cover" style="background-image: url(${
        goal.cover
      })"></div>
      <h4>${goal.name}</h4>
      <p>Target: ${goal.target} ${goal.unit}</p>
      <p>Duration: ${formatDate(goal.start)} - ${formatDate(goal.end)}</p>
      <div class="progress-ring" onclick="showProgressModal(${goal.id})" 
           style="background: conic-gradient(#a262ad ${progressPercent}%, #e6d0ef ${progressPercent}% 100%)">
        <div class="progress-percent">${progressPercent}%</div>
      </div>
      ${goal.completed ? '<i class="fas fa-check-circle checkmark"></i>' : ""}
    `;
    grid.appendChild(card);
  });
}

// 删除目标
function deleteGoal(id) {
  if (!confirm("Are you sure to delete this goal?")) return;
  goals = goals.filter((goal) => goal.id !== id);
  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
}

// 更新进度
function showProgressModal(id) {
  currentGoalId = id;
  document.getElementById("progressModal").style.display = "flex";
}

function updateProgress() {
  const goal = goals.find((g) => g.id === currentGoalId);
  const newProgress = parseInt(
    document.getElementById("currentProgress").value
  );

  if (newProgress > goal.target || newProgress < 0) {
    alert(`Please enter a value between 0 and ${goal.target}`);
    return;
  }

  goal.progress = newProgress;
  goal.completed = newProgress >= goal.target;
  localStorage.setItem("goals", JSON.stringify(goals));
  closeProgressModal();
  renderGoals();
}

function closeProgressModal() {
  document.getElementById("progressModal").style.display = "none";
  currentGoalId = null;
  document.getElementById("currentProgress").value = "";
}

// 封面图片上传
document
  .getElementById("goalCoverUpload")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        document.getElementById(
          "goalCoverPreview"
        ).style.backgroundImage = `url(${event.target.result})`;
      };
      reader.readAsDataURL(file);
    }
  });

// 辅助函数
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function clearGoalForm() {
  document.getElementById("goalName").value = "";
  document.getElementById("targetValue").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("goalCoverPreview").style.backgroundImage = "";
}
function hideAllPages() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("goalSettingPage").style.display = "none";
  document.getElementById("homePage").style.display = "none";
  document.getElementById("settingsPage").style.display = "none";
  document.getElementById("adminUserManagement").style.display = "none";
  hidePrivacyModal();
  if (document.getElementById("bookDetailsPage")) {
    // Check if exists
    document.getElementById("bookDetailsPage").style.display = "none";
  }
  if (document.getElementById("readingLogForm")) {
    // Check if exists
    document.getElementById("readingLogForm").style.display = "none";
  }
  if (document.getElementById("progressModal")) {
    // Check if exists
    closeProgressModal(); // Use existing function if available
  }
  // Add hide logic for readingDetails if it's a separate overlay
  if (document.getElementById("readingDetails")) {
    document.getElementById("readingDetails").style.display = "none";
  }
  // If homeContent itself is hidden for book details, ensure it's shown when hiding all
  if (document.getElementById("homeContent")) {
    document.getElementById("homeContent").style.display = "block";
  }
}

// 初始化显示首页
document.addEventListener("DOMContentLoaded", function () {
  hideAllPages();
  document.getElementById("homePage").style.display = "block";
  document
    .querySelector('.nav-links li[data-page="home"]')
    .classList.add("active");
});

// 显示书籍详情页（作为主页的一部分）
function showBookDetails() {
  // 隐藏主页内容
  document.getElementById("homeContent").style.display = "none";

  // 显示书籍详情页
  document.getElementById("bookDetailsPage").style.display = "block";
  document.getElementById("pageTitle").textContent = "Book Details";
}

// 隐藏书籍详情页（返回主页内容）
function hideBookDetails() {
  // 隐藏书籍详情页
  document.getElementById("bookDetailsPage").style.display = "none";

  // 显示主页内容
  document.getElementById("homeContent").style.display = "block";
  document.getElementById("pageTitle").textContent = "Home";
}

// 初始化时渲染目标
document.addEventListener("DOMContentLoaded", renderGoals);

function showSettingsPage() {
  // hideAllPages(); // Called by the navigation handler already
  document.getElementById("settingsPage").style.display = "block";
  // Ensure the modal is hidden when first navigating to settings
  hidePrivacyModal();
}

// Placeholder for Language Setting Action
function handleLanguageSetting() {
  console.log("Language setting option clicked - Placeholder");
  // Future implementation: Show language selection options, etc.
  alert("Language settings are not yet implemented.");
}

// Show Privacy Modal
function showPrivacyModal() {
  const modalOverlay = document.getElementById("privacyModalOverlay");
  if (modalOverlay) {
    modalOverlay.style.display = "flex"; // Use flex to enable centering
    // Trigger fade-in animation using a class
    setTimeout(() => {
      // Timeout ensures display:flex is applied before class change
      modalOverlay.classList.add("visible");
    }, 10); // Small delay
  }
}

// Hide Privacy Modal
function hidePrivacyModal() {
  const modalOverlay = document.getElementById("privacyModalOverlay");
  if (modalOverlay) {
    // Trigger fade-out animation
    modalOverlay.classList.remove("visible");
    // Wait for transition to finish before setting display to none
    setTimeout(() => {
      modalOverlay.style.display = "none";
    }, 300); // Match CSS transition duration (0.3s)
  }
}

/* Admin User Management */
// 显示管理员弹窗
function showAdminModal(username) {
  document.getElementById("modalUsername").textContent = username;

  // 模拟获取用户阅读记录数据
  const records = [
    { date: "2025-04-10", book: "The Great Gatsby", pages: 45 },
    { date: "2025-04-08", book: "To Kill a Mockingbird", pages: 32 },
    { date: "2025-04-05", book: "1984", pages: 28 },
  ];

  const recordsList = document.getElementById("recordsList");
  recordsList.innerHTML = "";

  records.forEach((record) => {
    const recordItem = document.createElement("div");
    recordItem.className = "record-item";
    recordItem.innerHTML = `
      <p><strong>Date:</strong> ${record.date}</p>
      <p><strong>Book:</strong> ${record.book}</p>
      <p><strong>Pages Read:</strong> ${record.pages}</p>
    `;
    recordsList.appendChild(recordItem);
  });

  // 显示弹窗
  document.getElementById("adminModalOverlay").style.display = "flex";
  setTimeout(() => {
    document.getElementById("adminModalOverlay").classList.add("visible");
  }, 10);
}

// 隐藏管理员弹窗
function hideAdminModal() {
  document.getElementById("adminModalOverlay").classList.remove("visible");
  setTimeout(() => {
    document.getElementById("adminModalOverlay").style.display = "none";
  }, 300);
}

// 显示Ban弹窗
function showBanModal(username) {
  document.getElementById("banModalUsername").textContent = username;

  // 重置表单状态
  document.querySelector(
    'input[name="userStatus"][value="active"]'
  ).checked = true;
  document.getElementById("banReason").value = "";
  document.getElementById("customReason").value = "";
  document.getElementById("customReasonGroup").style.display = "none";

  // 监听封禁原因选择变化
  document.getElementById("banReason").addEventListener("change", function () {
    if (this.value === "other") {
      document.getElementById("customReasonGroup").style.display = "block";
    } else {
      document.getElementById("customReasonGroup").style.display = "none";
    }
  });

  // 显示弹窗
  document.getElementById("banModalOverlay").style.display = "flex";
  setTimeout(() => {
    document.getElementById("banModalOverlay").classList.add("visible");
  }, 10);
}

// 隐藏Ban弹窗
function hideBanModal() {
  document.getElementById("banModalOverlay").classList.remove("visible");
  setTimeout(() => {
    document.getElementById("banModalOverlay").style.display = "none";
  }, 300);
}

// 确认封禁操作
function confirmBanAction() {
  const username = document.getElementById("banModalUsername").textContent;
  const status = document.querySelector(
    'input[name="userStatus"]:checked'
  ).value;
  const reason = document.getElementById("banReason").value;
  const customReason = document.getElementById("customReason").value;

  // 验证必填字段
  if (status === "banned" && !reason) {
    alert("Please select a ban reason");
    return;
  }

  if (reason === "other" && !customReason.trim()) {
    alert("Please specify the ban reason");
    return;
  }

  // 构建完整原因
  const fullReason = reason === "other" ? customReason : reason;

  // 执行封禁/解封操作
  console.log(
    `User ${username} status changed to ${status}. Reason: ${fullReason}`
  );

  // 这里可以添加实际的API调用
  alert(`User ${username} has been ${status}. Reason: ${fullReason}`);

  hideBanModal();
}

// 当前管理员状态
let currentAdminLevel = "super"; // 默认设置为超级管理员

// 显示管理员权限弹窗
function showAdminPrivilegeModal(username) {
  document.getElementById("adminPrivilegeUsername").textContent = username;
  document.getElementById("currentAdminLevel").textContent =
    currentAdminLevel === "super" ? "Super Admin" : "Regular Admin";

  // 如果是普通管理员，隐藏权限选项
  if (currentAdminLevel !== "super") {
    document.getElementById("privilegeOptions").style.display = "none";
  } else {
    document.getElementById("privilegeOptions").style.display = "block";
    // 重置选项，默认选中Regular Admin
    document.querySelector(
      'input[name="adminLevel"][value="regular"]'
    ).checked = true;
    document.querySelector(
      'input[name="adminLevel"][value="normal"]'
    ).checked = false;
    document.querySelector(
      'input[name="adminLevel"][value="super"]'
    ).checked = false;
  }

  // 显示弹窗
  document.getElementById("adminPrivilegeModalOverlay").style.display = "flex";
  setTimeout(() => {
    document
      .getElementById("adminPrivilegeModalOverlay")
      .classList.add("visible");
  }, 10);
}

// 隐藏管理员权限弹窗
function hideAdminPrivilegeModal() {
  document
    .getElementById("adminPrivilegeModalOverlay")
    .classList.remove("visible");
  setTimeout(() => {
    document.getElementById("adminPrivilegeModalOverlay").style.display =
      "none";
  }, 300);
}

// 确认管理员权限操作
function confirmAdminPrivilegeAction() {
  const username = document.getElementById(
    "adminPrivilegeUsername"
  ).textContent;
  const adminLevel = document.querySelector(
    'input[name="adminLevel"]:checked'
  ).value;

  // 执行权限分配操作
  console.log(`Granting ${adminLevel} admin privileges to ${username}`);
  alert(
    `Successfully granted ${
      adminLevel === "super" ? "Super Admin" : "Regular Admin"
    } privileges to ${username}`
  );

  hideAdminPrivilegeModal();
}

// 修改按钮点击事件处理
function placeholderFunction(action, username) {
  if (action === "View Records") {
    showAdminModal(username);
  } else if (action === "Ban") {
    showBanModal(username);
  } else if (action === "Grant Admin") {
    showAdminPrivilegeModal(username);
  } else {
    console.log("Button clicked: " + action + " for " + username);
    alert(action + " for " + username + " is not implemented yet.");
  }
}

// 显示管理员用户管理页面（供导航调用）
function showAdminPage() {
  hideAllPages(); // 隐藏其它页面
  document.getElementById("adminUserManagement").style.display = "block";
  document.getElementById("pageTitle").textContent = "User Management";
}
