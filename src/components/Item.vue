<!--
 * @Author: qby
 * @Date: 2021-10-20 21:48:07
 * @LastEditTime: 2021-10-21 22:00:33
 * @LastEditors: qby
 * @Description: 
-->
<template>
  <div class="item-box">
      <div class="info">
          <span class="user-name">{{comment.username}}</span>
          <span class="time">{{dateParser(comment.date)}}</span>
          <div v-if="comment.parentId === 0" class="add-comment" @click="addComment">[+]</div>
      </div>
      <p>{{comment.value}}</p>
      <div class="comments" v-if="comment.children && comment.children.length">
          <button @click="collectChildren = !collectChildren">collect</button>
          <div v-show="collectChildren">
            <item v-for="item in comment.children" :key="item.id" :comment="item"/>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'item',
    props:{
        comment:{
            type:Object,
            default:()=>{}
        }
    },
    data () {
        return {
            collectChildren:true
        }
    },
    methods: {
        dateParser(dateTime){
            let now = new Date().getTime()
            let time = (now - dateTime) / 1000
            if(time < 60 * 60){
                return `${Math.floor(time / 60)} minute ago`
            }else if(time > 24 * 60 * 60){
                let date = new Date(dateTime)
                let year = date.getFullYear()
                let mouth = date.getMonth() + 1
                let day = date.getDate()
                return `${year}-${mouth}-${day}`
            }else{
                return `${Math.floor(time / (60 * 60))} hour ago`
            }
        },
        addComment(){
            let id =  this.comment.parentId || this.comment.id
            document.querySelector('textarea').scrollIntoView(true)
            this.$emit('focusInput',id)
        }
    }
}
</script>

<style scoped>
.item-box{
    margin-top: 16px;
}
.info{
    color: rgb(104, 103, 102);
}
.user-name,.time,.add-comment{
    margin-right: 16px;
}
.add-comment{
    display: inline-block;
    cursor: pointer;
    user-select: none;
}
.comments{
    margin-left:32px;
}
</style>