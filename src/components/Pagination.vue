<template>
    <div class="flex flex-row items-center w-full pagination" :class="{
        'justify-center': center,
        'justify-end': !center,
    }" style>
        <div class="total-pagi"> {{ pagin.to }}/ {{ pagin.total }}</div>
        <div class="flex-pagi" v-if="totalPages > 1">
            <a class="
                btn-nav
            " @click="onClickFirstPage" v-if="!isInFirstPage">
                <img src="../assets/IconVector-DoubleLeft.svg" class="icon-arrow-left-double" alt="icons" />
                <template v-if="hasText">First</template>
            </a>
            <a class="
                btn-nav 
            " @click="onClickPreviousPage" v-if="!isInFirstPage">
                <img src="../assets/IconVector-Left.svg" class="icon-arrow-left" alt="icons" />
                <template v-if="hasText">Prev</template>
            </a>
            <a class="cursor-pointer border-blue-300 mx-2" v-for="page in pages" :key="page.name"
                @click="!page.isDisabled && onClickPage(page.name)" :class="{
                    active: page.name == currentPage,
                    disabled: page.isDisabled,
                }">{{ page.name }}</a>
            <a class="
                btn-nav 
            " @click="onClickNextPage" v-if="!isInLastPage">
                <template v-if="hasText">Next</template>
                <img src="../assets/IconVector-Right.svg" class="icon-arrow-next" alt="icons" />
            </a>
            <a class="
                btn-nav 
            " @click="onClickLastPage" v-if="!isInLastPage">
                <template v-if="hasText">Last</template>
                <img src="../assets/IconVector-DoubleRight.svg" class="icon-arrow-right-double" alt="icons" />
            </a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3,
        },
        perPage: {
            type: Number,
            required: true,
        },
        hasText: {
            type: Boolean,
            default: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
        center: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        startPage() {
            // When on the first page
            if (
                this.currentPage === 1 ||
                this.totalPages < this.maxVisibleButtons
            ) {
                return 1;
            }
            // When on the last page
            if (this.currentPage === this.totalPages) {
                return this.totalPages - this.maxVisibleButtons + 1;
            }
            // When in between
            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            for (
                let i = this.startPage;
                i <=
                Math.min(
                    this.startPage + this.maxVisibleButtons - 1,
                    this.totalPages
                );
                i += 1
            ) {
                if (i > 0) {
                    range.push({
                        name: i,
                        isDisabled: i === this.currentPage,
                    });
                }
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
    },
    data() {
        return {
            pagin: {},
        };
    },
    created() {
        this.generateDetail();
    },
    watch: {
        currentPage(val) {
            this.generateDetail();
        },
        total(val) {
            this.generateDetail();
        },
        perPage(val) {
            this.generateDetail();
        }
    },
    methods: {

        // -------get data pagi --------
        generateDetail() {
            let last = 0
            if (this.perPage * this.currentPage > this.total) {
                last = this.total;
            } else {
                last = this.perPage * this.currentPage
            }
            this.pagin = {
                from: this.perPage * (this.currentPage - 1) + 1,
                to: last,
                total: this.total
            }
        },
        // ------- Click First Page --------
        onClickFirstPage() {
            if (this.isInFirstPage) {
                return;
            }
            this.$emit("page-changed", 1);
        },
        // ------- Click Previous Page --------
        onClickPreviousPage() {
            if (this.isInFirstPage) {
                return;
            }
            this.$emit("page-changed", this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit("page-changed", page);
        },
        // ------- Click next Page --------
        onClickNextPage() {
            if (this.isInLastPage) {
                return;
            }
            this.$emit("page-changed", this.currentPage + 1);
        },
        // ------- Click back Page --------
        onClickLastPage() {
            if (this.isInLastPage) {
                return;
            }
            this.$emit("page-changed", this.totalPages);
        },
    },
};
</script>

<style lang="scss">
.w-full {
    width: 100%;
}

.justify-between {
    justify-content: space-between;
}

.justify-end {
    justify-content: end;
}

.flex-row {
    flex-direction: row;
    display: flex;
}

.cursor-pointer {
    cursor: pointer;
    color: #2b3643;

}


.pagination {
    .total-pagi {
        white-space: nowrap;
        color: #132e96;
        padding-right: 0.75rem;
        margin-top: 2px;
        font-size: 15px;
        font-weight: 500;
    }

    .flex-pagi {
        align-items: center;
        display: flex;
        flex-direction: row;
    }

    .active {
        background-color: #0042b4 !important;
        color: #fff;
        font-weight: 700
    }

    .mx-2 {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }

    .border-blue-300 {
        --border-opacity: 1;
        border-color: #90cdf4;
        border-color: rgba(144, 205, 244, var(--border-opacity));
    }

    a {
        cursor: pointer;
        border: unset;
        padding: 3px 12px !important;
        font-size: 14px;

        &:hover {
            background-color: #5689e0;
            ;
        }
    }

    a.btn-nav {
        padding: 3px 12px !important;
        border: 1px solid #0042b4;
        border-radius: 15px;
        margin: 0px 3px;
        color: #2b3643;

        &:hover {
            color: #fff;
        }

        .icon-arrow-next {
            width: 8px;
            margin-left: 5px;
            margin-bottom: 2px;
        }

        .icon-arrow-left {
            margin-right: 5px;
            width: 8px;
        }

        .icon-arrow-left-double {
            margin-right: 3px;
            width: 12px;
            margin-bottom: 2px;
        }

        .icon-arrow-right-double {
            margin-left: 3px;
            width: 12px;
            margin-bottom: 2px;
        }

    }
}
</style>