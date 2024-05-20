<template>
  <div class="page-wapper">
    <div class="content">
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <span>Pokemon List</span>
      </nav>
      <div class="content-search">
        <form class="content-header search-form" @submit.prevent="search">
          <div class="form-group">
            <label>Name</label>
            <input class="form-control" v-model="formSearch.name" />
          </div>
          <div class="form-group">
            <label>Type</label>
            <select class="form-control" v-model="formSearch.type">
              <option value="">All</option>
              <option v-for="item, i in typeList" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>
          <div class="group-btn">
            <button class="btn" type="button" @click="resetForm">
              Reset
            </button>
            <button class="btn" style="background-color: #90cdf4" type="submit">
              Search
            </button>
          </div>
        </form>
        <div class="table-area">

          <table class="table">
            <thead>
              <th style="min-width: 25px;">No.</th>
              <th class="th-center th-sort"> Name
              </th>
              <th class="th-center th-sort"><span style="margin-right: 10px;"><i class="icon-vertor-up"
                    @click="sortData('total', 'asc')" :class="{ 'hidden': sortField.total === 1 }"></i> <i
                    class="icon-vertor-down" :class="{ 'hidden': sortField.total === 2 }"
                    @click="sortData('total', 'desc')"></i></span>Total
              </th>
              <th class="th-center th-sort"><span style="margin-right: 10px;"><i class="icon-vertor-up"
                    :class="{ 'hidden': sortField.hp === 1 }" @click="sortData('hp', 'asc')"></i> <i
                    class="icon-vertor-down" :class="{ 'hidden': sortField.hp === 2 }"
                    @click="sortData('hp', 'desc')"></i></span>HP
              </th>
              <th class="th-center th-sort"><span><i class="icon-vertor-up" :class="{ 'hidden': sortField.attack === 1 }"
                    @click="sortData('attack', 'asc')"></i> <i class="icon-vertor-down"
                    :class="{ 'hidden': sortField.attack === 2 }" @click="sortData('attack', 'desc')"></i></span>Attack
              </th>
              <th class="th-center th-sort" style="min-width: 120px;"><span><i class="icon-vertor-up"
                    :class="{ 'hidden': sortField.defense === 1 }" @click="sortData('defense', 'asc')"></i> <i
                    class="icon-vertor-down" :class="{ 'hidden': sortField.defense === 2 }"
                    @click="sortData('defense', 'desc')"></i></span>Defense
              </th>
              <th class="th-center th-sort" style="min-width: 125px;"><span><i class="icon-vertor-up"
                    :class="{ 'hidden': sortField.sp_atk === 1 }" @click="sortData('sp_atk', 'asc')"></i> <i
                    class="icon-vertor-down" :class="{ 'hidden': sortField.sp_atk === 2 }"
                    @click="sortData('sp_atk', 'desc')"></i></span>Sp
                Attack</th>
              <th class="th-center th-sort" style="min-width: 125px;"><span><i class="icon-vertor-up"
                    :class="{ 'hidden': sortField.sp_def === 1 }" @click="sortData('sp_def', 'asc')"></i> <i
                    class="icon-vertor-down" :class="{ 'hidden': sortField.sp_def === 2 }"
                    @click="sortData('sp_def', 'desc')"></i></span>SP
                Defense</th>
              <th class="th-center th-sort"><span><i class="icon-vertor-up" :class="{ 'hidden': sortField.speed === 1 }"
                    @click="sortData('speed', 'asc')"></i> <i class="icon-vertor-down"
                    :class="{ 'hidden': sortField.speed === 2 }" @click="sortData('speed', 'desc')"></i></span>Speed</th>
              <th>Create At</th>
              <th>Update At</th>

            </thead>
            <tbody v-for="item, index in  dataList" :key="index">
              <tr :class="{ 'odd': index % 2 }" @click="viewDetails(item)">
                <td :title="'click show detail: ' + item.name" class="td-center">{{ item.number }}</td>
                <td :title="'click show detail: ' + item.name" class="td-center">{{ item.name }}</td>
                <td :title="'click show detail: ' + item.name" class="td-center">{{ item.total }}</td>
                <td :title="'click show detail: ' + item.name" class="td-center">{{ item.hp }}</td>
                <td :title="'click show detail: ' + item.name" class="td-center">{{ item.attack }}</td>
                <td :title="'click show detail: ' + item.name" class="td-center">{{ item.defense }}</td>
                <td :title="'click show detail: ' + item.name" class="td-center">{{ item.sp_atk }}</td>
                <td :title="'click show detail: ' + item.name" class="td-center">{{ item.sp_def }}</td>
                <td :title="'click show detail: ' + item.name" class="td-center">{{ item.speed }}</td>
                <td :title="'click show detail: ' + item.name" class="td-center">{{ covertDate(item.created_at) }}</td>
                <td :title="'click show detail: ' + item.name" class="td-center">{{ covertDate(item.updated_at) }}</td>
              </tr>
            </tbody>
            <tbody v-if="dataList.length == 0">
              <tr>
                <td colspan="12" style="text-align: center">
                  No Data Available</td>
              </tr>
            </tbody>
          </table>
          <Pagination style="margin-top: 12px;" v-if="pagina.total > 0" :totalPages="pagina.last_page"
            :total="pagina.total" :perPage="perPage" :currentPage="currentPage" @page-changed="onChangePage">
          </Pagination>
        </div>
      </div>
    </div>
    <Modal v-if="isShow" title-page="Pokemon" @close-popup="closePopup" @download="downloadSprite" :typeList="typeList"
      :details="dataDetail" />
  </div>
</template>
<script>
import Form from '../services/form'
import Service from '../services/api'
import { ref } from 'vue'
import Pagination from './Pagination.vue'
import Modal from './Modal.vue'
export default {
  components: {
    Pagination,
    Modal
  },
  setup() {
    const formSearch = ref(new Form({
      type: '',
      name: ''
    }))
    const sortField = ref(new Form({
      total: 0,
      hp: 0,
      attack: 0,
      defense: 0,
      sp_atk: 0,
      sp_def: 0,
      speed: 0
    }))
    const typeList = ref([])
    const dataList = ref([])
    const pagina = ref({})
    const perPage = ref(20)
    const paramsSort = ref('')
    const isShow = ref(false)
    const dataDetail = ref({})
    const fields = Service.getFieldsList()
    return {
      formSearch,
      dataList,
      pagina,
      perPage,
      paramsSort,
      fields,
      sortField,
      typeList,
      dataDetail,
      isShow
    }
  },
  mounted() {
    this.getTypes()
    this.getList(1);

  },
  methods: {
    // -------reset --------
    resetForm() {
      this.paramsSort = "";
      this.formSearch.reset();
      this.sortField.reset();
      this.getList(1);
    },
    search() {
      this.getList(1);
    },
    // -------action sort --------
    sortData(paramsSort, type) {
      this.paramsSort = type === 'asc' ? `&sort=${paramsSort}` : `&sort=-${paramsSort}`;
      this.sortField[paramsSort] = type === 'asc' ? 1 : 2;
      setTimeout(() => {
        this.getList(1);

      }, 100);
    },
    onChangePage(page) {
      this.getList(page)
    },
    // -------call api get list type --------
    async getTypes() {
      this.$emit("load-data", true);
      await fetch(Service.getListType())
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.typeList = data.data;
          this.$emit("load-data", false);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          this.$emit("load-data", false);
        });
    },
    // -------params filter --------
    convertDataFilter() {
      const dataSearch = this.formSearch.getData();
      if (dataSearch.type) {
        const paramType = `filter` + `[type]`
        dataSearch[paramType] = dataSearch.type
        delete dataSearch.type
      } if (dataSearch.name) {
        const paramName = `filter` + `[name]`
        dataSearch[paramName] = dataSearch.name
        delete dataSearch.name
      }
      return dataSearch

    },
    // -------call api get list pokemons--------
    async getList(page = 1) {
      this.currentPage = page;
      let dataSearch = _.cloneDeep(this.convertDataFilter());
      let params = `${qs.stringify(dataSearch, {
        addQueryPrefix: true,
      })}&page[size]=${this.perPage}&page[number]=${this.currentPage}&sort=number`;
      if (this.paramsSort) {
        params += this.paramsSort;
      }
      this.$emit("load-data", true);
      await fetch(Service.getList(params))
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.dataList = data.data;
          this.pagina = data.meta;
          this.$emit("load-data", false);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          this.$emit("load-data", false);
        });
    },
    // -------format dd/mm/yyyy hh:mm--------
    covertDate(date) {
      let dateObj = new Date(date);
      return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
    },

    // -------show popup detail--------
    viewDetails(item) {
      const idPokemon = item.id || "";
      this.$emit("load-data", true);
      fetch(Service.getDetail(idPokemon))
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.dataDetail = data['data'];
          this.$emit("load-data", false);
          this.isShow = true

        })
        .catch(error => {
          this.$emit("load-data", false);
          console.error('There was a problem with the fetch operation:', error);
        });
    },
    // --- close popup---
    closePopup() {
      this.isShow = false;
      this.dataDetail = {}
    },
    // -------download function--------
    functionDownFile(response, filename) {
      var newBlob = new Blob([response], { type: response.type });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement("a");
      link.href = data;
      link.download = filename;
      link.click();
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
      }, 100);
    },
    // -------download sprite--------
    downloadSprite(pokemon) {
      this.$emit("load-data", true);
      fetch(Service.downloadById(pokemon.id))
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.blob();
        })
        .then(blob => {
          this.functionDownFile(blob, pokemon.name);
          this.$emit("load-data", false);

        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
      this.$emit("load-data", false);

    }
  }
}
</script>
