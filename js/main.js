// 照片数据（这里只是示例，实际使用时需要从服务器获取）
const photoData = {
    ig: [
        { url: '../images/ig/photo1.jpg', title: 'IG照片1' },
        { url: '../images/ig/photo2.jpg', title: 'IG照片2' },
        // 更多照片...
    ],
    wvs: [
        { url: '../images/wvs/photo1.jpg', title: 'WVS照片1' },
        { url: '../images/wvs/photo2.jpg', title: 'WVS照片2' },
        // 更多照片...
    ],
    x: [
        { url: '../images/x/photo1.jpg', title: 'X照片1' },
        { url: '../images/x/photo2.jpg', title: 'X照片2' },
        // 更多照片...
    ]
};

// 根据当前页面加载对应的照片
function loadPhotos() {
    const photoGrid = document.querySelector('.photo-grid');
    if (!photoGrid) return;

    // 获取当前页面类型（ig, wvs, x）
    const pageType = window.location.pathname.split('/').pop().split('.')[0];
    const photos = photoData[pageType] || [];

    // 清空现有内容
    photoGrid.innerHTML = '';

    // 添加照片
    photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${photo.url}" alt="${photo.title}" loading="lazy">
        `;
        photoGrid.appendChild(photoItem);
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadPhotos();
});

// 侧边栏切换功能
document.getElementById('sidebarToggle').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

    if (window.innerWidth < 768) {
        // 移动端：切换侧边栏显示/隐藏
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            mainContent.style.marginLeft = '250px';
            mainContent.style.width = 'calc(100% - 250px)';
        } else {
            mainContent.style.marginLeft = '0';
            mainContent.style.width = '100%';
        }
    } else {
        // PC端：切换侧边栏展开/收起
        sidebar.classList.toggle('collapsed');
        this.querySelector('i').classList.toggle('fa-chevron-left');
        this.querySelector('i').classList.toggle('fa-chevron-right');
    }
});

// 移动端响应式处理
function handleResize() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebarToggle');
    const mainContent = document.querySelector('.main-content');

    if (window.innerWidth < 768) {
        sidebar.classList.remove('collapsed');
        sidebar.classList.remove('active');
        toggle.style.display = 'flex';
        mainContent.style.marginLeft = '0';
        mainContent.style.width = '100%';
    } else {
        toggle.style.display = 'flex';
        if (sidebar.classList.contains('collapsed')) {
            mainContent.style.marginLeft = '60px';
            mainContent.style.width = 'calc(100% - 60px)';
        } else {
            mainContent.style.marginLeft = '250px';
            mainContent.style.width = 'calc(100% - 250px)';
        }
    }
}

// 初始化和窗口大小改变时处理
window.addEventListener('resize', handleResize);
handleResize();

// 加载视频数据
async function loadVideos() {
    try {
        const response = await fetch('../video/videos.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const videoGrid = document.querySelector('.video-grid');

        if (!videoGrid) {
            console.error('找不到视频网格容器');
            return;
        }

        // 清空现有内容
        videoGrid.innerHTML = '';

        // 检查是否有视频数据
        if (!data.videos || data.videos.length === 0) {
            videoGrid.innerHTML = '<div class="alert alert-info">暂无视频</div>';
            return;
        }

        // 遍历视频数组
        data.videos.forEach(video => {
            const videoCard = createVideoCard(video);
            videoGrid.appendChild(videoCard);
        });
    } catch (error) {
        console.error('加载视频数据失败:', error);
        const videoGrid = document.querySelector('.video-grid');
        if (videoGrid) {
            videoGrid.innerHTML = '<div class="alert alert-warning">加载视频失败，请稍后重试</div>';
        }
    }
}

// 创建视频卡片
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
        <div class="video-thumbnail" data-video="${video.path}">
            <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='../images/default-video.svg'">
            <div class="video-duration">${video.duration}</div>
            <div class="play-button">
                <i class="fas fa-play"></i>
            </div>
        </div>
        <div class="video-info">
            <h3>${video.title}</h3>
            <p>${video.date}</p>
        </div>
    `;

    // 添加点击事件
    card.querySelector('.video-thumbnail').addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('videoModal'));
        const videoPlayer = document.getElementById('videoPlayer');
        const modalTitle = document.querySelector('.modal-title');

        videoPlayer.src = video.path;
        modalTitle.textContent = video.title;
        modal.show();
    });

    return card;
}

// 页面加载完成后加载视频
document.addEventListener('DOMContentLoaded', () => {
    loadVideos();
    handleResize();
}); 