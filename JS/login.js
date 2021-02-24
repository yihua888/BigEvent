$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        // 通过layUi进行表单检查
    let form = layui.form
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                if ($('.reg-box [name=password]').val() != value)
                    return '两次输入密码不一致'
            }
        })
        // 将表单数据提交到后台
    var layer = layui.layer
    $('#reg_form').on('submit', function(e) {
            e.preventDefault()
            $.post('/api/reguser', $(this).serialize(), function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功请登入！')
                $('#link_login').click()
            })
        })
        // 监听登入
    $('#login_form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('登入失败')
                }
                localStorage.setItem('token', res.token)
                location.href = 'index.html'
            }
        })
    })
})