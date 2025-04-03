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
  document.getElementById("pageTitle").textContent = "Edit Profile";
}

// 显示修改密码页面
function showChangePasswordPage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "block";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Edit Profile";
}

// 显示阅读历史页面
function showReadingHistoryPage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "block";
  document.getElementById("pageTitle").textContent = "Reading History";
}

// 返回用户资料页面
function showProfilePage() {
  document.getElementById("profilePage").style.display = "block";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Edit Profile";
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
    // 移除所有导航项的激活状态
    document.querySelectorAll(".nav-links li").forEach((navItem) => {
      navItem.classList.remove("active");
    });

    // 添加当前导航项的激活状态
    this.classList.add("active");

    // 获取对应页面的ID
    const pageId = this.getAttribute("data-page");

    // 隐藏所有页面
    document.getElementById("profilePage").style.display = "none";
    document.getElementById("changeUsernamePage").style.display = "none";
    document.getElementById("changePasswordPage").style.display = "none";
    document.getElementById("readingHistoryPage").style.display = "none";

    // 显示对应页面并更新页面标题
    switch (pageId) {
      case "home":
        document.getElementById("pageTitle").textContent = "Home";
        break;
      case "user-profile":
        showProfilePage();
        break;
      case "my-book":
        document.getElementById("pageTitle").textContent = "My Book";
        break;
      case "goal-setting":
        document.getElementById("pageTitle").textContent = "Goal Setting";
        break;
      case "reading-history":
        showReadingHistoryPage();
        document.getElementById("pageTitle").textContent = "Reading History";
        break;
      case "settings":
        document.getElementById("pageTitle").textContent = "Settings";
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
  // 模拟历史记录数据
  const historyData = [
    {
      date: new Date().toISOString().slice(0, 10), // 今天的日期
      books: [
        { cover: "img/book1.png", title: "" },
        { cover: "img/book2.png", title: "" },
      ],
    },
    {
      date: new Date(new Date().getTime() - 24 * 3600 * 1000)
        .toISOString()
        .slice(0, 10), // 昨天的日期
      books: [
        { cover: "img/book3.png", title: "" },
        { cover: "img/book2.png", title: "" },
      ],
    },
    {
      date: new Date(new Date().getTime() - 48 * 3600 * 1000)
        .toISOString()
        .slice(0, 10), // 前天的日期
      books: [
        { cover: "img/book1.png", title: "" },
        { cover: "img/book3.png", title: "" },
      ],
    },
  ];

  // 获取历史记录容器
  const historyContainer = document.getElementById("history");

  // 渲染历史记录
  function renderHistory(data) {
    historyContainer.innerHTML = ""; // 清空历史记录容器

    if (data.length === 0) {
      // 如果没有历史记录，显示提示信息
      const noHistoryMessage = document.createElement("div");
      noHistoryMessage.classList.add("no-history-message");
      noHistoryMessage.textContent = "无历史记录";
      historyContainer.appendChild(noHistoryMessage);
    } else {
      // 如果有历史记录，正常渲染
      data.forEach((item) => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item");
        historyItem.style.display = "block";

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

  // 筛选历史记录
  function filterHistory() {
    const filterValue = document.getElementById("filter-select").value;
    let filteredData;

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
  renderHistory(historyData);
});

document.addEventListener("DOMContentLoaded", function () {
  // 监听搜索按钮的点击事件
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      const searchInput = document.getElementById("searchInput").value;
      const filterSelect = document.getElementById("filter-select").value;
      const startDate = document.getElementById("start-date").value;
      const endDate = document.getElementById("end-date").value;
      const historyItems = document.querySelectorAll(".history-item");

      // 默认显示所有历史记录
      historyItems.forEach((item) => {
        item.style.display = "block";
      });

      // 根据筛选条件隐藏历史记录
      if (filterSelect === "today") {
        document
          .querySelectorAll(".history-item:not(:first-child)")
          .forEach((item) => {
            item.style.display = "none";
          });
      } else if (filterSelect === "week") {
        document
          .querySelectorAll(".history-item:not(:nth-child(-n+2))")
          .forEach((item) => {
            item.style.display = "none";
          });
      } else if (filterSelect === "month") {
        document
          .querySelectorAll(".history-item:not(:nth-child(-n+3))")
          .forEach((item) => {
            item.style.display = "none";
          });
      }

      // 如果提供了开始和结束日期，则进一步筛选
      if (startDate && endDate) {
        console.log(`Filtering between ${startDate} and ${endDate}`);
        // 在这里添加日期筛选逻辑
      }

      // 如果搜索框有内容，则进一步筛选
      if (searchInput) {
        const searchLowercase = searchInput.toLowerCase();
        historyItems.forEach((item) => {
          const bookTitles = Array.from(item.querySelectorAll("span")).map(
            (el) => el.textContent.toLowerCase()
          );
          if (bookTitles.some((title) => title.includes(searchLowercase))) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      }
    });
});
