$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            render(res.data)
        }
        
    })
}
function render(data) {
    var name = data.username || data.nickname
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}