<!--
 * @Author: qby
 * @Date: 2021-10-20 21:40:46
 * @LastEditTime: 2021-10-21 22:23:30
 * @LastEditors: qby
 * @Description: 
-->
<template>
  <div>
    <textarea ref="textarea" id="textarea" class="textarea" v-model="value" cols="100" rows="10"></textarea>
    <button @click="addComment">add comment</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        parentId: 0,
        username: 'username',
        children:[],
      }
    },
    methods: {
      addComment() {
        let value = this.value
        let username = this.username
        let parentId = this.parentId
        let children = this.children
        if (value) {
          let date = new Date().getTime()
          let id = date
          let commentInfo = { id, date, value, parentId, username,children}
          let comments = JSON.parse(localStorage.getItem('comments'))
          comments.push(commentInfo)
          localStorage.setItem('comments', JSON.stringify(comments))
          this.value = ''
          this.$EventBus.$emit('comments', comments)
        } else {
          alert('请输入内容！！')
        }
        this.parentId = 0
      },
      focus(id){
          this.parentId = id
          this.$refs['textarea'].focus()
      }
    }
  }
</script>

<style scoped>
  .textarea {
    display: block;
  }
  button {
    margin: 24px 0;
  }
</style>
