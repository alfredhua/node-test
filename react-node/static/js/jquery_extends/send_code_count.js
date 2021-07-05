    /**
     * 发送短信倒计时
     * @param options
     * @returns {{start: start, clear: clear}}
     */
    $.fn.sendSms = function (options) {
        options = $.extend({time: 60, autoStart: true, recentText: '重新发送'}, options);
        var $this = this;
        $this.attr('disabled', 'disabled').addClass('gray');
        var _counter = null;//for debug;

        //处理逻辑
        var count = function () {
            if (options.time != 0) {
                _counter = setTimeout(function () {
                    options.time--;
                    //$this.val(options.time + "秒后重新发送");
                    $this.text('请等待(' + options.time + ')秒');
                    count();
                }, 1000);
            } else {
                $this.text(options.recentText);
                $this.removeAttr('disabled').removeClass('gray');
                $this.siblings('.form-msg').text('');
            }
        };
        if (options.autoStart) {
            count();
        }
        // 如果 autoStart 为true，就不要再调用 start方法。
        var methods = {
            start: function () {
                count();
            },
            clear: function () {
                clearTimeout(_counter);
                $this.text('获取验证码');
                $this.removeAttr('disabled').removeClass('gray');
                $this.siblings('.form-msg').text('');
            }
        };
        return methods;
    };