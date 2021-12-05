package com.bandtec.searchdevelopers.activities.ui.configuration


import android.os.Bundle
import android.text.Editable
import android.text.TextUtils
import android.text.TextWatcher
import android.util.Patterns
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.backend.model.UsersDto
import com.bandtec.searchdevelopers.backend.repository.ConfigurationUserRepository
import com.bandtec.searchdevelopers.activities.login.CadastroActivity
import com.bandtec.searchdevelopers.activities.MainActivity
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import com.bandtec.searchdevelopers.databinding.FragmentConfigurationBinding
import com.google.android.material.textfield.TextInputEditText
import kotlin.system.exitProcess

class ConfigurationFragment : Fragment() {
    lateinit var mSecurityPreferences: SecurityPreferences

    private lateinit var configurationViewModel: ConfigurationViewModel
    private var _binding: FragmentConfigurationBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!
    var openCloseName = false
    var openCloseEmail = false
    var openCloseCell = false

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        configurationViewModel =
            ViewModelProvider(this).get(ConfigurationViewModel::class.java)

        _binding = FragmentConfigurationBinding.inflate(inflater, container, false)
        val root: View = binding.root

        mSecurityPreferences = SecurityPreferences(this.requireContext())

        var nameUser = mSecurityPreferences.getString("nameUser")
        var nameNoEdit: TextView = binding.root.findViewById(R.id.name_no_edit)
        nameNoEdit.text = nameUser

        val dateUser = mSecurityPreferences.getString("birthDate")
        var dateNoEdit: TextView = binding.root.findViewById(R.id.date_no_edit)
        dateNoEdit.text = dateUser

        var cpfUser = mSecurityPreferences.getString("cpf")
        val cnpjUser = mSecurityPreferences.getString("cnpj")
        var documentNoEdit: TextView = binding.root.findViewById(R.id.document_no_edit)
        if(cpfUser.equals("")){
            documentNoEdit.text = cnpjUser
        } else {
            documentNoEdit.text = cpfUser
        }

        var emailUser = mSecurityPreferences.getString("email")
        var emailNoEdit: TextView = binding.root.findViewById(R.id.email_no_edit)
        emailNoEdit.text = emailUser

        var cellUser = mSecurityPreferences.getString("phone")
        val cellNoEdit: TextView = binding.root.findViewById(R.id.cell_no_edit)
        cellNoEdit.text = cellUser

        val llConfigName: LinearLayout = binding.root.findViewById(R.id.ll_config_name)
        var llConfigCell: LinearLayout = binding.root.findViewById(R.id.ll_config_cell)
        var llConfigEmail: LinearLayout = binding.root.findViewById(R.id.ll_config_email)

        var edNomeEdit: TextInputEditText = binding.root.findViewById(R.id.ed_nome_edit)
        var icNameOC: ImageView = binding.root.findViewById(R.id.ic_name_oc)
        icNameOC.setOnClickListener {
            openCloseName = !openCloseName
            if (openCloseName) {
                llConfigName.visibility = View.VISIBLE
                icNameOC.setImageResource(R.drawable.ic_arrow_close)
                edNomeEdit.hint = nameNoEdit.text.toString()
            } else {
                llConfigName.visibility = View.GONE
                icNameOC.setImageResource(R.drawable.ic_arrow)
            }
        }

        var icEmailOC: ImageView = binding.root.findViewById(R.id.ic_email_OC)
        var edEmailEdit: TextInputEditText = binding.root.findViewById(R.id.ed_email_edit)
        icEmailOC.setOnClickListener {
            openCloseEmail = !openCloseEmail
            if(openCloseEmail) {
                llConfigEmail.visibility = View.VISIBLE
                icEmailOC.setImageResource(R.drawable.ic_arrow_close)
                edEmailEdit.hint = emailNoEdit.text.toString()
            } else {
                llConfigEmail.visibility = View.GONE
                icEmailOC.setImageResource(R.drawable.ic_arrow)
            }
        }

        var edCellEdit: TextInputEditText = binding.root.findViewById(R.id.ed_cell_edit)
        var icCellOC: ImageView = binding.root.findViewById(R.id.ic_cell_oc)
        edCellEdit.addTextChangedListener(Mask.insert("(##)#####-####", edCellEdit))
        icCellOC.setOnClickListener {
            openCloseCell = !openCloseCell
            if(openCloseCell) {
                llConfigCell.visibility = View.VISIBLE
                icCellOC.setImageResource(R.drawable.ic_arrow_close)
                edCellEdit.hint = cellNoEdit.text.toString()
            } else {
                llConfigCell.visibility = View.GONE
                icCellOC.setImageResource(R.drawable.ic_arrow)
            }
        }

        var btEdit: Button = binding.root.findViewById(R.id.bt_edit)

        // TODO LOGICA PARA LOGOFF
//        btEdit.setOnClickListener {
//            mSecurityPreferences.remove("iduser")
//            val context: Context = requireContext()
//            context.startActivity(Intent(context, MainActivity::class.java))
//        }

        /* TODO para fazer o logout e não voltar para a mesma página de quando logado executa o método:
        * finish() -> activity
        * exit.process(0) "0 para o processo atual" -> fragmento
        * */


        btEdit.setOnClickListener {

            val email = edEmailEdit.text.toString()
            val phone = edCellEdit.text.toString()
            val name = edNomeEdit.text.toString()

            if(!TextUtils.isEmpty(name)) {
                nameUser = name
            }

            if (!TextUtils.isEmpty(phone)) {
                if((phone.length) == 14) {
                    cellUser = CadastroActivity.Mask.unmask(phone)
                } else {
                    edCellEdit.error = "Telefone incompleto."
                    edCellEdit.requestFocus()
                }
            }

            if(!TextUtils.isEmpty(email)) {
                if(Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                    emailUser = email
                } else {
                    edEmailEdit.error = "Favor preencher um e-mail Valido!"
                    edEmailEdit.requestFocus()
                }
            }

            val roleUser = mSecurityPreferences.getString("role")
            val idUser = mSecurityPreferences.getInt("idUser")
            val descriptionUser = mSecurityPreferences.getString("descriptionUser")
            val nameCompany = mSecurityPreferences.getString("nameCompany")
            val starsUser = mSecurityPreferences.getFloat("starsUser")
            val password = mSecurityPreferences.getString("password")
            val starsUserDouble = starsUser.toString().toDouble()
            val status = mSecurityPreferences.getBoolean("status")
            val locality = mSecurityPreferences.getString("locality")
            val photo = mSecurityPreferences.getString("photo")
            val creationDate = mSecurityPreferences.getString("creationDate")
            val numberCard = mSecurityPreferences.getString("numberCard")
            val cvv = mSecurityPreferences.getString("cvv")
            val monthCard = mSecurityPreferences.getString("monthCard")
            val yearCard = mSecurityPreferences.getString("yearCard")
            val isPremium = mSecurityPreferences.getBoolean("isPremium")
            val ratingNumber = mSecurityPreferences.getInt("ratingNumber")

            val configAdapter: UsersDto = UsersDto(
                idUser,
                nameUser,
                cpfUser,
                cnpjUser,
                dateUser,
                nameCompany,
                emailUser,
                password,
                roleUser,
                descriptionUser,
                starsUserDouble,
                cellUser,
                status,
                locality,
                photo,
                creationDate,
                numberCard,
                cvv,
                monthCard,
                yearCard,
                isPremium,
                ratingNumber
            )

            val configurationRepository: ConfigurationUserRepository = ConfigurationUserRepository(this.requireContext())
            configurationRepository.editUserConfiguration(configAdapter)

            mSecurityPreferences.store("nameUser", nameUser)
            mSecurityPreferences.store("phone", cellUser)
            mSecurityPreferences.store("email", emailUser)


            nameNoEdit.text = nameUser
            edNomeEdit.text?.clear()
            cellNoEdit.text = cellUser
            edCellEdit.text?.clear()
            emailNoEdit.text = emailUser
            edEmailEdit.text?.clear()

            llConfigCell.visibility = View.GONE
            icCellOC.setImageResource(R.drawable.ic_arrow)
            llConfigName.visibility = View.GONE
            icNameOC.setImageResource(R.drawable.ic_arrow)
            llConfigEmail.visibility = View.GONE
            icEmailOC.setImageResource(R.drawable.ic_arrow)

        }
        // TODO LOGICA PARA EDITAR DADOS ENVIANDO PARA O BACKEND
        btEdit.setOnClickListener {

            val email = edEmailEdit.text.toString()
            val phone = edCellEdit.text.toString()
            val name = edNomeEdit.text.toString()

            if(!TextUtils.isEmpty(name)) {
                nameUser = name
            }

            if (!TextUtils.isEmpty(phone)) {
                if((phone.length) == 14) {
                    cellUser = CadastroActivity.Mask.unmask(phone)
                } else {
                    edCellEdit.error = "Telefone incompleto."
                    edCellEdit.requestFocus()
                }
            }

            if(!TextUtils.isEmpty(email)) {
                if(Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                    emailUser = email
                } else {
                    edEmailEdit.error = "Favor preencher um e-mail Valido!"
                    edEmailEdit.requestFocus()
                }
            }

            var roleUser = mSecurityPreferences.getString("role")
            var idUser = mSecurityPreferences.getInt("idUser")
            var descriptionUser = mSecurityPreferences.getString("descriptionUser")
            var nameCompany = mSecurityPreferences.getString("nameCompany")
            var password = mSecurityPreferences.getString("password")
            var birthDateUser = mSecurityPreferences.getString("birthDateUser")
            var starsUser = mSecurityPreferences.getFloat("starsUser")
            var status = mSecurityPreferences.getBoolean("status")
            var locality = mSecurityPreferences.getString("locality")
            var photo = mSecurityPreferences.getString("photo")
            var creationDate = mSecurityPreferences.getString("creationDate")
            var numberCard = mSecurityPreferences.getString("numberCard")
            var cvv = mSecurityPreferences.getString("cvv")
            var monthCard = mSecurityPreferences.getString("monthCard")
            var yearCard = mSecurityPreferences.getString("yearCard")
            var isPremium = mSecurityPreferences.getBoolean("isPremium")

//            val configAdapter: UsersDto = UsersDto(
//                idUser,
//                nameUser,
//                cpfUser,
//                cnpjUser,
//                birthDateUser,
//                nameCompany,
//                emailUser,
//                password,
//                roleUser,
//                descriptionUser,
//                starsUser,
//                cellUser,
//                status,
//                locality,
//                photo,
//                creationDate,
//                numberCard,
//                cvv,
//                monthCard,
//                yearCard,
//                isPremium,
//            )
//
//            val configurationRepository: ConfigurationUserRepository = ConfigurationUserRepository(this.requireContext())
//            configurationRepository.editUserConfiguration(configAdapter)

            nameNoEdit.text = nameUser
            edNomeEdit.text?.clear()
            cellNoEdit.text = cellUser
            edCellEdit.text?.clear()
            emailNoEdit.text = emailUser
            edEmailEdit.text?.clear()

            llConfigCell.visibility = View.GONE
            icCellOC.setImageResource(R.drawable.ic_arrow)
            llConfigName.visibility = View.GONE
            icNameOC.setImageResource(R.drawable.ic_arrow)
            llConfigEmail.visibility = View.GONE
            icEmailOC.setImageResource(R.drawable.ic_arrow)

        }

        return root
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
                        } catch (e: Exception) {
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


    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}