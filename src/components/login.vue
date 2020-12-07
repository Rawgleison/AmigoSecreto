<template>
    <v-card class="ma-auto pa-3 mt-10"
        width="500px"
    >
    <DialogSuccess v-model="showSuccess"/>
    <v-tabs
        v-model="tabs"
        color="primary"
        slider-color="primary"
    >
        <v-tab>Login</v-tab>
        <v-tab>Cadastro</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
        <v-tab-item>
            <v-card flat disabled>
            <v-card-title primary-title>
                Login
            </v-card-title>
            <v-form>
                <v-text-field
                    v-model="login"
                    name="login"
                    label="Login"
                    id="login"
                    outlined
                ></v-text-field>
                <v-text-field
                    v-model="pass"
                    name="pass"
                    label="Senha"
                    id="pass"
                    outlined
                ></v-text-field>
                <v-btn color="success" @click="logar">Visualizar</v-btn>
            </v-form>
            </v-card>
        </v-tab-item>

        <v-tab-item>
            <v-card>
                <v-card-title>
                    <span class="headline">Cadastro</span> 
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form v-model="formCad" lazy-validation ref="formCad">
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="user.nome" label="Nome*" :rules="[rules.required]"/>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <TextFieldTel v-model="user.fone" label="Celular*" :pRules="[rules.required]"/>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-select v-model="user.familia" :items="familias" label="Familia*"  :rules="[rules.required]"/>
                            </v-flex>
                        </v-layout>
                            <div class="mt-2"><b> Dados de acesso</b><br><small>Dados que serão usados para visualizar o amigo</small></div>
                        <v-divider></v-divider>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="user.login" label="Login*" :rules="[rules.required,userDisponivelRules()]" @change="confereUser(user.login)" @input="userDisponivel = 1"
                                    :success-messages="user.login&&userDisponivel==2?'Usuário Disponível':''" />
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="md5Cript" label="Senha*" :rules="[rules.required]" :type="verSenha1?'text':'password'" @click:append="verSenha1=!verSenha1" :append-icon="verSenha1?'mdi-eye':'mdi-eye-off'"/>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="senhaCompara" label="Confirmar Senha*" :rules="[rules.required,rules.comparaSenhas(senha,senhaCompara)]" :type="verSenha2?'text':'password'" @click:append="verSenha2=!verSenha2" :append-icon="verSenha2?'mdi-eye':'mdi-eye-off'"/>
                            </v-flex>
                        </v-layout>
                            <div class="mt-2"><b> Dados opcionais</b><br><small>Dados que ajudarão seu amigo a escolher o melhor presente pra você</small></div>
                        <v-divider></v-divider>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="user.numCalcado" label="Calçado" type="number"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="user.tamBlusa" label="Camisa"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="user.numCalca" label="Calça"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-select v-model="user.idade" label="Idade" required :items="['0-5', '5-10', '10-15', '15-20','20+']"></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea
                                    v-model="user.sugestoes"
                                    label="Sugestões"
                                ></v-textarea>
                            </v-flex>
                        </v-layout>
                        </v-form>
                    </v-container>
                    <small>*Campos obrigatórios</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue" text @click.native="limpar">Limpar</v-btn>
                    <v-btn color="success" text @click.native="gravar">Gravar</v-btn>
                </v-card-actions>
            </v-card>
        </v-tab-item>
    </v-tabs-items>
    </v-card>
</template>
<script>
import axios from 'axios'
import funcoes from '@/mixins/functions'
import TextFieldTel from '@/components/TextFieldTel'
import DialogSuccess from '@/components/DialogSuccess'

var md5 = require('md5');

let api = null;
export default {
    mixins:[funcoes],
    components:{
        TextFieldTel,
        DialogSuccess
    },
    data(){
        return{
            baseURL: 'http://'+window.location.host+'/amigo_secreto/API',
            login:'',
            user:{},
            pass:'',
            tabs: 1,
            tabItens:["login","cadastro"],
            familias:["Iracelia","Maria","Luiza","Valdecir","Luiz","Silvia"],
            formCad: false,
            senhaCompara: '',
            verSenha1: false,
            verSenha2: false,
            userDisponivel: 1,
            senha: '',
            showSuccess: false
        }
    },
    created(){
        api = axios.create({baseURL: this.baseURL});
    },
    monted(){
        this.limpar();
    },
    computed:{
        cmpUrl(){
            return window.location.host;
        },
        md5Cript:{
            get:function(){
                return this.senha;
            },
            set:function(val){
                this.user.senha = md5(val||'');
                this.senha = val;
            }
        },
        celMask:{
            get:function(){
                return this.mascara_cel(this.user.fone);
            },
            set:function(val){
                this.user.fone = this.onlyNumber(val);
            }
        }
    },
    methods:{
        userDisponivelRules(){
            return this.userDisponivel!=0||'Usuário indisponível.';
        },
        logar(){
            const token = Buffer.from(`${this.user}:${this.pass}`,'utf8').toString('base64');
            console.log(token);
            api.post('login.php','',{headers: {Authorization : `Basic ${token}`}})
            .then(function(resp){
                console.log(resp);
                alert('deu certo<br>' + resp.data);
            }).catch(function(resp){
                console.log(resp);
            });
        },
        gravar(){
            if(!this.$refs.formCad.validate()) return;
            let t = this;
            console.log(JSON.stringify(this.user));
            api.post('cadastra_user.php',JSON.stringify(this.user))
            .then(function(resp){
                console.log('Cadastrado OK',resp);
                t.limpar(); 
                t.showSuccess = true;
            }).catch(function(resp){
                console.log('Cadastrado User Erro',resp);
                alert('Erro ao cadastrar Usuário \n'+resp.data);
            });
        },
        limpar(){
            // this.$refs.formCad.resetValidation();
            this.$refs.formCad.reset();
            this.userDisponivel = true;
            // this.user = {};
        },
        confereUser(user){
            let t = this;
            if(!user) return;
            api.post('confere_user.php',`user=${user}`)
            .then(function(resp){
                console.log('Confere User OK',resp);
                t.userDisponivel = 2; 
            }).catch(function(resp){
                console.log('Confere User Erro',resp);
                t.userDisponivel = 0;
            });

        }
    }

}
</script>