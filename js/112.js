var tc1 = document.querySelector('.tc1');
var tuc = document.querySelector('.tuc');
var i = 1;
tc1.addEventListener('click', () => {
    var tool = document.querySelector('.tool');
    var tc2 = document.querySelector('.tc2');
    var v1 = document.querySelector('.v1');

    i++;
    if (i % 2 == 0) {
        tool.style.transform = 'translateX(154px)';
        tc2.style.setProperty("--border-bottom-color", "#057cdd");
        tc2.style.setProperty("--border-left-color", "#057cdd");
        v1.style.setProperty("--border-color", "#057cdd");
        tuc.style.color = "#057cdd";
    } else {

        tool.style.transform = 'translateX(-15px)';
        tc2.style.setProperty("--border-bottom-color", "#ffffff");
        tc2.style.setProperty("--border-left-color", "#ffffff");
        v1.style.setProperty("--border-color", "#ffffff");
        tuc.style.color = "#ffffff";
    }
});
var im = document.getElementById('fh');
im.addEventListener('click', () => {
    var tuc = document.querySelector('.tuc');
    var tool = document.querySelector('.tool');
    var tc2 = document.querySelector('.tc2');
    var v1 = document.querySelector('.v1');
    
    tool.style.transform = 'translateX(-15px)';
    setTimeout(() => {
    tc2.style.setProperty("--border-bottom-color", "#ffffff");
    tc2.style.setProperty("--border-left-color", "#ffffff");
    v1.style.setProperty("--border-color", "#ffffff");
    tuc.style.color = "#ffffff";
    }, 300);
    i--;
});

const compassDiv = document.createElement('div');
compassDiv.className = 'compass';
compassDiv.style.position = 'absolute';
compassDiv.style.top = '10px';
compassDiv.style.left = '10px';
compassDiv.style.width = '50px'; // 调整宽度和高度以适应你的需求
compassDiv.style.height = '50px';
compassDiv.style.background = 'white'; // 设置指南针的背景颜色
compassDiv.style.borderRadius = '50%'; // 将指南针形状设为圆形
compassDiv.style.transformOrigin = 'center'; // 将旋转中心设为指南针中心

const pointerDiv = document.createElement('div');
pointerDiv.className = 'pointer';
pointerDiv.style.position = 'absolute';
pointerDiv.style.top = '50%';
pointerDiv.style.left = '50%';
pointerDiv.style.width = '2px'; // 调整指针的宽度和长度以适应你的需求
pointerDiv.style.height = '25px';
pointerDiv.style.background = 'red'; // 设置指针的颜色
pointerDiv.style.transformOrigin = 'bottom'; // 将旋转中心设为指针底部

compassDiv.appendChild(pointerDiv);
document.body.appendChild(compassDiv);