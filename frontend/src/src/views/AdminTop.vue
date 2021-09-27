<template>
    <div>
        <h1>管理者ページ</h1>
    </div>
</template>

<script>
export default {
    name: "AdminTop",
    mounted: function () {
        if (!this.$store.getter.isAdmin) {
            this.$router.push("/");
        }
    }
}
</script>
