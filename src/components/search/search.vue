<template>
    <div>
        <search-box title='' :bg='true' fixed>
			<div class="search-warp">
				<input class="searchBtn" type="submit">
				<input type="text" class="search" placeholder="搜索"
                    id='focusInput'
                    v-model.trim="query"
				>
                <i class="delete" v-show='query' @click="query=''"></i>
			</div>
			<a slot='right' @click="cancel">取消</a>
		</search-box>
        <!-- 搜索记录历史 -->
        <div class="search-main" v-if="!query">
            <scroll>
                <div>
                    <div class="search-history">
                        <!-- 搜索记录部分 -->
                        <div class="search-describe">
                            <h2>搜索历史</h2>
                            <i class="icon iconfont icon-lajitong" @click='clearAll'></i>
                        </div>
                        <history-list :searchs='searchs'  @historySearch= 'historySearch' @delete='deleteOne'></history-list>
                    </div>
                </div>
            </scroll>
        </div>
        <!-- 搜索结果 -->
        <suggest v-show='query' :query = 'query'></suggest>
    </div>
</template>
<script type='text/ecmascript-6'>
    import searchBox from 'base/header/header'
    import scroll    from 'base/scroll/scroll'
    import { Dialog } from 'vant' //vant

    export default{
        data(){
            return {
                query:'', //用户搜索的参数
                throttle:false, //节流操作
                searchs:[
                    {
                        name:'红海行动'
                    },
                    {
                        name:'唐人街'
                    },
                    {
                        name:'捉妖记'
                    },
                    {
                        name:'李成是个呆逼！'
                    }
                ]
            }
        },
        components:{searchBox,scroll,
            historyList:()=>import(/*webpackChunkName:'historyList'*/'@/base/historyList/historyList'),
            suggest:()=>import(/*webpackChunkName:'suggest'*/'@/base/suggest/suggest')
        },
        activated(){
            this.$nextTick(()=>{
                this.focusInput();
            })
        },

        methods:{
            cancel(){
                this.$router.go(-1);
                this.query = '';
            },
            focusInput(){
                let focusInput = document.getElementById('focusInput');
                focusInput.focus();

            },
            onchangeQuery(newQuery){
                if(newQuery===""){return false}
                this.query = newQuery;
            },
            deleteOne(index){
                // console.log(index);
                this.searchs.splice(index,1)
            },
            historySearch(q){
                this.query = q
            },
            clearAll(){
                if(!this.searchs.length)return false
                Dialog.confirm({
                    title: '',
                    message: '确定清空搜索记录?'
                }).then(() => {
                    this.searchs = []
                // on confirm
                }).catch(() => {
                // on cancel
                });
            }
        },
        watch:{
            query(newQuery){
                if(!this.throttle){//前端节流
                    if(this.timer){
                        clearTimeout(this.timer)
                    }
                    this.timer = setTimeout(()=>{
                        this.onchangeQuery(newQuery);
                    },100)
                }
            }
        }
    }
</script>
<style lang="less" scoped  rel='stylesheet/less'>
    @import '../../common/less/color.less';
    div.search-warp{
        height: 2.8rem;
        background-color: #fff;
        display: flex;
        display: --webkit-flex;
        border-radius: .4rem;
        width: 90%;
        margin-left: 1rem;
        align-items: center;
        justify-content: space-around;
        position: relative;
        .searchBtn{
            border: none;
            outline: none;
            display: inline-block;
            background: url('../../common/images/ic_search_gray.png')  no-repeat;
            text-indent: -99px;
            width: 20px;
            height: 20px;
            background-size: cover;
        }
        .search{
            border:none;
            outline: none;
            width: 80%;
            height: 90%;
            font-size: 1rem;
        }
        .delete{
            position: absolute;
            right: 10px;
            top: 1.4rem;
            transform: translateY(-50%);
            display: inline-block;
            width: 18px;
            height: 18px;
            background-image: url('./ic_fanta_delete.png');
            background-size: 18px 18px;

        }

    }
    .search-main{
        position: fixed;
        top:3.7rem;
        width: 100%;
        bottom: 0;

        padding: 0 15px;
        overflow: hidden;

            .search-history{
                    .search-describe{
                        display: flex;
                        width: 100%;

                        justify-content: space-between;
                        padding:10px 0;
                        margin-top: 1rem;
                        position: relative;
                            h2{
                                color:@default-green-color;
                                font-weight: normal;
                                font-size: 1.4rem
                            }
                            i{
                                color:@default-green-color;
                                font-size: 1.4rem;
                            }
                            &:after{
                                position: absolute;
                                content: "";
                                top:0;
                                left: 0;
                                right: 0;
                                width: 100%;
                                height: 1px;
                                background-color: @line-default-color;
                                transform:scaleY(.5);

                            }
                    }
            }
    }
</style>
