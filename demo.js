window.onload = function() {
    //获取当前要操作的网页元素DOM节点对象
    var btn = document.getElementsByClassName("play")[0];
    var mymusic = document.getElementById("mymusic");
    var timer = document.getElementsByClassName("playTime")[0];
    var progressBar = document.getElementById("prograssBar");
    var current = document.getElementById("prograssBar2");
    var mutedBtn = document.getElementsByClassName("mutedBtn")[0];
    var point = document.getElementById("wp_processBtn");

    var intervalId;
    //页面交互事件的设置 雪碧图spirat
    btn.onclick = function() {
            if (mymusic.paused) {
                mymusic.play();
                this.style.backgroundPosition = "69px 88px";
                //设置定时执行，动态修改当前播放时间和播放进度
                intervalId = setInterval(chageProgress, 1000);
            } else {
                mymusic.pause();
                this.style.backgroundPosition = "167px 88px";
                clearInterval(intervalId);
            }
        }
        //异步执行chageProgress()改变播放时间和播放进度
    function chageProgress() {
        var currentTime = mymusic.currentTime;
        var duration = mymusic.duration;
        var minute = currentTime / 60;
        var second = currentTime % 60;
        minute = minute >= 10 ? parseInt(minute) : ("0" + parseInt(minute));
        second = second >= 10 ? parseInt(second) : ("0" + parseInt(second));
        timer.innerHTML = minute + ":" + second;

        var barWith = 280;
        var rate = currentTime / duration;
        current.style.width = barWith * rate + "px";
        point.style.left = barWith * rate + "px";
    }
    //点击切换时静音状态的设置
    mutedBtn.onclick = function() {
        mymusic.muted = !mymusic.muted;
    }
    var noteText = document.getElementById("comment-value");
    var addBtn = document.getElementsByClassName("com-submit")[0];
    var prevBtn = document.getElementById("prev");
    var nextBtn = document.getElementById("next");
    var list = document.getElementsByTagName("li")[2];
    var contentComm = document.getElementsByClassName("contentComm");
    var timeComm = document.getElementsByClassName("timeComm");
    //向本地存储中存储数据
    function saveNote(noteContent) {
        var time = getDates(); //时间
        var noteList = localStorage["noteList"];
        if (noteList == "" || noteList == null || noteList == undefined) {
            localStorage["noteList"] = "[]"; //先转换成字符串
        }
        noteList = JSON.parse(localStorage["noteList"]);
        var noteObj = {
            noteId: noteList.length,
            noteContent: noteContent,
            time: time
        };
        noteList.push(noteObj);
        localStorage["noteList"] = JSON.stringify(noteList);
    }

    function getDates() {
        //设置当前时间
        var date = new Date();
        var year = date.getFullYear(); //月份从0~11，所以加一
        var dateArr = [date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
        for (var i = 0; i < dateArr.length; i++) {
            if (dateArr[i] >= 1 && dateArr[i] <= 9) {
                dateArr[i] = "0" + dateArr[i];
            }
        }
        var strDate = year + '-' + dateArr[0] + '-' + dateArr[1] + ' ' + dateArr[2] + ':' + dateArr[3] + ':' + dateArr[4];
        return strDate;
    }
    //点击评论提交数据
    addBtn.onclick = function() {
        var noteContent = noteText.value;
        if (noteContent == "") {
            alert("文本框不能为空");
        } else {
            //将便签内容存储到本地存储
            saveNote(noteContent);
            noteText.value = "分享你的音乐见解";
        }
    }
    var i = 0;
    var j = 0;
    //获得向前按钮的切换
    prevBtn.onclick = function getNodes() {
        list.innerHTML = "";
        var noteList = localStorage["noteList"];
        if (noteList == "" || noteList == null || noteList == undefined) {
            localStorage["noteList"] = "[]";
        }
        var noteList = localStorage["noteList"];
        noteList = JSON.parse(noteList);
        if (j > 0) {
            for (var i = 0; i < 3; i++) {
                contentComm[i].innerHTML = noteList[noteList.length - 1 + i - j * 3]["noteContent"];
                timeComm[i].innerHTML = noteList[noteList.length - 1 + i - j * 3]["time"];
            }
        } else {
            console.log("已不足一页！！！", j);
        }
        j = j - 1;
    };
    //获得向后按钮的切换
    nextBtn.onclick = function getNodes() {
        j = j + 1;
        list.innerHTML = "";
        var noteList = localStorage["noteList"];
        if (noteList == "" || noteList == null || noteList == undefined) {
            localStorage["noteList"] = "[]";
        }
        var noteList = localStorage["noteList"];
        noteList = JSON.parse(noteList);
        if (j < noteList.length - 4) {
            for (var i = 0; i < 3; i++) {
                contentComm[i].innerHTML = noteList[j * 3 + i]["noteContent"];
                timeComm[i].innerHTML = noteList[j * 3 + i]["time"];
            }
        } else {
            console.log("已不足一页！！！", j);
        }
    };
}