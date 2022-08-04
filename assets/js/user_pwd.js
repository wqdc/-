const form = layui.form;
const layer = layui.layer;
// layer.msg('hell')

// form.verify({
//   repwd: (value) => {
//     const pwd = $(".layui-form [name = newPwd").val();
//     if (pwd !== value) return "两次密码不一致";
//   },
//   samepwd: (value) => {
//     const pwd = $(".layui-form [name = oldPwd").val();
//     if (pwd === value) return "新旧密码不能一致";
//   },
//   //我们既支持上述函数式的方式，也支持下述数组的形式
//   //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
//   pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
// });

form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: (val) => {
        if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
    },
    rePwd: (val) => {
        if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
    },
});
$('.layui-form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type:'POST',
        url:'/my/updatepwd',
        data:form.val('formPassword'),
        success: res => {
            console.log(1);
            const {status,message} = res
            layer.msg(message)
            if(status !=0 ) return
            $('#reseBtn').click()
            // $('.layui-form')[0].rest()
        }
    })
})
// // 发送请求，重置密码
// $(".layui-form").on("submit", (e) => {
//     e.preventDefault();
//     $.ajax({
//         type: "POST",
//         url: "/my/updatepwd",
//         data: $(".layui-form").serialize(),
//         success: (res) => {
//             if (res.status !== 0) return layer.msg("更新密码失败！");
//             layer.msg("更新密码成功！");
//             // 重置表单
//             $(".layui-form")[0].reset();
//         },
//     });
// });
