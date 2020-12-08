<template>
    <v-card class="ma-auto pa-3 mt-10"
        width="500px"
    >
    <DialogSuccess v-model="showSuccess"/>
    <v-tabs
        v-model="tabs"
        color="primary"
        slider-color="primary"
        @change="changTab"
    >
        <v-tab>Login</v-tab>
        <v-tab>Cadastro</v-tab>
        <v-tab v-show="user.id">Lista</v-tab>
        <v-tab v-show="user.id">Meu Amigo<br> Secreto</v-tab>
        
    </v-tabs>
    <v-tabs-items v-model="tabs">
        <v-tab-item>
            <v-card flat>
            <v-card-title primary-title>
                Login
            </v-card-title>
            <v-form ref="formLogin">
                <v-text-field
                    v-model="login"
                    name="login"
                    label="Login"
                    id="login"
                    :rules="[rules.required]"
                    outlined
                ></v-text-field>
                <v-text-field v-model="md5Cript" label="Senha" :rules="[rules.required]" 
                  :type="verSenha1?'text':'password'" @click:append="verSenha1=!verSenha1" 
                  :append-icon="verSenha1?'mdi-eye':'mdi-eye-off'"
                  outlined/>
                <v-alert v-model="alert"
                    dismissible
                    elevation="12"
                    type="error"
                    transition="slide-y-transition"
                >
                  Usuário e/ou senha incorretos!!!
                </v-alert>
                <v-btn color="success" @click="logar">Entrar</v-btn>
                <v-btn class="ma-4" color="error" @click="sair">Sair</v-btn>
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
                                <TextFieldTel v-model="user.telefone" label="Celular*" :pRules="[rules.required]"/>
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
                                <v-text-field v-model="user.num_calcado" label="Calçado" type="number"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="user.tam_blusa" label="Camisa"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="user.tam_calca" label="Calça"></v-text-field>
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
        <v-tab-item>
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="users"
                    class="elevation-1"
                    item-key="nome"
                    no-data-text="Nenhum participante encontrado"
                    :items-per-page=100        
                    hide-default-footer       
                    :search="search"
                    group-by="familia"     
                    show-group-by
                >
                <template slot="item.telefone" scope="item">
                    {{item.item.telefone|telefone}}
                </template>
                <template v-slot:top>
                    <v-text-field
                    v-model="search"
                    label="Buscar"
                    class="mx-4"
                    ></v-text-field>
                </template>
                </v-data-table>
                <small>Um total de {{users.length}} participantes</small>
            </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-title primary-title class="text--center">
              Calma.... <br>
              Ainda não sorteamos....
            </v-card-title>
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
            // baseURL: 'http://'+window.location.hostname+'/AmigoSecreto/API',
            baseURL: 'http://raul.guerreirossuplementos.com.br/AmigoSecreto/API',
            login:'',
            users:[],
            user:{},
            pass:'',
            tabs: 1,
            search:'',
            tabItens:["login","cadastro"],
            familias:["Iracelia","Maria","Luiza","Valdecir","Luiz","Silvia"],
            formCad: false,
            senhaCompara: '',
            verSenha1: false,
            verSenha2: false,
            userDisponivel: 1,
            senha: '',
            showSuccess: false,
            alert:false,
            headers:[
                {text: "Nome", value: 'nome'},
                {text: "Família", value: 'familia'},
                {text: "Celular", value: 'telefone'}
            ]
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
        changTab(){
            if(this.tabs==2){
                this.carregarUsers();
            }
        },
        carregarUsers(){
            let t = this;
            api.get('get_user.php')
            .then(function(resp){
                t.users = JSON.parse(resp.data).users;
                console.log(t.user);
            }).catch(function(resp){
                console.log('Get User Erro',resp.response);
            });
        },
        userDisponivelRules(){
            return this.userDisponivel!=0||'Usuário indisponível.';
        },
        sair(){
          this.user={};
          this.limpar();

        },
        logar(){
            if(!this.$refs.formLogin.validate()) return;
            let t = this;
            let userSenha = {
              user:this.login,
              pass:md5(this.senha)
            };
            console.log(userSenha);
            api.post('login.php',userSenha)
            .then(function(resp){
                t.user = resp.data;
                t.tabs = 1;
                t.alert = false;
                console.log(t.user);
            }).catch(function(resp){
                console.log(resp);
                console.log(resp.response);
                t.alert = true;
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
            this.$refs.formLogin.reset();
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