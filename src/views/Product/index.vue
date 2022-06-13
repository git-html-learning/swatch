<template>
    <div class="layout">
           <component :is="currentRole"></component>
    </div>
</template>
<script>
import grouperProduct from './grouper'
import adminProduct from './admin'
export default {
    name:"product",
    components: {
        grouperProduct,
        adminProduct
    },
    computed: {
        role() {
            return window.sessionStorage.getItem("role")
        }
    },
    data() {
        return {
currentRole: "grouperProduct"
        }
    },
    created() {
        console.log(this.role)
        if (this.role == "admin") {
            this.currentRole = adminProduct
        } else  if (this.role == "grouper") {
            this.currentRole = grouperProduct
        }
    }
}
</script>
<style lang="scss" scoped>
    .layout {
        padding: 0px;
    }
</style>