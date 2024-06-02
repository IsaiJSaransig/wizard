<template>
    <div class="user-form-container">
        <v-form v-model="form" @submit.prevent="onSubmit" :disabled="disabled">
            <p> <b>Por favor ingresa los siguientes datos </b></p>
            <v-container>

                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field class="text-size" v-model="name" :rules="nameRules" label="Nombre"
                            placeholder="Ej. Stephen" required variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="lastname" :rules="lastNameRules" label="Apellido" placeholder="Ej. King"
                            required variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-text-field v-model="phone" :rules="phoneRules" label="Teléfono celular"
                            placeholder="Ej. 0987654321" required variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-btn :disabled="!form" :loading="loading" color="primary" size="large" type="submit"
                            variant="elevated" block>
                            SOLICITAR CÓDIGO
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <span v-if="codeError" class="error">Oh no! Ocurrio un error al enviar el código, intentalo de nuevo</span>
        <div v-if="!codeState">
            <p>Enviaremos un <b>mensaje de texto</b> a tu número de celular.</p>
            <p>El código será valido por 2 minutos.</p>
        </div>
        <div v-if="codeState">
            <p>Código enviado a <b>{{ phone }}</b></p>
            <p>{{ timer === "00:00" ? 'El código expiró' : `Tiempo restante: ${timer}` }}</p>

        </div>
        <v-otp-input :disabled="!codeState" :error="error" v-model="otp"></v-otp-input>
        <p v-if="error" class="error error-message" >Código incorrecto</p>
        <v-btn :disabled="!changeCodeValid" color="primary" width="60%" :loading="loading" @click="validateCode">VALIDAR
            CÓDIGO</v-btn>
        <p class="reset-message">Si no recibiste el código haz click nuevamente en "Solicitar código"</p>
    </div>
</template>
<script>
import { sendCode, compareCode } from '@/services/wizardService';
export default {
    name: 'UserForm',
    data() {
        return {
            form: false,
            otp: '',
            codeState: false,
            codeError: false,
            error: false,
            codeValid: false,
            loading: false,
            disabled: false,
            codeSent: false,
            time: 10,
            name: '',
            nameRules: [
                v => !!v || 'Este campo es requerido',
                value => /^[\p{L}\s]+$/u.test(value) || 'Este campo no admite caracteres especiales o números',
                v => v.length >= 3 || 'Este campo debe tener al menos 3 caracteres',
            ],
            lastname: '',
            lastNameRules: [
                v => !!v || 'Este campo es requerido',
                value => /^[\p{L}\s]+$/u.test(value) || 'Este campo no admite caracteres especiales o números',
                v => v.length >= 3 || 'Este campo debe tener al menos 3 caracteres',
            ],
            phone: '',
            phoneRules: [
                v => !!v || 'Este campo es requerido',
                v => /^09\d{8}$/.test(v) || 'Teléfono debe tener 10 dígitos y debe empezar por 09',
            ]
        }
    },
    computed: {
        timer() {
            const minutes = Math.floor(this.time / 60);
            const seconds = this.time % 60;
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        },
        changeCodeValid() {
            return this.otp.length == 6
        }

    },
    methods: {
        async onSubmit() {
            if (!this.form) return
            this.loading = true
            this.codeState = await sendCode()
            if (this.codeState) { this.time = 100; this.reduceTime(); this.codeError = false } else { this.codeError = true }
            this.otp = ''
            this.loading = false
            this.disabled = true
        },
        reduceTime() {
            clearInterval(this.interval);
            this.interval = setInterval(() => {
                if (this.time > 0 && this.codeState) {
                    this.time--;
                    console.log(this.time)
                }
            }, 1000);
        },
        async validateCode() {
            this.codeValid = await compareCode({code: this.otp})
            if(this.codeValid){
                this.error = false
                console.log('valido')
                clearInterval(this.interval)
            }else{
                this.error = true
            }
        }
    }
}
</script>
<style scoped>
.error {
    color: #AE3F28;
}

.user-form-container {
    width: 60%;
    margin: 0 auto;
    text-align: center;
    &>.reset-message{
        margin: 20px 0px;
    };
    &.error-message{
        margin: 10px 0px;
    }
}
</style>