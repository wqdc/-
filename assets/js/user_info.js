const form = layui.form

const layer = layui.layer;

form.verify({
    nickname: val => {
        if(val.length>6) return'昵称长度必须在1~6位'
    },
    email:[/@/,'邮箱格式输入错误']
})

const initUserinfo = () => {
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        data:null,
        success: res =>{
            const {status,mesage,data} = res
            if(status !== 0) return layer.msg(mesage)
            //
            console.log(1);
            form.val('formUserInfo',data)
        }
    })
}
initUserinfo()

$('#reseBtn').click(function(e){
    e.preventDefault();
    initUserinfo()
})
$.('.layui-form').submit(function(e){
    e.preventDefault()
    $.ajax({
        type:"POST",
        url:'/my/userinfo',
        data:form.val('formUserInfo'),
        success: res => {
            const {status,mesage} = res
            if(status !=0) return layer.msg('mesage')
            window.parent.getUserInfo()
        }
    })
})