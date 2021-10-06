<template>
    <div class="navbar-nav">
        <span class="ml-5">
            <span class="nav-item nav-link">{{ $store.getters.name }} 様</span>
        </span>
        <router-link to="/user/cart"><span class="nav-item nav-link">カートへ</span></router-link>
        <router-link to="/user/history"><span class="nav-item nav-link">購入履歴</span></router-link>
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
