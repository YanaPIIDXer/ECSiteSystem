<template>
    <div class="container">
        <div class="row">
            <div class="col-3" v-for="item in list" :key="item.id">
                <product-card :name="item.name" :imageUrl="item.imageUrl" :description="item.description" />
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '../modules/APIConnection';
import ProductCard from '../components/ProductCard';

export default {
    name: "Top",
    components: {
        ProductCard
    },
    data: function () {
        return {
            list: [],
        };
    },
    mounted: async function () {
        const res = await get("/product/list");
        if (res.status != 200) { return; }
        this.list = res.json;
    }
}
</script>

        ProductCard