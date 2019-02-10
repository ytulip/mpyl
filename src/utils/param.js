/*获取当前页url*/
function getCurrentPageUrl(){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs(){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    var options = currentPage.options    //如果要获取url中所带的参数可以查看options

    //拼接url的参数
    var urlWithArgs = url + '?'
    for(var key in options){
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length-1)

    return urlWithArgs
}


function getParamValue(key) {
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    var options = currentPage.options    //如果要获取url中所带的参数可以查看options

    if( options.hasOwnProperty(key) )
    {
        return options[key];
    } else
    {
        return '';
    }
}

function getOpenid()
{
    return wx.getStorageSync('openid');
}


function commonRequest(config)
{
    // let defaultConfig = {
    //     prepositionJudge:function(){
    //         return true;
    //     },
    //     then:function(res){
    //
    //     },
    //     catch:function(res)
    //     {
    //
    //     }
    // }


    // Object.assign(config,defaultConfig);
    // config = _.extend(config,defaultConfig);


    // if(!config.prepositionJudge()){
    //     return;
    // }
    //
    // //这里要弹出弹层了
    wx.showLoading({
      title: '正在处理',
      mask:true
    })


    let requestData = config.data;
    requestData.openid = getOpenid();

    if( config.type == 'get')
    {
        config.page.$http.get(config.url,requestData).then((res)=>{
            wx.hideLoading();
            //判断是不是json
            if( res.data.hasAttribute('status') )
            {
                config.success(res.data);
            } else {
                config.page.$mptoast('网络异常');
            }
        }).catch(err=>{
            config.page.$mptoast('通信故障');
        });
    } else {
        config.page.$http.post(config.url,requestData).then((res)=>{
            wx.hideLoading();
            //判断是不是json
            console.log(res.data);
            // console.log(typeof  res.data);
            if( typeof res.data === 'object' )
            {
                config.success(res.data);
            } else {
                config.page.$mptoast('网络异常');
            }
        }).catch(err=>{
            wx.hideLoading();
            console.log(err);
            config.page.$mptoast('通信故障');
        });
    }
}

export default {
    getCurrentPageUrl: getCurrentPageUrl,
    getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
    getParamValue: getParamValue,
    getOpenid:getOpenid,
    commonRequest:commonRequest
}