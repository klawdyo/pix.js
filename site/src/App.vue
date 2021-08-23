<template>
  <div class="relative" id="app">
    <div
      class="
        bg-gray-900
        w-full
        h-screen
        flex
        justify-center
        items-center
        flex-col
      "
    >
      <div class="mx-4 text-center text-white flex flex-col">
        <h1 class="font-bold text-6xl mb-4">pix.js</h1>
        <h2 class="font-bold text-3xl mb-12">
          Biblioteca de geração de cobranças em javascript
        </h2>
      </div>

      <div class="mx-4 text-center text-white block container w-full">
        <k-input
          placeholder="Chave do Vendedor"
          label="Chave"
          v-model="pix.key"
        ></k-input>
        <k-input
          placeholder="Id da transação"
          label="ID"
          v-model="pix.txId"
        ></k-input>
        <k-input
          placeholder="Valor da transação"
          label="Valor (R$)"
          type="number"
          v-model="pix.amount"
        ></k-input>
        <k-input
          placeholder="Descrição da venda"
          label="Descrição"
          v-model="pix.description"
        ></k-input>
        <k-input
          placeholder="Nome do Vendedor"
          label="Nome"
          v-model="pix.name"
        ></k-input>
        <k-input
          placeholder="Cidade do Vendedor"
          label="Cidade"
          v-model="pix.city"
        ></k-input>
        <k-input
          placeholder="CEP do Vendedor"
          label="Cidade"
          v-model="pix.zipcode"
        ></k-input>

        <!--  -->
        <!-- <k-button @click="onClick">Clique</k-button> -->
      </div>

      <!--  -->
      <div>
        <div>
          <img :src="image" width="300" height="300" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pix, qrcode } from '@klawdyo/pix.js';
// import KButton from '@/components/KButton';
import KInput from '@/components/KInput';

export default {
  components: {
    // KButton,
    KInput,
  },
  data() {
    return {
      pix: {
        key: '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc',
        name: 'klawdyo',
        amount: 0,
        city: 'Assu/RN',
        zipcode: '59650-000',
        txId: 'ASD123',
        description: '2 sanduíches e 1 mil-shake',
      },
      //
      image: null,
      payload: null,
    };
  },

  watch: {
    pix: {
      deep: true,
      handler() {
        console.log('asduiadoisaud');
        this.payload = pix(this.pix);
        qrcode(this.pix).then((v) => (this.image = v));
      },
    },
  },
  mounted() {},
};
</script>

<style>
</style>
