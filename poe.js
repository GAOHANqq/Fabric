
var bindFileTobase64 = (file, callback) => {

    obj = file;
    if (typeof (file) == "string")
        obj = document.querySelector(file);

    obj.addEventListener("change", () => {
        var file_base64_lst = [];
        var file_list = obj.files;

        for (var i = 0; i < obj.files.length; i++) {
            var f = obj.files[i];
            var reader = new FileReader();

            reader.onload = (() => {
                file_base64_lst.push(reader.result);
                if(file_base64_lst.length != file_list.length) return;

                callback.call(obj,file_base64_lst);               
            });
            reader.readAsDataURL(f);
        }
    });

    // var file = document.getElementById("uploadimg").files[0];
    // var reader = new FileReader();
    // reader.onload = () => {
    //     var img = new Image();
    //     img.src = reader.result;
    //     img.onload = function () {
    //         var w = img.width,
    //             h = img.height;
    //         var canvas = document.createElement('canvas');
    //         var ctx = canvas.getContext('2d');
    //         canvas.width = w;
    //         canvas.height = h;
    //         ctx.drawImage(img, 0, 0, w, h);
    //         var base64 = canvas.toDataURL('image/jpeg', 0.5);
    //         var result = {
    //             url: window.URL.createObjectURL(file),
    //             base64: base64,
    //             clearBase64: base64.substr(base64.indexOf(',') + 1),
    //             suffix: base64.substring(base64.indexOf('/') + 1, base64.indexOf(';')),
    //         };

    //         fabric.Image.fromURL(result.url, (sunImg) => {
    //             sunImg.selection = true;
    //             sunImg.selectable = true;
    //             sunImg.center();

    //             pageFunc.addUserData(sunImg);
    //         });

    //         pageFunc.addUserData(sunTextObj);

    //     }
    // }
}