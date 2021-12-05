package com.bandtec.searchdevelopers.activities.login

import android.content.Intent
import android.os.Build
import android.os.Bundle
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import android.text.Editable
import android.text.TextUtils
import android.text.TextWatcher
import android.util.Patterns
import android.view.View
import android.widget.*
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.backend.adapter.CadastrarAdapter
import com.bandtec.searchdevelopers.backend.repository.CadastrarRepository
import java.text.DateFormat
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.regex.Pattern
import android.widget.EditText
import com.bandtec.searchdevelopers.activities.MainActivity
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout
import java.time.LocalDate
import java.time.Period

class CadastroActivity : AppCompatActivity() {

    var cpfCnpjValido: Boolean = false
    var validacaoCadastro: Boolean = false


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_cadastro)

        // criando mascara para telefone
        val edTelefone : EditText  = findViewById(R.id.ed_telefone)
        edTelefone.addTextChangedListener(Mask.insert("(##)#####-####", edTelefone))

        // criando mascara para Data
        val edNasc : EditText  = findViewById(R.id.ed_nasc)
        edNasc.addTextChangedListener(MaskDate.mask(edNasc,"##/##/####"))

        // criando mascara e usando validação para cpf/cnpj
        var edCpfCnpj: EditText = findViewById(R.id.ed_cpf_cnpj)
        val cbJuridica: CheckBox = findViewById(R.id.cb_juridica)
        edCpfCnpj.addTextChangedListener(MaskDocument.mask(edCpfCnpj, cbJuridica))

    }



    var qualquerCoisa: Boolean = false
    var dadosValidos: Boolean = false

    fun validarCpf (v: CheckBox, cpfCnpj: EditText) {
        when (v.isChecked) {
                true -> {
                    if (cpfCnpj.text.toString().length == 18) {
                        cpfCnpjValido = true
                    } else {
                        cpfCnpjValido = false
                        cpfCnpj.error = "Não é um CNPJ válido."
                    }
                }
                false -> {
                    if (checkCpf(cpfCnpj.text.toString())) {
                        cpfCnpjValido = true
                    } else {
                        cpfCnpjValido = false
                        cpfCnpj.setError("Não é um CPF válido.")
                    }
                }
            }
    }



    @RequiresApi(Build.VERSION_CODES.O)
    fun verificaIdade(nasc: String): Boolean{
        val hoje = LocalDate.now()
        val ano = nasc.split("/")
        val tempo: LocalDate
        try{
            tempo = LocalDate.of(ano[2].toInt(),ano[1].toInt(),ano[0].toInt())
        }catch(e: Exception){
            return false
        }
        val period = Period.between(tempo,hoje)
        val periodStr = period.toString().split("Y")
        val idade = periodStr[0].substring(1,periodStr[0].length)
        if(idade.toInt()>=18){
            return true
        }
        return false
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun registerValidation(v: View) {
        // import dos valores do input
        val edNome: TextInputEditText = findViewById(R.id.ed_nome)
        val edNasc: TextInputEditText = findViewById(R.id.ed_nasc)
        val edEmail: EditText = findViewById(R.id.ed_email)
        val edTelefone: EditText = findViewById(R.id.ed_telefone)
        val edSenha: EditText = findViewById(R.id.ed_senha)
        val edCpfCnpj: EditText = findViewById(R.id.ed_cpf_cnpj)

//         conversão do valor do input para o tipo correto (strin, boolean, int)
        var nome = edNome.text.toString()
        var email = edEmail.text.toString()
        var telefone = edTelefone.text.toString()
        var senha = edSenha.text.toString()
        val checkBox: CheckBox = findViewById(R.id.cb_termo)
        val cbFisica: CheckBox = findViewById(R.id.cb_fisica)
        val cbJuridica: CheckBox = findViewById(R.id.cb_juridica)

        // criação de variaveis para validação do cadastro
        var nomeVld = false
        var nascVld = false
        var emailVld = false
        var telefoneVld = false
        var senhaVld = false

        // validação dos CHECKBOX
//        if(!checkBox.isChecked){
//            checkBox.requestFocus()
//        } else if (cbFisica.isChecked || cbJuridica.isChecked){
//            cbFisica.requestFocus()
//            cbJuridica.requestFocus()
//        }

        if(!TextUtils.isEmpty(nome)) {
            nomeVld = true
        } else {
            edNome.requestFocus()
            edNome.setError("Favor preencher um nome")
        }

        if(verificaIdade(edNasc.text.toString())) {
            nascVld = true
        } else{
            edNasc.setError("Data invalida")
        }

        if(telefone.length == 14) {
            telefoneVld = true
        } else {
            edTelefone.setError("Telefone incompleto.")
            edEmail.requestFocus()
        }

        if(!TextUtils.isEmpty(email) && Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            emailVld = true
        } else {
            edEmail.setError("Favor preencher um e-mail Valido!")
            edEmail.requestFocus()
        }

        if(!TextUtils.isEmpty(senha) && senha.length >= 8 && (senha.indexOf(' ') < 0)){
            senhaVld = true
        } else {
            edSenha.setError("No mínimo 8 digitos, sem espaço em branco.")
            edSenha.requestFocus()
        }

        validarCpf(cbJuridica, edCpfCnpj)

        validacaoCadastro = nomeVld && nascVld && emailVld &&
                telefoneVld && senhaVld && cpfCnpjValido &&
                checkBox.isChecked && (cbFisica.isChecked || cbJuridica.isChecked)

        if (validacaoCadastro) {
            cadastrar(v)
            startActivity(Intent(this, FinishCadastro::class.java))
        }
    }


    fun cliqueiJuridica(v: View) {
        val cbFisica: CheckBox = findViewById(R.id.cb_fisica)
        val cbJuridica: CheckBox = findViewById(R.id.cb_juridica)

        cbFisica.isChecked = false
        cbJuridica.isChecked = cbJuridica.isChecked
    }

    fun cliqueiFisica(v: View) {
        val cbFisica: CheckBox = findViewById(R.id.cb_fisica)
        val cbJuridica: CheckBox = findViewById(R.id.cb_juridica)

        cbFisica.isChecked = cbFisica.isChecked
        cbJuridica.isChecked = false
    }

    fun handleCheckBox(v: View) {
        val checkBox: CheckBox = findViewById(R.id.cb_termo)
        val cbFisica: CheckBox = findViewById(R.id.cb_fisica)
        val cbJuridica: CheckBox = findViewById(R.id.cb_juridica)

        if(checkBox.isChecked && cbFisica.isChecked || cbJuridica.isChecked) {
            Toast.makeText(this, "CADASTRO FEITO COM SUCESSO", Toast.LENGTH_SHORT).show()
            startActivity(Intent(this, FinishCadastro::class.java))
//            startActivity(Intent(this, CadastroActivity::class.java))
        } else{
            Toast.makeText(this, "FALTOU PREENCHER O CHECKBOX", Toast.LENGTH_SHORT).show()
        }

    }

    fun checkCpf(et: String): Boolean{
        if(et.equals("")) {
            return false
        }
        var str = et.replace("-", "").replace("/","").replace(".","")
        var calc: Int
        var num = 10
        var sum = 0
        for(x in 0..8) {
            calc = str[x].toString().toInt() * num
            sum += calc
            --num
        }
        var rest = sum % 11
        var test = 11 - rest
        if(test > 9) test = 0
        if(test != str[9].toString().toInt()) return false
        num = 11
        sum = 0
        for(x in 0..9) {
            calc = str[x].toString().toInt() * num
            sum += calc
            --num
        }
        rest = sum % 11
        test = 11 - rest
        if(test > 9) test = 0
        if(test != str[10].toString().toInt()) return false
        return true
    }

    fun checkCnpj(et: String): Boolean{
        var str = et.replace("-", "").replace("/","").replace(".","")
        var calc: Int
        var num = 5
        var sum = 0
        for(x in 0..11) {
            calc = str[x].toString().toInt() * num
            sum += calc
            --num
            if(num == 1) {
                num = 9
            }
        }
        var rest = sum % 11
        var test = 11 - rest
        if(test < 2) {
            test = 0
        }
        if(test != str[12].toString().toInt()) {
            return false
        }
        num = 6
        sum = 0
        for(x in 0..12) {
            calc = str[x].toString().toInt() * num
            sum += calc
            --num
            if(num == 1) {
                num = 9
            }
        }
        rest = sum % 11
        test = 11 - rest
        if(test < 2) {
            test = 0
        }
        if(test != str[13].toString().toInt()) {
            return false
        }
        return true
    }

    object MaskDocument {
        fun mask(ediTxt: EditText, cb: CheckBox): TextWatcher {
            var isUpdating: Boolean = false
            var mask = ""
            var old = ""
            return object : TextWatcher {
                override fun afterTextChanged(s: Editable) {
                }
                override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {
                }
                override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
                    val str = unmask(s.toString())
                    var mascara = ""
                    when (cb.isChecked) {
                        false -> mask = "###.###.###-##"
                        true -> mask = "##.###.###/####-##"
                    }
                    if (isUpdating) {
                        old = str
                        isUpdating = false
                        return
                    }
                    var i = 0
                    for (m in mask.toCharArray()) {
                        if (m != '#' && str.length > old.length) {
                            mascara += m
                            continue
                        }
                        try {
                            mascara += str[i]
                        } catch (e: Exception) {
                            break
                        }
                        i++
                    }
                    isUpdating = true
                    ediTxt.setText(mascara)
                    ediTxt.setSelection(mascara.length)
                }
            }
        }
        fun unmask(s: String): String {
            return s.replace("-", "").replace("/","").replace(".", "")
        }
    }

    object MaskDate {
        fun mask(ediTxt: EditText, mask: String): TextWatcher {
            return object : TextWatcher {
                var isUpdating: Boolean = false
                var old = ""
                override fun afterTextChanged(s: Editable) {}
                override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}
                override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
                    val str = unmask(s.toString())
                    var mascara = ""
                    if (isUpdating) {
                        old = str
                        isUpdating = false
                        return
                    }
                    var i = 0
                    for (m in mask.toCharArray()) {
                        if (m != '#' && str.length > old.length) {
                            mascara += m
                            continue
                        }
                        try {
                            mascara += str[i]
                        } catch (e: Exception) {
                            break
                        }
                        i++
                    }
                    isUpdating = true
                    ediTxt.setText(mascara)
                    ediTxt.setSelection(mascara.length)
                }
            }
        }
        fun unmask(s: String): String {
            return s.replace("[.]".toRegex(), "").replace("[-]".toRegex(), "")
                .replace("[/]".toRegex(), "").replace("[(]".toRegex(), ""
                ).replace("[ ]".toRegex(), "").replace("[:]".toRegex(), "").replace("[)]".toRegex(), "")
        }
    }

    object Mask {
        fun unmask(s: String): String {
            return s.replace("[.]".toRegex(), "").replace("[-]".toRegex(), "")
                .replace("[/]".toRegex(), "").replace("[(]".toRegex(), "")
                .replace("[)]".toRegex(), "")
        }

        fun insert(mask: String, ediTxt: EditText): TextWatcher {
            return object : TextWatcher {
                var isUpdating = false
                var old = ""
                override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
                    val str = unmask(s.toString())
                    var mascara = ""
                    if (isUpdating) {
                        old = str
                        isUpdating = false
                        return
                    }
                    var i = 0
                    for (m in mask.toCharArray()) {
                        if (m != '#' && str.length > old.length) {
                            mascara += m
                            continue
                        }
                        mascara += try {
                            str[i]
                        } catch (e: java.lang.Exception) {
                            break
                        }
                        i++
                    }
                    isUpdating = true
                    ediTxt.setText(mascara)
                    ediTxt.setSelection(mascara.length)
                }

                override fun beforeTextChanged(
                    s: CharSequence,
                    start: Int,
                    count: Int,
                    after: Int
                ) {
                }

                override fun afterTextChanged(s: Editable) {}
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun cadastrar (v: View) {

        val et_nome: EditText = findViewById(R.id.ed_nome)
        val et_cpf: EditText = findViewById(R.id.ed_cpf_cnpj)
        val et_birth_date: EditText = findViewById(R.id.ed_nasc)
        val et_email: EditText = findViewById(R.id.ed_email)
        val et_password: EditText = findViewById(R.id.ed_senha)
        val et_phone: EditText = findViewById(R.id.ed_telefone)
        var cnpj: String? = ""
        var cpf: String? = ""
        val nameUser: String = et_nome.text.toString()

        if (et_cpf.text.toString().length > 14) {
            cnpj= MaskDocument.unmask(et_cpf.text.toString())
            cpf = null
        } else {
            cpf = MaskDocument.unmask(et_cpf.text.toString())
            cnpj = null
        }
        val dataconvertida = et_birth_date.text.toString().split("/")
        val birthDate = "${dataconvertida[2]}-${dataconvertida[1]}-${dataconvertida[0]}"
        val email: String = et_email.text.toString()
        val typeRegister  = intent.getStringExtra("typeRegister")
        val role: String? = typeRegister
        val password: String = et_password.text.toString()
        val phone: String = Mask.unmask(et_phone.text.toString())

        val cadastrarAdapter: CadastrarAdapter = CadastrarAdapter(
            nameUser,
            cpf,
            cnpj,
            birthDate,
            email,
            password,
            role,
            phone
        )

        val cadastrarRepository: CadastrarRepository = CadastrarRepository(this)

        cadastrarRepository.cadastrar(cadastrarAdapter)
    }


}