<template>
    <v-form v-model="form" @submit.prevent="onSubmit" class="personal-form-container">
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Nombre"
                        placeholder="Ej. Stephen"
                        required
                        variant="outlined"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="lastname"
                        :rules="lastNameRules"
                        label="Apellido"
                        placeholder="Ej. King"
                        required
                        variant="outlined"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-text-field
                        v-model="phone"
                        :rules="phoneRules"
                        label="Teléfono celular"
                        placeholder="Ej. 09XXXXXXXX"
                        required
                        variant="outlined"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" >
                    <v-btn :disabled="!form" :loading="loading" color="primary" size="large" type="submit" variant="elevated"
                block>
                SOLICITAR CÓDIGO
            </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
export default {
    name: 'PersonalForm',
    data() {
        return {
            form: false,
            loading: false,
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
    methods: {
        onSubmit() {
            if (!this.form) return
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        }
}
}
</script>
<style scoped>
    
    
</style>