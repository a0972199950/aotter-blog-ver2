<template>
    <div class="card text-center mb-5 mt-5 mb-md-0">
        <div class="avatar">
            <img :src="author.avatarUrl">
        </div>
        

        <div class="card-body pb-0">
            <nuxt-link :to="`/blogs/${author._id}`">
                <h3>{{ author.blogName }}</h3>
            </nuxt-link>
            <h5 class="name">{{ author.name }}</h5>
            <p>{{ author.blogIntro }}</p>
        </div>

        <div class="d-flex justify-content-center">
            <div v-if="author.socialMedias.facebook" class="p-3">
                <a :href="author.socialMedias.facebook" target="blank">
                    <font-awesome-icon :icon="['fab', 'facebook']" />
                </a>
            </div>

            <div v-if="author.socialMedias.twitter" class="p-3">
                <a :href="author.socialMedias.twitter" target="blank">
                    <font-awesome-icon :icon="['fab', 'twitter']" />
                </a>
            </div>

            <div v-if="author.socialMedias.instagram" class="p-3">
                <a :href="author.socialMedias.instagram" target="blank">
                    <font-awesome-icon :icon="['fab', 'instagram']" />
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { IAuthor } from "../../interfaces/basic";

@Component
export default class UIWidgetsAuthorCard extends Vue {
    @Prop({ type: Object, default: {} })
    readonly author: any
}
</script>


<style lang="scss" scoped>
.card {
    background: #fafafa;

    .avatar {
        width: 50%;
        margin: -50px auto 0;
        border-radius: 100%;
        overflow: hidden;

        img {
            display: block;
            width: 100%;
            transition: all .3s;
        }
    }

    .name {
        color: #6c757d;
    }

    &:hover {
        img {
            transform: scale(1.1);
        }
    }
}
</style>