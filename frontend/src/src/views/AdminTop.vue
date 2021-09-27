<template>
    <div>
        <h1>管理者ページ</h1>
        <hr />
        <div class="mt-5 mb-5">
            <router-link to="/admin/add_product">商品追加</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminTop",
    mounted: function () {
        if (!this.$store.getters.isAdmin) {
            this.$router.push("/");
        }
    }
}
</script>
