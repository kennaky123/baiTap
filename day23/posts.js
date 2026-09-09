let token = localStorage.getItem("token");
let currentUser = JSON.parse(localStorage.getItem("user") || "null");
let posts = [];

const postList = document.querySelector("#postList");
const loading = document.querySelector("#loading");
const message = document.querySelector("#message");
const logoutBtn = document.querySelector("#logoutBtn");
const userInfo = document.querySelector("#userInfo");
const showAddFormBtn = document.querySelector("#showAddFormBtn");
const addPostSection = document.querySelector("#addPostSection");
const addPostForm = document.querySelector("#addPostForm");
const postTitle = document.querySelector("#postTitle");
const postBody = document.querySelector("#postBody");
const addPostError = document.querySelector("#addPostError");
const cancelAddBtn = document.querySelector("#cancelAddBtn");
const searchInput = document.querySelector("#searchInput");
const detailDialog = document.querySelector("#detailDialog");
const detailTitle = document.querySelector("#detailTitle");
const detailBody = document.querySelector("#detailBody");
const detailTags = document.querySelector("#detailTags");
const closeDetailBtn = document.querySelector("#closeDetailBtn");
const editDialog = document.querySelector("#editDialog");
const editPostForm = document.querySelector("#editPostForm");
const editPostId = document.querySelector("#editPostId");
const editTitle = document.querySelector("#editTitle");
const editBody = document.querySelector("#editBody");
const editError = document.querySelector("#editError");
const cancelEditBtn = document.querySelector("#cancelEditBtn");

function requireAuth() {
  if (!token || !currentUser) {
    window.location.href = "./login.html";

    return false;
  }

  return true;
}

if (requireAuth()) {
  userInfo.textContent = `Xin chào, ${currentUser.firstName} ${currentUser.lastName}`;

  fetchPosts();
}

function escapeHTML(text) {
  const div = document.createElement("div");

  div.textContent = text ?? "";

  return div.innerHTML;
}

async function fetchPosts() {
  loading.style.display = "block";
  message.textContent = "";

  try {
    const res = await fetch(
      `https://dummyjson.com/posts/user/${currentUser.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Không thể tải danh sách bài viết");
    }

    const data = await res.json();

    posts = data.posts;

    renderPosts(posts);
  } catch (error) {
    if (!navigator.onLine) {
      message.textContent = "Không có kết nối Internet";
    } else {
      message.textContent = error.message;
    }
  } finally {
    loading.style.display = "none";
  }
}

function renderPosts(data = posts) {
  if (data.length === 0) {
    postList.innerHTML = "<p>Không có bài viết nào.</p>";

    return;
  }

  postList.innerHTML = data
    .map((post) => {
      const canEdit = post.userId === currentUser.id;

      const tags = post.tags?.length
        ? post.tags
            .map(
              (tag) =>
                `<span class="tag">
                                #${escapeHTML(tag)}
                            </span>`,
            )
            .join("")
        : "";

      return `
                <article class="post-card">

                    <h2>
                        ${escapeHTML(post.title)}
                    </h2>

                    <p>
                        ${escapeHTML(post.body)}
                    </p>

                    <div class="tags">
                        ${tags}
                    </div>

                    <div class="post-actions">

                        <button
                            onclick="showPostDetail(${post.id})"
                        >
                            Xem
                        </button>

                        ${
                          canEdit
                            ? `
                                <button
                                    class="edit"
                                    onclick="openEditPost(${post.id})"
                                >
                                    Sửa
                                </button>

                                <button
                                    class="danger"
                                    onclick="deletePost(${post.id})"
                                >
                                    Xoá
                                </button>
                            `
                            : ""
                        }

                    </div>

                </article>
            `;
    })
    .join("");
}

async function showPostDetail(id) {
  try {
    let post = posts.find((post) => post.id === id);

    if (!post?._local) {
      const res = await fetch(`https://dummyjson.com/posts/${id}`);

      if (!res.ok) {
        throw new Error("Không thể lấy chi tiết bài viết");
      }

      const serverPost = await res.json();

      if (!post) {
        post = serverPost;
      }
    }

    detailTitle.textContent = post.title;

    detailBody.textContent = post.body;

    detailTags.innerHTML = (post.tags || [])
      .map(
        (tag) =>
          `<span class="tag">
                            #${escapeHTML(tag)}
                        </span>`,
      )
      .join("");

    detailDialog.showModal();
  } catch (error) {
    alert(error.message);
  }
}

showAddFormBtn.addEventListener("click", function () {
  addPostSection.classList.remove("hidden");

  postTitle.focus();
});

cancelAddBtn.addEventListener("click", function () {
  addPostSection.classList.add("hidden");

  addPostForm.reset();

  addPostError.textContent = "";
});

addPostForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = postTitle.value.trim();

  const body = postBody.value.trim();

  addPostError.textContent = "";

  if (!title || !body) {
    addPostError.textContent = "Tiêu đề và nội dung không được để trống";

    return;
  }

  try {
    const res = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title,
        body,
        userId: currentUser.id,
      }),
    });

    if (!res.ok) {
      throw new Error("Không thể thêm bài viết");
    }

    const newPost = await res.json();

    newPost._local = true;
    newPost.tags = newPost.tags || [];

    posts.unshift(newPost);

    renderPosts();

    addPostForm.reset();

    addPostSection.classList.add("hidden");

    showMessage("Thêm bài viết thành công");
  } catch (error) {
    addPostError.textContent = error.message;
  }
});

function openEditPost(id) {
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return;
  }

  if (post.userId !== currentUser.id) {
    alert("Bạn không có quyền sửa bài viết này");

    return;
  }

  editPostId.value = post.id;

  editTitle.value = post.title;

  editBody.value = post.body;

  editError.textContent = "";

  editDialog.showModal();
}

editPostForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = Number(editPostId.value);

  const title = editTitle.value.trim();

  const body = editBody.value.trim();

  editError.textContent = "";

  if (!title || !body) {
    editError.textContent = "Tiêu đề và nội dung không được để trống";

    return;
  }

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return;
  }

  if (post.userId !== currentUser.id) {
    editError.textContent = "Bạn không có quyền sửa bài viết này";

    return;
  }

  try {
    if (!post._local) {
      const res = await fetch(`https://dummyjson.com/posts/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title,
          body,
        }),
      });

      if (!res.ok) {
        throw new Error("Không thể sửa bài viết");
      }
    }

    post.title = title;
    post.body = body;

    renderPosts();

    editDialog.close();

    showMessage("Cập nhật bài viết thành công");
  } catch (error) {
    editError.textContent = error.message;
  }
});

async function deletePost(id) {
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return;
  }

  if (post.userId !== currentUser.id) {
    alert("Bạn không có quyền xoá bài viết này");

    return;
  }

  const confirmed = confirm("Bạn có chắc muốn xoá bài viết này?");

  if (!confirmed) {
    return;
  }

  try {
    if (!post._local) {
      const res = await fetch(`https://dummyjson.com/posts/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Không thể xoá bài viết");
      }
    }

    posts = posts.filter((post) => post.id !== id);

    renderPosts();

    showMessage("Xoá bài viết thành công");
  } catch (error) {
    alert(error.message);
  }
}

searchInput.addEventListener("input", function () {
  const keyword = searchInput.value.trim().toLowerCase();

  const result = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword) ||
      post.body.toLowerCase().includes(keyword),
  );

  renderPosts(result);
});

closeDetailBtn.addEventListener("click", function () {
  detailDialog.close();
});

cancelEditBtn.addEventListener("click", function () {
  editDialog.close();
});

logoutBtn.addEventListener("click", logout);

function logout() {
  localStorage.removeItem("token");

  localStorage.removeItem("refreshToken");

  localStorage.removeItem("user");

  window.location.href = "./login.html";
}

function showMessage(text) {
  message.textContent = text;

  setTimeout(() => {
    message.textContent = "";
  }, 2500);
}
