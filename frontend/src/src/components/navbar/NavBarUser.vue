<template>
    <div class="navbar-nav">
        <span class="nav-item nav-link" @click="logout">ログアウト</span>
    </div>
</template>

<script>
import { get } from '../../modules/APIConnection';

export default {
    name: "NavBarUser",
    methods: {
        logout: async function () {
            if (!confirm("ログアウトしますか？")) { return; }
            const res = await get("/user/logout");
            if (res.status != 200) {
                alert("ログアウトに失敗しました");
                return;
            }
            this.$store.commit("logout");
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
span .nav-link {
    cursor: pointer;
}
</style>
