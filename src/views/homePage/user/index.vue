<template>
    <div class="layout">
<div class="title" style = "height: 30px;  color: blue">
    werw353w
    {{username}}   <img class="jzxz2" src="@/assets/img/jzxz2.png" />
    
</div>

  
    </div>
</template>
<script>
export default {
name:"user",
data() {
    return {
        user:""
    }
},
created() {
    this.prepare();
},
methods: {
    prepare() {
        this.username = window.sessionStorage.getItem("username")
    }
}
}
</script>
<style lang="scss" scoped>
    .layout {
        padding: 10px;
        background-color: #fff;
    }
</style>