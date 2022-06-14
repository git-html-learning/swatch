<template>
    <div class ="layout" >
        <component :is="currentRole"></component>
    </div>
</template>
<script>
import grouper from './grouper'
import admin from './admin'
import loading from './loading'
import { getName } from "@/utils/auth";
import { UserDetail } from "@/api/admin";
import { user} from "@/api/user";
export default {
    name:"home",
 components: {
     grouper,
     admin,
     user,
     loading
 },
//  computed: {
//      name() {
//          return getName("name")
//      }
//  },
 data() {
     return {
         currentRole: "loading"
     }
 },
 created() {
// console.log(this.name)
var username = window.sessionStorage.getItem("username")
console.log(username)
UserDetail(username).then((res)=>{
    console.log(res)
    window.sessionStorage.setItem("role",res.data.extraInfo.role)
    if(res.data.extraInfo.role == "admin") {
        this.currentRole="admin"
    } else if (res.data.extraInfo.role == "grouper") {
        this.currentRole = "grouper"
    } 
    // else if (res.data.extraInfo.role == "user") {
    //     this.currentRole = "user"
    // } 
    else {
        this.currentRole = "user"
    }
})
 },
}
</script>
<style lang="scss" scoped>
    .layout{
        padding: 0px;
        height: 100%;
       background-color: #22284a;
    }

</style>