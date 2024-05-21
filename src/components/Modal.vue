<template>
    <div class="popup" id="myModal">
        <div class="modal">
            <!-- Modal content -->
            <div class="modal-header">
                <span @click="closePopup" class="close">&times;</span>
                <div class="title-popup">
                    <h1>{{ titlePage }}: {{ dataDetail.name }}</h1>
                </div>
                <div class="modal-conent">
                    <div class="form-detail">
                        <div class="form-group">
                            <label>Name</label>
                            <input class="form-control disabled" :value="dataDetail.name" />
                        </div>
                        <div class="form-group">
                            <label>Type 1</label>
                            <select class="form-control disabled" :value="dataDetail.type_1">
                                <option v-for="(item) in typeList" :key="item.id" :value="item.id">{{ item.name }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Type 2</label>
                            <select class="form-control disabled" :value="dataDetail.type_2">
                                <option v-for="(item) in typeList" :key="item.id" :value="item.id">{{ item.name }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Total</label>
                            <input class="form-control disabled" :value="dataDetail.total" />
                        </div>
                        <div class="form-group">
                            <label>Attack</label>
                            <input class="form-control disabled" :value="dataDetail.attack" />
                        </div>
                        <div class="form-group">
                            <label>Defense</label>
                            <input class="form-control disabled" :value="dataDetail.defense" />
                        </div>
                        <div class="form-group">
                            <label>Speed attack</label>
                            <input class="form-control disabled" :value="dataDetail.sp_atk" />
                        </div>
                        <div class="form-group">
                            <label>Speed defense</label>
                            <input class="form-control disabled" :value="dataDetail.sp_def" />
                        </div>
                        <div class="form-group">
                            <label>Speed</label>
                            <input class="form-control disabled" :value="dataDetail.speed" />
                        </div>
                    </div>
                </div>
                <div class="btn-download">
                    <div @click="downloadFile">
                        <span>
                            Download Sprite &#x1F4E9;
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["titlePage", "details", "typeList"],
    data() {
        return {
            dataDetail: {},
        }
    },
    created() {
        setTimeout(() => {
            this.dataDetail = _.cloneDeep(this.details)
        }, 100)
    },
    methods: {
        closePopup() {
            this.$emit("close-popup", true);
        },
        downloadFile() {
            this.$emit("download", this.dataDetail);
        }
    },
};
</script>

<style lang="scss">

.modal {
    display: flex;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    overflow: hidden;
}

/* Modal Content */
.modal-header {
    background-color: #eaecf9;
    margin: auto;
    padding: 5px;
    border: 1px solid #888;
    width: 80%;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    .title-popup {
        text-align: center;
        font-size: 14px;
        text-transform: uppercase;
        color: rgba(17, 49, 230, 0.697);

    }

    .modal-conent {
        padding: 1px;
        background-color: #fff;
        border: 0.5px solid rgb(23, 15, 87);
        border-radius: 10px;
        min-height: 220px;
        overflow: auto;
        margin: 10px 6px;
        padding: 8px;

        .form-detail {
            text-align: left;
            width: 100%;
            padding: 5px 12px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            label {
                font-size: 14px;
                color: #2b3643;
                font-weight: 500;
            }

            .form-group {
                padding-bottom: 0 !important;
                padding-right: 4px !important;
                padding-left: 4px !important;
                width: calc(100%/ 3);

                .form-control {
                    border: 1px solid gray;
                    width: 100%;
                    border-radius: 0;
                    height: 28px;
                    font-size: 9pt;
                    color: #2b3643;
                    padding: 2.5px !important;
                    justify-content: left;

                }

                .disabled {
                    color: #333;
                    cursor: not-allowed;
                    background: #e0e0e0;
                }
            }

        }

    }
}

/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 25px;
    font-weight: bold;
    margin-right: 5px;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

/*  Button download */
.btn-download {
    justify-content: center;
    width: 100%;
    align-items: center;
    display: flex;

    div {
        border: none;
        border-radius: 10px;
        padding: 5px 19px;
        cursor: pointer;
        background-color: #6f89d7;
        display: inline-block;
        position: relative;
        margin-bottom: 5px;

        &:hover {
            background-color: #3d5395
        }

        span {
            color: #fff;
            font-weight: 600;
            font-size: 14px;

        }
    }
}
</style>