<template>
    <v-form @submit.prevent="onSubmit" v-model="form">
        <v-container>
            <v-row>
                <v-col>
                    <v-text-field
                        label="Ingresa tu número de RUC"
                        placeholder="Ej. 1717171717"
                        variant="outlined"
                        v-model="ruc"
                        @keydown.enter.prevent="searchRUC"
                        required
                        :rules="rucRules"
                    />
                </v-col>
                <v-btn
                    :disabled="!isRucValid"
                    :loading="loadingSearch"
                    color="primary"
                    size="large"
                    variant="elevated"
                    class="button-container"
                    @click="searchRUC"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                        />
                    </svg>
                </v-btn>
            </v-row>
            <v-row v-if="!notFound">
                <v-col>
                    <p class="not-found">RUC no encontrado, intentalo de nuevo</p>
                </v-col>
            </v-row>
            <v-row v-show="found">
                <v-col cols="12" sm="12">
                    <v-text-field label="Razón social"  variant="outlined" v-model="name" disabled required :rules="textRules" />
                </v-col>
            </v-row>
            <v-row v-show="found">
                <v-col cols="4" sm="2">
                    <v-autocomplete label="Código" :items="items" v-model="subsidiariesCode" variant="outlined"></v-autocomplete>
                </v-col>
                <v-col cols="8" sm="10">
                    <v-text-field label="Dirección" variant="outlined" v-model="direction" disabled required :rules="textRules"/>
                </v-col>
            </v-row>
            <v-row v-show="found">
                <v-col cols="12">
                    <v-text-field label="Nombre Comercial" variant="outlined" v-model="comercialName" disabled required  :rules="textRules"/>
                </v-col>
            </v-row>
            <v-row v-show="found">
                <v-col cols="12">
                    <v-text-field label="Correo electrónico" placeholder="Ej. user.name@email.com" variant="outlined" v-model="email" required :rules="emailRules" />
                </v-col>
            </v-row>
            <v-row v-show="found">
                <v-col cols="12">
                    <v-btn :disabled="!form" :loading="loading" color="primary" size="large" type="submit" variant="elevated" block>
                        CREAR DEMO
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import { sendRucCode, saveLead } from '@/services/wizardService';

export default {
    name: 'BusinessForm',
    mounted() {
        let lsData = JSON.parse(localStorage.getItem('userData'))
        if(lsData){
            this.userData = lsData
        }
    },
    data() {
        return {
            userData : {},
            form: false,
            notFound: true,
            found: false,
            loading: false,
            loadingSearch: false,
            subsidiariesCode: '',
            items: [],
            name: '',
            direction: '',
            comercialName: '',
            rucData: '',
            ruc: '',
            email: '',
            rucRules: [
                (v) => !!v || 'Este campo es requerido',
                (v) => /^\d{13}$/.test(v) || 'El RUC debe ser de 13 dígitos',
            ],
            textRules: [
                (v) => !!v || 'Este campo es requerido',
            ],
            emailRules: [
                (v) => !!v || 'Este campo es requerido',
                (v) => /.+@.+\..+/.test(v) || 'El correo no es valido',
            ],
        };
    },
    methods: {
        onSubmit() {
            if (!this.form) return;
            this.loading = true;
            this.addData();
            this.save();
        },
        async searchRUC() {
            if(!this.isRucValid) return
            this.loadingSearch = true;
            try {
                const validRuc = await sendRucCode(this.ruc);
                this.loadingSearch = false;
                if (validRuc.status) {
                    this.rucData = validRuc.data;
                    this.items = validRuc.data.subsidiaries.map((subsidiary) => subsidiary.code);
                    this.name = validRuc.data.businessname;
                    this.notFound = true;
                    this.found = true;
                } else {
                    this.notFound = false;
                    this.found = false;
                }
            } catch (error) {
                this.loadingSearch = false;
                this.notFound = false;
                this.found = false;
            }
        },
        addData() {
            this.userData.ruc = this.ruc
            this.userData.address = this.direction
            this.userData.commercialname = this.comercialName
            this.userData.businessname = this.name
            this.userData.code = this.subsidiariesCode
            this.userData.email = this.email
        },
        async save() {
            let saveStatus = await saveLead(this.userData)
            if (saveStatus) {
                localStorage.removeItem('userData')
                this.$router.push('/confirmation')
            }
        }
    },
    computed: {
        isRucValid() {
            return this.ruc.length === 13;
        },
    },
    watch: {
        subsidiariesCode(newVal) {
            const selectedSubsidiary = this.rucData.subsidiaries.find((subsidiary) => subsidiary.code === newVal);
            if (selectedSubsidiary) {
                this.direction = selectedSubsidiary.address;
                this.comercialName = selectedSubsidiary.commercial_name;
            }
        },
    },
};
</script>

<style scoped>
.button-container {
    margin: 10px 0;
}

.not-found {
    text-align: center;
    font-weight: bold;
    color: #AE3F28;
}
</style>
