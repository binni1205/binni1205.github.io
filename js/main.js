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