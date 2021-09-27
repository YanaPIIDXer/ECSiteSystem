<template>
    <form @submit="login">
        <label>パスワード</label><input type="password" v-model="password" /><br />
        <input type="submit" value="ログイン" />
    </form>
</template>

<script>
export default {
    name: "LoginAdmin",
    data: function () {
        return {
            password: ""
        };
    },
    methods: {
        login: async function () {
            alert("ログイン");
        }
    }
}
</script>

