<template>
    <div class="card text-center w-100">
        <div class="avatar">
            <img :src="blog.author.avatarUrl">
        </div>
        
        <div class="card-body d-flex flex-column justify-content-between">
            <nuxt-link :to="`/blogs/${blog._id}`">
                <h3 class="blog-name">{{ blog.name }}</h3>
                <h5 class="name">{{ blog.author.name || "匿名" }}</h5>
                <p>{{ blog.intro }}</p>
            </nuxt-link>

            <div class="d-flex justify-content-center">
                <div v-if="blog.author.socialMedias.facebook" class="px-3 py-0">
                    <a :href="blog.author.socialMedias.facebook" target="blank">
                        <font-awesome-icon :icon="['fab', 'facebook']" />
                    </a>
                </div>

                <div v-if="blog.author.socialMedias.twitter" class="px-3 py-0">
                    <a :href="blog.author.socialMedias.twitter" target="blank">
                        <font-awesome-icon :icon="['fab', 'twitter']" />
                    </a>
                </div>

                <div v-if="blog.author.socialMedias.instagram" class="px-3 py-0">
                    <a :href="blog.author.socialMedias.instagram" target="blank">
                        <font-awesome-icon :icon="['fab', 'instagram']" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { get } from "lodash";
import { IBlogClient, IUserClient } from "~/interfaces/basic";

interface IProp {
    blog: IBlogClient
}

@Component
export default class AuthorCard extends Vue {
    @Prop({ type: Object, default: {} })
    readonly blog!: IProp["blog"]
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

    .blog-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
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