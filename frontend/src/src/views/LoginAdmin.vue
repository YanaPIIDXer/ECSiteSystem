<template>
    <form @submit="login">
        <input type="submit" value="ログイン" />
    </form>
</template>

<script>
export default {
    name: "LoginAdmin",
    methods: {
        login: async function () {
            alert("ログイン");
        }
    }
}
</script>

