<!--
 * @Author: qby
 * @Date: 2021-10-20 21:20:32
 * @LastEditTime: 2021-10-21 21:31:10
 * @LastEditors: qby
 * @Description: 
-->
<template>
  <div id="app">
    <text-area ref="textarea"/>
    <item v-for="comment in useComment" :key="comment.id" :comment="comment" @addComment="addComment" @focusInput="focusInput"/>
  </div>
</template>

<script>
  import TextArea from './components/TextArea.vue'
  import Item from './components/Item.vue'
  export default {
    name: 'App',
    components: {
      TextArea,
      Item
    },
    data() {
      return {
        comments: []
      }
    },
    computed: {
        useComment(){
            function getComment(arr){
                let parentComments = arr.filter(item => item.parentId === 0)
                let childComments = arr.filter(item => item.parentId !== 0)
                return parentComments.reduce((pre,cur)=>{
                    let temp = childComments.filter(item=>item.parentId === cur.id)
                    if(temp.length){
                        cur.children=temp
                    }
                    pre.push(cur)
                    return pre
                },[])
            }
            return getComment(this.comments)
        }
    },
    created() {
      let comments = localStorage.getItem('comments')
      let self = this
      if (!comments) {
        localStorage.setItem('comments', '[]')
      } else {
        this.comments = JSON.parse(comments)
      }
      this.$EventBus.$emit('comments', this.comments)
      this.$EventBus.$on('comments', (comments) => {
        self.comments = comments
      })
    },
    methods: {
        addComment(id){
            this.$refs['textarea'].addComment(id)
        },
        focusInput(id){
            this.$refs['textarea'].focus(id)
        }
    }
  }
</script>

<style></style>
