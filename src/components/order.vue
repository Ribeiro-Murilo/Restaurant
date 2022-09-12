<template>
  <div class="order">
    <form>
      <div class="user-data">
        <p class="section-title">Seus dados</p>
        <div class="input-field">
          <label for="">{{ formData.name.label }}</label>
          <input
            type="tel"
            :placeholder="formData.name.placeholder"
            v-model="formData.name.value"
            @blur="formData.name.isValid()"
            :class="{ error: !formData.name.valid }"
          />

          <p class="error-menssage" v-if="!formData.name.valid">
            {{ formData.name.errorMessage }}
          </p>
        </div>
        <div class="input-field">
          <label for="phone">{{ formData.cellphone.label }}</label>
          <input
            type="text"
            :placeholder="formData.cellphone.placeholder"
            v-mask="'(##) # ####-####'"
            v-model="formData.cellphone.value"
            @blur="formData.cellphone.isValid()"
            :class="{ error: !formData.cellphone.valid }"
          />
          <p class="error-menssage" v-if="!formData.cellphone.valid">
            {{ formData.cellphone.errorMessage }}
          </p>
        </div>
      </div>
      <div class="address">
        <p class="section-title">Endereço</p>
        <div class="radio-conteiner">
          <div class="radio-options">
            <input
              type="radio"
              name="delivery-type"
              id="store"
              value="store"
              v-model="deliveryType"
            />
            <label for="store">Retirar na loja</label>
          </div>
          <div class="radio-options">
            <input
              type="radio"
              name="delivery-type"
              id="delivery"
              value="delivery"
              v-model="deliveryType"
            />
            <label for="delivery">Delivery</label>
          </div>
        </div>
        <div class="address-cart" v-if="isDeliveryType && hasAddressInfo">
          <p>{{ formData.city.value }}</p>
          <p>{{ formData.street.value }}</p>
          <p>{{ formData.number.value }} {{ formData.complement.value }}</p>
        </div>
        <a @click="onShowaddressModal" v-if="isDeliveryType">{{
          addressButtonLabel
        }}</a>
      </div>
      <div class="payment">
        <p class="section-title">Pagamento</p>
        <p>Metodo de pagamento</p>
        <div class="radio-conteiner">
          <div class="radio-options">
            <input
              type="radio"
              name="payment-type"
              id="card"
              value="card"
              v-model="paymentType"
            />
            <label for="card">Cartão</label>
          </div>
          <div class="radio-options">
            <input
              type="radio"
              name="payment-type"
              id="cash"
              value="cash"
              v-model="paymentType"
            />
            <label for="cash">Dinheiro</label>
          </div>
        </div>
      </div>
    </form>

    <button class="primary-button"  @click="orderItens">Concluir pedido</button>

    <Modal :show="showAddressModal" @onCancelClick="hideAddressModal">
      <div class="modal-content">
        <h1>Adicionar Endereço</h1>

        <div class="input-field">
          <label for="phone">{{ formData.cep.label }}</label>
          <input
            type="text"
            :placeholder="formData.cep.placeholder"
            v-mask="'#####-###'"
            v-model="formData.cep.value"
            @blur="formData.cep.isValid()"
            :class="{ error: !formData.cep.valid }"
          />
          <p class="error-menssage" v-if="!formData.cep.valid">
            {{ formData.cep.errorMessage }}
          </p>
        </div>
        <div class="input-field">
          <label for="">{{ formData.city.label }}</label>
          <input
            type="tel"
            :placeholder="formData.city.placeholder"
            v-model="formData.city.value"
            @blur="formData.city.isValid()"
            :class="{ error: !formData.city.valid }"
          />

          <p class="error-menssage" v-if="!formData.city.valid">
            {{ formData.city.errorMessage }}
          </p>
        </div>

        <div class="street-conteiner">
          <div class="input-field">
            <label for="">{{ formData.street.label }}</label>
            <input
              type="tel"
              :placeholder="formData.street.placeholder"
              v-model="formData.street.value"
              @blur="formData.street.isValid()"
              :class="{ error: !formData.street.valid }"
            />

            <p class="error-menssage" v-if="!formData.street.valid">
              {{ formData.street.errorMessage }}
            </p>
          </div>
          <div class="input-field">
            <label for="">{{ formData.number.label }}</label>
            <input
              type="number"
              :placeholder="formData.number.placeholder"
              v-model="formData.number.value"
              @blur="formData.number.isValid()"
              :class="{ error: !formData.number.valid }"
            />

            <p class="error-menssage" v-if="!formData.number.valid">
              {{ formData.number.errorMessage }}
            </p>
          </div>
        </div>
        <div class="input-field">
          <label for="">{{ formData.complement.label }}</label>
          <input
            type="tel"
            :placeholder="formData.complement.placeholder"
            v-model="formData.complement.value"
          />

          <p>
            {{ formData.complement.errorMessage }}
          </p>
        </div>
        <div class="button-conteiner">
          <button class="secondary-button" @click="hideAddressModal">
            Cancelar
          </button>
          <button class="primary-button" @click="validationAddress">
            Adicionar
          </button>
        </div>
      </div>
    </Modal>

    <Modal :show="showInvalidAddresModal" @onCancelClick="invalidAddressModal">
      <div class="invalidAddresModal">
        <span v-html="warningIncon" class="icon"></span>
        <span>
          Na modalidade delivery e necessario adicionar um endereço valido</span
        >
      </div>
    </Modal>

    <Modal :show="showSucessModal" @onCancelClick="closeSucessModal">
      <div class="sucessModal">
        <span v-html="checkIncon" class="icon"></span>
        <span> Pedido realizado com sucesso </span>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import feather from "feather-icons";
// import ItemsListVue from "./ItemsList.vue";

export default {
  name: "orderPayment",
  components: {
    Modal,
  },
  data() {
    return {
      formData: {
        name: {
          value: "",
          errorMessage: "O nome é obrigatorio",
          placeholder: "Digite seu nome",
          label: "Nome*",
          valid: true,
          isValid: () => {
            this.formData.name.valid = !!this.formData.name.value.length;
          },
        },
        cellphone: {
          value: "",
          errorMessage: "O celular é obrigatorio",
          placeholder: "Digite seu celular",
          label: "Celular*",
          valid: true,
          isValid: () => {
            this.formData.cellphone.valid =
              this.formData.cellphone.value.length === 16;
          },
        },
        cep: {
          value: "",
          errorMessage: "O CEP é obrigatorio",
          placeholder: "Digite seu CEP",
          label: "CEP*",
          valid: true,
          isValid: () => {
            this.formData.cep.valid = !!this.formData.cep.value.length;
          },
        },
        city: {
          value: "",
          errorMessage: "O cidade é obrigatorio",
          placeholder: "Digite sua cidade",
          label: "Cidade*",
          valid: true,
          isValid: () => {
            this.formData.city.valid = !!this.formData.city.value.length;
          },
        },
        street: {
          value: "",
          errorMessage: "O rua é obrigatorio",
          placeholder: "Digite sua rua",
          label: "Rua*",
          valid: true,
          isValid: () => {
            this.formData.street.valid = !!this.formData.street.value.length;
          },
        },
        number: {
          value: "",
          errorMessage: "O número é obrigatorio",
          placeholder: "Digite seu número",
          label: "Número*",
          valid: true,
          isValid: () => {
            this.formData.number.valid = !!this.formData.number.value.length;
          },
        },
        complement: {
          value: "",
          placeholder: "Digite seu Complemento",
          label: "Complemento",
          valid: true,
        },
      },
      showAddressModal: false,
      showInvalidAddresModal: false,
      showSucessModal: false,
      deliveryType: "store",
      paymentType: "card",
    };
  },
  computed: {
    isAddressValid() {
      let isValid = true;
      isValid &= this.formData.cep.valid;
      isValid &= this.formData.city.valid;
      isValid &= this.formData.street.valid;
      isValid &= this.formData.number.valid;
      return isValid;
    },
    isUserFromDataValid() {
      let isValid = true;
      isValid &= this.formData.cellphone.valid;
      isValid &= this.formData.name.valid;
      return isValid;
    },
    isDeliveryType() {
      return this.deliveryType === "delivery";
    },
    hasAddressInfo() {
      return (
        this.formData.cep.value &
          this.formData.city.value &
          this.formData.street.value || this.formData.number.value
      );
    },
    addressButtonLabel() {
      return this.hasAddressInfo ? "Editar endereço" : "Adicionar endereço";
    },
    warningIncon() {
      return feather.icons["alert-triangle"].toSvg();
    },
    checkIncon() {
      return feather.icons.check.toSvg();
    },
  },
  methods: {
    triggerValidation() {
      this.formData.name.isValid();
      this.formData.cellphone.isValid();
      if (this.isDeliveryType) {
        this.triggerAddressValidation();
        this.showInvalidAddresModal = !this.isAddressValid;
      }
    },
    triggerAddressValidation() {
      this.formData.cep.isValid();
      this.formData.city.isValid();
      this.formData.street.isValid();
      this.formData.number.isValid();
    },
    orderItens() {
      this.triggerValidation();
      if (!this.isUserFromDataValid || !this.isAddressValid) return;
      this.showSucessModal = true;
      const phone = "5517991541584";
      let text = `Cliente: ${this.formData.name.value}
      Numero: ${this.formData.cellphone.value}
      Pedido:
      ${this.$store.state.cartList.map((item) => {
        return `
        ${item.quantity}x 
        ${item.name}
        Obs:${item.observations}`;
      })}`;
      //nao funciona
      if (this.isDeliveryType) {
        text += `
        CEP: ${this.formData.cep.value}
        Cidade: ${this.formData.city.value}
        Rua: ${this.formData.street.value}
        Numero: ${this.formData.number.value}
        `;
        if (this.formData.complement.value.length) {
          text += `Complemento: ${this.formData.complement.value}`
        }
      }
      text = window.encodeURIComponent(text);
      window.open(
        `https://api.whatsapp.com/send?phone=${phone}&text=${text}&&{address}`
      );
    },
    onShowaddressModal() {
      this.showAddressModal = true;
    },
    hideAddressModal() {
      this.showAddressModal = false;
    },
    validationAddress() {
      this.triggerAddressValidation();
      if (!this.isAddressValid) return;
      this.showAddressModal = false;
    },
    invalidAddressModal() {
      this.showInvalidAddresModal = false;
    },
    sucessModal() {
      this.showSucessModal = true;
    },
    closeSucessModal() {
      this.showSucessModal = false;
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped lang="less">
.order {
  // width: 720px;
  margin: 30px 50px;
  background-color: white;
  border-radius: 8px;
  padding: 30px 50px;

  .input-field {
    display: flex;
    flex-direction: column;
    & + .input-field {
      margin-top: 20px;
    }
  }
  .error-menssage {
    font-size: 12px;
    color: @error-color;
  }
  form {
    display: flex;
    flex-direction: column;
    .user-data{
      p{
        width: fit-content;
        margin: 20px auto ;
      }
    }
    .section-title {
      font-weight: 600;
      font-size: 22px;
      margin-bottom: 20px;
    }

    label {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .radio-conteiner {
      display: flex;
      input {
        height: unset;
        padding: 0;
      }
    }
    .address {
      a {
        display: block;
        margin: 15px;
        color: @pink;
        font-weight: normal;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
        width: fit-content;
      }
      .address-cart {
        margin-top: 20px;
        border: 1px solid @dark-grey;
        border-radius: 8px;
        width: fit-content;
        padding: 15px 25px;
        p {
          font-size: 16px;
          font-weight: 24px;
          color: @dark-grey;
          margin: 2px 0;
        }
      }
    }
    .radio-options {
      & + .radio-options {
        margin-left: 25px;
      }

      label {
        padding-left: 10px;
      }
    }
  }
  button {
    margin: 30px auto;
  }
  .modal-content {
    button {
      text-align: center;
      & + button {
        margin-left: 15px;
      }
    }
    .button-conteiner {
      display: flex;
    }
    .street-conteiner {
      display: flex;
      margin-bottom: 20px;

      .input-field {
        margin: 0;
        margin-top: 20px;
        & + .input-field {
          width: 30%;
          margin-left: 20px;
        }
      }
    }
  }
  .invalidAddresModal,
  .sucessModal {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding-bottom: 20px;
    .icon {
      margin-bottom: 10px;
    }
  }
  @media @small-desktop {
    margin: 30px auto;
  }
  @media @smartphone {
  padding: 10px;
  }
}
</style>