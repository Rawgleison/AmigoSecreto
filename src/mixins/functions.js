const funcoes = {
    data(){
        return{    
            xlogado: 'Tô logado',             
            empreendimentos: [],                 
            estados: [       
                { value: "AC", text: "AC" },
                { value: "AL", text: "AL" },
                { value: "AP", text: "AP" },
                { value: "AM", text: "AM" },
                { value: "BA", text: "BA" },
                { value: "CE", text: "CE" },
                { value: "DF", text: "DF" },
                { value: "ES", text: "ES" },
                { value: "EX", text: "EX" },
                { value: "GO", text: "GO" },
                { value: "MA", text: "MA" },
                { value: "MT", text: "MT" },
                { value: "MS", text: "MS" },
                { value: "MG", text: "MG" },
                { value: "PA", text: "PA" },
                { value: "PB", text: "PB" },
                { value: "PR", text: "PR" },
                { value: "PE", text: "PE" },
                { value: "PI", text: "PI" },
                { value: "RJ", text: "RJ" },
                { value: "RN", text: "RN" },
                { value: "RS", text: "RS" },
                { value: "RO", text: "RO" },
                { value: "RR", text: "RR" },
                { value: "SC", text: "SC" },
                { value: "SP", text: "SP" },
                { value: "SE", text: "SE" },
                { value: "TO", text: "TO" }
              ],
            dialog: false,
            rules: {
                required: value => !!value || 'Obrigatório.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                minLength(xlength, value){
                   return(value || '').length >= xlength || 'Mínimo de '+xlength+' caracteres';
                },
                maxLength(maxnum, v) { 
                  return (v || '').length <= maxnum ||  'Máximo de '+maxnum+'caracters';
                },
                email: value => {
                  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  return pattern.test(value) || 'e-mail inválido!!!.'
                },               
                minValueMoeda(minValue,value){
                  value = value.replace('.',''); 
                  let vr = parseFloat(value.replace(',','.') || 0);
                  let Val = parseFloat(minValue).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
                  return vr >= (minValue || 0) || 'O valor deve ser maior ou igual à R$ ' + Val; 
                },
                maxValueMoeda(maxValue,value){
                  value = value.replace('.',''); 
                  let vr = parseFloat(value.replace(',','.') || 0);
                  let Val = parseFloat(maxValue).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
                  return  vr <= (maxValue || 0) || 'O valor deve ser menor ou igual à R$ ' + Val; 
                },
                comparaSenhas(senha, confirma_senha){
                   return senha == confirma_senha || 'As senhas precisam ser iguais' 
                },
                isCPFValido(val){
                  if(!val) return true;

                  let isValido = true;
                  if((val = val.replace(/[^\d]/g,"")).length != 11)
                    isValido = false    
               if(val == "00000000000" ||
                  val == "11111111111" ||
                  val == "22222222222" ||
                  val == "33333333333" ||
                  val == "44444444444" ||
                  val == "55555555555" ||
                  val == "66666666666" ||
                  val == "77777777777" ||
                  val == "88888888888" ||
                  val == "99999999999")
                    isValido = false;
              
              var r;
              var s = 0;
              var i = 0;
              for (i=1; i<=9; i++)
                s = s + parseInt(val[i-1]) * (11 - i);
            
              r = (s * 10) % 11;
            
              if ((r == 10) || (r == 11))
                r = 0;
            
              if (r != parseInt(val[9]))
                isValido = false;
            
              s = 0;
            
              for (i = 1; i <= 10; i++)
                s = s + parseInt(val[i-1]) * (12 - i);
            
              r = (s * 10) % 11;
            
              if ((r == 10) || (r == 11))
                r = 0;
            
              if (r != parseInt(val[10]))
                isValido = false;
            
              return isValido||'CPF Inválido';
              },
              isCNPJValido(val){
                if(!val) return true;
                let isValido = true;
                let cnpj = val.replace(/[^\d]+/g,'');
            
                if(cnpj == '') isValido = false;
                
                if (cnpj.length != 14)
                    isValido = false;
            
                // Elimina CNPJs invalidos conhecidos
                if (cnpj == "00000000000000" || 
                    cnpj == "11111111111111" || 
                    cnpj == "22222222222222" || 
                    cnpj == "33333333333333" || 
                    cnpj == "44444444444444" || 
                    cnpj == "55555555555555" || 
                    cnpj == "66666666666666" || 
                    cnpj == "77777777777777" || 
                    cnpj == "88888888888888" || 
                    cnpj == "99999999999999")
                    isValido = false;
                    
                // Valida DVs
                let tamanho = cnpj.length - 2
                let numeros = cnpj.substring(0,tamanho);
                let digitos = cnpj.substring(tamanho);
                let soma = 0;
                let pos = tamanho - 7;
                for (let i = tamanho; i >= 1; i--) {
                  soma += numeros.charAt(tamanho - i) * pos--;
                  if (pos < 2)
                        pos = 9;
                }
                let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

                if(resultado != digitos.charAt(0))
                    isValido = false;
                    
                tamanho = tamanho + 1;
                numeros = cnpj.substring(0,tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (let i = tamanho; i >= 1; i--) {
                  soma += numeros.charAt(tamanho - i) * pos--;
                  if (pos < 2)
                        pos = 9;
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if(resultado != digitos.charAt(1))
                    isValido = false;
                      
                return isValido||"CNPJ inválido";
              }
            },
        }
    },
    computed:{

    },
    methods:{
      isMobile(){
        return this.$screen.touch || this.$screen.portrait;
      },
      maskTel(val){
        if((val||'').substr(2,1) == '9')
          return '(##) #####-####';
        else
         return '(##) ####-####';
      },
        onlyNumber(val){    
          if(!val)return "";   
          var aux = val;   
          return aux.replace(/\D+/g,""); 
         },        
         mascaraMoeda(val){
           if(!val) return 0;
           var v = this.onlyNumber(val);
           return v.toFixed(2);
         },   
         mascara_cel(val) {         
             if(!val) return '';       
            const arr = val.split('');
              arr.splice(0,0, '(');
              arr.splice(3,0, ')');
              arr.splice(4,0, ' ');
              arr.splice(10,0, '-');      
            return arr.join(''); 
        },
        mascara_cnpj_cpf(val) {                
            const arr = val.split('');
            if (val.length == 11 ){            
                arr.splice(3,0, '.');
                arr.splice(7,0, '.');
                arr.splice(11,0, '-');      
            }
                else if (val.length == 14 ){
            arr.splice(2,0, '.');
            arr.splice(6,0, '.');
            arr.splice(10,0, '/');
            arr.splice(15,0, '-');    
          }
         return arr.join(''); 
        },
        mascara_cep(val) {       
          val = this.onlyNumber(val);         
          const arr = val.split('');
          if(val.length >= 2) arr.splice(2,0, '.');
          if(val.length >= 6) arr.splice(6,0, '-');     
          return arr.join(''); 
        },
          validaCpf(c){
            if((c = c.replace(/[^\d]/g,"")).length != 11)
              return false    
           if (c == "00000000000" ||
            c == "11111111111" ||
            c == "22222222222" ||
            c == "33333333333" ||
            c == "44444444444" ||
            c == "55555555555" ||
            c == "66666666666" ||
            c == "77777777777" ||
            c == "88888888888" ||
            c == "99999999999")
            return false;
        
          var r;
          var s = 0;
          var i = 0;
          for (i=1; i<=9; i++)
            s = s + parseInt(c[i-1]) * (11 - i);
        
          r = (s * 10) % 11;
        
          if ((r == 10) || (r == 11))
            r = 0;
        
          if (r != parseInt(c[9]))
            return false;
        
          s = 0;
        
          for (i = 1; i <= 10; i++)
            s = s + parseInt(c[i-1]) * (12 - i);
        
          r = (s * 10) % 11;
        
          if ((r == 10) || (r == 11))
            r = 0;
        
          if (r != parseInt(c[10]))
            return false;
        
          return true;
        },
          zoomOutMobile() {
            var viewport = document.querySelector('meta[name="viewport"]');
            
            if ( viewport ) {
              viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
              setTimeout(function() {
                viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=10.0";
            }, 350);  
            }
          },
          formatDate(formatStr, pDate){
            if(!pDate){return;}
            try {
            let data = '';
            let dia = pDate.getDate().toString().padStart(2,'0');
            let mes = (pDate.getMonth()+1).toString().padStart(2,'0');
            let hora = pDate.getHours().toString().padStart(2,'0');
            let min = pDate.getMinutes().toString().padStart(2,'0');
            let sec = pDate.getSeconds().toString().padStart(2,'0');
            data = formatStr;
            data = data.replace('dd',dia);
            data = data.replace('MM',mes);
            data = data.replace('yyyy',pDate.getFullYear());
            data = data.replace('yy',pDate.getYear());
            data = data.replace('hh',hora);
            data = data.replace('mm',min);
            data = data.replace('ss',sec);
            return data;
          } catch (e) {
            console.log(e,pDate);
          }

          },
    },
    filters:{
      moeda(val){
        return parseFloat(val).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      },
      m2(val){
        return parseFloat(val).toLocaleString('pt-br', {minimumFractionDigits: 2})+" m²";
      },
      porcent(val){
        return parseFloat(val).toLocaleString('pt-br', {maximumFractionDigits: 2})+"%";
      },
      telefone(val){
        return funcoes.methods.mascara_cel(val);

      }
    },
}
    export default funcoes;